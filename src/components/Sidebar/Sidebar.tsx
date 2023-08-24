import { useContext, useEffect, useRef, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { BsFillGearFill, BsGoogle, BsQuestionCircle } from "react-icons/bs";
import SidebarCard from "./SidebarCard";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, getCountFromServer } from "firebase/firestore";
import { IoClose } from "react-icons/io5";
import { Popover } from "@mui/material";

import addFlashcards from "../../lib/EditFlashcards";
import { GetMultipleFlashcards } from "../../lib/GetFlashcards";
import { AuthContext } from "../../App";

import { JumboUserProfile } from "../../App";
import SidebarHeader from "./SidebarHeader";
import SidebarSets from "./SidebarSets";
import PremiumButton from "./PremiumButton";
import UserProfile from "./ProfileDisplay";
import ProfileDisplay from "./ProfileDisplay";


export default function Sidebar() {

    // const [userProfile, setUserProfile] = useState<UserProfile>({name:"", imgPath:""})
    const [collectionData, setCollectionData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    
    const [error, setError] = useState({"show": false, "msg":""})
    const navigate = useNavigate()    
    





    const userProfile = useContext<JumboUserProfile | null>(AuthContext)

    useEffect(() => {

        const getData = async() => {
            
        }

        // const loadData = async() => {

        //     const user = auth.currentUser

        //     // if user is anonymous
        //     if (user?.isAnonymous) {
        //         setUserProfile({
        //             name: "Anonymous",
        //             imgPath: "/favicon.ico"
        //         })
        //         // !set 30 day deletion warning
        //         setError({"show":true, "msg":"account will be deleted in 30 days"})
        //     }

        //     // otherwise use the users settings
        //     else {
        //         setUserProfile({
        //             name: user?.displayName!,
        //             imgPath: user?.photoURL!
        //         })
        //     }

        //     const response = await GetMultipleFlashcards()
        //     setCollectionData(response.data!)

        //     setIsLoading(false)

        // }

        // loadData()

    }, [])

    return (
        <div className="h-full hidden md:flex flex-col gap-y-2 full max-w-[288px] w-full px-2 py-12 relative">
            
            <div className="h-full border-black/40 dark:border-white/40 border-r-4 border-solid flex flex-col justify-between px-5 py-4">

                <div className="flex flex-col">

                    <SidebarHeader/>

                    <SidebarSets/>

                </div>

                <div className="w-full">

                    <PremiumButton/>

                    {(userProfile !== null) ? <ProfileDisplay uid={userProfile.uid} photoURL={userProfile.photoURL} displayName={userProfile.displayName} isAnonymous={userProfile.isAnonymous} /> : <></>}
                    
                </div>

            </div>

            <div className={`px-4 py-3 text-base font-medium rounded-md bg-red-100 dark:bg-red-400 border-4 border-solid fixed bottom-40 left-1/2 -translate-x-1/2 border-red-200 dark:border-red-400 ${(error.show) ? "flex" : "hidden"}`}>
            {error.msg}
            <button type="button" onClick={() => {setError({"show":false, "msg":""})}} className="ml-3" >
                <IoClose size={20} />
            </button>
            </div>
                
        </div>
    )
}