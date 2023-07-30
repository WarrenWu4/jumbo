import { FaMoon, FaClone } from "react-icons/fa"
import { BsGoogle, BsArrowRight } from "react-icons/bs"
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect, signInAnonymously } from "firebase/auth"
import { auth } from "../../firebase";

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

    return (
        <div className="w-screen h-screen flex flex-col">

            <div className="w-full py-6 px-8 flex justify-between items-center">

                <div className="font-bold text-2xl px-5 py-4">JUMBO</div>

                <div className="flex px-5 py-4 [&>*]:ml-4">
                    <FaMoon size={24}/>    
                    <FaClone size={24}/>
                </div>

            </div>

            <div className="w-full h-full flex justify-center items-center text-center flex-col">

                <div className="font-bold text-6xl px-20">a better way to flashcard</div>

                <button onClick={googleSignIn} className="flex items-center border-4 border-black border-solid px-4 py-3 rounded-md text-lg font-bold mt-12 transition duration-500 hover:bg-black hover:text-white"> <BsGoogle className="mr-[0.8rem]"/> sign in with google</button>

                <button onClick={anonymousSignIn} className="mt-4 flex items-center group">try anonymously <BsArrowRight className="ml-2 group-hover:translate-x-2 transition duration-500"/></button>

            </div>

        </div>
    )
}