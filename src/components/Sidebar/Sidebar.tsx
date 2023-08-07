import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { BsFillGearFill, BsQuestionCircle } from "react-icons/bs";
import SidebarCard from "./SidebarCard";
import { auth, db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, getCountFromServer, getDocs } from "firebase/firestore";
import { IoClose } from "react-icons/io5";

export default function Sidebar() {

    const switchTheme = () => {
        localStorage.theme = (localStorage.theme === "dark") ? "light":"dark"
        document.documentElement.className = localStorage.theme
        setCurrTheme(localStorage.theme)
    }
    const [currTheme, setCurrTheme] = useState<string>(localStorage.theme)
    const [collectionData, setCollectionData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState({"show": false, "msg":""})
    const navigate = useNavigate()

    const addSetVerify = async() => {
        const user = auth.currentUser
        const userId = auth.currentUser?.uid
        // if user is able to add more sets
        // if user is anyonymous only allow 1 set (we need to fking save db storage bro ;-;)
        // if regular user, allow 20 sets
        const snapshot = await getCountFromServer(collection(db, `users/${userId}/sets`))
        const totSets = snapshot.data().count
        if ((user?.isAnonymous && totSets < 1) || (!user?.isAnonymous && totSets < 20)) {
            addSet()
        }
        // otherwise show an error
        else {
            setError({"show":true, "msg":"exceeded max allowed sets"})
        }
    }

    const addSet = async() => {
        const userId = auth.currentUser?.uid

        const docRef = await addDoc(collection(db, `users/${userId}/sets`), {
            cards: {0:["",""]},
            desc: "",
            numOfCards: 1,
            title: "",
        })
        navigate(`/set/edit/${docRef.id}`)

    }

    const showSettings = () => {
        console.log("working on it")
    }

    const premiumInfo = (e:any) => {
        e.preventDefault()
        console.log("workkk")
    }

    useEffect(() => {

        const getUser = async() => {
            const user = auth.currentUser
            const userId = auth.currentUser?.uid
            // if use ris anonymous
            if (user?.isAnonymous) {
                // set user profile to default
                // set user name to anyonymous
                // get amount of sets
                // !set 30 day deletion warning
                setError({"show":true, "msg":"account will be deleted in 30 days"})
            }
            // otherwise use the users settings
            else {
                if (user?.photoURL !== null && user?.photoURL !== undefined) {
                    setUserProfile(user?.photoURL)
                }
                if (user?.displayName !== null && user?.displayName !== undefined) {
                    setUserName(user?.displayName)
                }
                const data = await getDocs(collection(db, `users/${userId}/sets`))
                data.forEach((doc) => {
                    setCollectionData([...collectionData, doc])
                })
                setIsLoading(false)
            }
        }

        getUser()

    }, [])

    const [userProfile, setUserProfile] = useState<string>("")
    const [userName, setUserName] = useState<string>("")

    return (
        <div className="h-full hidden md:flex flex-col gap-y-2 full max-w-[288px] w-full px-2 py-12 relative">
            
            <div className="h-full border-black/40 dark:border-white/40 border-r-4 border-solid flex flex-col justify-between px-5 py-4">

                <div className="flex flex-col">
                    <div className="mb-8 font-bold text-2xl flex justify-between items-center">
                        JUMBO
                        <button type="button" onClick={switchTheme}>
                            {(currTheme === "dark") ? <FaSun size={24}/> : <FaMoon size={24}/>}
                        </button>
                    </div>

                    <div className="flex flex-col gap-y-4 mt-8">
                        <div className="flex items-center text-xl font-bold">
                            Sets
                        </div>
                        <div className="flex flex-col gap-y-2 ml-4">

                            {!isLoading &&
                                collectionData.map((doc:any) => (<SidebarCard key={doc.id} title={doc.data().title} set_id={doc.id} icon={undefined} />)
                                )
                            }
                        </div>

                        <button type="button" onClick={addSetVerify} className="w-full flex items-center justify-center mt-4 border-4 rounded-lg border-solid border-black dark:border-white font-black text-xl" >
                            +
                        </button>

                    </div>
                </div>

                <div className="w-full">

                    <Link to={"/shop"} className="w-full px-4 py-3 border-2 border-green-300 border-solid rounded-lg text-green-800 bg-green-200 dark:bg-green-800 dark:border-green-600 dark:text-green-200 flex items-center justify-between">
                        buy premium 
                        <button type="button" onClick={premiumInfo} >
                            <BsQuestionCircle size={16} />
                        </button>
                    </Link>

                    <div className="flex items-center justify-between mt-8">

                        <div className="flex items-center">
                            <img src={userProfile} alt="user profile" className="rounded-[50%] w-8 h-8 mr-2"/>
                            {userName}
                        </div>


                        <button type="button" onCanPlay={showSettings}>
                            <BsFillGearFill size={18} />
                        </button>

                    </div>
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