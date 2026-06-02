import { Play } from "lucide-react";
import { motion } from "framer-motion";

const LandingVideo = () => {
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
          className="inline-block px-4 py-1.5 rounded-full border border-[#262626] bg-[#1A1A1A] text-[#C4F029] text-sm font-bold mb-6 tracking-wide"
        >
          TUTORIAL
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#EDEDED] mb-6 tracking-tight">
          See how it works
        </h2>
        <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Watch our quick 2-minute tutorial to understand how AI finds the perfect opportunities for you with zero spam.
        </p>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-[#262626] shadow-2xl group cursor-pointer z-10"
      >
        {/* Dummy video wrapper */}
        <div className="aspect-video bg-[#151515] relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

          {/* Play button overlay */}
          <div className="relative z-10 w-24 h-24 bg-[#C4F029] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(196,240,41,0.3)] group-hover:scale-110 group-hover:bg-[#D4FF39] transition-all duration-500">
            <Play className="w-10 h-10 text-[#0F0F0F] ml-1 fill-current" />
          </div>

          {/* Dummy Time badge */}
          <div className="absolute bottom-6 right-6 bg-[#1A1A1A]/90 border border-[#262626] backdrop-blur-md px-3 py-1.5 rounded-lg text-[#EDEDED] text-sm font-medium">
            2:14
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LandingVideo;
