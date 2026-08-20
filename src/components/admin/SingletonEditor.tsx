import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldInput, validate, type FieldDef, type FormValues } from "@/components/admin/fields";
import { getSingleton, saveSingleton, type AdminTable } from "@/lib/cms/admin";

export type SingletonGroup = { title: string; description?: string; fields: FieldDef[] };

/** Editor for one-row settings tables (site settings, design tokens, about page). */
export function SingletonEditor({
  table,
  groups,
  onSaved,
}: {
  table: AdminTable;
  groups: SingletonGroup[];
  onSaved?: () => void;
}) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", table],
    queryFn: () => getSingleton(table),
  });

  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setValues(data as FormValues);
      setDirty(false);
    }
  }, [data]);

  const allFields = useMemo(() => groups.flatMap((group) => group.fields), [groups]);

  const save = useMutation({
    mutationFn: async () => {
      const payload: FormValues = {};
      for (const field of allFields) payload[field.key] = values[field.key] ?? null;
      await saveSingleton(table, payload);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin", table] });
      void queryClient.invalidateQueries({ queryKey: ["cms", "public-content"] });
      setDirty(false);
      toast.success("Saved — live on the website");
      onSaved?.();
    },
    onError: (error: Error) => toast.error(error.message || "Could not save"),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <Card key={group.title}>
          <CardHeader>
            <CardTitle className="text-base">{group.title}</CardTitle>
            {group.description ? <CardDescription>{group.description}</CardDescription> : null}
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {group.fields.map((field) => (
              <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : undefined}>
                <FieldInput
                  field={field}
                  value={values[field.key]}
                  error={errors[field.key]}
                  onChange={(next) => {
                    setValues((prev) => ({ ...prev, [field.key]: next }));
                    setDirty(true);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <div className="sticky bottom-4 flex items-center justify-end gap-3 rounded-full border border-border bg-background/85 px-4 py-2 backdrop-blur">
        <span className="text-xs text-muted-foreground">
          {dirty ? "Unsaved changes" : "All changes saved"}
        </span>
        <Button
          onClick={() => {
            const found = validate(allFields, values);
            setErrors(found);
            if (Object.keys(found).length > 0) {
              toast.error("Please fix the highlighted fields");
              return;
            }
            save.mutate();
          }}
          disabled={save.isPending || !dirty}
        >
          {save.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save changes
        </Button>
      </div>
    </div>
  );
}
