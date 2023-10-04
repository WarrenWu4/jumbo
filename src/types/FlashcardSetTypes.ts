// ! firebase doesn't support arrays of arrays so need to stringify shit
export default interface FlashcardSetMetaData {
    id: string;
    author: string;
    title: string;
    desc: string;
    numStudied: number;
    numCards: number;
    dateCreated: Date;
    starred: boolean;
    cards: FlashcardMetaData[];
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
 * default values for flashcard set meta data and flashcard meta data
 */
export const defaultFlashcardSetMetaData:FlashcardSetMetaData = {
    id: "",
    author: "unknown",
    title: "title",
    desc: "description",
    numStudied: 0,
    numCards: 2,
    dateCreated: new Date(),
    starred: false,
    cards: [{
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
    }]
}
