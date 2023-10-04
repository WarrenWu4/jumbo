import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaClone } from "react-icons/fa"
import FlashcardRow from "./FlashcardRow";
import GetFlashcards from "../../lib/GetFlashcards";
import JumboInput from "../JumboInput";
import { FlashcardMetaData } from "../../types/FlashcardSetTypes";

interface EditFlashcardProps {
    link: string;
    title: string;
    desc: string;
    cards: FlashcardMetaData[];
}

export default function EditFlashcard({link, title, desc, cards}:EditFlashcardProps) {
    
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)

    const [data, setData] = useState<FlashcardMetaData[]>(cards)

    const saveFlashcards = async() => {
        // let tempMetaData:FlashcardSetMetaData = data.metaData
        // if (titleRef.current !== null && descRef.current !== null) {
        //     tempMetaData.title = titleRef.current.defaultValue
        //     tempMetaData.desc = descRef.current.defaultValue
        // } 
        // if (set_id !== undefined) {
        //     await updateFlashcards(set_id, {metaData: tempMetaData, cardData:data.cardData})
        // } else {
        //     console.error("set_id is undefined...")
        // }
        alert("work in progress")
    }

    const addCard = () => {
    //     const tempFlashcards:FlashcardMetaData[] = [{
    //         cardText: ["", ""],
    //         cardCorrect: 0,
    //         cardStudied: 0,
    //         currBox: 0,
    //     }, ...data.cardData]
    //     setData({
    //         metaData: data.metaData,
    //         cardData: tempFlashcards
    //     })
    }

    const handleViewSet = () => {
        console.log("Studying the set...")
    }

    return (
        <div className="w-full min-h-full overflow-y-scroll items-start flex text-4xl font-bold py-12 px-4 flex-col">

            <div className="flex w-full justify-between items-center">
                <JumboInput value={title} textRef={titleRef} className={"w-full font-bold text-2xl border-4 border-solid border-black rounded-md px-4 py-2 mr-4 dark:border-white dark:bg-black"} />

                <div className="w-fit h-fit flex [&>*]:mx-2">
                <button type="button" onClick={handleViewSet} className="h-[56px] aspect-square font-bold text-2xl border-4 border-solid border-black dark:border-white rounded-md flex items-center justify-center hover:bg-black transition duration-500 hover:text-white" ><FaClone size={24}/></button>
                </div>

            </div>
            
            <JumboInput value={desc} textRef={descRef} className={"h-[56px] mt-4 text-xl font-semibold w-full p-2 border-4 border-solid border-black rounded-md dark:border-white dark:bg-black"} />

            <div className="text-3xl font-bold mt-8 flex w-full justify-between items-center">
                Cards:
                <button type="button" onClick={saveFlashcards} className="text-xl rounded-lg border-4 border-black border-solid px-3 py-1 hover:bg-black hover:text-white transition duration-500 dark:border-white dark:hover:bg-white dark:hover:text-black">save</button>    
            </div>

            <div className="w-full mt-4 flex flex-col gap-y-2">
                <button type="button" onClick={addCard} className="w-full rounded-md bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-700 border-4 border-solid border-black dark:border-white h-14 mb-2 flex justify-center items-center" >+</button>
                {
                    data.map((card:FlashcardMetaData, index:number) => {
                        return <FlashcardRow key={index} cardIndex={index} cardText={card.cardText}/>
                    })
                }
            </div>

        </div>
    )
}