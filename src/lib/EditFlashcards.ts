import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase"
import FlashcardSetData, { defaultFlashcardSetData } from "../types/FlashcardTypes"

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

// update an existing flashcard set
export async function updateFlashcards (setId:string, flashData:FlashcardSetData) {
    try {
        const userId = auth.currentUser!.uid
        await setDoc(doc(db, `/users/${userId}/sets/${setId}`), {
            metaData: JSON.stringify(flashData.metaData),
            cardData: JSON.stringify(flashData.cardData)
        })
        return {status: "200 SUCCESS"}
    } catch(e) {
        console.log("Error occurred updating flashcard set: ", e)
        return {status: "400 ERROR"}
    }
}