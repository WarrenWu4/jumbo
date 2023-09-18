import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SidebarHeader() {

    const [currTheme, setCurrTheme] = useState<string>(localStorage.theme)
    const switchTheme = () => {
        localStorage.theme = (localStorage.theme === "dark") ? "light":"dark"
        document.documentElement.className = localStorage.theme
        setCurrTheme(localStorage.theme)
    }

    return (
        <div className="mb-8 font-bold text-2xl flex justify-between items-center">
            <Link to="/">
                JUMBO
            </Link>
            <button type="button" onClick={switchTheme}>
                {(currTheme === "dark") ? <FaSun size={24}/> : <FaMoon size={24}/>}
            </button>
        </div>
    )
}