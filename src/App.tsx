// pages
import Dashboard from "./pages/Dashboard/index.tsx";
import Landing from "./pages/Landing/index.tsx";
import Error from "./pages/Error/index.tsx";
import Shop from "./pages/Shop/index.tsx";
import Info from "./pages/Premium/Info/index.tsx";

// other shit
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.ts";


export interface JumboUserProfile { 
    uid: string;
    photoURL: string | null;
    displayName: string | null;
    email: string | null;
    isAnonymous: boolean;
}

export const AuthContext = createContext<JumboUserProfile | null>(null)

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard/>
    },
    {
        path: "/set/:view_type/:set_id",
        element: <Dashboard/>
    },
    {
        path: "/shop",
        element: <Shop/>
    },
    {
        path: "/premium/info",
        element: <Info/>
    },
    {
        path: "/start",
        element: <Landing/>
    },
    {
        path: "*",
        element: <Error/>
    }
])

export default function App() {

    const [userInfo, setUserInfo] = useState<JumboUserProfile | null>( null)
    
    useEffect(() => {
        
        // check if user is logged in
        try {
            onAuthStateChanged(auth, async(user) => {
                if (user !== null) {
                    const tempUser:JumboUserProfile = {
                        uid: user.uid, photoURL: user.photoURL, displayName: user.displayName, email: user.email, isAnonymous: user.isAnonymous
                    }
                    setUserInfo(tempUser)
                }
                else {
                    setUserInfo(null)
                }
            })
        } catch(e) {
            console.log("Error occurred getting authentication state\nError msg:", e)
        }
        
    }, [])

    return (
      <>
        <AuthContext.Provider value={userInfo}>
            <RouterProvider router={router}/>
        </AuthContext.Provider>
      </>
    )
}

// const BlankPage = () => {
//     return (
//         <div className="w-screen h-screen overflow-hidden bg-white dark:bg-black">
//         </div>
//     )
// }