import { deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "../firebase"


export default async function deleteFlashcards (setId: string) {
    try {
        const userId = auth.currentUser!.uid
        await deleteDoc(doc(db, `users/${userId}/sets/${setId}`))
        return {status: "200 SUCCESS"}
    } catch(e) {
        console.log("Error occurred deleting flashcard: ", e)
        return {status: "400 ERROR"}
    }
}