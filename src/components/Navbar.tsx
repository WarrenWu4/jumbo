import { FiSun } from "react-icons/fi"

export default function Navbar() {

    function changeTheme() {

        let theme = localStorage.getItem("theme")

        if (theme === "dark") {
            document.documentElement.className = "light"
            localStorage.setItem("theme", "light")
        } else {
            document.documentElement.className = "dark"
            localStorage.setItem("theme", "dark")
        }
    }

    return (
        <div className="w-full flex justify-between">

            <div className="font-bold text-3xl">
                JUMBO
            </div>

            <button type="button" onClick={changeTheme}>
                <FiSun size={24} strokeWidth={2}/>
            </button>
        
        </div>
    )
}