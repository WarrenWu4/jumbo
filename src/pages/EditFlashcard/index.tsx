import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function EditFlashcard() {

    const {set_id} = useParams()

    useEffect(() => {

        // setting theme
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
        }

        // get flashcard data
        const getFlashcardData = async() => {
            const userId = auth.currentUser?.uid
            const data = await getDoc(doc(db, `users/${userId}/sets`))
        }

    }, [])

    return (
        <div className="w-screen h-screen overflow-hidden flex">
            <Sidebar/>
            <div>

            </div>
        </div>
    )
}