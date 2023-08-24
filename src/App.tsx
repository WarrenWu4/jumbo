// pages
import Dashboard from "./pages/Dashboard/index.tsx";
import Landing from "./pages/Landing/index.tsx";
import EditFlashcard from "./pages/EditFlashcard/index.tsx";
import StudyFlashcard from "./pages/StudyFlaschard/index.tsx";
import Error from "./pages/Error/index.tsx";
import Shop from "./pages/Shop/index.tsx";
import Content from "./pages/Content/index.tsx";

import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Info from "./pages/Premium/Info/index.tsx";
import { getAuthState } from "./lib/HandleAuth.ts";

export default function App() {

    const AuthContext = createContext(null)
    const [userInfo, setUserInfo] = useState<any>()
    const [routes, setRoutes] = useState<JSX.Element>()
    
    useEffect(() => {
        
        const response = getAuthState()
        if (response.status === "200 SUCCESS") {
            setUserInfo((response.isLoggedIn) ? response.userInfo : null)
            setRoutes((response.isLoggedIn) ? 
            <>
                <Route path="/" element={<Content content={<Dashboard/>}/>}/>
                <Route path="/set/edit/:set_id" element={<Content content={<EditFlashcard/>}/>} />
                <Route path="/set/view/:set_id" element={<Content content={<StudyFlashcard/>}/>} />

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
            console.log("Error occurred getting authentication state\nError msg:", response.errorMsg)
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
