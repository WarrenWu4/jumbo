import { Routes, Route } from "react-router-dom";

import Start from "./pages/Start.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Error from "./pages/Error.tsx";

export default function App() {


    const theme = localStorage.getItem("theme")
    document.documentElement.className = theme ? theme : "light"

    return (
      <Routes>
            <Route path="/" element={<Start/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Dashboard/>} />
            <Route path="/flashcard/create" element={<BlankPage/>}/>
            <Route path="/flashcard/edit/:set_id" element={<BlankPage/>} /> 
            <Route path="/flashcard/study/:set_id" element={<BlankPage/>} /> 
            <Route path="*" element={<Error/>} />
      </Routes>
    )
}

const BlankPage = () => {
    return (
        <div className="w-screen h-screen overflow-hidden bg-white dark:bg-black">
        </div>
    )
}