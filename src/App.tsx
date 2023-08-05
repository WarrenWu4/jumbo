// pages
import Dashboard from "./pages/Dashboard/index.tsx";
import Landing from "./pages/Landing/index.tsx";
import EditFlashcard from "./pages/EditFlashcard/index.tsx";
import StudyFlaschard from "./pages/StudyFlaschard/index.tsx";
import Error from "./pages/Error/index.tsx";

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase.ts"
import { doc, setDoc } from "firebase/firestore";

export default function App() {

  const [isVerifying, setIsVerifying] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // *check if user is logged in
  useEffect(() => {

    onAuthStateChanged(auth, async(user:any) => {
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        })
        setIsLoggedIn(true);
      }
      setIsVerifying(false);
    })

  }, [])
  

  return (
    <>
      {!isVerifying && <Routes>

          {isLoggedIn && <>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/set/edit/:set_id" element={<EditFlashcard/>} />
            <Route path="/set/view/:set_id" element={<StudyFlaschard/>} />


            <Route path="/start" element={<Landing/>}/>
          </>
          }

          {!isLoggedIn && <>
            <Route path="/" element={<Landing/>} />
          </>
          }

          <Route path="*" element={<Error/>} />

        </Routes>
      }
    </>
  )
}
