import { useEffect, useState, ReactElement } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { auth, db } from "../../firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { FaClone, FaRegClone } from "react-icons/fa"
import FlashcardRow from "../../components/FlashcardRow/FlashcardRow";

export default function EditFlashcard() {

    const {set_id} = useParams()
    const [flashData, setFlashData] = useState<DocumentData>({cards: {0:[""]}, desc:"", numOfCards:1, title:""})

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
            const snapshot = await getDoc(doc(db, `users/${userId}/sets/${set_id}`))
            const data = snapshot.data()
            if (data === undefined) {
                console.log("Error fetching data: data undefined")
            }
            else {
                setFlashData(data)
            }
        }

        getFlashcardData()

    }, [])

    const renderFlashcard = () => {
        let flashcards: ReactElement[] = []
        console.log("running")
        for(let i=0;i<flashData.numOfCards;i++) {
            flashcards.push(<FlashcardRow row={flashData.cards[i]} />)
        }

        return (flashcards)
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex">
            <Sidebar/>
            <div className="w-full h-full items-start flex text-4xl font-bold py-12 px-4 flex-col">

                <div className="flex w-full justify-between items-center">
                    <div className="w-full font-bold text-2xl border-4 border-solid border-black rounded-md px-4 py-2 mr-4" >{flashData.title}</div>
                    <div className="w-fit h-fit flex [&>*]:mx-2">
                        <button type="button" className="h-[56px] aspect-square font-bold text-2xl border-4 border-solid border-black rounded-md flex items-center justify-center" ><FaClone size={24}/></button>
                        <button type="button" className="h-[56px] aspect-square font-bold text-2xl border-4 border-solid border-black rounded-md flex items-center justify-center" ><FaRegClone size={24}/></button>
                    </div>
                </div>

                <div className="mt-4 text-xl font-semibold w-full p-2 border-4 border-solid border-black rounded-md">{flashData.desc}</div>

                <div className="text-3xl font-bold mt-8">Cards:</div>

                <div className="w-full mt-4 flex flex-col gap-y-2">
                    {
                        renderFlashcard().map((e) => e)
                    }
                </div>

            </div>
        </div>
    )
}