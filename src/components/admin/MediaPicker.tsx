import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { listRows, uploadMedia, type MediaRecord } from "@/lib/cms/admin";

export function useMediaList() {
  return useQuery({
    queryKey: ["admin", "media"],
    queryFn: async () => (await listRows("media", "created_at")) as unknown as MediaRecord[],
  });
}

/** Image field: pick from the media library, upload a new file, or clear. */
export function MediaPicker({
  value,
  onChange,
  folder = "library",
}: {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: media = [], isLoading } = useMediaList();

  const upload = useMutation({
    mutationFn: (file: File) => uploadMedia(file, folder),
    onSuccess: (record) => {
      void queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
      onChange(record.url);
      toast.success("Image uploaded");
      setOpen(false);
    },
    onError: (error: Error) => toast.error(error.message || "Upload failed"),
  });

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {value ? (
          <img
            src={value}
            alt="Selected"
            loading="lazy"
            className="h-16 w-24 rounded-md border border-border object-cover"
          />
        ) : (
          <div className="flex h-16 w-24 items-center justify-center rounded-md border border-dashed border-border text-muted-foreground">
            <ImagePlus className="h-4 w-4" />
          </div>
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="secondary" size="sm">
              {value ? "Change" : "Select image"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Media library</DialogTitle>
              <DialogDescription>Upload a new file or reuse an existing one.</DialogDescription>
            </DialogHeader>

            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border p-3 text-sm">
              {upload.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ImagePlus className="h-4 w-4" />
              )}
              <span>Upload image (JPG, PNG, WebP, AVIF — max 20 MB)</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) upload.mutate(file);
                  e.target.value = "";
                }}
              />
            </label>

            {isLoading ? (
              <p className="py-6 text-center text-sm text-muted-foreground">Loading…</p>
            ) : media.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No files yet — upload your first image above.
              </p>
            ) : (
              <div className="grid max-h-80 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4">
                {media.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onChange(item.url);
                      setOpen(false);
                    }}
                    className="group relative overflow-hidden rounded-md border border-border"
                  >
                    <img
                      src={item.url}
                      alt={item.alt_text ?? item.filename}
                      loading="lazy"
                      className="h-24 w-full object-cover transition group-hover:opacity-80"
                    />
                  </button>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
        {value ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
            <Trash2 className="mr-1 h-3.5 w-3.5" /> Clear
          </Button>
        ) : null}
      </div>
      <Input
        value={value}
        placeholder="…or paste an image URL"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
