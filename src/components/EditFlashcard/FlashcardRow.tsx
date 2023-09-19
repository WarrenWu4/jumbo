import { useRef } from "react";
import JumboInput from "../JumboInput";

interface FlashcardRowProps {
    cardText: string[];
    cardIndex: number;
}

export default function FlashcardRow({cardIndex, cardText}:FlashcardRowProps) {
    
    console.log(cardIndex)

    const addFace = () => {
        // let newCards = props.cards
        // const newIndex = Object.keys(newCards[props.id]).length
        // newCards[props.id][newIndex] = ""
        // console.log(newCards)
        // props.setCards(newCards)
    }

    return (
        <div className="flex w-full gap-x-4">
            {
                cardText.map((text:string, index:number) => {

                    const tempRef = useRef<HTMLTextAreaElement>(null);

                    return (
                        <JumboInput key={index} value={text} textRef={tempRef} className="w-full border-black dark:border-white dark:bg-black border-4 border-solid rounded-md text-base flex items-center px-4"  />
                    )
                })
            }
            <button type="button" onClick={addFace} className="text-xl bg-black dark:bg-white dark:text-black rounded-md text-white h-14 aspect-square">+</button>
        </div>
    )
}