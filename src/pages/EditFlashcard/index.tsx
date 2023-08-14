import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DocumentData } from "firebase/firestore";
import { FaClone, FaRegClone } from "react-icons/fa"
import FlashcardRow from "../../components/FlashcardRow/FlashcardRow";
import GetTheme from "../../lib/GetTheme";
import GetFlashcards from "../../lib/GetFlashcards";
import { updateFlashcards } from "../../lib/EditFlashcards";

export default function EditFlashcard() {

    const {set_id} = useParams()
    const [data, setData] = useState<DocumentData>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {

        // setting theme
        GetTheme()

        // get flashcard data
        const getData = async() => {
            const response = await GetFlashcards(set_id!)
            setData(response.data?.data)
            setIsLoading(false)
        }

        getData()

    }, [])

    const saveFlashcards = async() => {
        await updateFlashcards(set_id!, data!)
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex">
            <Sidebar/>
            <div className="w-full h-full items-start flex text-4xl font-bold py-12 px-4 flex-col">

                <div className="flex w-full justify-between items-center">
                    <div className="w-full font-bold text-2xl border-4 border-solid border-black rounded-md px-4 py-2 mr-4 dark:border-white" >{data?.title}</div>
                    <div className="w-fit h-fit flex [&>*]:mx-2">
                        <button type="button" className="h-[56px] aspect-square font-bold text-2xl border-4 border-solid border-black dark:border-white rounded-md flex items-center justify-center" ><FaClone size={24}/></button>
                        <button type="button" className="h-[56px] aspect-square font-bold text-2xl border-4 border-solid border-black dark:border-white rounded-md flex items-center justify-center" ><FaRegClone size={24}/></button>
                    </div>
                </div>

                <div className="mt-4 text-xl font-semibold w-full p-2 border-4 border-solid border-black dark:border-white rounded-md">{data?.desc}</div>

                <div className="text-3xl font-bold mt-8 flex w-full justify-between items-center">
                    Cards:
                    <button type="button" onClick={saveFlashcards} className="text-xl rounded-lg border-4 border-black border-solid px-3 py-1 hover:bg-black hover:text-white transition duration-500 dark:border-white dark:hover:bg-white dark:hover:text-black">save</button>    
                </div>

                <div className="w-full mt-4 flex flex-col gap-y-2">
                    {!isLoading &&
                        data!.cards.map((card:Map<number, string>, index:number) => {
                            return (<FlashcardRow key={index} input={card} />)
                        })
                    }
                </div>

            </div>
        </div>
    )
}