import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { BsFillGearFill, BsQuestionCircle } from "react-icons/bs";
import SidebarCard from "./SidebarCard";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

export default function Sidebar() {

    const switchTheme = () => {
        localStorage.theme = (localStorage.theme === "dark") ? "light":"dark"
        document.documentElement.className = localStorage.theme
        setCurrTheme(localStorage.theme)
    }
    const [currTheme, setCurrTheme] = useState(localStorage.theme)

    const addSet = () => {
        console.log("Working on it")
    }

    const premiumInfo = (e:any) => {
        e.preventDefault()
        console.log("workkk")
    }

    useEffect(() => {

        const getUser = () => {
            const user = auth.currentUser
            // if use ris anonymous
            if (user?.isAnonymous) {
                // set user profile to default
                // set user name to anyonymous
            }
            // otherwise use the users settings
            else {
                if (user?.photoURL !== null && user?.photoURL !== undefined) {
                    setUserProfile(user?.photoURL)
                }
                if (user?.displayName !== null && user?.displayName !== undefined) {
                    setUserName(user?.displayName)
                }
            }
        }

        getUser()

    }, [])

    const [userProfile, setUserProfile] = useState<string>("")
    const [userName, setUserName] = useState<string>("")

    return (
        <div className="h-full hidden md:flex flex-col gap-y-2 full max-w-[288px] w-full px-2 py-12">
            
            <div className="h-full border-black/40 dark:border-white/40 border-r-4 border-solid flex flex-col justify-between px-5 py-4">

                <div className="flex flex-col">
                    <div className="mb-8 font-bold text-2xl flex justify-between items-center">
                        JUMBO
                        <button type="button" onClick={switchTheme}>
                            {(currTheme === "dark") ? <FaSun size={24}/> : <FaMoon size={24}/>}
                        </button>
                    </div>

                    <div className="flex flex-col gap-y-4 mt-8">
                        <div className="flex items-center text-xl font-bold">
                            Sets
                        </div>
                        <div className="flex flex-col gap-y-2 ml-4">
                            <SidebarCard title="testing" set_id="12124124" icon={undefined} />
                            <SidebarCard title="testing" set_id="12124124" icon={undefined} />
                            <SidebarCard title="testing" set_id="12124124" icon={undefined} />
                        </div>

                        <button type="button" onClick={addSet} className="w-full flex items-center justify-center mt-4 border-4 rounded-lg border-solid border-black dark:border-white font-black text-xl" >
                            +
                        </button>

                    </div>
                </div>

                <div className="w-full">

                    <Link to={"/shop"} className="w-full px-4 py-3 border-2 border-green-300 border-solid rounded-lg text-green-800 bg-green-200 dark:bg-green-800 dark:border-green-600 dark:text-green-200 flex items-center justify-between">
                        buy premium 
                        <button type="button" onClick={premiumInfo} >
                            <BsQuestionCircle size={16} />
                        </button>
                    </Link>

                    <div className="flex items-center justify-between mt-8">

                        <div className="flex items-center">
                            <img src={userProfile} alt="user profile" className="rounded-[50%] w-8 h-8 mr-2"/>
                            {userName}
                        </div>


                        <button type="button">
                            <BsFillGearFill size={18} />
                        </button>

                    </div>
                </div>

            </div>
                
        </div>
    )
}