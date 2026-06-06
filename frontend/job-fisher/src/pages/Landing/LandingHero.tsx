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
            skills. Get custom cover letters, resumes and interview preparations
            questionarire with us.
          </p>

          <ul className="mt-10 space-y-4">
            {[
              "AI-driven job matching",
              "Real-time verified openings",
              "Custom Cover letters, CVs and Upwork Proposals",
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
            onClick={() => navigate("/register")}
            className="mt-12 bg-[#C4F029] text-[#0F0F0F] text-xl font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(196,240,41,0.3)] hover:shadow-[0_0_30px_rgba(196,240,41,0.5)] hover:bg-[#D4FF39] transition flex items-center gap-2 group"
          >
            Start For Free
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Abstract Illustration - 3D Spinning Glow */}
      {/* Right panel */}
      <div className="hidden lg:flex items-center justify-center p-16 relative z-10">
        <div
          className="w-[420px] h-[420px] relative flex items-center justify-center"
          style={{ animation: "bob 6s ease-in-out infinite" }}
        >
          {/* Glow layers */}
          <div
            className="absolute w-[320px] h-[320px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(196,240,41,0.18) 0%, rgba(196,240,41,0.04) 55%, transparent 75%)",
              animation: "breathe 4s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[190px] h-[190px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(196,240,41,0.35) 0%, rgba(196,240,41,0.08) 50%, transparent 75%)",
              animation: "breathe 3s ease-in-out infinite 0.6s",
            }}
          />

          {/* Static outer ring */}
          <div className="absolute w-[380px] h-[380px] rounded-full border border-[#C4F029]/[.08]" />

          {/* Spinning rings */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full border-[1.5px] border-[#C4F029]/[.22]"
            style={{
              boxShadow: "0 0 20px rgba(196,240,41,0.06)",
              animation: "spin 14s linear infinite",
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-[#C4F029] rounded-full"
              style={{
                boxShadow:
                  "0 0 28px 10px rgba(196,240,41,0.55), 0 0 8px 2px rgba(196,240,41,0.9)",
              }}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[14px] h-[14px] bg-[#C4F029]/75 rounded-full"
              style={{ boxShadow: "0 0 18px 7px rgba(196,240,41,0.4)" }}
            />
          </div>

          <div
            className="absolute w-[210px] h-[210px] rounded-full border border-[#C4F029]/[.15]"
            style={{ animation: "spin 22s linear infinite reverse" }}
          >
            <div
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-[#D8FF50]/60 rounded-full"
              style={{ boxShadow: "0 0 12px 5px rgba(196,240,41,0.35)" }}
            />
            <div
              className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-[7px] h-[7px] bg-[#C4F029]/50 rounded-full"
              style={{ boxShadow: "0 0 8px 3px rgba(196,240,41,0.3)" }}
            />
          </div>

          <div
            className="absolute w-[130px] h-[130px] rounded-full border border-[#C4F029]/[.12]"
            style={{ animation: "spin 35s linear infinite" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-[#EEFF99]/45 rounded-full" />
          </div>

          {/* Glass orb */}
          <div
            className="absolute w-[200px] h-[200px] rounded-full overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(196,240,41,0.06) 40%, rgba(196,240,41,0.02) 70%, rgba(255,255,255,0.04) 100%)",
              border: "1px solid rgba(196,240,41,0.20)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 60px rgba(196,240,41,0.12), 0 0 120px rgba(196,240,41,0.06)",
            }}
          >
            {/* Glare */}
            <div
              className="absolute top-[12%] left-[18%] w-[35%] h-[20%] rounded-full -rotate-[20deg]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* Core */}
          <div className="absolute w-16 h-16 rounded-full border border-[#C4F029]/35" />
          <div
            className="absolute w-5 h-5 rounded-full bg-[#C4F029]"
            style={{
              boxShadow:
                "0 0 0 6px rgba(196,240,41,0.15), 0 0 40px 16px rgba(196,240,41,0.5), 0 0 12px 4px rgba(196,240,41,0.9)",
              animation: "core-pulse 2s ease-in-out infinite",
            }}
          />

          {/* Floating glass cards */}
          {/* Match score card */}
          <div
            className="absolute top-[30px] right-[-20px] flex items-center gap-2 px-3 py-2.5 rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(196,240,41,0.04) 50%, rgba(255,255,255,0.03) 100%)",
              border: "0.5px solid rgba(196,240,41,0.18)",
              backdropFilter: "blur(8px)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 24px rgba(0,0,0,0.3)",
              animation: "floatA 5s ease-in-out infinite",
              minWidth: 140,
            }}
          >
            <div
              className="w-2 h-2 rounded-full bg-[#C4F029] flex-shrink-0"
              style={{ boxShadow: "0 0 6px rgba(196,240,41,0.6)" }}
            />
            <div>
              <div className="text-[11px] font-medium text-[#EDEDED]">
                98 match score
              </div>
              <div className="text-[10px] text-[#737373]">
                React · TypeScript
              </div>
            </div>
          </div>

          {/* Cover letter card */}
          <div
            className="absolute bottom-[48px] left-[-24px] flex items-center gap-2 px-3 py-2.5 rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(196,240,41,0.04) 50%, rgba(255,255,255,0.03) 100%)",
              border: "0.5px solid rgba(196,240,41,0.18)",
              backdropFilter: "blur(8px)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 24px rgba(0,0,0,0.3)",
              animation: "floatB 6s ease-in-out infinite 1s",
              minWidth: 130,
            }}
          >
            <div
              className="w-2 h-2 rounded-full bg-[#4A9EFF] flex-shrink-0"
              style={{ boxShadow: "0 0 6px rgba(74,158,255,0.6)" }}
            />
            <div>
              <div className="text-[11px] font-medium text-[#EDEDED]">
                Cover letter ready
              </div>
              <div className="text-[10px] text-[#737373]">
                AI-generated · 0.3s
              </div>
            </div>
          </div>

          {/* Jobs card */}
          <div
            className="absolute bottom-[10px] right-[-10px] flex items-center gap-2 px-3 py-2.5 rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(196,240,41,0.04) 50%, rgba(255,255,255,0.03) 100%)",
              border: "0.5px solid rgba(196,240,41,0.18)",
              backdropFilter: "blur(8px)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 24px rgba(0,0,0,0.3)",
              animation: "floatA 7s ease-in-out infinite 2s",
              minWidth: 120,
            }}
          >
            <div
              className="w-2 h-2 rounded-full bg-[#F0A030] flex-shrink-0"
              style={{ boxShadow: "0 0 6px rgba(240,160,48,0.6)" }}
            />
            <div>
              <div className="text-[11px] font-medium text-[#EDEDED]">
                12 new jobs
              </div>
              <div className="text-[10px] text-[#737373]">
                Remote · &gt;$60/hr
              </div>
            </div>
          </div>

          {/* Stars */}
          {(
            [
              [22, 18, 2.1, 0],
              [72, 25, 3.4, 0.4],
              [80, 65, 1.8, 0.9],
              [15, 70, 2.7, 1.2],
              [55, 82, 3.1, 0.2],
              [38, 10, 2.4, 0.7],
              [88, 42, 1.9, 1.5],
              [10, 45, 3.8, 0.3],
            ] as [number, number, number, number][]
          ).map(([l, t, dur, del], i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#C4F029]"
              style={{
                width: i % 3 === 0 ? 3 : 2,
                height: i % 3 === 0 ? 3 : 2,
                left: `${l}%`,
                top: `${t}%`,
                animation: `twinkle ${dur}s linear infinite ${del}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
