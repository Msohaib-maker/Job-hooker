import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "../../i18n";

const EMBED_LINK =
  "https://embed.app.guidde.com/playbooks/c2QdZyEqEuZDgDWDGULZrB?mode=videoOnly";
const LandingVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t, language } = useTranslation();

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="w-full py-32 px-6 flex flex-col items-center bg-[#0F0F0F] relative border-t border-[#262626] z-10"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full border border-[#262626] bg-[#1A1A1A] text-[#10B981] text-sm font-bold mb-6 tracking-wide"
        >
          {t("video.badge")}
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#EDEDED] mb-6 tracking-tight">
          {t("video.title")}
        </h2>
        <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {t("video.body")}
        </p>
        {/* The tutorial recording is English-only, so say so when the page is not. */}
        {language !== "en" && (
          <p className="mt-3 text-sm text-[#525252]">{t("video.englishOnly")}</p>
        )}
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-6xl rounded-3xl overflow-hidden border border-[#262626] shadow-2xl group cursor-pointer z-10"
      >
        <div className="aspect-video bg-[#151515] relative flex items-center justify-center">
          {isPlaying ? (
            <iframe
              src={EMBED_LINK}
              title={t("video.iframeTitle")}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              onClick={handlePlayVideo}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src="/thumbnail.png"
                alt={t("video.thumbnailAlt")}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-[#10B981] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16, 185, 129,0.3)] group-hover:scale-110 group-hover:bg-[#34D399] transition-all duration-500 cursor-pointer">
                  <Play className="w-10 h-10 text-[#0F0F0F] ml-1 fill-current" />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Floating Aesthetics */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-[#10B981] rounded-full opacity-50 animate-pulse" />
        <div className="absolute bottom-4 right-4 w-16 h-16 bg-[#10B981] rounded-full opacity-50 animate-pulse" />
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#10B981] rounded-full opacity-30 animate-ping" />
      </motion.div>
    </motion.div>
  );
};

export default LandingVideo;
