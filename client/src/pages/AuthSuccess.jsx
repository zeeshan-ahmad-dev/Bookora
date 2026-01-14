import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useEffect, useContext, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

const AuthSuccess = () => {
  const { registerUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/is-auth");
        const currentUser = res.data.user;

        registerUser(currentUser);
        setUser(currentUser);
      } catch (error) {
        toast.error(error.message || "Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-hero">
        <div className="text-center text-lg text-black/70">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-hero">
      <div className="w-full md:max-w-[40%] p-10 md:p-12 text-center bg-white shadow-lg rounded-2xl border border-black/10">
        {/* Title */}
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-black font-noto-serif">
          Welcome, {user?.firstName || "User"}!
        </h1>

        {/* Description */}
        <p className="mb-8 text-sm md:text-base text-black/70 leading-relaxed">
          You have successfully logged in. You can now explore the app and start shopping.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="w-full py-3 px-3 font-semibold text-white transition rounded-lg bg-primary hover:bg-primary-hover shadow-md hover:shadow-lg"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default AuthSuccess;
