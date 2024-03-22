import { useEffect, useState } from "react"
import { Set, blankSet } from "../types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoArrowUndo } from "react-icons/io5";

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

            <Link to={"/dashboard"} className="w-full flex items-center gap-x-2 font-bold text-2xl">
                <IoArrowUndo/>
                Dashboard
            </Link>

            <div className="w-full flex justify-center items-center gap-x-10 max-w-screen-lg">

                <button type="button" onClick={prevCard} className="w-12 h-12 text-4xl">
                    <FaArrowLeft/>
                </button>

                <button type="button" onClick={nextFace} className="w-full aspect-[5/3] border-8 rounded-md relative flex justify-center items-center font-bold text-2xl">

                    {setData.flashcards[currCard].faces[currFace]}

                    <div className="absolute bottom-4 left-4 flex gap-x-2">
                        {
                            setData.flashcards[currCard].faces.map((_, index:number) => {
                                return <div className="rounded-full w-3 h-3" style={{background: (currFace == index) ? "#B087D9" : "white"}}/>
                            })
                        }
                    </div>
                </button>

                <button type="button" onClick={nextCard} className="w-12 h-12 text-4xl">
                    <FaArrowRight/>
                </button>

            </div>

            <div className="w-full h-2 rounded-md bg-gray-400 relative">
                <div className={`absolute top-0 left-0 h-full bg-green-400`} style={{width: currCard/setData.flashcards.length*100+"%"}}></div>
            </div>

        </div>
    )
}
