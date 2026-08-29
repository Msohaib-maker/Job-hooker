export const LANGUAGES = ["en", "zh", "fr"] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

interface LanguageMeta {
  /** Value written into <html lang="…"> */
  htmlLang: string;
  /** BCP-47 tag used for Intl number/date formatting */
  locale: string;
  /** Name of the language, written in that language */
  nativeName: string;
  /** Two-letter badge shown in the compact switcher */
  short: string;
}

export const LANGUAGE_META: Record<Language, LanguageMeta> = {
  en: { htmlLang: "en", locale: "en-US", nativeName: "English", short: "EN" },
  zh: { htmlLang: "zh-CN", locale: "zh-CN", nativeName: "中文", short: "中" },
  fr: { htmlLang: "fr", locale: "fr-FR", nativeName: "Français", short: "FR" },
};

export const isLanguage = (value: unknown): value is Language =>
  typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);
