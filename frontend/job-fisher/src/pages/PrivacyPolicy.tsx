import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "../i18n";
import type { TranslationKey } from "../i18n";

const CONTACT_EMAIL = "cool69731@gmail.com";

const PrivacyPolicy = (): ReactElement => {
  const { t } = useTranslation();

  const personalItems: TranslationKey[] = [
    "privacy.personalEmail",
    "privacy.personalName",
    "privacy.personalAuth",
  ];
  const usageItems: TranslationKey[] = [
    "privacy.usageDevice",
    "privacy.usageBrowser",
    "privacy.usageIp",
    "privacy.usagePages",
    "privacy.usageTime",
  ];
  const useItems: TranslationKey[] = [
    "privacy.useProvide",
    "privacy.useAuth",
    "privacy.useImprove",
    "privacy.useCommunicate",
    "privacy.useFraud",
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-200">
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#10B981] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("nav.backToSite")}
        </Link>
        <LanguageSwitcher />
      </div>

      <h1 className="text-3xl font-bold mb-2">{t("privacy.title")}</h1>
      <p className="text-sm text-gray-400 mb-8">{t("privacy.lastUpdated")}</p>

      <section className="space-y-6">
        <p>{t("privacy.intro")}</p>

        <h2 className="text-xl font-semibold">{t("privacy.collectHeading")}</h2>

        <h3 className="font-semibold">{t("privacy.personalHeading")}</h3>
        <ul className="list-disc pl-6 space-y-1">
          {personalItems.map((item) => (
            <li key={item}>{t(item)}</li>
          ))}
        </ul>

        <h3 className="font-semibold">{t("privacy.usageHeading")}</h3>
        <ul className="list-disc pl-6 space-y-1">
          {usageItems.map((item) => (
            <li key={item}>{t(item)}</li>
          ))}
        </ul>

        <h3 className="font-semibold">{t("privacy.cookiesHeading")}</h3>
        <p>{t("privacy.cookiesBody")}</p>

        <h2 className="text-xl font-semibold">{t("privacy.useHeading")}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {useItems.map((item) => (
            <li key={item}>{t(item)}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold">{t("privacy.sharingHeading")}</h2>
        <p>{t("privacy.sharingBody")}</p>

        <h2 className="text-xl font-semibold">{t("privacy.securityHeading")}</h2>
        <p>{t("privacy.securityBody")}</p>

        <h2 className="text-xl font-semibold">
          {t("privacy.retentionHeading")}
        </h2>
        <p>{t("privacy.retentionBody")}</p>

        <h2 className="text-xl font-semibold">{t("privacy.rightsHeading")}</h2>
        <p>{t("privacy.rightsBody")}</p>

        <h2 className="text-xl font-semibold">{t("privacy.childrenHeading")}</h2>
        <p>{t("privacy.childrenBody")}</p>

        <h2 className="text-xl font-semibold">{t("privacy.changesHeading")}</h2>
        <p>{t("privacy.changesBody")}</p>

        <h2 className="text-xl font-semibold">{t("privacy.contactHeading")}</h2>
        <p>
          {t("privacy.contactBody")}
          <br />
          <span className="font-medium">{CONTACT_EMAIL}</span>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
