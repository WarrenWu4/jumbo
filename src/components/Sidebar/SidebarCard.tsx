import { Popover } from "@mui/material";
import { ReactElement, useRef, useState } from "react";
import { FaClone } from "react-icons/fa"
import { SlOptionsVertical } from "react-icons/sl"
import { Link, NavLink } from "react-router-dom";

interface SidebarCardProps {
    title:string;
    set_id:string;
    icon: ReactElement | undefined
}

export default function SidebarCard(props: SidebarCardProps) {

    const icon:ReactElement = ((props.icon === undefined) ? <FaClone/> : props.icon)

    const [settings, setSettings] = useState<boolean>(false)
    const settingsRef = useRef<HTMLButtonElement>(null)

    const handleClick = (e:any) => {
        e.preventDefault()
        setSettings((settings) ? false:true)
    }

    const deleteSet = () => {
        alert("wip")
    }

    return (
        <div  className="w-full flex justify-between items-center">

            <NavLink to={`/set/edit/${props.set_id}`} className="flex items-center [&>*]:mr-2 w-full">
                {icon} {props.title}
            </NavLink>

            <button ref={settingsRef} type="button" onClick={handleClick} className="pl-2 h-full">
                <SlOptionsVertical />
            </button>

            <Popover
                open={settings}
                anchorEl={settingsRef.current}
                onClose={() => setSettings(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                elevation={0}
            >
                <div className="mb-4 flex flex-col text-base border-2 border-solid border-black dark:border-white">
                    <Link to={`/set/view/${props.set_id}`} className="hover:bg-gray-200 w-full flex items-start px-4 py-2">
                        Study
                    </Link>
                    <button type="button" onClick={deleteSet} className="hover:bg-gray-200 text-red-600 w-full flex items-start px-4 py-2">
                        Delete
                    </button>
                </div>
            </Popover>

        </div>
    )
}