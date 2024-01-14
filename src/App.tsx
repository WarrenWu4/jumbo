// pages
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Error from "./pages/Error.tsx";

import { Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/AuthContext.ts";
import { useAuth } from "./hooks/useAuth.ts";

import Start from "./pages/Start.tsx";

export default function App() {

    const { user, setUser } = useAuth();

    const theme = localStorage.getItem("theme")
    document.documentElement.className = theme ? theme : "light"

    return (
      <AuthContext.Provider value={{user, setUser}}>
        <Routes>
            <Route path="/" element={<Start/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/flashcard/create" element={<BlankPage/>}/>
            <Route path="/flashcard/edit/:set_id" element={<BlankPage/>} /> 
            <Route path="/flashcard/study/:set_id" element={<BlankPage/>} /> 
            <Route path="*" element={<Error/>} />
        </Routes>
      </AuthContext.Provider>
    )
}

const BlankPage = () => {
    return (
        <div className="w-screen h-screen overflow-hidden bg-white dark:bg-black">
        </div>
    )
}