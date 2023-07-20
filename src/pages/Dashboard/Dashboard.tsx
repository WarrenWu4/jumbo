import Sidebar from "../../components/Sidebar"
import DashboardHome from "./DashboardHome"
import DashboardStar from "./DashboardStar"
import DashboardMarket from "./DashboardMarket"

import { useState, useMemo } from "react" 

interface DashboardProps {
    contentType: string;
}

export default function Dashboard(props:DashboardProps) {

    const [content, setContent] = useState(<DashboardHome/>)

    useMemo(() => {

        if (props.contentType === "star") {
            setContent(<DashboardStar/>)
        }
        else if (props.contentType === "market") {
            setContent(<DashboardMarket/>)
        }

    }, [content])

    return (
        <div className="flex w-screen h-screen bg-neutral-200 p-2">
            <Sidebar/>
            {content}
        </div>
    )
}