---
tags: [frontend, i18n]
---

# Internationalization

`src/i18n/` — English, Chinese (`zh`), French (`fr`). English (`translations/en.ts`) is the type reference; `zh.ts`/`fr.ts` are typed `: Translation`, so a missing or misspelled key is a **compile error**.

## Files

| file | purpose |
|---|---|
| `languages.ts` | `LANGUAGES` tuple, `LANGUAGE_META` (locale tag, native name, short code) |
| `detect.ts` | language resolution + persistence + document `<title>`/meta sync |
| `context.ts` | `I18nContext`, `TranslationKey` type (dotted `section.key` paths, derived from `en.ts`), `t()` resolution with English fallback |
| `I18nProvider.tsx` | wraps the app (outermost provider in `App.tsx`), holds active language state |
| `useTranslation.ts` | `const { t, language, setLanguage, locale, formatNumber, formatDate } = useTranslation()` |
| `translations/{en,zh,fr}.ts` | the dictionaries |

## Language detection (`detect.ts`)

Resolution order, first match wins:
1. `localStorage["jobhooker_language"]` — a returning visitor's explicit choice always wins
2. `?lang=` URL param
3. `navigator.languages` (browser preference)
4. **Time zone** — `Intl.DateTimeFormat().resolvedOptions().timeZone` mapped against `CHINA_TIMEZONES`/`FRANCE_TIMEZONES` lists. This is the fallback that makes someone physically in China see Chinese even on an English-language browser, with no geo-IP network call.
   - Chinese time zones are mainland-only (Hong Kong/Macau/Taiwan excluded — they read Traditional Chinese, which isn't shipped, so they fall through to their browser locale instead)
   - French includes metropolitan France + overseas départements/territories
5. English

## Usage pattern

```tsx
const { t, formatNumber } = useTranslation();
t("jobs.emptyTitle")
t("jobs.postedDaysAgo", { count: 3 })   // {{count}} interpolation
formatNumber(4231)                       // locale-aware — "4,231" / "4 231" / "4,231"
```

`TranslationKey` is a flattened `"section.key"` union type — the dictionary is deliberately two levels deep (not arbitrarily nested) specifically to keep this a plain mapped type rather than a recursive one, which was hitting `TS2589: Type instantiation is excessively deep`.

## What's deliberately NOT translated

The tutorial video embed (`LandingVideo`) stays English-only — a `video.englishOnly` string surfaces this to non-English viewers rather than pretending otherwise. Job listing content (titles, descriptions from the scraper) is also not translated — only the UI chrome around it.

## LanguageSwitcher

`src/components/LanguageSwitcher.tsx` — globe icon + current language + chevron, dropdown menu with a checkmark on the active language. Used in the landing header/footer, register page, privacy page, and dashboard sidebar (`FeedList`). `variant="compact"` shows just the short code (used in tight header spots).
