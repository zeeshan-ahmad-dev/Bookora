import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const registerUser = (data) => {
        setUser(data);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(data));
    }

    const logoutUser = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user")) || null;
        setIsLoggedIn(userData !== null ? true : false);
        setUser(userData);
    }, []);

    return (
        <UserContext.Provider value={{ user, registerUser, logoutUser, setIsLoggedIn, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
}