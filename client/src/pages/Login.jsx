import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import api from "../api.js";
import VerifyOtpModal from "../components/login/VerifyOtpModal.jsx";
import { toast } from "react-toastify";
import LoaderOverlay from "../components/LoaderOverlay.jsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { CartContext } from "../context/CartContext.jsx";

function Login() {
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [lgShowRegister, setLgShowRegister] = useState(true);

  const { registerUser } = useContext(UserContext);
  const { initializeCart } = useContext(CartContext);

  const {
    register,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
  } = useForm();

  const onSubmitRegister = async (data) => {
    try {
      const res = await api.post("/auth/register", data);

      if (res.data.success) {
        await api.post("/auth/send-verify-otp");
        setShowOtpModal(true);
        registerUser(res.data.user);
      }
      console.log(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    register: login,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm();

  const onSubmitLogin = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      registerUser(res.data.user);
      await initializeCart();

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      if (isOn) {
        setTimeout(() => {
          setLgShowRegister(true);
        }, 1000);
      } else {
        setTimeout(() => {
          setLgShowRegister(false);
        }, 1000);
      }
    }
  }, [isOn]);

  const errorMsg = "text-red-500 text-start text-xs ml-2 my-0";

  return (
    <div className="bg-hero h-screen flex justify-center items-center">
      {/* Loader */}
      {(isRegisterSubmitting || isLoginSubmitting) && (
        <LoaderOverlay
          text={isRegisterSubmitting ? "Registering..." : "Logging in...."}
        />
      )}

      {/* Verification OTP Modal */}
      {showOtpModal && <VerifyOtpModal />}

      {/* Forms */}
      <div className="w-[90vw] relative h-[95dvh] md:w-[70vw] lg:w-[55vw] lg:h-[72vh] bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
        {/* Left Side - Form */}
        <div
          className={`flex-1 px-8 py-10 flex flex-col lg:flex-row justify-start transition-all duration-700 ease-in-out w-full lg:translate-0 ${
            isOn
              ? "translate-y-20 lg:translate-x-[50%]"
              : "translate-y-0 lg:lg:translate-x-0"
          } `}
        >
          <div className="relative flex items-center lg:w-[45%] h-[70%] lg:h-full justify-center z-[1000]">
            {/* REGISTER FORM */}
            <form
              onSubmit={handleRegisterSubmit(onSubmitRegister)}
              className={`h-fit w-full text-center space-y-2 transition-all delay-300 lg:delay-500 duration-700 z-[1000] ${
                isOn
                  ? "opacity-0 pointer-events-none translate-y-4 z-0"
                  : "opacity-100 translate-y-0 z-50"
              } `}
              style={{
                display:
                  window.innerWidth >= 1024
                    ? !lgShowRegister
                      ? "block"
                      : "none"
                    : "block",
              }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Registration
              </h2>

              <div>
                {registerErrors.firstName && (
                  <p className={errorMsg}>
                    *{registerErrors.firstName.message}
                  </p>
                )}
                <input
                  className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
                  type="text"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Minimmum length required 3",
                    },
                  })}
                />
              </div>

              <div>
                <input
                  className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName")}
                />
              </div>

              <div>
                {registerErrors.email && (
                  <p className={errorMsg}>*{registerErrors.email.message}</p>
                )}
                <input
                  className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>

              <div>
                {registerErrors.password && (
                  <p className={errorMsg}>*{registerErrors.password.message}</p>
                )}
                <input
                  className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimmum length is 6" },
                    maxLength: { value: 20, message: "Maximmum length is 20" },
                  })}
                />
              </div>

              <button
                type="submit"
                disabled={isRegisterSubmitting}
                className="w-full cursor-pointer bg-primary py-3 mt-2 text-sm font-semibold text-white rounded-lg hover:bg-primary/90 transition-all"
              >
                Register
              </button>

              <div className="flex items-center justify-center gap-3 my-1">
                <span className="text-sm text-gray-500">OR</span>
              </div>

              <a
                href="http://localhost:8000/auth/google"
                className="w-full cursor-pointer py-3 rounded-lg border text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
              >
                <FaGoogle />
                Continue with Google
              </a>
            </form>
            {/* LOGIN FORM */}
            <div className="absolute lg:relative text-black z-[100] flex items-center">
              <form
                onSubmit={handleLoginSubmit(onSubmitLogin)}
                className={`
                inset-0 z-[1000] w-full h-fit text-center text-black space-y-3 transition-all delay-300 lg:delay-500 duration-700
                ${
                  isOn
                    ? "opacity-100 translate-y-24 lg:translate-y-0 z-50 pointer-events-auto"
                    : "opacity-0 translate-y-6 lg:translate-y-0 z-0 pointer-events-none"
                }`}
                style={{
                  display:
                    window.innerWidth >= 1024
                      ? lgShowRegister
                        ? "block"
                        : "none"
                      : "block",
                }}
              >
                <h2 className="text-4xl font-bold mb-7 text-gray-800">Login</h2>

                {/* <div className="w-full"> */}
                {loginErrors.email && (
                  <p className={errorMsg}>*{loginErrors.email.message}</p>
                )}
                <input
                  className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
                  type="email"
                  placeholder="Email"
                  {...login("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {/* </div> */}

                {/* <div> */}
                {loginErrors.password && (
                  <p className={errorMsg}>*{loginErrors.password.message}</p>
                )}
                <input
                  className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
                  type="password"
                  placeholder="Password"
                  {...login("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
                {/* </div> */}

                <a href="#" className="text-gray-600 text-sm">
                  Forgot password?
                </a>

                <button
                  disabled={isLoginSubmitting}
                  className="w-full cursor-pointer bg-primary py-3 mt-2 text-sm font-semibold text-white rounded-lg hover:bg-primary/90 transition-all"
                >
                  Login
                </button>

                <div className="flex items-center justify-center">
                  <span className="text-sm text-gray-500">OR</span>
                </div>

                <a
                href="http://localhost:8000/auth/google"
                className="w-full cursor-pointer py-3 rounded-lg border text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
              >
                <FaGoogle />
                Continue with Google
              </a>
              </form>
            </div>
          </div>
        </div>

        {/* Register - Welcome */}
        <div
          className={`absolute w-full h-fit flex flex-col items-center justify-start gap-2 transition-all delay-500 duration-500 bottom-16 text-white z-50 lg:w-fit lg:-translate-y-1/2 lg:top-1/2 ${
            isOn
              ? "opacity-100 top-6 md:top-10 lg:left-[7%]"
              : "-top-20 lg:-left-20 opacity-0 pointer-events-none"
          }`}
        >
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-sm opacity-90">Already have an account?</p>

          <button
            onClick={() => setIsOn(!isOn)}
            className="text-sm bg-transparent cursor-pointer border border-white px-10 py-2 rounded-lg hover:bg-white/20 transition-all"
          >
            Register
          </button>
        </div>
        {/* Welcome - Overlay */}
        <div
          className={`flex-[0.7] absolute z-40 -bottom-16 lg:bottom-0 h-[400%] w-full lg:h-full lg:w-[400%] bg-primary text-white flex flex-col items-center justify-start gap-3 p-10 rounded-[5.5rem] lg:rounded-l-[8rem] transition-all duration-2000 ${
            isOn
              ? "-translate-y-[21%] lg:translate-y-0 lg:-translate-x-[87.5%]"
              : "translate-y-[90.5%] lg:translate-y-0 lg:translate-x-[12.5%]"
          }`}
        ></div>

        {/* login - Welcome */}
        <div
          className={`absolute h-fit w-full flex flex-col items-center justify-start gap-2 transition-all delay-500 duration-500 text-white z-50 lg:w-fit lg:-translate-y-1/2 lg:top-1/2  ${
            isOn
              ? "opacity-0 -bottom-20 lg:-right-20 pointer-events-none"
              : "opacity-100 bottom-8 md:translate-y-4 lg:right-[7%]"
          }`}
        >
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-sm opacity-90">Already have an account?</p>

          <button
            onClick={() => setIsOn(!isOn)}
            className="text-sm bg-transparent cursor-pointer border border-white px-10 py-2 rounded-lg hover:bg-white/20 transition-all"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
