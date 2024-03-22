import { useEffect, useState } from "react";
import { Flashcard, JumboInputProps, JumboInputRowProps, Set, blankSet } from "../types";
import { FaArrowDown, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function FlashcardCreate() {

    const nav = useNavigate();
    const { setId } = useParams();
    const [setData, setSetData] = useState<Set>(blankSet);
    const [popup, setPopup] = useState<boolean>(false);

    function fetchData() {
        if (!setId) {
            nav("/error");
            return
        }

        const localSetData = localStorage.getItem(setId);
        if (!localSetData) {
            nav("/error");
            return
        }
        setSetData(JSON.parse(localSetData));
    }

    useEffect(() => {
        fetchData();
    }, [])

    function updateTitle(e:any) {
        const newTitle = e.target.value;
        setSetData({...setData, title: newTitle});
    }

    function saveSet() {
        // update data for the set in localstorage
        // save set to localstorage via id
        localStorage.setItem(setData.id, JSON.stringify(setData));
        nav("/dashboard");   
    }

    function addFlashcard() {
        const newFlashcard = {
            faces: ["", ""],
            correct: 0,
            incorrect: 0
        }
        setSetData({...setData, flashcards: [newFlashcard, ...setData.flashcards]});
    }

    function deleteFlashcard(row:number) {
        const updated = setData.flashcards.filter((_flashcard:Flashcard, index:number) => index !== row);
        setSetData({...setData, flashcards: updated});
    }

    function addFace(row:number) {
        const updated = setData.flashcards.map((flashcard:Flashcard, index:number) => {
            if (index === row) {
                return {...flashcard, faces: [...flashcard.faces, ""]}
            }
            return flashcard;
        })
        setSetData({...setData, flashcards: updated});
    }

    function updateFace(row:number, col:number, e:any) {
        const newFace = e.target.value;
        const updated = setData.flashcards.map((flashcard:Flashcard, i:number) => {
            if (i === row) {
                const updatedFaces = flashcard.faces.map((face:string, j:number) => {
                    if (j === col) {
                        return newFace;
                    }
                    return face;
                })
                return {...flashcard, faces: updatedFaces}
            }
            return flashcard;
        })
        setSetData({...setData, flashcards: updated});
    }

    function deleteFace(row: number, col:number) {
        const updated = setData.flashcards.map((flashcard:Flashcard, i:number) => {
            if (i === row) {
                const updatedFaces = flashcard.faces.filter((_face:string, j:number) => j !== col);
                return {...flashcard, faces: updatedFaces};
            }
            return flashcard;
        })
        setSetData({...setData, flashcards: updated});
    }

    return (
        <div className="w-full h-full flex flex-col py-16">

            <div className="w-full mb-8 flex items-end justify-between">
                <input className="px-6 py-4 font-bold text-2xl border-8 rounded-md bg-dark text-light" placeholder="title" value={setData.title} onChange={updateTitle}/>
                <div className="flex gap-x-4">
                    <button className="px-6 py-2 border-8 border-error rounded-md text-error font-bold text-2xl hover:bg-error hover:text-dark duration-300" type="button" onClick={() => setPopup(true)}>
                        exit
                    </button>
                    <button className="px-6 py-2 border-8 border-success rounded-md text-success font-bold text-2xl hover:bg-success hover:text-dark duration-300" type="button" onClick={saveSet}>
                        save
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-y-6">
                <button className="w-full border-8 rounded-md flex justify-between items-center px-10 py-5 mb-6" type="button" onClick={addFlashcard}>
                    <FaArrowDown/>
                    <FaPlus/>
                    <FaArrowDown/>
                </button>
                {setData.flashcards.map((flashcard:Flashcard, index:number) => {
                    return <JumboInputRow faces={flashcard.faces} row={index} addFace={addFace} key={index} updateFace={updateFace} deleteFlashcard={deleteFlashcard} deleteFace={deleteFace}/>
                })}
            </div>

            <div className={twMerge("absolute w-screen h-screen justify-center items-center bg-black/60 backdrop-blur-lg top-0 left-0", (popup) ? "flex" : "hidden")}>
                <div className="p-8 border-8 rounded-md flex flex-col gap-y-8 items-center font-bold text-xl">
                    Are you sure you want to exit?
                    <br/>
                    Your current edits will not be saved

                    <div className="w-full flex items-center justify-between">
                        <Link to={"/dashboard"}>yes</Link>
                        <button type="button" onClick={() => setPopup(false)}>no</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

function JumboInputRow({row, faces, addFace, updateFace, deleteFace, deleteFlashcard}: JumboInputRowProps) {

    return (
        <div className="flex gap-x-4 items-center">
            <button className="w-20 h-20 border-8 rounded-md flex items-center justify-center" type="button" onClick={() => deleteFlashcard(row)}>
                <FaTrash/>
            </button>
            {faces.map((face:string, index:number) => {
                return <JumboInput face={face} key={index} row={row} col={index} updateFace={updateFace} deleteFace={deleteFace}/>
            })}
            <button className="w-20 h-20 border-8 rounded-md flex items-center justify-center" type="button" onClick={() => addFace(row)}>
                <FaPlus/>
            </button>
        </div>
    )
}

function JumboInput({row, col, face, updateFace, deleteFace}: JumboInputProps) {
    return (
        <div className="flex gap-x-4 items-center px-6 py-4 text-light border-8 rounded-md ">
            <input className="bg-dark text-lg font-bold" placeholder={"add text"} value={face} onChange={(e) => updateFace(row, col, e)}/>
            <button type="button" onClick={() => deleteFace(row, col)}>
                <FaTrash/>
            </button>
        </div>
    )
}