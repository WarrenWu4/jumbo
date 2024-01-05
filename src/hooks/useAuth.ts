import { useEffect } from "react";
import { useUser } from "./useUser"
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import JumboUser from "../types/UserTypes";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const useAuth = () => {
    const { user, addUser, removeUser, setUser } = useUser();

    useEffect(() => {
        
        const auth = getAuth();
        onAuthStateChanged(auth, async (user: User | null) => {
            if (user) {
                // if user exists, get the user data from the database
                const userRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(userRef); 
                if(docSnap.exists()) {
                    addUser(docSnap.data() as JumboUser);
                } else {
                    removeUser();
                }
            } else {
                removeUser();
            }
        })

    }, [])

    return { user, setUser }; 
}