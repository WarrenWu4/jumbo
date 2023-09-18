// ! firebase doesn't support arrays of arrays so need to stringify shit
export default interface FlashcardSetData {
    cardData: FlashcardMetaData[];
    metaData: FlashcardSetMetaData;
}

export interface FlashcardSetMetaData {
    title: string;
    desc: string;
    numStudied: number;
}

/**
 * cardIndex: index of card in array
 * cardText: the faces of the flashcard
 * cardCorrect: number of correct recalls
 * cardStudied: total number of card encounters
 * currBox: which box the card is currently in (for leitner system)
 */
export interface FlashcardMetaData {
    cardText: string[];
    cardCorrect: number;
    cardStudied: number;
    currBox: number;
}

/**
 * default values for flashcard set
 */
export const defaultFlashcardSetData:FlashcardSetData = {
    cardData: [
        {
            cardText: ["", ""],
            cardCorrect: 0,
            cardStudied: 0,
            currBox: 0,
        },
        {
            cardText: ["", ""],
            cardCorrect: 0,
            cardStudied: 0,
            currBox: 0,
        },
    ],
    metaData: {
        title: "untitled",
        desc: "",
        numStudied: 0,
    }
}