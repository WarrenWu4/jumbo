import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const Login = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const nav = useNavigate();
    const userContext = useContext(AuthContext);

    useEffect(() => {
        // check if non-anonymous user is logged in
        if (userContext.user !== null) nav("/dashboard");

        // check if anonymous user is logged in
        const session_token = localStorage.getItem("session_token")
        if (session_token !== null) nav("/dashboard");

        setIsLoading(false);


    }, [])

    const signInWithGoogle = () => {
        alert("work in progress");
    }

    const signInAnonymously = () => {
        const session_token = crypto.randomUUID();
        localStorage.setItem("session_token", session_token.toString());
        nav("/dashboard");
    }

    return (
        <div className="w-full h-full py-8 px-4 flex flex-col">

            {isLoading ? 
                <Loading/>
            :
            <>
                <button onClick={signInWithGoogle} className="w-fit p-4 border-4 border-black rounded-md" type="button">login with google</button>  
                <button onClick={signInAnonymously} className="p-4 border-4 border-black rounded-md w-fit " type="button">login in anonymously</button>
            </>
            }

        </div>
    );
}

export default Login;