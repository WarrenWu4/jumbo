import { FaMoon, FaClone, FaSun } from "react-icons/fa"
import { BsGoogle, BsArrowRight } from "react-icons/bs"
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect, signInAnonymously } from "firebase/auth"
import { auth } from "../../firebase";
import { useEffect, useState } from "react";

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

    const [currTheme, setCurrTheme] = useState(localStorage.theme)

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col">

            <div className="w-full py-6 px-8 flex justify-between items-center">

                <div className="font-bold text-2xl px-5 py-4">JUMBO</div>

                <div className="flex px-5 py-4 [&>*]:ml-4">
                    <button type="button" onClick={switchTheme}>
                        {(currTheme === "dark") ? <FaSun size={24}/> : <FaMoon size={24}/>}
                    </button>

                    <button type="button">
                        <FaClone size={24}/>
                    </button>
                </div>

            </div>

            <div className="w-full h-full flex justify-center items-center text-center flex-col">

                <div className="font-bold text-6xl px-20">a better way to flashcard</div>

                <button onClick={googleSignIn} className="flex items-center border-4 border-black border-solid dark:border-white px-4 py-3 rounded-md text-lg font-bold mt-12 transition duration-500 hover:bg-black hover:text-white dark:hover:bg-white  dark:hover:text-black"> <BsGoogle className="mr-[0.8rem]"/> sign in with google</button>

                <button onClick={anonymousSignIn} className="mt-4 flex items-center group">try anonymously <BsArrowRight className="ml-2 group-hover:translate-x-2 transition duration-500"/></button>

            </div>

        </div>
    )
}