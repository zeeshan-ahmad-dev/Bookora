import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import LoaderOverlay from "../components/LoaderOverlay.jsx";

const ResetPassword = () => {
  const [step, setStep] = useState("verifyEmail"); // verifyEmail | otpSent | verifyOtp | otpVerified | success

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [wrongOtpError, setWrongOtpError] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef([]);

  const handleVerifyEmail = async () => {
    if (!email) return alert("Please enter your email");

    setIsLoading(true);
    setEmailError(false);

    try {
      const { data } = await api.post("/auth/send-reset-otp", { email });

      if (!data.success) {
        setEmailError(true);
        return;
      }

      setStep("otpSent");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e, index) => {
    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    paste.split("").forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setWrongOtpError(false);

    try {
      const otp = inputRefs.current.map((e) => e?.value || "").join("");

      const { data } = await api.post("/auth/verify-reset-otp", {
        resetOtp: otp,
        email,
      });

      if (data.success) {
        setToken(data.token);
        setStep("otpVerified");
      } else {
        setWrongOtpError(true);
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        setWrongOtpError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password || password.length < 6) return setPasswordError(true);

    setIsLoading(true);
    try {
      await api.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      setStep("success");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/40 px-4">
      {isLoading && <LoaderOverlay text="Processing..." />}

      <div className="bg-white rounded-2xl p-8 w-full max-w-[420px] text-center shadow-xl">
        {/* VERIFY EMAIL */}
        {step === "verifyEmail" && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Reset Your Password
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Enter your registered email to receive a reset code.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full h-12 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary mb-2"
            />

            {emailError && (
              <p className="text-red-500 text-sm text-left mb-2">
                Email is not registered
              </p>
            )}

            <button
              onClick={handleVerifyEmail}
              className="w-full h-12 bg-primary text-white rounded-lg font-semibold hover:bg-primary/85 transition mb-3 cursor-pointer"
            >
              Send Verification Code
            </button>

            <Link
              to="/login"
              className="text-sm text-gray-500 hover:text-gray-700  cursor-pointer"
            >
              Login with password
            </Link>
          </>
        )}

        {/* OTP SENT */}
        {step === "otpSent" && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Reset Password Verification
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              We've sent a verification code to <br />
              <span className="font-medium text-gray-800">{email}</span>
            </p>

            <button
              onClick={() => setStep("verifyOtp")}
              className="w-full h-12 bg-primary text-white rounded-lg font-semibold hover:bg-primary/85 transition mb-3 cursor-pointer"
            >
              Verify Code
            </button>

            <button
              onClick={() => setStep("verifyEmail")}
              className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Go Back
            </button>
          </>
        )}

        {/* VERIFY OTP */}
        {step === "verifyOtp" && (
          <form onSubmit={handleVerifyOtp}>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verify Reset Code
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Enter the 6-digit code sent to your email
            </p>

            <div
              className="flex justify-between gap-2 mb-8"
              onPaste={handlePaste}
            >
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="size-10 sm:size-12 bg-gray-100 text-gray-900 border border-gray-300 outline-none text-center text-xl rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition"
                    ref={(el) => (inputRefs.current[index] = el)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    required
                  />
                ))}
            </div>
            {wrongOtpError && (
              <p className="text-red-500 text-sm text-left mb-2">
                *Otp don't match
              </p>
            )}

            <button className="w-full h-12 bg-primary text-white rounded-lg font-semibold hover:bg-primary/85 transition cursor-pointer">
              Verify Code
            </button>
          </form>
        )}

        {/* NEW PASSWORD */}
        {step === "otpVerified" && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Set New Password
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Choose a strong password for your account.
            </p>

            {passwordError && (
              <p className="text-red-500 text-sm text-left mb-2">
                *Minimum 6 characters
              </p>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full h-12 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary mb-4"
            />

            <button
              onClick={handleResetPassword}
              className="w-full h-12 bg-primary text-white rounded-lg font-semibold hover:bg-primary/85 transition cursor-pointer"
            >
              Reset Password
            </button>
          </>
        )}

        {/* SUCCESS - Password reseted */}
        {step === "success" && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Password Reset Successful
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              You can now log in using your new password.
            </p>

            <Link
              to="/login"
              className="block w-full h-12 bg-primary text-white rounded-lg font-semibold leading-[3rem] hover:bg-primary/85 transition cursor-pointer"
            >
              Login Now
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
