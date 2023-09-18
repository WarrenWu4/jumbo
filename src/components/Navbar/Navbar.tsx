import { FaMoon, FaClone, FaSun } from "react-icons/fa"
import { useEffect, useState } from "react"
import GetTheme from "../../lib/GetTheme"
import { NavLink, useNavigate } from "react-router-dom"
import { auth } from "../../firebase"

export default function Navbar() {

    const [currTheme, setCurrTheme] = useState(localStorage.theme)
    const navigate = useNavigate()

    const switchTheme = () => {
        localStorage.theme = (localStorage.theme === "dark") ? "light":"dark"
        document.documentElement.className = localStorage.theme
        setCurrTheme(localStorage.theme)
    }

    const handleDashboard = () => {
        // get current user
        const user = auth.currentUser
        // if user is already logged in navigate to dashboard
        if (user) {
            navigate("/")
        }
    }

    useEffect(() => {
      
        setCurrTheme(GetTheme())
      
    }, [])
    

    return (
    <div className="w-full py-6 px-8 flex justify-between items-center">

        <NavLink to={"/"} className="font-bold text-2xl px-5 py-4">JUMBO</NavLink>

        <div className="flex px-5 py-4 [&>*]:ml-4">
            <button type="button" onClick={switchTheme}>
                {(currTheme === "dark") ? <FaSun size={24}/> : <FaMoon size={24}/>}
            </button>

            <button type="button" onClick={handleDashboard} >
                <FaClone size={24}/>
            </button>
        </div>

    </div>
    )
}