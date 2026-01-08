import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UserPlus } from "lucide-react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const { verifyEmail, otpVerify } = useAuth();
  const navigate = useNavigate();

  // STEP 1: Send OTP
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

  // STEP 2: Verify OTP
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
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
      <div className="max-w-md w-full bg-dark-card rounded-3xl shadow-2xl p-10 border border-dark-border">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-400 rounded-full mb-5 shadow-lg">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-dark-text tracking-wide">
            Create Account
          </h1>
          <p className="text-dark-text-muted mt-2">
            {otpSent
              ? "Enter the OTP sent to your email"
              : "Sign up to get started"}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 bg-red-900/30 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* STEP 1 */}
        {!otpSent && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
              className="w-full px-4 py-4 bg-dark-bg border border-dark-border rounded-xl text-dark-text focus:ring-2 focus:ring-orange-500"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl text-white font-semibold"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {otpSent && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter OTP"
              className="w-full px-4 py-4 bg-dark-bg border border-dark-border rounded-xl text-dark-text focus:ring-2 focus:ring-orange-500"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl text-white font-semibold"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
