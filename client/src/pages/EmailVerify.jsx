import { useContext, useEffect, useRef, useState } from "react";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import axios from "axios";
import api from "../api.js";
import LoaderOverlay from "../components/LoaderOverlay.jsx";
import { UserContext } from "../context/UserContext.jsx";

const EmailVerify = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUser } = useContext(UserContext)

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    setIsLoading(true);

    try {
      e.preventDefault();

      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await api.post("/auth/verify-account", { verificationOtp: otp });

      console.log(data)
      if (data.success) {
        setIsVerified(true);
        fetchUser();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-hero px-4">
      {/* Loader */}
      {isLoading && <LoaderOverlay text={"Verifying..."} />}

      {isVerified ? (
        <div className="bg-white p-6 rounded-3xl shadow-xl w-96 text-sm flex flex-col items-center gap-2">
          <h1 className="text-gray-900 text-2xl font-bold text-center mb-2">
            Email Verified
          </h1>

          <p className="text-gray-600 text-center mb-2">
            Your email has been successfully verified. You can now continue
            exploring Bookora.
          </p>

          <button onClick={() => navigate('/')} className="w-fit px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-xl hover:opacity-90 transition cursor-pointer">
            Go to Home
          </button>
        </div>
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="bg-white p-8 rounded-3xl shadow-xl w-96 text-sm flex flex-col items-center"
        >
          <h1 className="text-gray-900 text-2xl font-bold text-center mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Enter the 6-digit code sent to your email
          </p>

          <div
            className="flex justify-between gap-1 mb-8 w-full"
            onPaste={handlePaste}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="size-11 md:size-12 bg-gray-100 text-gray-900 border border-gray-300 outline-none text-center text-xl rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  required
                />
              ))}
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-xl hover:opacity-90 transition cursor-pointer">
            Verify Email
          </button>
        </form>
      ) }
    </div>
  );
};

export default EmailVerify;
