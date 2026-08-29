import { createContext } from "react";
import { DEFAULT_LANGUAGE, Language } from "./languages";
import { en, Translation } from "./translations/en";

/**
 * Dotted paths into the dictionary: "jobs.emptyTitle", "profile.labelName", …
 * The dictionary is deliberately two levels deep (section → key), which keeps
 * this a plain mapped type rather than a recursive one TypeScript struggles with.
 */
export type TranslationKey = {
  [K in keyof Translation & string]: `${K}.${keyof Translation[K] & string}`;
}[keyof Translation & string];

export type TranslationVars = Record<string, string | number>;

export interface I18nValue {
  language: Language;
  setLanguage: (language: Language) => void;
  /** BCP-47 tag for Intl formatting, e.g. "fr-FR". */
  locale: string;
  t: (key: TranslationKey, vars?: TranslationVars) => string;
  /** Locale-aware number formatting. */
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  /** Locale-aware date formatting. */
  formatDate: (
    value: Date | string | number,
    options?: Intl.DateTimeFormatOptions,
  ) => string;
}

const identity = (key: TranslationKey) => key;

export const I18nContext = createContext<I18nValue>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => undefined,
  locale: "en-US",
  t: identity,
  formatNumber: (value) => String(value),
  formatDate: (value) => String(value),
});

/** Walks a dotted key through a dictionary. Returns null when it does not resolve. */
export const lookup = (
  dictionary: Translation,
  key: string,
): string | null => {
  let node: unknown = dictionary;
  for (const part of key.split(".")) {
    if (typeof node !== "object" || node === null) return null;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" ? node : null;
};

/** Replaces every {{name}} in the template with the matching variable. */
export const interpolate = (template: string, vars?: TranslationVars) => {
  if (!vars) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
};

/** Falls back to English, then to the raw key, so a gap never renders blank. */
export const resolve = (
  dictionary: Translation,
  key: string,
  vars?: TranslationVars,
) => {
  const template = lookup(dictionary, key) ?? lookup(en, key) ?? key;
  return interpolate(template, vars);
};
