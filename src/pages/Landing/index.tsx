import { FaMoon, FaClone, FaSun } from "react-icons/fa"
import { BsGoogle, BsArrowRight } from "react-icons/bs"
import { IoClose } from "react-icons/io5"
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect, signInAnonymously } from "firebase/auth"
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {

    const googleSignIn = async() => {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
        const result = await getRedirectResult(auth);

        if(result === null) {
            console.log("Error signing in")
        }

    }

    const anonymousSignIn = async() => {
        await signInAnonymously(auth)
    }

    const switchTheme = () => {
        console.log(localStorage.theme)
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
        // otherwise showcase an error modal
        else {
            setShowError(true)
        }
    }

    const [currTheme, setCurrTheme] = useState(localStorage.theme)
    const [showError, setShowError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col relative">

            <div className="w-full py-6 px-8 flex justify-between items-center">

                <div className="font-bold text-2xl px-5 py-4">JUMBO</div>

                <div className="flex px-5 py-4 [&>*]:ml-4">
                    <button type="button" onClick={switchTheme}>
                        {(currTheme === "dark") ? <FaSun size={24}/> : <FaMoon size={24}/>}
                    </button>

                    <button type="button" onClick={handleDashboard} >
                        <FaClone size={24}/>
                    </button>
                </div>

            </div>

            <div className="w-full h-full flex justify-center items-center text-center flex-col">

                <div className="font-bold text-6xl px-20">a better way to flashcard</div>

                <button onClick={googleSignIn} className="flex items-center border-4 border-black border-solid dark:border-white px-4 py-3 rounded-md text-lg font-bold mt-12 transition duration-500 hover:bg-black hover:text-white dark:hover:bg-white  dark:hover:text-black"> <BsGoogle className="mr-[0.8rem]"/> sign in with google</button>

                <button onClick={anonymousSignIn} className="mt-4 flex items-center group">try anonymously <BsArrowRight className="ml-2 group-hover:translate-x-2 transition duration-500"/></button>

            </div>

            <div className={`px-4 py-3 text-base font-medium rounded-md bg-red-100 dark:bg-red-400 border-4 border-solid fixed bottom-40 left-1/2 -translate-x-1/2 border-red-200 dark:border-red-400 ${(showError) ? "flex" : "hidden"}`}>
                Please login to go to your dashboard!
                <button type="button" onClick={() => {setShowError(false)}} className="ml-3" >
                    <IoClose size={20} />
                </button>
            </div>

        </div>
    )
}