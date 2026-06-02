import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  UserPlus,
  Mail,
  ShieldCheck,
  Loader2,
  ArrowLeft,
  Briefcase,
  Zap,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";
import { PlatformTitle } from "../../components/PlatformTitle";

const Register = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const { verifyEmail, otpVerify } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const data = await verifyEmail(email);
      if (data.token) { navigate("/dashboard"); return; }
      setOtpSent(true);
    } catch {
      setError("Failed to send verification email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await otpVerify(email, otp);
      navigate("/dashboard");
    } catch {
      setError("Invalid or expired OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex font-sans overflow-hidden">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between p-12 bg-[#111111] border-r border-[#262626] overflow-hidden">
        {/* background glow */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#C4F029]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#C4F029]/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <span className=" font-extrabold text-2xl tracking-tight"><PlatformTitle /></span>
          </Link>
        </div>

        {/* Center illustration */}
        <div className="relative z-10 flex flex-col items-start gap-10">
          {/* Mock job cards */}
          <div className="w-full max-w-sm flex flex-col gap-3">
            {[
              { title: "Senior React Developer", company: "Stripe", score: 9 },
              { title: "Frontend Engineer", company: "Vercel", score: 8 },
              { title: "Full Stack Engineer", company: "Linear", score: 7 },
            ].map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex items-center justify-between bg-[#151515] border border-[#262626] rounded-xl px-4 py-3"
              >
                <div>
                  <p className="text-[#EDEDED] text-sm font-semibold">{job.title}</p>
                  <p className="text-[#737373] text-xs mt-0.5">{job.company}</p>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded bg-[#C4F029]/15 text-[#C4F029]">
                  {job.score}/10
                </span>
              </motion.div>
            ))}
          </div>

          {/* Feature pills */}
          <div className="flex flex-col gap-4">
            {[
              { icon: Zap, text: "AI scores every job against your profile" },
              { icon: Bell, text: "Instant Telegram & email alerts" },
              { icon: Briefcase, text: "Custom CVs and cover letters per role" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-3 text-[#A1A1AA] text-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C4F029]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#C4F029]" />
                </div>
                {text}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <div className="relative z-10">
          <p className="text-[#525252] text-xs leading-relaxed max-w-xs">
            "JobHooker helped me land interviews at 3 top companies within a week."
          </p>
          <p className="text-[#3f3f3f] text-xs mt-2">— Early beta user</p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C4F029]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Back link (mobile only — desktop has logo on left) */}
        <Link
          to="/"
          className="lg:hidden absolute top-8 left-8 text-[#A1A1AA] hover:text-[#C4F029] flex items-center gap-2 transition group z-20"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md z-10"
        >
          <div className="relative bg-[#151515] rounded-3xl p-10 border border-[#262626] shadow-2xl shadow-black/50">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-[#C4F029]" />
              </div>
              <h2 className="text-3xl font-bold text-[#EDEDED]">Welcome aboard</h2>
              <p className="text-sm text-[#A1A1AA] mt-2">
                {otpSent ? "Enter the OTP sent to your email" : "Put your Email in the box"}
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-5 p-3 rounded-xl border border-red-900/50 bg-red-900/20 text-red-400 text-sm text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            {!otpSent && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSendOtp}
                className="space-y-6"
              >
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373] w-5 h-5 group-focus-within:text-[#C4F029] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email address"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#1A1A1A] border border-[#262626]
                    text-[#EDEDED] placeholder:text-[#737373]
                    focus:outline-none focus:border-[#C4F029] focus:ring-1 focus:ring-[#C4F029] transition-all shadow-inner"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 rounded-xl bg-[#C4F029] text-[#0F0F0F] font-bold text-lg
                  shadow-[0_0_15px_rgba(196,240,41,0.2)]
                  hover:shadow-[0_0_25px_rgba(196,240,41,0.4)] hover:bg-[#D4FF39]
                  transition-all flex items-center justify-center gap-2
                  disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : "Register"}
                </motion.button>

                <div className="flex flex-col items-center gap-2 mt-6">

                  <p className="text-center text-xs text-[#52525B]">
                    By continuing, you agree to our{" "}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#C4F029] hover:underline font-medium">
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </motion.form>
            )}

            {otpSent && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleVerifyOtp}
                className="space-y-6"
              >
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373] w-5 h-5 group-focus-within:text-[#C4F029] transition-colors" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="Enter OTP"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#1A1A1A] border border-[#262626]
                    text-[#EDEDED] tracking-widest text-lg font-bold
                    focus:outline-none focus:border-[#C4F029] focus:ring-1 focus:ring-[#C4F029] transition-all shadow-inner"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 rounded-xl font-bold text-[#0F0F0F] text-lg bg-[#C4F029]
                  shadow-[0_0_15px_rgba(196,240,41,0.2)]
                  hover:shadow-[0_0_25px_rgba(196,240,41,0.4)] hover:bg-[#D4FF39]
                  transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying</> : "Verify OTP"}
                </motion.button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-sm text-[#A1A1AA] hover:text-[#C4F029] transition font-medium"
                >
                  ← Change email
                </button>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;