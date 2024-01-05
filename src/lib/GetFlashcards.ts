import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { auth, db } from "../firebase"
import FlashcardSetData, { FlashcardSetMetaData } from "../types/FlashcardTypes"

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

export async function GetSetsMetaData () {
    try {
        const userId = auth.currentUser!.uid
        // ! should only get all the docs once
        const snapshot = await getDocs(collection(db, `/users/${userId}/sets`))
        let tempData:FlashcardSetMetaData[] = []
        let tempDocId:string[] = []

        snapshot.forEach((document) => {
            tempDocId.push(document.id)
            tempData.push(JSON.parse(document.data().metaData))
        })

        return {status: "200 SUCCESS", metaData: tempData, docId: tempDocId}
    } catch(e) {
        console.log("Error occurred getting multiple flashcards: ", e)
        return {status: "400 ERROR"}
    }
}