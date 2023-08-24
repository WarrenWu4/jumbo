import { Link, Popover } from "@mui/material";
import { signOut } from "firebase/auth";
import { useRef, useState } from "react";
import { BsFillGearFill, BsGoogle } from "react-icons/bs";
import { auth } from "../../firebase";

interface ProfileDisplayProps {
    uid: string;
    photoURL: string | null;
    displayName: string | null;
    isAnonymous: boolean;
}

export default function ProfileDisplay({uid, photoURL, displayName, isAnonymous}: ProfileDisplayProps) {
    
    const userSignOut = async() => {
        try {
            await signOut(auth)
            window.location.reload()
        }
        catch (e) {
            console.log("Error signing out:", e)
        }
    }

    const showSettings = () => {
        setSettingsView((settingsView) ? false: true)
    }    
    
    const [settingsView, setSettingsView] = useState<boolean>(false)
    const settingsRef = useRef<HTMLButtonElement>(null)

    return (
        <div className="flex items-center justify-between mt-8">

                        <div className="flex items-center">
                            <img src={(isAnonymous) ? "/favicon.ico" : photoURL!} alt="user profile" className="rounded-[50%] w-8 h-8 mr-2"/>
                            {(isAnonymous) ? "Anonymous User" : displayName}
                        </div>


                        <button ref={settingsRef} type="button" onClick={showSettings}>
                            <BsFillGearFill size={18} />
                        </button>

                        <Popover
                            open={settingsView}
                            anchorEl={settingsRef.current}
                            onClose={() => setSettingsView(false)}
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

                                {/* {(isAnonymous) ? 
                                <>
                                    <Link to={"/start"} className="hover:bg-gray-200 px-4 py-2 w-full flex items-center">
                                        Sign In <BsGoogle className="ml-[0.4rem]"/>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to={"/shop"} className="hover:bg-gray-200 px-4 py-2 w-full flex items-start">
                                        Buy Premium
                                    </Link>
                                    <Link to={`/profile/edit/${uid}`} className="hover:bg-gray-200 px-4 py-2 w-full flex items-start">
                                        Edit Profile
                                    </Link>
                                </>
                                } */}

                                <button type="button" onClick={userSignOut} className="hover:bg-gray-200 w-full flex items-start px-4 py-2">
                                    Sign Out
                                </button>

                            </div>
                        </Popover>

                    </div>
    )
}