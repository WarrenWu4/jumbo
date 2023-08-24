import { useEffect, useState } from "react";
import GetTheme from "../../lib/GetTheme";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import EditFlashcard from "../EditFlashcard";
import StudyFlashcard from "../StudyFlaschard";

export default function Dashboard() {

    const [type, set_id] = useLocation().pathname.split("/").slice(2, 4)

    const [content, setContent] = useState<JSX.Element>(<></>)


    useEffect(() => {

        GetTheme()

        if (type === undefined) {
            setContent(
                <div className="w-full h-screen flex justify-center items-center text-4xl font-bold py-12 px-4">
                    Select/add a set to get started!
                </div>
            )
        }
        else if (type === "edit") {
            setContent(<EditFlashcard/>)
        }
        else if (type === "view") {
            setContent(<StudyFlashcard/>)
        }

    }, [type, set_id])

    return (
        <div className="w-screen h-screen overflow-x-hidden flex">
            <Sidebar/>
            {content}
        </div>
    )
}