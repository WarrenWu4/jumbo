import { useParams } from "react-router-dom"
import Sidebar from "./Sidebar/Sidebar"
import { useEffect, useMemo, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

export default function EditSet() {
    
    const { set_id } = useParams()
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const user = getAuth().currentUser

    useEffect(() => {
        
        const getData = async() => {
            const snapshot = await getDoc(doc(db, `users/${user!.uid}/sets`, set_id!))
            if (snapshot.exists()) {
                const data = snapshot.data()
                setTitle(data.title)
                setDesc(data.desc)
            }
            else {
                console.log("Error getting data")
            }
        }

        getData()


    }, [])

    useMemo(() => {

        const updateTitle = async() => {
            await updateDoc(doc(db, `users/${user!.uid}/sets`, set_id!), {
                title: title
            })
        }

        updateTitle()

    }, [title])
    useMemo(() => {

        const updateDesc = async() => {
            await updateDoc(doc(db, `users/${user!.uid}/sets`, set_id!), {
                desc: desc
            })
        }

        updateDesc()

    }, [desc])
    
    return (
        <div className="flex w-screen h-screen bg-neutral-200 p-2">

            <Sidebar/>

            <div className="w-full h-full rounded-lg ml-2 bg-white flex flex-col relative p-6">

                <div className="flex">

                    <div></div>

                    <div className="flex flex-col [&>*]:my-2">

                        <input type="text" className="border-2 border-solid border-black w-40 h-10 px-2 py-1" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <input type="text" className="border-2 border-solid border-black w-40 h-80 px-2 py-1" value={desc} onChange={(e) => setDesc(e.target.value)}/>

                    </div>

                </div>

            </div>

        </div>
    )
}