import { BsGoogle, BsArrowRight } from "react-icons/bs"
import { IoClose } from "react-icons/io5"
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect, signInAnonymously } from "firebase/auth"
import { auth } from "../../firebase";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

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

    const [showError, setShowError] = useState(false)

    return (
        <div className="w-screen h-screen flex flex-col relative">

            <Navbar/>

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