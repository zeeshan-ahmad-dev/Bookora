import { createContext, useEffect, useState } from "react";
import api from "../api";

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

    const fetchUser = async () => {
        const { data } = await api.get('/auth/user');
        console.log(data)

        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(data.user));
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user")) || null;
        setIsLoggedIn(userData !== null ? true : false);
        setUser(userData);
        console.log("useEffect")
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, registerUser, logoutUser, setIsLoggedIn, isLoggedIn, fetchUser }}>
            {children}
        </UserContext.Provider>
    )
}