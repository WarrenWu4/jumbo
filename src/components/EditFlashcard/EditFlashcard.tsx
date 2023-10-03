import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaClone } from "react-icons/fa"
import FlashcardRow from "./FlashcardRow";
import GetFlashcards from "../../lib/GetFlashcards";
import { updateFlashcards } from "../../lib/EditFlashcards";
import FlashcardSetData, { FlashcardMetaData, FlashcardSetMetaData, defaultFlashcardSetData } from "../../types/FlashcardSetTypes";
import JumboInput from "../JumboInput";

interface EditFlashcardProps {
    set_id: string;
}

export default function EditFlashcard({set_id}:EditFlashcardProps) {
    
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)
    const nav = useNavigate()

    const [loaded, setLoaded] = useState<boolean>(false)
    const [data, setData] = useState<FlashcardSetData>(defaultFlashcardSetData)

    // create a state that stores a copy of cards so saving/updating is easier
    const[cardsCopy, setCardsCopy] = useState<FlashcardMetaData[]>([])

    // only run once on mount
    useEffect(() => {

        console.count("EditFlashcard index.tsx useEffect")

        let subscribed = true
        setLoaded(false)

        const getData = async() => {
            if (!subscribed) return

            const dat = await GetFlashcards(set_id)

            if (dat.status === "400 ERROR") nav("/error")

            if (dat.metaData !== undefined && dat.cardData) {
                setData({metaData: dat.metaData, cardData: dat.cardData})
            }
            setLoaded(true)
        }

        getData()

        return () => {
            subscribed = false;
        }

    }, [set_id])


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
        console.log(data.cardData)
        alert("work in progress")
    }

    const addCard = () => {
        const tempFlashcards:FlashcardMetaData[] = [{
            cardText: ["", ""],
            cardCorrect: 0,
            cardStudied: 0,
            currBox: 0,
        }, ...data.cardData]
        setData({
            metaData: data.metaData,
            cardData: tempFlashcards
        })
    }

    return (
        <div className="w-full min-h-full overflow-y-scroll items-start flex text-4xl font-bold py-12 px-4 flex-col">

            {loaded && 
            <>
                <div className="flex w-full justify-between items-center">
                    <JumboInput value={data.metaData.title} textRef={titleRef} className={"w-full font-bold text-2xl border-4 border-solid border-black rounded-md px-4 py-2 mr-4 dark:border-white dark:bg-black"} />

                    <div className="w-fit h-fit flex [&>*]:mx-2">
                    <Link to={`/set/view/${set_id}`} className="h-[56px] aspect-square font-bold text-2xl border-4 border-solid border-black dark:border-white rounded-md flex items-center justify-center hover:bg-black transition duration-500 hover:text-white" ><FaClone size={24}/></Link>
                    </div>

                </div>
                
                <JumboInput value={data.metaData.desc} textRef={descRef} className={"h-[56px] mt-4 text-xl font-semibold w-full p-2 border-4 border-solid border-black rounded-md dark:border-white dark:bg-black"} />
            </>
            }

            <div className="text-3xl font-bold mt-8 flex w-full justify-between items-center">
                Cards:
                <button type="button" onClick={saveFlashcards} className="text-xl rounded-lg border-4 border-black border-solid px-3 py-1 hover:bg-black hover:text-white transition duration-500 dark:border-white dark:hover:bg-white dark:hover:text-black">save</button>    
            </div>

            <div className="w-full mt-4 flex flex-col gap-y-2">
                <button type="button" onClick={addCard} className="w-full rounded-md bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-700 border-4 border-solid border-black dark:border-white h-14 mb-2 flex justify-center items-center" >+</button>
                {loaded && (data.cardData !== undefined) &&
                    data.cardData.map((card:FlashcardMetaData, index:number) => {
                        return <FlashcardRow key={index} cardIndex={index} cardText={card.cardText}/>
                    })
                }
            </div>

        </div>
    )
}