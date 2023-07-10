// pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Landing from "./pages/Landing/Landing";


import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.ts"

export default function App() {

  const [isVerifying, setIsVerifying] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [defaultElement, setDefaultElement] = useState<React.ReactNode>(<Landing/>);
  
  // check if user is logged in
  useEffect(() => {

    onAuthStateChanged(auth, async(user) => {
      if (user) {
        // user is signed in --> retrieve user data and set routing to dashboard
        setDefaultElement(<Dashboard/>)
        setIsLoggedIn(true);
      }
      setIsVerifying(false);
    })

  }, [])
  

  return (
    <>
      {!isVerifying && <Routes>

          <Route path="/" element={defaultElement}/>

          {isLoggedIn && <>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/starred" element={<Temp/>}/>
            <Route path="/dashboard/marketplace" element={<Temp/>}/>
          </>
          }

          {/* public routes */}
          <Route path="/land" element={<Landing/>}/>

        </Routes>
      }
    </>
  )
}

const Temp = () => {
  return (
    <></>
  )
}
