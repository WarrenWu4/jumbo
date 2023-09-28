import { useRef, useState } from "react";
import JumboInput from "../JumboInput";

interface FlashcardRowProps {
    cardText: string[];
    cardIndex: number;
}

export default function FlashcardRow({cardIndex, cardText}:FlashcardRowProps) {
    
    const [data, setData] = useState<string[]>(cardText)    

    const addFace = () => {
        console.log(data)
        let tempData = data;
        tempData.push("test")
        if (tempData === data) console.log("e")
        console.log(tempData, data)
        setData(tempData)
    }

    return (
        <div className="flex w-full gap-x-4">
            {
                data.map((text:string, index:number) => {

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