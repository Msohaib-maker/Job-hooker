import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Mail,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Zap,
  Bell,
  FileText,
  ShieldCheck,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PlatformTitle } from "../../components/PlatformTitle";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;

const SOURCES = [
  { name: "Upwork", logo: "/upwork.png" },
  { name: "Y Combinator", logo: "/YC.png" },
  { name: "LinkedIn", logo: "/linkedIn.png" },
  { name: "Fiverr", logo: "/fiverr.png" },
  { name: "Indeed", logo: "/indeed.png" },
  { name: "Glassdoor", logo: "/glassdoor.png" },
];

const VALUE_PROPS = [
  {
    icon: Zap,
    text: "Every role scored against your profile before you read it",
  },
  {
    icon: FileText,
    text: "Cover letters, CVs and proposals drafted per opening",
  },
  { icon: Bell, text: "Instant Telegram and email alerts on new matches" },
];

const maskEmail = (email: string) => {
  const [user, domain] = email.split("@");
  if (!domain) return email;
  const head = user.slice(0, 2);
  return `${head}${"•".repeat(Math.max(user.length - 2, 1))}@${domain}`;
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const { verifyEmail, otpVerify } = useAuth();
  const navigate = useNavigate();

  const code = useMemo(() => digits.join(""), [digits]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = window.setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearInterval(id);
  }, [cooldown]);

  useEffect(() => {
    if (otpSent) inputsRef.current[0]?.focus();
  }, [otpSent]);

  const sendOtp = async (resend = false) => {
    setError("");
    setIsLoading(true);
    try {
      const data = await verifyEmail(email);
      if (data.token) {
        navigate("/dashboard");
        return;
      }
      if (resend) setDigits(Array(OTP_LENGTH).fill(""));
      setOtpSent(true);
      setCooldown(RESEND_COOLDOWN);
    } catch {
      setError(
        "We could not send that email. Check the address and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (value: string) => {
    if (value.length !== OTP_LENGTH || isLoading) return;
    setError("");
    setIsLoading(true);
    try {
      await otpVerify(email, value);
      navigate("/dashboard");
    } catch {
      setError("That code is invalid or has expired. Request a new one.");
      setDigits(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigitChange = (index: number, raw: string) => {
    const value = raw.replace(/\D/g, "");

    if (!value) {
      setDigits((prev) => prev.map((d, i) => (i === index ? "" : d)));
      return;
    }

    // Typing or pasting several digits at once fills forward from this box.
    const next = [...digits];
    value.split("").forEach((char, offset) => {
      if (index + offset < OTP_LENGTH) next[index + offset] = char;
    });
    setDigits(next);

    const landed = Math.min(index + value.length, OTP_LENGTH - 1);
    inputsRef.current[landed]?.focus();

    if (!next.includes("")) {
      void verifyCode(next.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      e.preventDefault();
      setDigits((prev) => prev.map((d, i) => (i === index - 1 ? "" : d)));
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const resetToEmail = () => {
    setOtpSent(false);
    setError("");
    setDigits(Array(OTP_LENGTH).fill(""));
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex font-sans">
      {/* ── Brand panel ── */}
      <div className="hidden lg:flex w-[38%] xl:w-[34%] max-w-[480px] relative flex-col justify-between p-10 xl:p-12 bg-[#111111] border-r border-[#262626] overflow-hidden">
        <div className="absolute -top-32 -left-28 w-[420px] h-[420px] bg-[#10B981]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#059669]/10 rounded-full blur-[90px] pointer-events-none" />

        <Link
          to="/"
          className="relative z-10 flex items-center gap-2.5 w-fit"
          aria-label="JobHooker home"
        >
          <img src="/hook1.png" alt="" className="w-8 h-8" />
          <span className="font-extrabold text-2xl tracking-tight text-[#EDEDED]">
            <PlatformTitle />
          </span>
        </Link>

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[2rem] xl:text-[2.375rem] font-extrabold leading-[1.12] tracking-tight text-[#EDEDED] [text-wrap:balance]"
          >
            One inbox for{" "}
            <span className="text-[#10B981]">every opening</span> worth your
            time.
          </motion.h1>

          <p className="mt-9 mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#737373]">
            Pulling from
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SOURCES.map((source, i) => (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.35 }}
                className="flex items-center gap-2.5 min-w-0 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08]"
              >
                <img
                  src={source.logo}
                  alt=""
                  className="w-5 h-5 shrink-0 object-contain rounded"
                />
                <span className="text-xs font-medium text-[#A1A1AA] truncate">
                  {source.name}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3.5">
            {VALUE_PROPS.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 text-[#A1A1AA] text-[13px] leading-relaxed"
              >
                <div className="w-7 h-7 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <span className="pt-[3px]">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <figure className="relative z-10 border-l-2 border-[#10B981]/40 pl-4">
          <blockquote className="text-[#A1A1AA] text-[13px] leading-relaxed">
            JobHooker helped me land interviews at three top companies inside a
            week.
          </blockquote>
          <figcaption className="text-[#525252] text-xs mt-2">
            — Early beta user
          </figcaption>
        </figure>
      </div>

      {/* ── Auth panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#10B981]/[0.07] rounded-full blur-[110px] pointer-events-none" />

        <Link
          to="/"
          className="lg:hidden absolute top-8 left-6 text-[#A1A1AA] hover:text-[#10B981] flex items-center gap-2 transition group z-20 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to site
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-[420px] z-10"
        >
          <div
            className="relative rounded-3xl p-8 sm:p-10 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(16,185,129,0.03) 50%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(18px) saturate(140%)",
              WebkitBackdropFilter: "blur(18px) saturate(140%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.10), 0 24px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/25 flex items-center justify-center mb-5">
                {otpSent ? (
                  <KeyRound className="w-5 h-5 text-[#10B981]" />
                ) : (
                  <Mail className="w-5 h-5 text-[#10B981]" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-[#EDEDED] tracking-tight">
                {otpSent ? "Check your inbox" : "Sign in or create an account"}
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">
                {otpSent ? (
                  <>
                    We sent a {OTP_LENGTH}-digit code to{" "}
                    <span className="text-[#EDEDED] font-medium">
                      {maskEmail(email)}
                    </span>
                    . It expires in a few minutes.
                  </>
                ) : (
                  "One email address is all it takes — no password to remember."
                )}
              </p>
            </div>

            <AnimatePresence initial={false}>
              {error && (
                <motion.div
                  key={error}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  role="alert"
                  className="overflow-hidden"
                >
                  <div className="mb-5 flex items-start gap-2.5 p-3 rounded-xl border border-red-900/50 bg-red-950/40 text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!otpSent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void sendOtp();
                }}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#A1A1AA] mb-4"
                  >
                    Email address
                  </label>

                  <div className="relative group">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 shrink-0 text-[#8A8A8A] group-focus-within:text-[#10B981] transition-colors pointer-events-none"
                    />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                      autoComplete="email"
                      placeholder="you@company.com"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#151515] border border-[#333333] text-[#F5F5F5] text-[15px] font-medium caret-[#10B981] placeholder:text-[#7A7A7A] placeholder:font-normal focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/60 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-[#10B981] text-[#04140E] font-bold shadow-[0_0_18px_rgba(16,185,129,0.22)] hover:shadow-[0_0_28px_rgba(16,185,129,0.4)] hover:bg-[#34D399] active:bg-[#059669] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending code…
                    </>
                  ) : (
                    <>
                      Continue with email
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-start gap-2 pt-1 text-xs text-[#8A8A8A]">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-[1px]" />
                  <span>New or returning — the same code does both.</span>
                </div>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void verifyCode(code);
                }}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="otp-0"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#A1A1AA] mb-4"
                  >
                    Verification code
                  </label>
                  <div className="flex gap-2 sm:gap-2.5">
                    {digits.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        ref={(el) => {
                          inputsRef.current[index] = el;
                        }}
                        value={digit}
                        onChange={(e) =>
                          handleDigitChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onFocus={(e) => e.target.select()}
                        inputMode="numeric"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        maxLength={OTP_LENGTH}
                        aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
                        className="w-full min-w-0 aspect-square rounded-xl bg-[#151515] border border-[#333333] text-[#F5F5F5] text-center text-xl font-bold caret-[#10B981] focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/60 transition-all"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || code.length < OTP_LENGTH}
                  className="w-full py-3.5 rounded-xl bg-[#10B981] text-[#04140E] font-bold shadow-[0_0_18px_rgba(16,185,129,0.22)] hover:shadow-[0_0_28px_rgba(16,185,129,0.4)] hover:bg-[#34D399] active:bg-[#059669] transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    "Verify and continue"
                  )}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={resetToEmail}
                    className="text-[#A1A1AA] hover:text-[#EDEDED] transition font-medium flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Change email
                  </button>

                  <button
                    type="button"
                    disabled={cooldown > 0 || isLoading}
                    onClick={() => void sendOtp(true)}
                    className="text-[#10B981] hover:text-[#34D399] transition font-medium disabled:text-[#525252] disabled:cursor-not-allowed"
                  >
                    {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="text-center text-xs text-[#8A8A8A] mt-6 leading-relaxed">
            By continuing you agree to our{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1AA] hover:text-[#10B981] underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
