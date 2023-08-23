import { Popover } from "@mui/material";
import { ReactElement, useRef, useState } from "react";
import { FaClone } from "react-icons/fa"
import { SlOptionsVertical } from "react-icons/sl"
import { NavLink, useNavigate } from "react-router-dom";
import deleteFlashcards from "../../lib/DeleteFlashcards";

interface SidebarCardProps {
    title:string;
    set_id:string;
    icon: ReactElement | undefined
}

export default function SidebarCard(props: SidebarCardProps) {

    const icon:ReactElement = ((props.icon === undefined) ? <FaClone/> : props.icon)

    const [settings, setSettings] = useState<boolean>(false)
    const settingsRef = useRef<HTMLButtonElement>(null)

    const nav = useNavigate()

    const handleClick = (e:any) => {
        e.preventDefault()
        setSettings((settings) ? false:true)
    }

    const deleteSet = async() => {
        // rerender or make sidebar card component reactive
        await deleteFlashcards(props.set_id)
        setSettings(false)
    }

    const handleStudy = () => {
        setSettings(false)
        nav(`/set/view/${props.set_id}`)
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
                    <button type="button" onClick={handleStudy} className="hover:bg-gray-200 w-full flex items-start px-4 py-2">
                        Study
                    </button>
                    <button type="button" onClick={deleteSet} className="hover:bg-gray-200 text-red-600 w-full flex items-start px-4 py-2">
                        Delete
                    </button>
                </div>
            </Popover>

        </div>
    )
}