import { useEffect, useState } from "react"
import { Set, blankSet } from "../types";
import { useNavigate, useParams } from "react-router-dom";

export default function Study() {

    const nav = useNavigate();
    const [setData, setSetData] = useState<Set>(blankSet);
    const [currCard, setCurrCard] = useState<number>(0);
    const [currFace, setCurrFace] = useState<number>(0);
    const {setId} = useParams();

    // fetch data
    function fetchSet() {
        if (!setId) {
            nav("/error");
            return;
        }

        const current = localStorage.getItem(setId);
        if (!current) {
            nav("/error");
            return;
        }

        const parsed = JSON.parse(current);
        setSetData(parsed);
    }

    useEffect(() => {

        fetchSet();

    }, [])

    function prevCard() {
        // current set length
        if (currCard - 1 >= 0) {
            setCurrCard(currCard - 1);
        } else {
            setCurrCard(setData.flashcards.length - 1);
        }
    }

    function nextCard() {
        const setLen = setData.flashcards.length;
        if (currCard < setLen - 1) {
            setCurrCard(currCard + 1);
        } else {
            setCurrCard(0);
        
        }
    }
    
    function nextFace() {
        // current face length
        const faceLen = setData.flashcards[currCard].faces.length;
        if (currFace < faceLen - 1) {
            setCurrFace(currFace + 1);
        } else {
            setCurrFace(0);
        }
    }

    return (
        <div className="w-full h-full px-16 flex flex-col justify-center items-center gap-y-10">

            <div className="w-full flex justify-center items-center gap-x-10">

                <button type="button" onClick={prevCard}>
                
                </button>

                <button type="button" onClick={nextFace} className="border-8 rounded-md relative flex justify-center items-center font-bold text-2xl">

                    {setData.flashcards[currCard].faces[currFace]}

                </button>

                <button type="button" onClick={nextCard}>

                </button>

            </div>

            <div className="w-full rounded-md bg-gray-400 relative">
                <div className={`absolute top-0 left-0 h-full w-[${currCard/setData.flashcards.length}%]`}></div>
            </div>

        </div>
    )
}
