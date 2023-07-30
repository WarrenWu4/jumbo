// pages
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Landing from "./pages/Landing/Landing";


import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase.ts"
import { doc, setDoc } from "firebase/firestore";
import EditSet from "./components/EditSet.tsx";

export default function App() {

  const [isVerifying, setIsVerifying] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [defaultElement, setDefaultElement] = useState<React.ReactNode>(<Landing/>);
  
  // check if user is logged in
  useEffect(() => {

    onAuthStateChanged(auth, async(user) => {
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        })
        // user is signed in --> retrieve user data and set routing to dashboard
        setDefaultElement(<Dashboard contentType={"home"}/>)
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
            <Route path="/dashboard" element={<Dashboard contentType={"home"} />}/>
            <Route path="/dashboard/starred" element={<Dashboard contentType={"star"}/>}/>
            <Route path="/dashboard/market" element={<Dashboard contentType={"market"}/>}/>
            <Route path="/set/edit/:set_id" element={<EditSet/>} />
          </>
          }

          {/* public routes */}
          <Route path="/land" element={<Landing/>}/>

        </Routes>
      }
    </>
  )
}

// const Temp = () => {
//   return (
//     <></>
//   )
// }
