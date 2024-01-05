import { createContext } from "react"
import JumboUser from "../types/UserTypes"

interface AuthContext {
    user: JumboUser | null;
    setUser: (user: JumboUser | null) => void
};

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => {},
});