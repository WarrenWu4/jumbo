import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import GetTheme from "../../lib/GetTheme";
import { useParams } from "react-router-dom";
import GetFlashcardSet from "../../lib/GetFlashcards";
import LeitnerRandomize, { NormalRandomize } from "../../lib/RandomizeFlashcards";
import { BsCheck, BsX } from "react-icons/bs"
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import FlashcardCard from "../../components/FlashcardCard/FlashcardCard";


export default function StudyFlashcard() {

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
                const res = NormalRandomize(response.data.data.cards)
                LeitnerRandomize(response.data.data.numStudied, response.data.data.boxes)
                setCardOrder(res.order)
            }
            setIsLoading(false)
        }

        getFlashcardData()

    }, [set_id])

    const correct = () => {
        // move to the next card index & reset face index
        if (cardIndex < data.numCards-1) {
            setCardIndex(cardIndex+1)
        }
        else {
            setCardIndex(0)
        }
        setFaceIndex(0)
    }
    const incorrect = () => {
        // move to the next card index & reset face index
        if (cardIndex < data.numCards-1) {
            setCardIndex(cardIndex+1)
        }
        else {
            setCardIndex(0)
        }
        setFaceIndex(0)
    }
    const flipCard = () => {
        const mapSize:number = Object.keys(data.cards[cardOrder[cardIndex]]).length
        if (faceIndex < mapSize-1) {
            setFaceIndex(faceIndex+1)
        }
        else {
            setFaceIndex(0)
        }
    }
    
    return (
        <div className="w-full h-full items-start flex text-4xl font-bold py-12 px-4 flex-col">
            <div className="w-full font-bold text-2xl border-4 border-solid border-black rounded-md px-4 py-2 mr-4" >{data.title}</div>

            <div className="w-full flex justify-center gap-x-4 items-center mb-6">
                <button type="button" onClick={incorrect} className="min-w-[64px] min-h-[64px] rounded-[50%] border-4 border-solid border-black dark:border-white flex justify-center items-center"><BsX size={24} strokeWidth={1}/></button>
                {!isLoading &&
                <FlashcardCard cards={data.cards} cardIndex={cardOrder[cardIndex]} faceIndex={faceIndex} flipCard={flipCard}  />
                }
                <button type="button" onClick={correct} className="min-w-[64px] min-h-[64px] rounded-[50%] border-solid border-4 border-black dark:border-white flex justify-center items-center"><BsCheck size={24} strokeWidth={1}/></button>
            </div>

            {!isLoading &&
                <ProgressBar currValue={cardIndex+1} maxValue={data.numCards} />
            }

        </div>
    )
}