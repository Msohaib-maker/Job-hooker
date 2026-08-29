import { useContext } from "react";
import { I18nContext } from "./context";

/**
 * `const { t, language, setLanguage } = useTranslation();`
 * `t("jobs.emptyTitle")` — `t("jobs.postedDaysAgo", { count: 3 })`
 */
export const useTranslation = () => useContext(I18nContext);
