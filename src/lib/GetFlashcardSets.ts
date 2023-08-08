import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default async function GetFlashcardSets (userId:string) {
    
    let data:any[] = []

    const snapshot = await getDocs(collection(db, `users/${userId}/sets`))
    snapshot.forEach((doc) => {
        data.push(doc)
    })
    
    return data
}