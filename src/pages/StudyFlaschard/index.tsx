import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DocumentData } from "firebase/firestore";
import GetTheme from "../../lib/GetTheme";
import { auth } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import GetFlashcardSet from "../../lib/GetFlashcards";


export default function StudyFlaschard() {

    const {set_id} = useParams()
    const [flashData, setFlashData] = useState<DocumentData>({cards: {box1: {0:["", ""]}}, desc:"", numOfCards:1, amountStudy:1, title:""})
    const [randomized, setRandomized] = useState({box1: {0:["", ""]}})
    const navigate = useNavigate()

    useEffect(() => {

        // setting theme
        GetTheme()

        // get flashcard data
        const getFlashcardData = async() => {
            const userId = auth.currentUser?.uid
            const data = await GetFlashcardSet(userId!, set_id!)
            if (data === undefined) {
                console.log("Error fetching data: data undefined")
                navigate("/error")
            }
            else {
                setFlashData(data)
                // test randomized to make sure data is shaped correctly
                // setRandomized(RandomizeFlashcards(flashData.amountStudy, flashData.cards))
            }
        }

        getFlashcardData()

    }, [])

    const correct = () => {

    }
    const incorrect = () => {

    }
    
    return (
        <div className="w-screen h-screen overflow-hidden flex">
            <Sidebar/>
            <div className="w-full h-full items-start flex text-4xl font-bold py-12 px-4 flex-col">
                <div className="w-full font-bold text-2xl border-4 border-solid border-black rounded-md px-4 py-2 mr-4" >{flashData.title}</div>

                <div className="w-full flex justify-center gap-x-4 items-center">
                    <button type="button" onClick={correct} className="w-16 h-16 rounded-[50%] border-solid border-4 border-black dark:border-white flex justify-center items-center">a</button>
                    <div className="w-full max-w-lg aspect-[7/5] border-4 border-solid border-black dark:border-white rounded-md p-2 mt-8"></div>
                    <button type="button" onClick={incorrect} className="w-16 h-16 rounded-[50%] border-4 border-solid border-black dark:border-white flex justify-center items-center">b</button>
                </div>

            </div>
        </div>
    )
}