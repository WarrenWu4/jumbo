import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { FaClone } from "react-icons/fa"
import FlashcardRow from "../../components/FlashcardRow/FlashcardRow";
import GetTheme from "../../lib/GetTheme";
import GetFlashcards from "../../lib/GetFlashcards";
import { updateFlashcards } from "../../lib/EditFlashcards";
import { FlashcardMetaData, FlashcardSetMetaData, defaultFlashcardSetData } from "../../types/FlashcardSetTypes";

export default function EditFlashcard() {

    const {set_id} = useParams<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [cardData, setCardData] = useState<FlashcardMetaData[]>(defaultFlashcardSetData.cardData)
    const [metaData, setMetaData] = useState<FlashcardSetMetaData>(defaultFlashcardSetData.metaData)
    const [docId, setDocId] = useState<string>()

    const titleRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLInputElement>(null)

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
        // const temp = {
        //     title: title,
        //     desc: desc,
        //     numStudied: data?.numStudied,
        //     numCards: cardNum,
        //     cards: cards,
        //     boxes: boxes!
        // }
        // await updateFlashcards(set_id!, temp)
        alert("saved!")
    }

    const changeTitle = (e:any) => {
        // setTitle(e.target.value)
    }
    const changeDesc = (e:any) => {
        // setDesc(e.target.value)
    }

    const addCard = () => {
        // setCardNum(cardNum+1)
        // // ! bug with multiple faces causing an error when trying to add cards
        // setCards([...cards, {0: "", 1:""}])
        // let tempBoxes = boxes
        // tempBoxes.box1.push(tempBoxes.box1.length)
        // setBoxes(tempBoxes)
        // console.log(boxes)
    }

    return (
        <div className="w-full min-h-screen overflow-y-scroll items-start flex text-4xl font-bold py-12 px-4 flex-col">

            <div className="flex w-full justify-between items-center">
                <input type="text" value={metaData?.title} className="w-full font-bold text-2xl border-4 border-solid border-black rounded-md px-4 py-2 mr-4 dark:border-white" ref={titleRef} onChange={changeTitle}/>
                <div className="w-fit h-fit flex [&>*]:mx-2">
                    <Link to={`/set/view/${set_id}`} className="h-[56px] aspect-square font-bold text-2xl border-4 border-solid border-black dark:border-white rounded-md flex items-center justify-center hover:bg-black transition duration-500 hover:text-white" ><FaClone size={24}/></Link>
                </div>
            </div>

            <input type="text" className="h-[56px] mt-4 text-xl font-semibold w-full p-2 border-4 border-solid border-black dark:border-white rounded-md" onChange={changeDesc} ref={descRef} value={metaData?.desc}/>

            <div className="text-3xl font-bold mt-8 flex w-full justify-between items-center">
                Cards:
                <button type="button" onClick={saveFlashcards} className="text-xl rounded-lg border-4 border-black border-solid px-3 py-1 hover:bg-black hover:text-white transition duration-500 dark:border-white dark:hover:bg-white dark:hover:text-black">save</button>    
            </div>

            <div className="w-full mt-4 flex flex-col gap-y-2">
                <button type="button" onClick={addCard} className="w-full rounded-md bg-black hover:bg-white text-white hover:text-black transition-all duration-700 border-4 border-solid border-black h-14 mb-2 flex justify-center items-center" >+</button>
                {loading &&
                    cardData.map((card:FlashcardMetaData, index:number) => {
                        return (<FlashcardRow key={index} cardIndex={card.cardIndex} cardText={card.cardText}/>)
                    })
                }
            </div>

        </div>
    )
}