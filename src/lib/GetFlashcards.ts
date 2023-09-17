import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { auth, db } from "../firebase"
import FlashcardSetData, { FlashcardSets } from "../types/FlashcardSetTypes"

export default async function GetFlashcards (setId:string) {

    try {
        const userId = auth.currentUser!.uid
        const snapshot = await getDoc(doc(db, `/users/${userId}/sets/${setId}`))
        const snapshotData = snapshot.data()
        if (snapshotData !== undefined) {
            const tempData:FlashcardSetData = {
                metaData: JSON.parse(snapshotData.metaData),
                cardData: JSON.parse(snapshotData.cardData),
            }
            return {status: "200 SUCCESS", docId: snapshot.id, cardData: tempData.cardData, metaData: tempData.metaData}
        } else {
            return {status: "400 ERROR"}
        }
    } catch(e) {
        console.log("Error occurred getting multiple flashcards: ", e)
        return {status: "400 ERROR"}
    }
}

export async function GetMultipleFlashcards () {
    try {
        const userId = auth.currentUser!.uid
        // ! should only get all the docs once
        const snapshotQuery = await getDocs(collection(db, `/users/${userId}/sets`))
        let tempData:FlashcardSets = {} 
        snapshotQuery.forEach((document) => {
            tempData[document.id] = { 
                metaData: JSON.parse(document.data().metaData), 
                cardData: JSON.parse(document.data().cardData)
            }
        })
        return {status: "200 SUCCESS", data: tempData}
    } catch(e) {
        console.log("Error occurred getting multiple flashcards: ", e)
        return {status: "400 ERROR"}
    }
}