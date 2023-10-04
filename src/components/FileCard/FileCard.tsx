import { PiCards } from "react-icons/pi"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

interface FileCardProps {
    title: string;
    description: string;
    totalCards: number;
    starred: boolean;
    link: string;
    setState: Function;
    index: number;
}

const FileCard = ({title, description, totalCards, starred, link, setState, index}: FileCardProps) => {
    
    const handlePathChange = () => {
        // change url (purely visual doesn't actually load data yet)
        window.history.replaceState({}, "", `/set/edit/${link}`)
        // change state which will actually load shit
        setState("edit", index)
    }

    return (
        <button type="button" onClick={handlePathChange} className="w-[288px] h-[160px] px-4 py-3 border-solid border-black dark:border-white border-4 rounded-xl">

            <div className="w-full h-full flex flex-col justify-between">

                <div className="flex flex-col">
                    <div className="w-full flex items-center">
                        <PiCards size={28}/>
                        <h1 className="ml-2 font-bold text-xl">{title}</h1>
                    </div>
                    <div className="w-full text-left">{description}</div>
                </div>

                <div className="flex justify-between items-center">
                    {starred ? <AiFillStar size={28}/> : <AiOutlineStar size={28}/>}
                    <div className="flex items-center font-medium text-xl gap-x-1">
                        {totalCards} 
                        <PiCards size={28}/>
                    </div>
                </div>

            </div>

        </button>
    )
}

export default FileCard;