import { ReactElement } from "react";
import { FaClone } from "react-icons/fa"

interface SidebarCardProps {
    title:string;
    set_id:string;
    icon: ReactElement | undefined
}

export default function SidebarCard(props: SidebarCardProps) {

    const icon:ReactElement = ((props.icon === undefined) ? <FaClone/> : props.icon)

    return (
        <a href={`/set/edit/${props.set_id}`} target="_self" className="w-full flex justify-between items-center">

            <div className="flex items-center [&>*]:mr-2">
                {icon} {props.title}
            </div>

        </a>
    )
}