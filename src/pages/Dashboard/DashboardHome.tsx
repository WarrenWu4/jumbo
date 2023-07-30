import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function DashboardHome() {
    
    const navigate = useNavigate()
    const user = getAuth().currentUser

    const addSet = async () => {
        const docRef = await addDoc(collection(db, `users/${user!.uid}/sets`), {
            title: "",
            desc: "",
            star: false,
            cards: {0: {0:"", 1:""}},
        })
        navigate(`/set/edit/${docRef.id}`)
    }

    useEffect(() => {

        const getData = async() => {
            // const snapshot = await getDocs(collection(db, `users/${user!.uid}/sets`))
        }
        getData()


    }, [])

    return (
        <>
            <div className="w-full h-full rounded-lg ml-2 bg-white flex flex-col relative">
                
                <div className="flex justify-between items-center py-6 px-6">
                    
                    <button onClick={addSet} type="button" className="border-2 border-solid border-black px-3 py-2">New Set</button>

                    <div className="text-2xl font-bold">Dashboard</div>
                </div>

                <div className="flex flex-wrap gap-4 p-6">

                </div>

            </div>

        </>
    )
}