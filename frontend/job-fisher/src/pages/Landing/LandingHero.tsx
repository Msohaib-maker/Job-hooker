import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "../../i18n";
import type { TranslationKey } from "../../i18n";

const PLATFORMS = [
  {
    name: "Upwork",
    logo: "/upwork.png",
    metaKey: "hero.metaUpwork" as TranslationKey,
    accent: "20, 168, 0",
    float: "tileFloatA 6s ease-in-out infinite",
  },
  {
    name: "Fiverr",
    logo: "/fiverr.png",
    metaKey: "hero.metaFiverr" as TranslationKey,
    accent: "29, 191, 115",
    float: "tileFloatB 7s ease-in-out infinite 0.4s",
  },
  {
    name: "Y Combinator",
    logo: "/YC.png",
    metaKey: "hero.metaYC" as TranslationKey,
    accent: "255, 102, 0",
    float: "tileFloatB 6.5s ease-in-out infinite 0.9s",
  },
  {
    name: "LinkedIn",
    logo: "/linkedIn.png",
    metaKey: "hero.metaLinkedIn" as TranslationKey,
    accent: "10, 102, 194",
    float: "tileFloatA 7.5s ease-in-out infinite 0.2s",
  },
  {
    name: "Indeed",
    logo: "/indeed.png",
    metaKey: "hero.metaIndeed" as TranslationKey,
    accent: "64, 100, 172",
    float: "tileFloatA 6.8s ease-in-out infinite 1.1s",
  },
  {
    name: "Glassdoor",
    logo: "/glassdoor.png",
    metaKey: "hero.metaGlassdoor" as TranslationKey,
    accent: "12, 170, 65",
    float: "tileFloatB 8s ease-in-out infinite 0.6s",
  },
];

const LandingHero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const bullets: TranslationKey[] = [
    "hero.bulletFeed",
    "hero.bulletScores",
    "hero.bulletDocuments",
    "hero.bulletAlerts",
    "hero.bulletInterview",
  ];

  return (
    <section className="flex-1 px-6 sm:px-10 lg:px-16 xl:px-20 mt-8 md:mt-12 pb-10 md:pb-14">
      {/* Glass frame */}
      <div
        className="h-full grid grid-cols-1 lg:grid-cols-2 relative rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(16, 185, 129,0.035) 45%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.25), 0 24px 70px rgba(0,0,0,0.45)",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#10B981]/5 to-transparent pointer-events-none" />

        <div className="flex flex-col justify-center p-8 md:p-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-[#EDEDED]">
              {t("hero.titleLine1")}
              <br />
              <span className="text-[#10B981]">{t("hero.titleLine2")}</span>
            </h1>

            <p className="mt-6 max-w-xl text-xl text-[#A1A1AA] leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <ul className="mt-10 space-y-4">
              {bullets.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 group bg-[#151515]/70 border border-[#262626] p-4 rounded-xl max-w-md hover:border-[#10B981]/50 transition-colors backdrop-blur-sm"
                >
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <span className="text-lg font-medium tracking-wide text-[#EDEDED] group-hover:text-white transition-colors">
                    {t(item)}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                onClick={() => navigate("/register")}
                className="bg-[#10B981] text-[#0F0F0F] text-xl font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(16, 185, 129,0.3)] hover:shadow-[0_0_30px_rgba(16, 185, 129,0.5)] hover:bg-[#34D399] transition flex items-center justify-center gap-2 group"
              >
                {t("hero.ctaPrimary")}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#open-roles"
                className="text-xl font-bold py-4 px-8 rounded-xl border border-[#262626] bg-[#151515]/70 text-[#EDEDED] hover:border-[#10B981]/50 transition flex items-center justify-center text-center backdrop-blur-sm"
              >
                {t("hero.ctaSecondary")}
              </a>
            </motion.div>

            <p className="mt-5 text-sm text-[#525252]">
              {t("hero.noCard")}
            </p>
          </motion.div>
        </div>

        {/* Right panel — animated platform tiles */}
        <div className="hidden lg:flex flex-col justify-center p-16 relative z-10">
          {/* Ambient glow behind the tiles */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(16, 185, 129,0.12) 0%, rgba(16, 185, 129,0.03) 55%, transparent 75%)",
              animation: "breathe 6s ease-in-out infinite",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative flex items-center gap-2.5 mb-6"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0 animate-pulse"
              style={{ boxShadow: "0 0 10px rgba(16, 185, 129,0.7)" }}
            />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1AA]">
              {t("hero.boardsLabel")}
            </span>
          </motion.div>

          <div className="relative grid grid-cols-2 gap-4">
            {PLATFORMS.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 26, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.5 + index * 0.09,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <div
                  className="group relative rounded-2xl p-4 overflow-hidden border border-white/10 hover:border-[#10B981]/40 transition-colors duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(16, 185, 129,0.035) 50%, rgba(255,255,255,0.03) 100%)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 28px rgba(0,0,0,0.35)",
                    animation: platform.float,
                  }}
                >
                  {/* Brand glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 20% 0%, rgba(${platform.accent},0.22) 0%, transparent 65%)`,
                    }}
                  />

                  {/* Glass sheen sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.14) 50%, transparent 65%)",
                      backgroundSize: "250% 100%",
                      animation: `sheen 5.5s ease-in-out infinite ${index * 0.7}s`,
                    }}
                  />

                  <div className="relative flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={platform.logo}
                        alt={`${platform.name} logo`}
                        loading="lazy"
                        className="w-full h-full object-contain p-1.5 rounded-lg transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#EDEDED] truncate">
                        {platform.name}
                      </div>
                      <div className="text-xs text-[#737373] truncate">
                        {t(platform.metaKey)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="relative mt-6 text-xs text-[#525252]"
          >
            {t("hero.moreBoards")}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
