import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.ts"
import JumboUser from "../types/UserTypes.ts"

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext)

    const addUser = (user: JumboUser) => {
        setUser(user);
    }

    const removeUser = () => {
        setUser(null);
    }    

    return { user, addUser, removeUser, setUser };

}