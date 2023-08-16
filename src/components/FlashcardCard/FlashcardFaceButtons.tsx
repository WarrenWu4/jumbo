
interface FlashcardFaceButtonsProps {
    cards: string[][]
    cardIndex: number
    currFace: number
}

export default function FlashcardFaceButtons({cards, cardIndex, currFace}: FlashcardFaceButtonsProps) {

    const buttons = Object.entries(cards[cardIndex]).map((arr:any) => {
        return (
            <div key={arr[0]} className={`text-base w-8 h-8 rounded-[50%] flex items-center justify-center ${(currFace === Number(arr[0])) ? " bg-black text-white " : " border-4 border-solid border-black"}`}>
                {arr[0]}
            </div>
        )
    })

    return (
        <div className="absolute bottom-4 left-4 flex gap-x-2">
            {buttons}
        </div>
    )
}