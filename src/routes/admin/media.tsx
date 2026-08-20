import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
import { useMediaList } from "@/components/admin/MediaPicker";
import {
  deleteMedia,
  mediaUsage,
  updateRow,
  uploadMedia,
  type MediaRecord,
} from "@/lib/cms/admin";

export const Route = createFileRoute("/admin/media")({
  component: MediaAdmin,
});

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

function MediaAdmin() {
  const queryClient = useQueryClient();
  const { data: media = [], isLoading } = useMediaList();
  const [pending, setPending] = useState<MediaRecord | null>(null);
  const [usage, setUsage] = useState<{ label: string; count: number }[]>([]);

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
    void queryClient.invalidateQueries({ queryKey: ["cms", "public-content"] });
  };

  const upload = useMutation({
    mutationFn: (file: File) => uploadMedia(file),
    onSuccess: () => {
      invalidate();
      toast.success("Uploaded");
    },
    onError: (error: Error) => toast.error(error.message || "Upload failed"),
  });

  const saveAlt = useMutation({
    mutationFn: ({ id, alt }: { id: string; alt: string }) =>
      updateRow("media", id, { alt_text: alt }),
    onSuccess: () => {
      invalidate();
      toast.success("Alt text saved");
    },
    onError: (error: Error) => toast.error(error.message || "Could not save"),
  });

  const remove = useMutation({
    mutationFn: (record: MediaRecord) => deleteMedia(record),
    onSuccess: () => {
      invalidate();
      setPending(null);
      toast.success("File deleted");
    },
    onError: (error: Error) => toast.error(error.message || "Could not delete"),
  });

  const confirmDelete = async (record: MediaRecord) => {
    setUsage(await mediaUsage(record.url).catch(() => []));
    setPending(record);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-3xl">Media</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every image and video used across the website.
          </p>
        </div>
        <label>
          <Button asChild>
            <span className="cursor-pointer">
              {upload.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ImagePlus className="mr-2 h-4 w-4" />
              )}
              Upload file
            </span>
          </Button>
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml,video/mp4"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload.mutate(file);
              e.target.value = "";
            }}
          />
        </label>
      </header>

      {isLoading ? (
        <p className="py-10 text-sm text-muted-foreground">Loading…</p>
      ) : media.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          No files yet. Upload your first photograph.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <li key={item.id} className="overflow-hidden rounded-lg border border-border">
              {item.mime_type?.startsWith("video/") ? (
                <video src={item.url} controls className="h-40 w-full bg-muted object-cover" />
              ) : (
                <img
                  src={item.url}
                  alt={item.alt_text ?? item.filename}
                  loading="lazy"
                  className="h-40 w-full bg-muted object-cover"
                />
              )}
              <div className="space-y-2 p-3">
                <p className="truncate text-sm font-medium">{item.filename}</p>
                <p className="text-xs text-muted-foreground">
                  {item.width && item.height ? `${item.width}×${item.height} · ` : ""}
                  {formatSize(item.size_bytes)}
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    defaultValue={item.alt_text ?? ""}
                    placeholder="Alt text"
                    onBlur={(e) => {
                      if (e.target.value !== (item.alt_text ?? "")) {
                        saveAlt.mutate({ id: item.id, alt: e.target.value });
                      }
                    }}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Delete file"
                    onClick={() => void confirmDelete(item)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AlertDialog open={pending !== null} onOpenChange={(open) => (open ? null : setPending(null))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this file?</AlertDialogTitle>
            <AlertDialogDescription>
              {usage.length > 0
                ? `This file is still used in: ${usage
                    .map((entry) => `${entry.label} (${entry.count})`)
                    .join(", ")}. Deleting it will leave those places without an image.`
                : "This file isn't used anywhere on the website right now."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => pending && remove.mutate(pending)}
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
