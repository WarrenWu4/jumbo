// ! firebase doesn't support arrays of arrays so need to stringify shit
export default interface FlashcardSetData {
    cardData: FlashcardMetaData[];
    metaData: FlashcardSetMetaData;
}

export interface FlashcardSetMetaData {
    title: string;
    desc: string;
    numStudied: number;
    numCards: number;
}

/**
 * cardIndex: index of card in array
 * cardText: the faces of the flashcard
 * cardCorrect: number of correct recalls
 * cardStudied: total number of card encounters
 * currBox: which box the card is currently in (for leitner system)
 */
export interface FlashcardMetaData {
    cardIndex: number;
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
            cardIndex: 0,
            cardText: ["", ""],
            cardCorrect: 0,
            cardStudied: 0,
            currBox: 0,
        },
        {
            cardIndex: 0,
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
        numCards: 2,
    }
}