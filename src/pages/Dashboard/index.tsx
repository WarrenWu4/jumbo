import { useEffect, useState } from "react";
import GetTheme from "../../lib/GetTheme";
import FileCard from "../../components/FileCard/FileCard";
import Navbar from "../../components/Navbar/Navbar";

import { IoMdAdd } from "react-icons/io";
import EditFlashcard from "../../components/EditFlashcard/EditFlashcard";
import FlashcardSetMetaData from "../../types/FlashcardSetTypes";
import { GetSetsMetaData } from "../../lib/GetFlashcards";
import addFlashcards from "../../lib/EditFlashcards";

export default function Dashboard() {

    // const { view_type, set_id } = useParams<string>()
    const [showView, setShowView] = useState<boolean>(false);
    const [flashcardSetComponent, setFlashcardSetComponent] = useState<JSX.Element>(<></>)
    const [data, setData] = useState<FlashcardSetMetaData[]>()
    const [setAdded, setSetAdded] = useState<boolean>(false)

    GetTheme()

    useEffect(() => {
        let subscribed = true;
        const handleKeyDown = (e:any) => {
            if (e.key === "Escape") {
                console.log("Exiting view....")
                window.history.replaceState({}, "", `/`)
                setShowView(false);
            }
        }
        const getData = async () => {
            if(subscribed) {
                console.log("Getting user flashcard data...")
                const snapshot = await GetSetsMetaData()
                if (snapshot.data !== undefined) {
                    setData(snapshot.data.sets)
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown, false);
        getData()
        return () => {
            subscribed = false;
            setSetAdded(false);
            document.removeEventListener("keydown", handleKeyDown, false);
        }
    }, [setAdded])

    const handleAddSet = async () => {
        try {
            await addFlashcards()
            setSetAdded(true)
            console.log("Successfully added flashcard set!")
        } catch (e) {
            console.log("Error occurred:", e)
        }
    }

    const renderView = (type:string, index:number) => {
        setShowView(true);
        if (type === "edit" && data !== undefined) {
            setFlashcardSetComponent(<EditFlashcard title={data[index].title} link={data[index].id} desc={data[index].desc} cards={data[index].cards}/>)
        }
    }

    return (
        <div className="w-screen h-screen overflow-x-hidden flex flex-col relative">

            <Navbar/>

            <div className="flex gap-4 px-12 flex-wrap">
                {(data !== undefined) ? 
                    data.map((info, index) => {
                        return <FileCard key={info.id} title={info.title} description={info.desc} totalCards={info.numCards} starred={info.starred} link={info.id} index={index} setState={renderView}/>
                    })
                    :
                    <></>
                }
            </div>

            <div className="mt-12 w-full text-center text-xl">
                <strong>shift + s</strong> to create a new flashcard set
            </div>
                
            <button type="button" onClick={handleAddSet} className="w-12 aspect-square rounded-full border-4 border-solid border-black dark:border-white flex items-center justify-center absolute bottom-[52px] right-[52px]">
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