import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Content(props:{content:JSX.Element}) {

    const [mainElement, setMainElement] = useState<JSX.Element>(props.content)

    useEffect(() => {
        setMainElement(props.content)
    }, [props.content])

    return (
        <div className="w-screen h-screen overflow-hidden flex">
            <Sidebar/>
            {mainElement}
        </div>
    )
}