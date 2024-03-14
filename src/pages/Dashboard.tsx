import { useEffect, useState } from "react"
import { Set, SetCardProps } from "../types"
import { FaStar, FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Dashboard() {

    const [setData, setSetData] = useState<Set[]>([])

    function fetchData() {
        // fetch data from local storage
        const data = localStorage.getItem("sets")
        if (data) {
            setSetData(JSON.parse(data))
        }
    }

    function deleteSet(id: string) {
        // delete set from local storage
        const data = localStorage.getItem("sets")
        if (data) {
            const parsedData = JSON.parse(data)
            const filteredData = parsedData.filter((set: Set) => set.id !== id)
            localStorage.setItem("sets", JSON.stringify(filteredData))
            setSetData(filteredData)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="w-full h-full flex justify-center items-center">

            <Link to={"/flashcard/create"} className="border-8 rounded-md p-4">
                <FaPlus/>
            </Link>

            {setData.map((set:Set, index:number) => {
                return <SetCard key={index} id={set.id} title={set.title} starred={set.starred} deleteSet={deleteSet} />
            })}

        </div>
    )
}

function SetCard({id, title, starred, deleteSet}: SetCardProps) {

    return (
        <div className="border-8 rounded-md w-full flex items-center justify-between">

            <div className="flex gap-x-3">
                {(starred) ? <FaStar/> : null}
                <div>{title}</div>
            </div>

            <div>
                <Link to={"/flashcard/view/"+id}>STUDY</Link>
                <Link to={"/flashcard/edit/"+id}>EDIT</Link>
                <button type="button" onClick={() => deleteSet(id)}>DELETE</button>
            </div>
        
        </div>
    )
}