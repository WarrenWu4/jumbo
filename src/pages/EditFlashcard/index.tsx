import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaClone } from "react-icons/fa"
import FlashcardRow from "../../components/FlashcardRow/FlashcardRow";
import GetTheme from "../../lib/GetTheme";
import GetFlashcards from "../../lib/GetFlashcards";
import { updateFlashcards } from "../../lib/EditFlashcards";
import { FlashcardMetaData, FlashcardSetMetaData, defaultFlashcardSetData } from "../../types/FlashcardSetTypes";
import JumboInput from "../../components/JumboInput";

export default function EditFlashcard() {

    const {set_id} = useParams<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [cardData, setCardData] = useState<FlashcardMetaData[]>(defaultFlashcardSetData.cardData)
    const [metaData, setMetaData] = useState<FlashcardSetMetaData>(defaultFlashcardSetData.metaData)
    const [docId, setDocId] = useState<string>()

    const titleRef = useRef<HTMLTextAreaElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)

    // rerender flashcard data if any rows change
    // const [rerender, setRerender] = useState<boolean>(false)

    useEffect(() => {

        // setting theme
        GetTheme()

        // get flashcard data
        const getData = async() => {
            if (set_id === undefined) {
                console.error("set_id is undefined...");
                return
            }
            const response = await GetFlashcards(set_id)
            if (response.cardData !== undefined && response.metaData !== undefined && response.docId !== undefined) {
                setCardData(response.cardData)
                setMetaData(response.metaData)
                setDocId(response.docId)
            } else {
                console.error(`status code ${response.status}...`)
                return
            }
            setLoading(true)
        }
        
        setLoading(false)
        getData()

    }, [set_id])

    const saveFlashcards = async() => {
        let tempMetaData:FlashcardSetMetaData = metaData
        if (titleRef.current !== null && descRef.current !== null) {
            tempMetaData.title = titleRef.current.defaultValue
            tempMetaData.desc = descRef.current.defaultValue
        } 
        if (set_id !== undefined) {
            await updateFlashcards(set_id, {metaData: tempMetaData, cardData:cardData})
        } else {
            console.error("set_id is undefined...")
        }
        alert("saved!")
    }

    const addCard = () => {
        const tempFlashcard:FlashcardMetaData = {
            cardText: ["", ""],
            cardCorrect: 0,
            cardStudied: 0,
            currBox: 0,
        }
        setCardData([...cardData, tempFlashcard])
    }

    return (
        <div className="w-full min-h-screen overflow-y-scroll items-start flex text-4xl font-bold py-12 px-4 flex-col">

            <div className="flex w-full justify-between items-center">

                <JumboInput value={metaData.title} textRef={titleRef} className={"w-full font-bold text-2xl border-4 border-solid border-black rounded-md px-4 py-2 mr-4 dark:border-white"} />


                <div className="w-fit h-fit flex [&>*]:mx-2">
                    <Link to={`/set/view/${set_id}`} className="h-[56px] aspect-square font-bold text-2xl border-4 border-solid border-black dark:border-white rounded-md flex items-center justify-center hover:bg-black transition duration-500 hover:text-white" ><FaClone size={24}/></Link>
                </div>
            </div>

            <JumboInput value={metaData.desc} textRef={descRef} className={"h-[56px] mt-4 text-xl font-semibold w-full p-2 border-4 border-solid border-black rounded-md"} />

            <div className="text-3xl font-bold mt-8 flex w-full justify-between items-center">
                Cards:
                <button type="button" onClick={saveFlashcards} className="text-xl rounded-lg border-4 border-black border-solid px-3 py-1 hover:bg-black hover:text-white transition duration-500 dark:border-white dark:hover:bg-white dark:hover:text-black">save</button>    
            </div>

            <div className="w-full mt-4 flex flex-col gap-y-2">
                <button type="button" onClick={addCard} className="w-full rounded-md bg-black hover:bg-white text-white hover:text-black transition-all duration-700 border-4 border-solid border-black h-14 mb-2 flex justify-center items-center" >+</button>
                {loading &&
                    cardData.map((card:FlashcardMetaData, index:number) => {
                        return (<FlashcardRow key={index} cardIndex={index} cardText={card.cardText}/>)
                    })
                }
            </div>

        </div>
    )
}