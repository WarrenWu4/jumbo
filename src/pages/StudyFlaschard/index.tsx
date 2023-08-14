import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DocumentData } from "firebase/firestore";
import GetTheme from "../../lib/GetTheme";
import { useNavigate, useParams } from "react-router-dom";
import GetFlashcardSet from "../../lib/GetFlashcards";
import LeitnerRandomize from "../../lib/RandomizeFlashcards";


export default function StudyFlaschard() {

    const {set_id} = useParams()
    const [data, setData] = useState<DocumentData>({
        boxes: {}, cards: [], desc: "", numCards:0, numStudied:0, title:"Untitled"
    })
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [cardOrder, setCardOrder] = useState<number[]>([])
    const [cardIndex, setCardIndex] = useState<number>(0)
    const [faceIndex, setFaceIndex] = useState<number>(0)

    useEffect(() => {

        // setting theme
        GetTheme()

        // get flashcard data
        const getFlashcardData = async() => {
            const response = await GetFlashcardSet(set_id!)
            if (response.data !== undefined) {
                setData(response.data.data)
                const res = LeitnerRandomize(response.data.data.amountStudied, response.data.data.boxes)
                setCardOrder(res.order)
            }
            setIsLoading(false)
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
                <div className="w-full font-bold text-2xl border-4 border-solid border-black rounded-md px-4 py-2 mr-4" >{data.title}</div>

                <div className="w-full flex justify-center gap-x-4 items-center">
                    <button type="button" onClick={correct} className="w-16 h-16 rounded-[50%] border-solid border-4 border-black dark:border-white flex justify-center items-center">a</button>
                    {!isLoading &&
                        <div className="w-full max-w-lg aspect-[7/5] border-4 border-solid border-black dark:border-white rounded-md p-2 mt-8">{data.cards[cardOrder[cardIndex]][faceIndex]}</div>
                    }
                    <button type="button" onClick={incorrect} className="w-16 h-16 rounded-[50%] border-4 border-solid border-black dark:border-white flex justify-center items-center">b</button>
                </div>

            </div>
        </div>
    )
}