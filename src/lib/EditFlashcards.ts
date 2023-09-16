import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase"
import { defaultFlashcardSetData } from "../types/FlashcardSetTypes"

// add a new flashcard set
export default async function addFlashcards () {
    try {
        // * want to stringify meta data and card data separately to reduce amount written to db when editing
        const userId = auth.currentUser!.uid
        const docRef = await addDoc(collection(db, `/users/${userId}/sets/`), {
            cardData: JSON.stringify(defaultFlashcardSetData.cardData),
            metaData: JSON.stringify(defaultFlashcardSetData.metaData)
        })
        return {status: "200 SUCCESS", docId: docRef.id, cardData: defaultFlashcardSetData.cardData, metaData: defaultFlashcardSetData.metaData}
    } catch(e) {
        console.log("Error occurred adding flashcard set: ", e)
        return {status: "400 ERROR"}
    }
}

interface FlashcardData {
    title: string;
    desc: string;
    numStudied: number;
    numCards: number;
    cards: string[][];
    boxes: Map<string, number[]>
}

// update an existing flashcard set
export async function updateFlashcards (setId:string, flashData:FlashcardData) {
    try {
        const userId = auth.currentUser!.uid
        await setDoc(doc(db, `/users/${userId}/sets/${setId}`), {
            title: flashData.title,
            desc: flashData.desc,
            numStudied: flashData.numStudied,
            numCards: flashData.numCards,
            cards: flashData.cards,
            boxes: flashData.boxes
        })
        return {status: "200 SUCCESS"}
    } catch(e) {
        console.log("Error occurred updating flashcard set: ", e)
        return {status: "400 ERROR"}
    }
}