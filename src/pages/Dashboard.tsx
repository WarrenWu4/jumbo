import { useEffect, useState } from "react"
import { Set, SetCardProps } from "../types"
import { FaStar, FaPlus, FaClone, FaTrash, FaEdit } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Dashboard() {

    const [data, setData] = useState<string[]>([]);

    function fetchData() {
        // fetch data from local storage
        const data = localStorage.getItem("sets");
        if (data) {
            setData(JSON.parse(data));
        }
    }

    function deleteSet(id: string) {
        // delete set from local storage
        const data = localStorage.getItem("sets");
        if (data) {
            const parsedData = JSON.parse(data);
            const filteredData = parsedData.filter((set: Set) => set.id !== id);
            localStorage.setItem("sets", JSON.stringify(filteredData));
            setData(filteredData);
            localStorage.removeItem(id);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">


            <div className="p-4 border-8 rounded-md mb-4 flex flex-col gap-y-4">
            {data.map((id:string, index:number) => {
                // fetch data from local storage
                const localData = localStorage.getItem(id);
                if (!localData)
                    return
                const set:Set = JSON.parse(localData);
                return <SetCard key={index} id={set.id} title={set.title} starred={set.starred} deleteSet={deleteSet} />
            })}
            </div>

            <Link to={"/flashcard/create"} className="border-8 rounded-md p-4 flex items-center font-bold gap-x-4">
                Create New Flashcard Set
                <FaPlus/>
            </Link>

        </div>
    )
}

function SetCard({id, title, starred, deleteSet}: SetCardProps) {

    return (
        <div className="p-4 gap-x-32 border-8 rounded-md w-full flex items-center justify-between">

            <div className="flex gap-x-3 font-bold text-xl">
                {(starred) ? <FaStar/> : null}
                <div>{title}</div>
            </div>

            <div className="flex gap-x-2 items-center text-xl">
                <Link to={"/flashcard/view/"+id}>
                    <FaClone/>
                </Link>
                <Link to={"/flashcard/edit/"+id}>
                    <FaEdit/>
                </Link>
                <button type="button" onClick={() => deleteSet(id)}>
                    <FaTrash/>
                </button>
            </div>
        
        </div>
    )
}