import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { TbArrowBigDownLines, TbArrowBigUpLines } from "react-icons/tb";
import { PiCardsBold, PiPencilSimpleBold, PiStarBold, PiStarFill, PiTrashBold } from "react-icons/pi";

export default function Dashboard() {

    return (
        <div>

            <div className={`w-full h-full flex flex-col items-center relative scrollbar gap-y-6 ${(false) ? "overflow-y-hidden" : "overflow-y-scroll"}`}>

                <div className="sticky px-8 w-full flex justify-between bg-black/80 backdrop-blur-md py-6">

                    <TbArrowBigUpLines size={28} className="animate-bounce-fade-up"/>
                    <TbArrowBigUpLines size={28} className="animate-bounce-fade-up"/>
                    <TbArrowBigUpLines size={28} className="animate-bounce-fade-up"/>

                </div>
                

                <div className="sticky bottom-0 px-8 w-full flex justify-between bg-black/80 backdrop-blur-md py-6">

                    <TbArrowBigDownLines size={28} className="animate-bounce-fade-down"/>
                    <TbArrowBigDownLines size={28} className="animate-bounce-fade-down"/>
                    <TbArrowBigDownLines size={28} className="animate-bounce-fade-down"/>

                </div>

                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center w-full h-full ${(false) ? "flex" : "hidden"}`}>

                    <div className="bg-black rounded-md p-4">

                        Are you sure you want to delete this set?

                        <div className="flex gap-x-2">

                            <button type="button" onClick={() => console.log("deleted")}>Yes</button>
                            <button type="button">No</button>

                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
}

interface FlashcardSetCardProps {
    id: string;
    title: string;
    starred: boolean;
    updateStarred: (setId:string) => void;
    deleteSet: (setId:string) => void;
}

function FlashcardSetCard({id, title, starred, updateStarred, deleteSet}: FlashcardSetCardProps) {
    return (
        <div className={twMerge("w-full flex justify-between items-center p-4 rounded-lg border-4")}>
            
            <div className="flex gap-x-2 items-center text-xl font-semibold">

                <button type="button" onClick={() => updateStarred(id)}>
                    {(starred) ? <PiStarFill size={24} />:<PiStarBold size={24}/>}
                </button>

                {title}
            </div>

            <div className="flex gap-x-2 items-center">

                <a href={`/flashcard/study/${id}`} className="flex p-2 border-2 rounded-md items-center text-lg">
                    <PiCardsBold />
                </a>

                <a href={`/flashcard/edit/${id}`} className="flex p-2 border-2 rounded-md items-center text-lg">
                    <PiPencilSimpleBold  />
                </a>

                <button type="button" onClick={() => deleteSet(id)} className="flex p-2 border-2 rounded-md items-center text-lg">
                    <PiTrashBold  />
                </button>

            </div>


        </div>
    )
}
