import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  I18nContext,
  I18nValue,
  TranslationKey,
  TranslationVars,
  resolve,
} from "./context";
import { applyDocumentLanguage, detectLanguage, persistLanguage } from "./detect";
import { Language, LANGUAGE_META } from "./languages";
import { Translation } from "./translations/en";
import { en } from "./translations/en";
import { fr } from "./translations/fr";
import { zh } from "./translations/zh";

const DICTIONARIES: Record<Language, Translation> = { en, zh, fr };

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  useEffect(() => {
    const { meta } = DICTIONARIES[language];
    applyDocumentLanguage(language, meta);
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    persistLanguage(next);
    setLanguageState(next);
  }, []);

  const value = useMemo<I18nValue>(() => {
    const dictionary = DICTIONARIES[language];
    const locale = LANGUAGE_META[language].locale;

    return {
      language,
      setLanguage,
      locale,
      t: (key: TranslationKey, vars?: TranslationVars) =>
        resolve(dictionary, key, vars),
      formatNumber: (val: number, options?: Intl.NumberFormatOptions) =>
        new Intl.NumberFormat(locale, options).format(val),
      formatDate: (
        val: Date | string | number,
        options?: Intl.DateTimeFormatOptions,
      ) =>
        new Intl.DateTimeFormat(locale, options).format(
          val instanceof Date ? val : new Date(val),
        ),
    };
  }, [language, setLanguage]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
