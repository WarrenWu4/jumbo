import { ReactElement } from "react";
import { FaClone } from "react-icons/fa"
import { NavLink } from "react-router-dom";

interface SidebarCardProps {
    title:string;
    set_id:string;
    icon: ReactElement | undefined
}

export default function SidebarCard(props: SidebarCardProps) {

    const icon:ReactElement = ((props.icon === undefined) ? <FaClone/> : props.icon)

    return (
        <NavLink to={`/set/edit/${props.set_id}`} className="w-full flex justify-between items-center">

            <div className="flex items-center [&>*]:mr-2">
                {icon} {props.title}
            </div>

        </NavLink>
    )
}