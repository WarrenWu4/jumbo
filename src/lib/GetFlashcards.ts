import { DocumentData, collection, doc, getDoc, getDocs } from "firebase/firestore"
import { auth, db } from "../firebase"

interface FlashcardDataInfo {
    data:DocumentData
    docId: string
}

export default async function GetFlashcards (setId:string) {

    try {
        const userId = auth.currentUser!.uid
        const snapshot = await getDoc(doc(db, `/users/${userId}/sets/${setId}`))
        const data:FlashcardDataInfo = {
            data: snapshot.data()!, docId:snapshot.id
        }
        return {status: "200 SUCCESS", data: data}
    } catch(e) {
        console.log("Error occurred getting multiple flashcards: ", e)
        return {status: "400 ERROR"}
    }
}

export async function GetMultipleFlashcards () {
    try {
        const userId = auth.currentUser!.uid
        let data:FlashcardDataInfo[] = []
        const snapshotQuery = await getDocs(collection(db, `/users/${userId}/sets`))
        snapshotQuery.forEach((document) => {
            data.push({
                data: document.data(),
                docId: document.id
            })
        })
        return {status: "200 SUCCESS", data: data}
    } catch(e) {
        console.log("Error occurred getting multiple flashcards: ", e)
        return {status: "400 ERROR"}
    }
}