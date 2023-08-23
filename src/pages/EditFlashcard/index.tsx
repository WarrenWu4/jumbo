import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { FaClone } from "react-icons/fa"
import FlashcardRow from "../../components/FlashcardRow/FlashcardRow";
import GetTheme from "../../lib/GetTheme";
import GetFlashcards from "../../lib/GetFlashcards";
import { updateFlashcards } from "../../lib/EditFlashcards";

export default function EditFlashcard() {

    const {set_id} = useParams()
    const [data, setData] = useState<DocumentData>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [title, setTitle] = useState<string>("")
    const [desc, setDesc] = useState<string>("")

    const titleRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLInputElement>(null)

    const [cards, setCards] = useState<any>()
    const [cardNum, setCardNum] = useState<number>(0)

    const [boxes, setBoxes]  = useState<any>()

    useEffect(() => {

        // setting theme
        GetTheme()

        // get flashcard data
        const getData = async() => {
            const response = await GetFlashcards(set_id!)
            setData(response.data?.data)
            setTitle(response.data?.data.title)
            setDesc(response.data?.data.desc)
            setCards(response.data?.data.cards)
            setCardNum(response.data?.data.numCards)
            setBoxes(response.data?.data.boxes)
            setIsLoading(false)
        }
        
        setIsLoading(true)
        getData()

    }, [set_id])

    const saveFlashcards = async() => {
        const temp = {
            title: title,
            desc: desc,
            numStudied: data?.numStudied,
            numCards: cardNum,
            cards: cards,
            boxes: boxes!
        }
        await updateFlashcards(set_id!, temp)
        alert("saved!")
    }

    const changeTitle = (e:any) => {
        setTitle(e.target.value)
    }
    const changeDesc = (e:any) => {
        setDesc(e.target.value)
    }

    const addCard = () => {
        setCardNum(cardNum+1)
        // ! bug with multiple faces causing an error when trying to add cards
        setCards([...cards, {0: "", 1:""}])
        let tempBoxes = boxes
        tempBoxes.box1.push(tempBoxes.box1.length)
        setBoxes(tempBoxes)
        console.log(boxes)
    }

    return (
        <div className="w-full min-h-screen overflow-y-scroll items-start flex text-4xl font-bold py-12 px-4 flex-col">

            <div className="flex w-full justify-between items-center">
                <input type="text" value={(data === undefined) ? "":title} className="w-full font-bold text-2xl border-4 border-solid border-black rounded-md px-4 py-2 mr-4 dark:border-white" ref={titleRef} onChange={changeTitle}/>
                <div className="w-fit h-fit flex [&>*]:mx-2">
                    <Link to={`/set/view/${set_id}`} className="h-[56px] aspect-square font-bold text-2xl border-4 border-solid border-black dark:border-white rounded-md flex items-center justify-center hover:bg-black transition duration-500 hover:text-white" ><FaClone size={24}/></Link>
                </div>
            </div>

            <input type="text" className="mt-4 text-xl font-semibold w-full p-2 border-4 border-solid border-black dark:border-white rounded-md" onChange={changeDesc} ref={descRef} value={(data === undefined) ? "":desc}/>

            <div className="text-3xl font-bold mt-8 flex w-full justify-between items-center">
                Cards:
                <button type="button" onClick={saveFlashcards} className="text-xl rounded-lg border-4 border-black border-solid px-3 py-1 hover:bg-black hover:text-white transition duration-500 dark:border-white dark:hover:bg-white dark:hover:text-black">save</button>    
            </div>

            <div className="w-full mt-4 flex flex-col gap-y-2">
                <button type="button" onClick={addCard} className="w-full rounded-md bg-black hover:bg-white text-white hover:text-black transition-all duration-700 border-4 border-solid border-black h-14 mb-2 flex justify-center items-center" >+</button>
                {!isLoading &&
                    cards.map((card:Map<number, string>, index:number) => {
                        return (<FlashcardRow key={index} id={index} input={card} cards={cards} setCards={setCards}/>)
                    })
                }
            </div>

        </div>
    )
}