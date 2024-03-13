import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const nav = useNavigate();
    const signInWithGoogle = async () => {

    }

    const signInAnonymously = () => {
        const session_token = crypto.randomUUID();
        localStorage.setItem("session_token", session_token.toString());
        nav("/home");
    }

    if (isLoading) {
    }

    return (
        <div>

            <button onClick={signInWithGoogle} className="w-fit p-4 border-4 border-black rounded-md" type="button">login with google</button>  
            <button onClick={signInAnonymously} className="p-4 border-4 border-black rounded-md w-fit " type="button">login in anonymously</button>

        </div>
    );
}

export default Login;