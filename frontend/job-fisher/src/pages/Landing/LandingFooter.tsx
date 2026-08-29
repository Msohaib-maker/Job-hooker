import { Link } from "react-router-dom";
import { PlatformTitle } from "../../components/PlatformTitle";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "../../i18n";

const LandingFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-[#262626] bg-[#151515] relative z-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <img src="./hook1.png" alt="" className="w-6 h-6 flex-shrink-0" />
          <span className="text-lg font-bold text-[#EDEDED] tracking-tight">
            <PlatformTitle />
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-[#737373]">
          <a href="#open-roles" className="hover:text-[#EDEDED] transition-colors">
            {t("nav.browseJobs")}
          </a>
          <Link to="/privacy" className="hover:text-[#EDEDED] transition-colors">
            {t("nav.privacy")}
          </Link>
          <Link to="/register" className="hover:text-[#EDEDED] transition-colors">
            {t("nav.getStarted")}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="border-t border-[#262626] py-5 text-center">
        <p className="text-sm text-[#525252]">
          {t("footer.rights", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
