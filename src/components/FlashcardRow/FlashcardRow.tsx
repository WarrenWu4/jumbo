interface FlashcardRowProps {
    cardText: string[];
    cardIndex: number;
}

export default function FlashcardRow({cardIndex, cardText}:FlashcardRowProps) {
    
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

                    const editCard = (e:any) => {
                        // setText(e.target.value)
                        // let newCards = cardText
                        // newCards[cardIndex][index] = e.target.value
                        // props.setCards(newCards)
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