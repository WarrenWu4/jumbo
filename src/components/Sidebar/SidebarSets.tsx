import { useNavigate } from "react-router-dom"
import addFlashcards from "../../lib/EditFlashcards"
import { collection, getCountFromServer } from "firebase/firestore"
import { auth, db } from "../../firebase"
import { useEffect, useState } from "react"
import SidebarCard from "./SidebarCard"
import deleteFlashcards from "../../lib/DeleteFlashcards"
import { FlashcardSetMetaData, defaultFlashcardSetData } from "../../types/FlashcardSetTypes"
import { GetSetsMetaData } from "../../lib/GetFlashcards"

export default function SidebarSets() {

    const nav = useNavigate()

    const addSetVerify = async() => {
        const user = auth.currentUser
        const userId = auth.currentUser?.uid
        // if user is able to add more sets
        // if user is anyonymous only allow 1 set (we need to fking save db storage bro ;-;)
        // if regular user, allow 20 sets
        const snapshot = await getCountFromServer(collection(db, `users/${userId}/sets`))
        const totSets = snapshot.data().count
        if ((user?.isAnonymous && totSets < 1) || (!user?.isAnonymous && totSets < 20)) {
            addSet()
        }
        // otherwise show an error
        // else {
        //     setError({"show":true, "msg":"exceeded max allowed sets"})
        // }
    }

    const addSet = async() => {
        const response = await addFlashcards()
        nav(`/set/edit/${response.docId}`)
    }

    const deleteSet = async(set_id:string) => {
        await deleteFlashcards(set_id)
        nav(`/`)
    }

    const [loaded, setLoaded] = useState<boolean>(false)
    // ! set data is not validated which may cause issues
    const [data, setData] = useState<FlashcardSetMetaData[]>([defaultFlashcardSetData.metaData])
    const [links, setLinks] = useState<string[]>([""])

    useEffect(() => {

        console.count("SidebarSets.tsx useEffect")

        let subscribed = true;

        const getData = async() => {
            // only run if connection goes through 
            if (!subscribed) return

            const dat = await GetSetsMetaData()

            if (dat.metaData !== undefined && dat.docId !== undefined) {
                setData(dat.metaData)
                setLinks(dat.docId)
            } else {
                console.error("Error getting data in SidebarSets.tsx...")
            }
            setLoaded(true);
        }

        getData()

        return () => {
            subscribed = false;
        }

    }, [])

    return (
        <div className="flex flex-col gap-y-4 mt-8">
            <div className="flex items-center text-xl font-bold">
                Sets
            </div>
            <div className="flex flex-col gap-y-2 ml-4">

                {loaded && 
                    data.map((data:FlashcardSetMetaData, index:number) => {
                        return <SidebarCard key={index} title={data.title} set_id={links[index]} deleteSet={deleteSet}/>
                    })
                }

            </div>

            <button type="button" onClick={addSetVerify} className="w-full flex items-center justify-center mt-4 border-4 rounded-lg border-solid border-black dark:border-white font-black text-xl" >
                +
            </button>

        </div>
    )
}