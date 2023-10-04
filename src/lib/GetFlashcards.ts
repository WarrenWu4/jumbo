import { collection, getDocs } from "firebase/firestore"
import { auth, db } from "../firebase"
import FlashcardSetMetaData from "../types/FlashcardSetTypes"

export default async function GetFlashcards (setId:string) {
    console.log(setId)
    try {
        // const userId = auth.currentUser!.uid
        // const snapshot = await getDoc(doc(db, `/users/${userId}/sets/${setId}`))
        // const snapshotData = snapshot.data()
        // if (snapshotData !== undefined) {
        //     const tempData:FlashcardSetData = {
        //         metaData: JSON.parse(snapshotData.metaData),
        //         cardData: JSON.parse(snapshotData.cardData),
        //     }
        //     return {status: "200 SUCCESS", docId: snapshot.id, cardData: tempData.cardData, metaData: tempData.metaData}
        // } else {
        // return {status: "400 ERROR"}
        // }
    } catch(e) {
        console.log("Error occurred getting multiple flashcards: ", e)
        return {status: "400 ERROR"}
    }
}

export async function GetSetsMetaData () {
    try {
        const userId = auth.currentUser!.uid
        // try to get data from localstorage first
        const snapshot = await getDocs(collection(db, `/users/${userId}/sets`))
        let tempData:FlashcardSetMetaData[] = []
        snapshot.forEach((doc) => {
            tempData.push({
                id: doc.id,
                author: doc.data().author,
                title: doc.data().title,
                desc: doc.data().desc,
                numStudied: doc.data().numStudied,
                numCards: doc.data().numCards,
                dateCreated: doc.data().dateCreated,
                starred: doc.data().starred,
                cards: JSON.parse(doc.data().cards)
            })
        })
        return {status: "200", data: {sets: tempData}}
    } catch(e) {
        console.log("Error occurred getting multiple flashcards: ", e)
        return {status: "400", error: `Error occurred: ${e}`}
    }
}