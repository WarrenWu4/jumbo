import { useEffect, useState } from "react";
import GetTheme from "../../lib/GetTheme";
import FileCard from "../../components/FileCard/FileCard";
import Navbar from "../../components/Navbar/Navbar";

import { IoMdAdd } from "react-icons/io";
import EditFlashcard from "../../components/EditFlashcard/EditFlashcard";

export default function Dashboard() {

    // const { view_type, set_id } = useParams<string>()
    const [showView, setShowView] = useState<boolean>(false);
    const [flashcardSetComponent, setFlashcardSetComponent] = useState<JSX.Element>(<></>)

    GetTheme()

    useEffect(() => {
        const handleKeyDown = (e:any) => {
            if (e.key === "Escape") {
                console.log("Exiting view....")
                window.history.replaceState({}, "", `/`)
                setShowView(false);
            }

        }
        document.addEventListener("keydown", handleKeyDown, false);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        }
    }, [])

    const handleAddSet = () => {
        console.log("add set")
    }

    const renderView = (id:string) => {
        setShowView(true);
        setFlashcardSetComponent(<EditFlashcard set_id={id}/>)
    }

    return (
        <div className="w-screen h-screen overflow-x-hidden flex flex-col relative">

            <Navbar/>

            <div className="flex gap-4 px-12 flex-wrap">
                <FileCard title={"title"} description={"description here"} totalCards={0} starred={false} link={"TWhZb5VCk3qnculC3HF4"} setState={renderView}/>
            </div>

            <div className="mt-12 w-full text-center text-xl">
                <strong>shift + s</strong> to create a new flashcard set
            </div>

            <button type="button" onClick={handleAddSet} className="w-12 aspect-square rounded-full border-4 border-solid border-black flex items-center justify-center absolute bottom-[52px] right-[52px]">
                <IoMdAdd size={28} strokeWidth={12}/>
            </button>

            <div className={`w-screen h-screen overflow-hidden absolute bg-black/70 backdrop-blur-sm p-8 ${showView ? "flex": "hidden"}`}>
                <div className="w-full h-full bg-white rounded-xl">
                    {flashcardSetComponent}
                </div>
            </div>

        </div>
    )
}