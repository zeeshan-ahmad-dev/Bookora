import { User } from "lucide-react";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const registerUser = (data) => {
        setUser(data);
    }

    return (
        <UserContext.Provider value={{ user, registerUser }}>
            {children}
        </UserContext.Provider>
    )
}