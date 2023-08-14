import { DocumentData, addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase"

// add a new flashcard set
export default async function addFlashcards () {
    try {
        const userId = auth.currentUser!.uid
        const docRef = await addDoc(collection(db, `/users/${userId}/sets/`), {
            title: "Untitled",
            desc: "Insert description here",
            numStudied: 0,
            numCards: 2,
            cards: [{0:"", 1:""}, {0:"", 1:""}],
            boxes: {box1: [0, 1], box2:[], box3:[], box4:[], box5:[]}
        })
        return {status: "200 SUCCESS", docId: docRef.id}
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
export async function updateFlashcards (setId:string, flashData:FlashcardData|DocumentData) {
    try {
        const userId = auth.currentUser!.uid
        await updateDoc(doc(db, `/users/${userId}/sets/${setId}`), {
            flashData
        })
        return {status: "200 SUCCESS"}
    } catch(e) {
        console.log("Error occurred updating flashcard set: ", e)
        return {status: "400 ERROR"}
    }
}