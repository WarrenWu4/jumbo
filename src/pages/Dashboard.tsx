import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Flashcard from "../types/FlashcardTypes";
import MainLayout from "../layouts/MainLayout";
import LoadingPage from "./LoadingPage";

const Dashboard = () => {

    const [data, setData] = useState<Flashcard[] | undefined>();
    const userContext = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {

        const session_token = localStorage.getItem("session_token");
        if (session_token === null && userContext.user === null) nav("/login");

        // if logged in with jumbo then get data from db
        if (userContext.user !== null) {
        }

        // if logged in anonymously then get data from local storage
        if (session_token !== null) {
            const localData = localStorage.getItem("flashcards");
            if (localData === null) {
                setData([]);
            } else {
                const jsonData:Flashcard[] = JSON.parse(localData);
                setData(jsonData);
            }
        }

    }, [])

    if (data === undefined) {
        return <LoadingPage/>
    }

    return (
        <MainLayout>

            <a href="/flashcard/create" className="aspect-square text-center border-black border-4 rounded-md">+</a>

        </MainLayout>
    );
}

export default Dashboard;