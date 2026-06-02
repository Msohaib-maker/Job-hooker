import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#C4F029]/5 to-transparent pointer-events-none" />

      <div className="flex flex-col justify-center p-8 md:p-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-[#EDEDED]">
            Smart Applying
            <br />
            <span className="text-[#C4F029]">Powered by AI</span>
          </h1>

          <p className="mt-6 max-w-xl text-xl text-[#A1A1AA] leading-relaxed">
            Match with verified employers and opportunities tailored to your
            skills. Get custom cover letters, resumes and interview
            preparations questionarire with us.
          </p>

          <ul className="mt-10 space-y-4">
            {[
              "AI-driven job matching",
              "Real-time verified openings",
              "Zero spam, full privacy",
              "Custom Cover letters and CVs",
              "Job Scores for smart applying",
              "Telegram and Email Linkup",
            ].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 group bg-[#151515] border border-[#262626] p-4 rounded-xl max-w-md hover:border-[#C4F029]/50 transition-colors"
              >
                <div className="flex-shrink-0 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#C4F029]" />
                </div>
                <span className="text-lg font-medium tracking-wide text-[#EDEDED] group-hover:text-white transition-colors">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => navigate('/register')}
            className="mt-12 bg-[#C4F029] text-[#0F0F0F] text-xl font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(196,240,41,0.3)] hover:shadow-[0_0_30px_rgba(196,240,41,0.5)] hover:bg-[#D4FF39] transition flex items-center gap-2 group"
          >
            Start For Free
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Abstract Illustration - 3D Spinning Glow */}
      <div className="hidden lg:flex items-center justify-center p-16 relative z-10">
        <div
          className="w-[420px] h-[420px] relative transition-transform duration-700 ease-out"
          style={{
            perspective: "900px",
            animation: "bob 6s ease-in-out infinite",
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(52deg) rotateY(-18deg)",
              transition: "transform 0.8s ease",
            }}
          >
            {/* Glow layers */}
            <div className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[300px] h-[300px] bg-[#C4F029]/[.07] blur-[70px]"
              style={{ animation: "pulse 4s ease-in-out infinite" }} />
            <div className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[180px] h-[180px] bg-[#C4F029]/[.18] blur-[40px]"
              style={{ animation: "pulse2 3s ease-in-out infinite 0.6s" }} />
            <div className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[90px] h-[90px] bg-[#deff6e]/[.35] blur-[20px]"
              style={{ animation: "pulse 2.5s ease-in-out infinite 1s" }} />

            {/* Outer static ring */}
            <div className="absolute rounded-full border border-[#C4F029]/[.12]"
              style={{ width: 380, height: 380, top: "50%", left: "50%", marginTop: -190, marginLeft: -190 }} />

            {/* Mid spinning ring + planets */}
            <div className="absolute rounded-full border-[1.5px] border-[#C4F029]/[.28] shadow-[0_0_30px_rgba(196,240,41,0.1)]"
              style={{
                width: 300, height: 300, top: "50%", left: "50%", marginTop: -150, marginLeft: -150,
                animation: "spin 14s linear infinite"
              }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[22px] h-[22px] bg-[#C4F029] rounded-full
        shadow-[0_0_28px_10px_rgba(196,240,41,0.55),0_0_8px_2px_rgba(196,240,41,0.9)]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
        w-[14px] h-[14px] bg-[#C4F029]/75 rounded-full
        shadow-[0_0_18px_7px_rgba(196,240,41,0.4)]" />
            </div>

            {/* Inner counter-spinning ring */}
            <div className="absolute rounded-full border border-[#C4F029]/[.18]"
              style={{
                width: 210, height: 210, top: "50%", left: "50%", marginTop: -105, marginLeft: -105,
                animation: "spin 22s linear infinite reverse"
              }}>
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2
        w-[10px] h-[10px] bg-[#d8ff50]/60 rounded-full
        shadow-[0_0_12px_5px_rgba(196,240,41,0.35)]" />
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2
        w-[7px] h-[7px] bg-[#C4F029]/50 rounded-full
        shadow-[0_0_8px_3px_rgba(196,240,41,0.3)]" />
            </div>

            {/* Tiny innermost ring */}
            <div className="absolute rounded-full border border-[#C4F029]/[.12]"
              style={{
                width: 130, height: 130, top: "50%", left: "50%", marginTop: -65, marginLeft: -65,
                animation: "spin 35s linear infinite"
              }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[6px] h-[6px] bg-[#eeff99]/45 rounded-full
        shadow-[0_0_6px_2px_rgba(196,240,41,0.25)]" />
            </div>

            {/* Core */}
            <div className="absolute rounded-full border border-[#C4F029]/35 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
              style={{ width: 64, height: 64 }} />
            <div className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-5 h-5 bg-[#C4F029]"
              style={{ boxShadow: "0 0 40px 16px rgba(196,240,41,0.5), 0 0 12px 4px rgba(196,240,41,0.9)" }} />

            {/* Twinkling stars */}
            {[
              [22, 18, 2.1, 0], [72, 25, 3.4, .4], [80, 65, 1.8, .9], [15, 70, 2.7, 1.2],
              [55, 82, 3.1, .2], [38, 10, 2.4, .7], [88, 42, 1.9, 1.5], [10, 45, 3.8, .3],
            ].map(([l, t, dur, del], i) => (
              <div key={i} className="absolute rounded-full bg-[#C4F029]"
                style={{
                  width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2, left: `${l}%`, top: `${t}%`,
                  animation: `twinkle ${dur}s linear infinite ${del}s`
                }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
