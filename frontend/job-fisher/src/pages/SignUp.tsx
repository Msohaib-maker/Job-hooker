import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  UserPlus,
  Mail,
  ShieldCheck,
  Loader2,
  CheckCircle,
} from "lucide-react";

const SignUp = () => {
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
      if (data.token) {
        navigate("/dashboard");
        return;
      }
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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#050807]">
      {/* LEFT – Marketing */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-[#0C1A14] to-[#050807] text-[#E7F5EE]">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Smart Hiring
            <br />
            Powered by AI
          </h1>

          <p className="mt-6 max-w-md text-lg text-[#8FAE9B]">
            Match with verified employers and opportunities tailored to your
            skills — faster and smarter.
          </p>

          <ul className="mt-10 space-y-4">
            {[
              "AI-driven job matching",
              "Real-time verified openings",
              "Zero spam, full privacy",
              "Telegram and Email Linkup",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#00FF88]" />
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-[#8FAE9B]">
          © {new Date().getFullYear()} Job Hooker
        </p>
      </div>

      {/* RIGHT – Auth */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md relative">
          {/* Neon border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00FF88]/30 to-transparent blur-xl" />

          <div className="relative bg-[#0B0F0E] rounded-3xl p-10 border border-[#1F2A24] shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#00FF88]/20 flex items-center justify-center shadow-[0_0_25px_#00FF88]">
                <UserPlus className="w-8 h-8 text-[#00FF88]" />
              </div>

              <h2 className="text-3xl font-bold text-[#E7F5EE]">
                Create Account
              </h2>
              <p className="text-sm text-[#8FAE9B] mt-2">
                {otpSent
                  ? "Enter the OTP sent to your email"
                  : "Sign up to get started"}
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {!otpSent && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAE9B] w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email address"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#050807] border border-[#1F2A24]
                    text-[#E7F5EE] placeholder:text-[#8FAE9B]
                    focus:outline-none focus:ring-2 focus:ring-[#00FF88]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="
    w-full h-14 rounded-xl
    bg-[#111111] text-white font-bold
    border-2 border-[#00FF88]
    shadow-[0_0_20px_rgba(0,255,136,0.7),0_0_40px_rgba(0,255,136,0.5)]
    hover:shadow-[0_0_30px_rgba(0,255,136,0.9),0_0_60px_rgba(0,255,136,0.7)]
    active:scale-[0.97] transition
    flex items-center justify-center gap-2
    disabled:opacity-60 disabled:cursor-not-allowed
  "
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Register
                    </>
                  ) : (
                    "Register ✨"
                  )}
                </button>
                <p className="text-center text-xs text-[#8FAE9B] mt-4">
                  By continuing, you agree to our{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00FF88] hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}

            {otpSent && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8FAE9B] w-5 h-5" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="Enter OTP"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#050807] border border-[#1F2A24]
                    text-[#E7F5EE] tracking-widest
                    focus:outline-none focus:ring-2 focus:ring-[#00FF88]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 rounded-xl font-semibold text-[#050807]
                  bg-[#00FF88]
                  shadow-[0_0_30px_rgba(0,255,136,0.6)]
                  hover:shadow-[0_0_45px_rgba(0,255,136,0.9)]
                  active:scale-[0.98]
                  transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-sm text-[#8FAE9B] hover:text-[#00FF88] transition"
                >
                  ← Change email
                </button>
                <p className="text-center text-xs text-[#8FAE9B] mt-4">
                  By continuing, you agree to our{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00FF88] hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
