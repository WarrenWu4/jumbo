import { useState } from "react"

export default function FlashcardRow(props: {id:number, input:Map<number, string>, cards:any, setCards:Function}) {
    
    const addFace = () => {
        console.log("wip")
    }
    return (
        <div className="flex w-full gap-x-4">
            {
                Object.entries(props.input).map((e, index) => {

                    const [text, setText] = useState(e[1])
                    const editCard = (e:any) => {
                        setText(e.target.value)
                        let newCards = props.cards
                        newCards[props.id][index] = text
                        props.setCards(newCards)
                    }

                    return (
                        <input key={index} type="text" value={text} onChange={editCard} className="w-full border-black border-4 border-solid rounded-md text-base flex items-center px-4"/>
                    )
                })
            }
            <button type="button" onClick={addFace} className="text-xl bg-black rounded-md text-white h-14 aspect-square">+</button>
        </div>
    )
}