import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldInput, validate, type FieldDef, type FormValues } from "@/components/admin/fields";
import {
  deleteRow,
  insertRow,
  listRows,
  swapOrder,
  updateRow,
  type AdminTable,
} from "@/lib/cms/admin";

type Row = Record<string, unknown>;

export type CollectionConfig = {
  table: AdminTable;
  title: string;
  description?: string;
  fields: FieldDef[];
  /** Column rendered as the row title. */
  labelKey: string;
  subtitleKey?: string;
  /** Show up/down reorder controls (requires a sort_order column). */
  orderable?: boolean;
  /** Show a status badge from this column ("draft" | "published"). */
  statusKey?: string;
  searchKeys?: string[];
  defaults?: Row;
  duplicable?: boolean;
  /** Only show rows matching this predicate (e.g. one journey's images). */
  filter?: (row: Row) => boolean;
  /** Values merged into every created row (e.g. a parent id). */
  scope?: Row;
  emptyLabel?: string;
};

export function CollectionManager({ config }: { config: CollectionConfig }) {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Row | null>(null);
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pendingDelete, setPendingDelete] = useState<Row | null>(null);

  const orderColumn = config.orderable ? "sort_order" : "created_at";
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin", config.table],
    queryFn: () => listRows(config.table, orderColumn),
  });

  const visible = useMemo(() => {
    const filtered = config.filter ? rows.filter(config.filter) : rows;
    const term = query.trim().toLowerCase();
    if (!term) return filtered;
    const keys = config.searchKeys ?? [config.labelKey];
    return filtered.filter((row) =>
      keys.some((key) => String(row[key] ?? "").toLowerCase().includes(term)),
    );
  }, [rows, query, config]);

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", config.table] });
    void queryClient.invalidateQueries({ queryKey: ["cms", "public-content"] });
  };

  const save = useMutation({
    mutationFn: async () => {
      const payload: Row = { ...config.scope };
      for (const field of config.fields) payload[field.key] = values[field.key] ?? null;
      if (editing && editing["id"]) {
        await updateRow(config.table, editing["id"] as string, payload);
      } else {
        if (config.orderable) {
          payload["sort_order"] =
            rows.reduce((max, row) => Math.max(max, Number(row["sort_order"] ?? 0)), 0) + 1;
        }
        await insertRow(config.table, payload);
      }
    },
    onSuccess: () => {
      invalidate();
      setEditing(null);
      toast.success("Saved — live on the website");
    },
    onError: (error: Error) => toast.error(error.message || "Could not save"),
  });

  const remove = useMutation({
    mutationFn: (row: Row) =>
      deleteRow(config.table, row["id"] as string, String(row[config.labelKey] ?? "")),
    onSuccess: () => {
      invalidate();
      setPendingDelete(null);
      toast.success("Deleted");
    },
    onError: (error: Error) => toast.error(error.message || "Could not delete"),
  });

  const duplicate = useMutation({
    mutationFn: async (row: Row) => {
      const payload: Row = { ...config.scope };
      for (const field of config.fields) payload[field.key] = row[field.key] ?? null;
      if (typeof payload["slug"] === "string") payload["slug"] = `${payload["slug"]}-copy`;
      if (typeof payload[config.labelKey] === "string") {
        payload[config.labelKey] = `${payload[config.labelKey]} (copy)`;
      }
      if (config.statusKey) payload[config.statusKey] = "draft";
      if (config.orderable) {
        payload["sort_order"] =
          rows.reduce((max, r) => Math.max(max, Number(r["sort_order"] ?? 0)), 0) + 1;
      }
      await insertRow(config.table, payload);
    },
    onSuccess: () => {
      invalidate();
      toast.success("Duplicated as a draft");
    },
    onError: (error: Error) => toast.error(error.message || "Could not duplicate"),
  });

  const move = useMutation({
    mutationFn: async ({ index, direction }: { index: number; direction: -1 | 1 }) => {
      const target = visible[index + direction];
      const current = visible[index];
      if (!target || !current) return;
      await swapOrder(config.table, current, target);
    },
    onSuccess: invalidate,
    onError: (error: Error) => toast.error(error.message || "Could not reorder"),
  });

  const openNew = () => {
    setErrors({});
    setValues({ ...(config.defaults ?? {}) });
    setEditing({});
  };

  const openEdit = (row: Row) => {
    setErrors({});
    setValues({ ...row });
    setEditing(row);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium">{config.title}</h2>
          {config.description ? (
            <p className="text-sm text-muted-foreground">{config.description}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-44 pl-8"
            />
          </div>
          <Button onClick={openNew} size="sm">
            <Plus className="mr-1.5 h-4 w-4" /> Add
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          {config.emptyLabel ?? "Nothing here yet."}
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {visible.map((row, index) => (
            <li key={String(row["id"])} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {String(row[config.labelKey] ?? "Untitled")}
                </p>
                {config.subtitleKey ? (
                  <p className="truncate text-xs text-muted-foreground">
                    {String(row[config.subtitleKey] ?? "")}
                  </p>
                ) : null}
              </div>
              {config.statusKey ? (
                <Badge variant={row[config.statusKey] === "published" ? "default" : "secondary"}>
                  {String(row[config.statusKey] ?? "draft")}
                </Badge>
              ) : null}
              {config.orderable ? (
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Move up"
                    disabled={index === 0 || move.isPending}
                    onClick={() => move.mutate({ index, direction: -1 })}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Move down"
                    disabled={index === visible.length - 1 || move.isPending}
                    onClick={() => move.mutate({ index, direction: 1 })}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}
              {config.duplicable ? (
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Duplicate"
                  onClick={() => duplicate.mutate(row)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              ) : null}
              <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => openEdit(row)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Delete"
                onClick={() => setPendingDelete(row)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={editing !== null} onOpenChange={(open) => (open ? null : setEditing(null))}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing && editing["id"] ? "Edit" : "New"} — {config.title}
            </DialogTitle>
            <DialogDescription>
              Changes go live on the website as soon as you save.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            {config.fields.map((field) => (
              <div
                key={field.key}
                className={
                  field.type === "textarea" || field.type === "tags" ? "sm:col-span-2" : undefined
                }
              >
                <FieldInput
                  field={field}
                  value={values[field.key]}
                  error={errors[field.key]}
                  onChange={(next) => setValues((prev) => ({ ...prev, [field.key]: next }))}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const found = validate(config.fields, values);
                setErrors(found);
                if (Object.keys(found).length > 0) {
                  toast.error("Please fix the highlighted fields");
                  return;
                }
                save.mutate();
              }}
              disabled={save.isPending}
            >
              {save.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => (open ? null : setPendingDelete(null))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
            <AlertDialogDescription>
              “{String(pendingDelete?.[config.labelKey] ?? "This entry")}” will be removed from the
              website immediately. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => pendingDelete && remove.mutate(pendingDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
