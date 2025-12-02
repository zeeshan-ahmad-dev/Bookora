import { useNavigate } from "react-router-dom";

const VerifyOtpModal = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 z-[1500] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-8 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Verification OTP Sent!
        </h2>
        <p className="text-gray-600 mb-6">
          A verification code has been sent to your email. Please verify your
          account.
        </p>
        <button
          onClick={() => navigate("/verify-email")}
          className="bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/85 cursor-pointer transition-all"
        >
          Verify Now
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpModal;
