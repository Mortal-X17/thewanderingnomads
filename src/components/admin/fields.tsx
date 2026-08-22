import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export type FieldType =
  | "text"
  | "textarea"
  | "rich-text"
  | "number"
  | "boolean"
  | "select"
  | "tags"
  | "image"
  | "color"
  | "url";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
};


export type FormValues = Record<string, unknown>;

const URLISH = /^(https?:\/\/|mailto:|tel:|\/)/i;

/** Returns a map of field key -> error message. */
export function validate(fields: FieldDef[], values: FormValues) {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const value = values[field.key];
    if (field.required) {
      const empty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0);
      if (empty) {
        errors[field.key] = `${field.label} is required.`;
        continue;
      }
    }
    if ((field.type === "url" || field.key.endsWith("_url") || field.key.endsWith("_href")) &&
      typeof value === "string" && value.trim() !== "" && !URLISH.test(value.trim())) {
      errors[field.key] =
        "Enter a full link (https://…, mailto:…, tel:… ) or a site path starting with /.";
    }
    if (field.type === "number" && value !== "" && value !== null && value !== undefined) {
      const n = Number(value);
      if (Number.isNaN(n)) errors[field.key] = "Enter a number.";
      else if (field.min !== undefined && n < field.min) errors[field.key] = `Minimum is ${field.min}.`;
      else if (field.max !== undefined && n > field.max) errors[field.key] = `Maximum is ${field.max}.`;
    }
  }
  return errors;
}

export function FieldInput({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  error?: string;
  onChange: (value: unknown) => void;
}) {
  const id = `field-${field.key}`;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium">
        {field.label}
        {field.required ? <span className="ml-1 text-destructive">*</span> : null}
      </Label>

      {field.type === "rich-text" ? (
        <RichTextEditor
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          onChange={(v) => onChange(v)}
        />
      ) : field.type === "textarea" ? (
        <Textarea
          id={id}
          rows={field.rows ?? 4}
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.type === "boolean" ? (
        <div className="flex h-9 items-center">
          <Switch id={id} checked={Boolean(value)} onCheckedChange={(v) => onChange(v)} />
        </div>
      ) : field.type === "select" ? (
        <Select value={(value as string) ?? ""} onValueChange={(v) => onChange(v)}>
          <SelectTrigger id={id}>
            <SelectValue placeholder="Choose…" />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? []).map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : field.type === "tags" ? (
        <TagsInput value={(value as string[]) ?? []} onChange={onChange} placeholder={field.placeholder} />
      ) : field.type === "image" ? (
        <MediaPicker value={(value as string) ?? ""} onChange={(url) => onChange(url)} />
      ) : field.type === "color" ? (
        <div className="flex items-center gap-2">
          <input
            id={id}
            type="color"
            value={(value as string) || "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-12 cursor-pointer rounded border border-input bg-background"
          />
          <Input value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />
        </div>
      ) : (
        <Input
          id={id}
          type={field.type === "number" ? "number" : "text"}
          min={field.min}
          max={field.max}
          step={field.step}
          value={value === null || value === undefined ? "" : String(value)}
          placeholder={field.placeholder}
          onChange={(e) =>
            onChange(field.type === "number" ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value)
          }
        />
      )}


      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : field.help ? (
        <p className="text-xs text-muted-foreground">{field.help}</p>
      ) : null}
    </div>
  );
}

function TagsInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const next = draft.trim();
    if (!next) return;
    onChange([...value, next]);
    setDraft("");
  };
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={draft}
          placeholder={placeholder ?? "Type and press Add"}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button type="button" variant="secondary" onClick={add}>
          Add
        </Button>
      </div>
      {value.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {value.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs"
            >
              {item}
              <button
                type="button"
                aria-label={`Remove ${item}`}
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
