import React from "react";
import { FaGoogle } from "react-icons/fa";

function Login() {
  return (
    <div className="bg-hero h-screen flex justify-center items-center">
      <div className="w-[90vw] relative h-[95dvh] lg:w-[55vw] lg:h-[60vh] bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row">

        {/* Left Side - Form */}
        <div className="flex-1 px-8 py-10 flex flex-col justify-start">
          <form className="text-center space-y-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Registration
            </h2>

            <input
              className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
              type="text"
              placeholder="First Name"
            />

            <input
              className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
              type="text"
              placeholder="Last Name"
            />

            <input
              className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
              type="email"
              placeholder="Email"
            />

            <input
              className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
              type="password"
              placeholder="Password"
            />

            <button
              className="w-full bg-primary py-3 mt-2 text-sm font-semibold text-white rounded-lg hover:bg-primary/90 transition-all"
            >
              Register
            </button>

            <div className="flex items-center justify-center gap-3 my-2">
              <span className="text-sm text-gray-500">Or</span>
            </div>

            <button className="w-full py-3 rounded-lg border text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
              <FaGoogle />
              Continue with Google
            </button>
          </form>
        </div>

        {/* Right Side - Welcome */}
        <div className="flex-[0.7] absolute -bottom-16 w-full h-[18rem] bg-primary text-white flex flex-col items-center justify-start gap-3 p-10 rounded-[5.5rem]  lg:rounded-t-none lg:rounded-l-[8rem]">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-sm opacity-90">Already have an account?</p>

          <button className="text-sm bg-transparent border border-white px-10 py-2 rounded-lg hover:bg-white/20 transition-all">
            Login
          </button>
        </div>


        {/* Login form */}
        {/* Left Side - Form */}
        <div className="hidden my-2 px-8 py-10 flex flex-col justify-center">
          <form className="text-center space-y-4">
            <h2 className="text-4xl font-bold mb-7 text-gray-800">
              Login
            </h2>

            <input
              className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
              type="email"
              placeholder="Email"
            />

            <input
              className="w-full py-3 px-4 text-sm bg-gray-100 rounded-lg outline-none border border-transparent focus:border-primary transition-all"
              type="password"
              placeholder="Password"
            />
            <a href="#" className="text-gray-600 text-sm">Forgot password?</a>

            <button
              className="w-full bg-primary py-3 mt-2 text-sm font-semibold text-white rounded-lg hover:bg-primary/90 transition-all"
            >
              Login
            </button>

            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-500">Or</span>
            </div>

            <button className="w-full py-3 rounded-lg border text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
              <FaGoogle />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
