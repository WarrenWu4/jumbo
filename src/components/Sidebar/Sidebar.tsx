import { useContext } from "react"
import { AuthContext } from "../../App";

import { JumboUserProfile } from "../../App";
import SidebarHeader from "./SidebarHeader";
import SidebarSets from "./SidebarSets";
import PremiumButton from "./PremiumButton";
import ProfileDisplay from "./ProfileDisplay";
import { FlashcardSets } from "../../types/FlashcardSetTypes";

interface SidebarProps {
    data: FlashcardSets
}

export default function Sidebar({data}: SidebarProps) {

    const userProfile = useContext<JumboUserProfile | null>(AuthContext)

    return (
        <div className="h-full hidden md:flex flex-col gap-y-2 full max-w-[288px] w-full px-2 py-12 relative">
            
            <div className="h-full border-black/40 dark:border-white/40 border-r-4 border-solid flex flex-col justify-between px-5 py-4">

                <div className="flex flex-col">

                    <SidebarHeader/>

                    <SidebarSets data={data}/>

                </div>

                <div className="w-full">

                    <PremiumButton/>

                    {(userProfile !== null) ? <ProfileDisplay uid={userProfile.uid} photoURL={userProfile.photoURL} displayName={userProfile.displayName} isAnonymous={userProfile.isAnonymous} /> : <></>}
                    
                </div>

            </div>

        </div>
    )
}