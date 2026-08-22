import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Undo,
  Redo,
  Strikethrough,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const TOOLS = [
  { key: "bold", icon: Bold, label: "Bold" },
  { key: "italic", icon: Italic, label: "Italic" },
  { key: "strike", icon: Strikethrough, label: "Strikethrough" },
  { key: "h1", icon: Heading1, label: "Heading 1" },
  { key: "h2", icon: Heading2, label: "Heading 2" },
  { key: "bulletList", icon: List, label: "Bullet list" },
  { key: "orderedList", icon: ListOrdered, label: "Numbered list" },
  { key: "blockquote", icon: Quote, label: "Quote" },
];

/** Controlled Tiptap wrapper for the admin CMS. */
export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something…",
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "rich-text-editor max-w-none min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html === value) return;
      onChange(html);
    },
  });

  // Avoid SSR mismatch: don't render editor until mounted client-side.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync external value changes without creating an update loop.
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    const current = editor.getHTML();
    if (current === value) return;
    editor.commands.setContent(value);
  }, [editor, value]);

  if (!isMounted || !editor) {
    return (
      <div className="min-h-[120px] rounded-md border border-input bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
        Loading editor…
      </div>
    );
  }

  const isActive = (key: string) => {
    if (key === "h1") return editor.isActive("heading", { level: 1 });
    if (key === "h2") return editor.isActive("heading", { level: 2 });
    return editor.isActive(key);
  };

  const toggle = (key: string) => {
    switch (key) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "strike":
        editor.chain().focus().toggleStrike().run();
        break;
      case "h1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "h2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "bulletList":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "orderedList":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "blockquote":
        editor.chain().focus().toggleBlockquote().run();
        break;
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string;
    const url = window.prompt("Enter link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1 rounded-md border border-input bg-background p-1">
        {TOOLS.map((tool) => (
          <Button
            key={tool.key}
            type="button"
            variant={isActive(tool.key) ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            aria-label={tool.label}
            onClick={() => toggle(tool.key)}
          >
            <tool.icon className="h-4 w-4" />
          </Button>
        ))}
        <div className="mx-1 h-4 w-px bg-border" />
        <Button
          type="button"
          variant={editor.isActive("link") ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          aria-label="Add link"
          onClick={setLink}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-4 w-px bg-border" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
