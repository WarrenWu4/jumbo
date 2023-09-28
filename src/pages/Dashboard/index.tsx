import { useEffect, useState } from "react";
import GetTheme from "../../lib/GetTheme";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import EditFlashcard from "../../components/EditFlashcard/EditFlashcard";
import ViewFlashcard from "../../components/ViewFlashcard/ViewFlashcard";

export default function Dashboard() {

    const { view_type, set_id } = useParams<string>()
    const [component, setComponent] = useState<JSX.Element>(<></>)

    GetTheme()
    
    useEffect(() => {

        let subscribed = true


        if (subscribed) {
            if (view_type === undefined && set_id === undefined) {
                setComponent(<div className="w-full h-full flex justify-center items-center text-4xl font-bold text-center">click on a flashcard set to start editing!</div>)
            }
    
            else if (view_type === "edit" && set_id !== undefined) {
                setComponent(<EditFlashcard set_id={set_id} />)
            }
    
            else if (view_type === "view" && set_id !== undefined) {
                setComponent(<ViewFlashcard set_id={set_id}/>)
            }
        }

        console.count("Dashboard index.tsx useEffect")

        return () => {
            subscribed = false
        }

    }, [view_type, set_id])

    return (
        <div className="w-screen h-screen overflow-x-hidden flex">
            <Sidebar/>
            {component}
        </div>
    )
}