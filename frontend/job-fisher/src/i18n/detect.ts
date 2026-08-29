import {
  DEFAULT_LANGUAGE,
  Language,
  LANGUAGE_META,
  isLanguage,
} from "./languages";

export const LANGUAGE_STORAGE_KEY = "jobhooker_language";

/**
 * IANA time zones that stand in for "the visitor is physically in this
 * country". Used as a geo signal when the browser locale says nothing useful —
 * someone in Shanghai running an English copy of Chrome still gets Chinese.
 *
 * Mainland China only: Hong Kong, Macau and Taiwan read Traditional Chinese,
 * which we do not ship, so they fall through to their browser locale instead.
 */
const CHINA_TIMEZONES = [
  "Asia/Shanghai",
  "Asia/Chongqing",
  "Asia/Chungking",
  "Asia/Harbin",
  "Asia/Urumqi",
  "Asia/Kashgar",
  "PRC",
];

/** Metropolitan France plus the overseas départements and territories. */
const FRANCE_TIMEZONES = [
  "Europe/Paris",
  "Indian/Reunion",
  "Indian/Mayotte",
  "Indian/Kerguelen",
  "America/Martinique",
  "America/Guadeloupe",
  "America/Marigot",
  "America/St_Barthelemy",
  "America/Cayenne",
  "America/Miquelon",
  "Pacific/Noumea",
  "Pacific/Tahiti",
  "Pacific/Marquesas",
  "Pacific/Gambier",
  "Pacific/Wallis",
];

const TIMEZONE_LANGUAGE: Record<string, Language> = {
  ...Object.fromEntries(CHINA_TIMEZONES.map((tz) => [tz, "zh" as Language])),
  ...Object.fromEntries(FRANCE_TIMEZONES.map((tz) => [tz, "fr" as Language])),
};

/** "zh-Hans-CN" / "fr-CA" → the language we ship, or null. */
const fromLocaleTag = (tag: string | undefined | null): Language | null => {
  if (!tag) return null;
  const base = tag.toLowerCase().split("-")[0];
  return isLanguage(base) ? base : null;
};

const storedLanguage = (): Language | null => {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(saved) ? saved : null;
  } catch {
    // Private mode / blocked storage — fall through to detection.
    return null;
  }
};

const urlLanguage = (): Language | null => {
  try {
    const param = new URLSearchParams(window.location.search).get("lang");
    return fromLocaleTag(param);
  } catch {
    return null;
  }
};

const browserLanguage = (): Language | null => {
  const tags = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const tag of tags) {
    const match = fromLocaleTag(tag);
    if (match) return match;
  }
  return null;
};

const timezoneLanguage = (): Language | null => {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_LANGUAGE[zone] ?? null;
  } catch {
    return null;
  }
};

/**
 * Resolution order:
 *   1. An explicit choice the visitor already made (localStorage)
 *   2. ?lang= in the URL, so a link can force a language
 *   3. The browser's own language preferences
 *   4. Where the visitor physically is, inferred from their time zone
 *   5. English
 */
export const detectLanguage = (): Language => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  return (
    storedLanguage() ??
    urlLanguage() ??
    browserLanguage() ??
    timezoneLanguage() ??
    DEFAULT_LANGUAGE
  );
};

export const persistLanguage = (language: Language) => {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Nothing to do — the choice just will not survive a reload.
  }
};

export const applyDocumentLanguage = (
  language: Language,
  meta: { title: string; description: string },
) => {
  if (typeof document === "undefined") return;

  document.documentElement.lang = LANGUAGE_META[language].htmlLang;
  document.title = meta.title;

  // Keep the description and the social-card copy in step with the page.
  const selectors = [
    'meta[name="description"]',
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
  ];
  for (const selector of selectors) {
    document.querySelector(selector)?.setAttribute("content", meta.description);
  }
  for (const selector of [
    'meta[property="og:title"]',
    'meta[name="twitter:title"]',
  ]) {
    document.querySelector(selector)?.setAttribute("content", meta.title);
  }
};
