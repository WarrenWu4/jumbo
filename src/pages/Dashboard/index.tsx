import { useEffect, useState } from "react";
import GetTheme from "../../lib/GetTheme";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import EditFlashcard from "../EditFlashcard";
import StudyFlashcard from "../StudyFlaschard";
import { FlashcardSets, defaultFlashcardSetData } from "../../types/FlashcardSetTypes";
import { GetMultipleFlashcards } from "../../lib/GetFlashcards";

export default function Dashboard() {

    const { view_type, set_id } = useParams<string>()
    const nav = useNavigate()
    const [loaded, setLoaded] = useState<boolean>(false);
    const [content, setContent] = useState<JSX.Element>(<></>)
    const [data, setData] = useState<FlashcardSets>({"abc": defaultFlashcardSetData})

    // ! onmount, load all data ONCE AND THEN UNSUBSCRIBE
    // ! ONLY UPDATE DB ON FLASHCARD EDIT SAVE!!!
    useEffect(() => {

        GetTheme()
        
        const getAllData = async() => {
            const response = await GetMultipleFlashcards()
            if (response.data !== undefined) {
                // Object.keys(response.data).forEach((dat) => {
                //     console.log(dat, response.data[dat].cardData)
                // })
                setData(response.data)
            } else {
                console.error("error getting data in Dashboard index.tsx...")
            }
            setLoaded(true);
        }

        getAllData()

    }, [])

    useEffect(() => {

        if (view_type === undefined && set_id === undefined) {
            setContent(
                <div className="w-full h-screen flex justify-center items-center text-4xl font-bold py-12 px-4">
                    Select/add a set to get started!
                </div>
            )
        }
        else if (view_type === "edit" && set_id !== undefined) {
        setContent(<EditFlashcard set_id={set_id} data={data[set_id]}/>)
        }
        else if (view_type === "view" && set_id !== undefined) {
            setContent(<StudyFlashcard/>)
        }
        else {
            nav("/error")
        }

    }, [view_type, set_id])

    return (
        <div className="w-screen h-screen overflow-x-hidden flex">
            {loaded &&
            <>
                <Sidebar data={data}/>
                {console.log(content)}
                {content}
            </>
            }
        </div>
    )
}