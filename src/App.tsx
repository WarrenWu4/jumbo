// pages
import Dashboard from "./pages/Dashboard/index.tsx";
import Landing from "./pages/Landing/index.tsx";
import Error from "./pages/Error/index.tsx";
import Shop from "./pages/Shop/index.tsx";
import Info from "./pages/Premium/Info/index.tsx";

import { Routes, Route } from "react-router-dom";
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

export default function App() {

    const [userInfo, setUserInfo] = useState<JumboUserProfile | null>( null)
    const [routes, setRoutes] = useState<JSX.Element>(<Route path="/" element={<Landing/>} />)
    
    useEffect(() => {
        
        // check if user is logged in
        try {
            onAuthStateChanged(auth, async(user) => {
                if (user) {
                    const tempUser:JumboUserProfile = {
                        uid: user.uid, photoURL: user.photoURL, displayName: user.displayName, email: user.email, isAnonymous: user.isAnonymous
                    }
                    setUserInfo((user) ? tempUser : null)
                    setRoutes((user) ? 
                    <>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/set/edit/:set_id" element={<Dashboard/>}/>
                        <Route path="/set/view/:set_id" element={<Dashboard/>}/>
        
                        <Route path="/shop" element={<Shop/>} />
                        <Route path="/premium/info" element={<Info/>} />
        
                        <Route path="/start" element={<Landing/>}/>
                    </> 
                    : 
                    <>
                        <Route path="/" element={<Landing/>} />
                    </>
                    )
                }
                else {
                    console.log("Error msg: user not logged in")
                }
            })
        } catch(e) {
            console.log("Error occurred getting authentication state\nError msg:", e)
        }
        
    }, [])

    return (
      <>
        <AuthContext.Provider value={userInfo}>
            <Routes>
                {routes}
                <Route path="*" element={<Error/>} />
            </Routes>
        </AuthContext.Provider>
      </>
    )
}
