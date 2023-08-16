import { MouseEventHandler } from "react";
import FlashcardFaceButtons from "./FlashcardFaceButtons";

interface FlashcardCardProps {
    cards: string[][]
    cardIndex: number;
    faceIndex: number;
    flipCard: MouseEventHandler<HTMLButtonElement>
}

export default function FlashcardCard({cards, cardIndex, faceIndex, flipCard}: FlashcardCardProps) {
    
    return (
        <button type="button" onClick={flipCard} className="w-full max-w-lg aspect-[7/5] border-4 border-solid border-black dark:border-white rounded-md p-2 mt-8 flex justify-center items-center relative">{cards[cardIndex][faceIndex]}

            <FlashcardFaceButtons cards={cards} cardIndex={cardIndex} currFace={faceIndex} />

        </button>
    )
}