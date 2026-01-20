import { createContext, useCallback, useEffect, useState } from "react";
import api from "../api";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoadingState] = useState(false);

  const setIsLoading = useCallback((value) => {
    setIsLoadingState(value);
  }, []);

  const registerUser = (data) => {
    setUser(data);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logoutUser = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/auth/user");

      setUser(data.user);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || null;
    setIsLoggedIn(userData !== null ? true : false);
    setUser(userData);
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        registerUser,
        logoutUser,
        setIsLoggedIn,
        isLoggedIn,
        fetchUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
