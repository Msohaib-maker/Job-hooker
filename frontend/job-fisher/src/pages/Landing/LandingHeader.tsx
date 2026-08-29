import { useNavigate } from "react-router-dom";
import { PlatformTitle } from "../../components/PlatformTitle";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "../../i18n";

const LandingHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className="w-full px-6 py-5 flex justify-between items-center border-b border-[#262626] bg-[#151515]/95 backdrop-blur-sm sticky top-0 z-30">
      <a
        href="/"
        className="flex items-center gap-2.5"
        aria-label={t("nav.homeAria")}
      >
        <img src="./hook1.png" alt="" className="w-8 h-8 flex-shrink-0" />
        <span className="text-2xl font-bold text-[#EDEDED] tracking-tight">
          <PlatformTitle />
        </span>
      </a>

      <nav className="flex items-center gap-2 sm:gap-4">
        <LanguageSwitcher variant="compact" />
        <a
          href="#open-roles"
          className="hidden sm:inline text-sm font-medium text-[#A1A1AA] hover:text-[#EDEDED] transition-colors px-2"
        >
          {t("nav.browseJobs")}
        </a>
        <button
          onClick={() => navigate("/register")}
          className="text-sm font-medium text-[#A1A1AA] hover:text-[#EDEDED] transition-colors px-2 py-2"
        >
          {t("nav.signIn")}
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-[#10B981] text-[#0F0F0F] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#34D399] transition shadow-[0_0_15px_rgba(16, 185, 129,0.2)] hover:shadow-[0_0_25px_rgba(16, 185, 129,0.4)]"
        >
          {t("nav.getStarted")}
        </button>
      </nav>
    </header>
  );
};

export default LandingHeader;
