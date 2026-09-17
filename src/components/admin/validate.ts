import type { FieldDef, FormValues } from "./fields";

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
    if (
      (field.type === "url" || field.key.endsWith("_url") || field.key.endsWith("_href")) &&
      typeof value === "string" &&
      value.trim() !== "" &&
      !URLISH.test(value.trim())
    ) {
      errors[field.key] =
        "Enter a full link (https://…, mailto:…, tel:… ) or a site path starting with /.";
    }
    if (field.type === "number" && value !== "" && value !== null && value !== undefined) {
      const n = Number(value);
      if (Number.isNaN(n)) errors[field.key] = "Enter a number.";
      else if (field.min !== undefined && n < field.min)
        errors[field.key] = `Minimum is ${field.min}.`;
      else if (field.max !== undefined && n > field.max)
        errors[field.key] = `Maximum is ${field.max}.`;
    }
  }
  return errors;
}
