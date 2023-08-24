import { useEffect } from "react";
import GetTheme from "../../lib/GetTheme";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Dashboard() {

    useEffect(() => {

        GetTheme()


    }, [])

    return (
        <div className="w-screen h-screen overflow-x-hidden flex">
            <Sidebar/>
            Select/add a set to get started!
        </div>
    )
}