import { defaultFlashcardSetMetaData } from './../types/FlashcardSetTypes';
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../firebase"

interface AddFlashcardsProp {
    author: string;
    title: string;
    desc: string;
    numStudied: number;
    numCards: number;
    dateCreated: Date;
    starred: boolean;
    cards: string;
}

// add a new flashcard set
export default async function addFlashcards () {
    try {
        // get user id to identify author
        const userId = auth.currentUser!.uid
        // add flashcard meta data
        let setMetaDataCopy:AddFlashcardsProp = {
            author: userId,
            title: defaultFlashcardSetMetaData.title,
            desc: defaultFlashcardSetMetaData.desc,
            numStudied: defaultFlashcardSetMetaData.numStudied,
            numCards: defaultFlashcardSetMetaData.numCards,
            dateCreated: defaultFlashcardSetMetaData.dateCreated,
            starred: defaultFlashcardSetMetaData.starred,
            cards: JSON.stringify(defaultFlashcardSetMetaData.cards)
        }   
        const setDocRef = await addDoc(collection(db, `/users/${userId}/sets`), setMetaDataCopy)

        return {status: "200", data: {setDocRef: setDocRef.id}}
    } catch(e) {
        console.log("Error occurred adding flashcard set: ", e)
        return {status: "400", error: `Error occurred: ${e}`}
    }
}

// update an existing flashcard set
// export async function updateFlashcards (setId:string, flashData:FlashcardSetData) {
//     try {
//         const userId = auth.currentUser!.uid
//         await setDoc(doc(db, `/users/${userId}/sets/${setId}`), {
//             metaData: JSON.stringify(flashData.metaData),
//             cardData: JSON.stringify(flashData.cardData)
//         })
//         return {status: "200 SUCCESS"}
//     } catch(e) {
//         console.log("Error occurred updating flashcard set: ", e)
//         return {status: "400 ERROR"}
//     }
// }