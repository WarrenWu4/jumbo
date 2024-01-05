import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Flashcard from "../types/FlashcardTypes";

const Dashboard = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<Flashcard[]>([]);
    const userContext = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {

        const session_token = localStorage.getItem("session_token");
        if (session_token === null && userContext.user === null) nav("/login");
        setIsLoading(false);

        // if logged in with jumbo then get data from db
        if (userContext.user !== null) {
        }

        // if logged in anonymously then get data from local storage
        if (session_token !== null) {
            const data = localStorage.getItem("flashcards");
            
        }

    }, [])

    return (
        <div className="w-full h-full py-8 px-4 flex flex-col">

        </div>
    );
}

export default Dashboard;