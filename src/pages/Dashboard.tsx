import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { TbArrowBigDownLines, TbArrowBigUpLines } from "react-icons/tb";
import { PiCardsBold, PiPencilSimpleBold, PiStarBold, PiStarFill, PiTrashBold } from "react-icons/pi";
import Flashcard from "../types/FlashcardTypes";
import CenteredLayout from "../layouts/CenteredLayout";

const testData:Flashcard[] = [
    {
        id: "1",
        title: "Test 1",
        num_studied: 0,
        starred: false,
        card_refs: [""]
    },
    {
        id: "2",
        title: "Test 2",
        num_studied: 0,
        starred: false,
        card_refs: [""]
    },
    {
        id: "3",
        title: "Test 3",
        num_studied: 0,
        starred: false,
        card_refs: [""]
    },
    {
        id: "4",
        title: "Test 4",
        num_studied: 0,
        starred: false,
        card_refs: [""]
    },
    {
        id: "5",
        title: "Test 5",
        num_studied: 0,
        starred: false,
        card_refs: [""]
    },
    {
        id: "6",
        title: "Test 6",
        num_studied: 0,
        starred: false,
        card_refs: [""]
    },
    {
        id: "7",
        title: "Test 7",
        num_studied: 0,
        starred: false,
        card_refs: [""]
    },
    {
        id: "8",
        title: "Test 8",
        num_studied: 0,
        starred: false,
        card_refs: [""]
    },
    {
        id: "9",
        title: "Test 9",
        num_studied: 0,
        starred: false,
        card_refs: [""]
    },
    {
        id: "10",
        title: "Test 10",
        num_studied: 0,
        starred: false,
        card_refs: [""]
    },
    {
        id: "11",
        title: "Test 11",
        num_studied: 0,
        starred: false,
        card_refs: [""]
    },
]

export default function Dashboard() {

    const [data, setData] = useState<Flashcard[]>(testData);
    const userContext = useContext(AuthContext);
    const nav = useNavigate();

    function updateStarred(setId:string) {
        setData(data.map((set:Flashcard) => {
            if (set.id === setId) {
                return {
                    ...set,
                    starred: !set.starred
                }
            } else {
                return set;
            }
        }))
    }

    return (
        <CenteredLayout>

            <div className="w-full h-full flex flex-col items-center overflow-y-scroll relative scrollbar gap-y-6">

                <div className="sticky px-8 w-full flex justify-between bg-black/80 backdrop-blur-md py-6">

                    <TbArrowBigUpLines size={28} className="animate-bounce-fade-up"/>
                    <TbArrowBigUpLines size={28} className="animate-bounce-fade-up"/>
                    <TbArrowBigUpLines size={28} className="animate-bounce-fade-up"/>

                </div>

                {
                    data.map((flashSet:Flashcard) => {
                        return (
                            <FlashcardSetCard
                                key={flashSet.id}
                                {...flashSet}
                                updateStarred={updateStarred}
                            />
                        )
                    })
                }

                

                <div className="sticky bottom-0 px-8 w-full flex justify-between bg-black/80 backdrop-blur-md py-6">

                    <TbArrowBigDownLines size={28} className="animate-bounce-fade-down"/>
                    <TbArrowBigDownLines size={28} className="animate-bounce-fade-down"/>
                    <TbArrowBigDownLines size={28} className="animate-bounce-fade-down"/>

                </div>

            </div>


        </CenteredLayout>
    );
}

interface FlashcardSetCardProps {
    id: string;
    title: string;
    starred: boolean;
    updateStarred: (setId:string) => void;
}

function FlashcardSetCard({id, title, starred, updateStarred}: FlashcardSetCardProps) {
    return (
        <div className={twMerge("w-full flex justify-between items-center p-4 rounded-lg border-4")}>
            
            <div className="flex gap-x-2 items-center text-xl font-semibold">

                <button type="button" onClick={() => updateStarred(id)}>
                    {(starred) ? <PiStarFill size={24} />:<PiStarBold size={24}/>}
                </button>

                {title}
            </div>

            <div className="flex gap-x-2 items-center">

                <div className="flex p-2 border-2 rounded-md items-center text-lg">
                    <PiCardsBold />
                </div>

                <div className="flex p-2 border-2 rounded-md items-center text-lg">
                    <PiPencilSimpleBold  />
                </div>

                <div className="flex p-2 border-2 rounded-md items-center text-lg">
                    <PiTrashBold  />
                </div>

            </div>


        </div>
    )
}
