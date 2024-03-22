import { Link } from "react-router-dom";
import { FaGear, FaUser, FaBookOpen } from "react-icons/fa6"

export default function Start() {

    return (
        <div className="w-full h-full flex flex-col items-center">

            <div className="w-full h-full flex flex-col gap-y-8 items-center justify-center">

                <div className="font-bold text-4xl text-center">
                    <span className="text-blue-400">minimal</span>, <span className="text-orange-400">powerful</span>, <span className="text-red-400">efficient</span> flashcards
                </div>

                <div className="flex gap-x-14">

                    <div className="w-96 aspect-square p-12 border-8 rounded-lg bg-dark z-10">

                        <svg viewBox="0 0 452 437" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M43.5 228.081L45 278.581M45 278.581C60.5 368.081 173 384.581 263 379.081M45 278.581C19.8 278.581 12.5 264.581 12 257.581V196.081C16 177.681 34 176.081 42.5 177.582C42.5 -36.9186 406.5 -50.9186 406.5 182.081C417.5 184.581 429.5 176.581 439.5 198.081V257.081C438.333 265.748 430.1 281.781 406.5 276.581M406.5 231.581V276.581M325 364.081C341.853 360.854 369.764 347.598 389 320.992M389 320.992C396.586 310.5 402.823 297.93 406.5 283.081V276.581M389 320.992V372.581C344.5 443.581 100.5 442.581 62.5 367.081"
                                stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                            <rect x="87.5" y="132.081" width="276" height="172" rx="68" stroke="currentColor"
                                strokeWidth="12" />
                            <path d="M118.5 233.581V195.581C124.5 153.081 200.7 161.781 225.5 168.581" stroke="currentColor"
                                strokeWidth="12" fill="currentColor" strokeLinecap="round" />
                        </svg>

                    </div>

                    <div className="flex flex-col justify-between">
                        <Link className="w-80 h-24 flex pl-10 items-center border-8 border-white rounded-md font-bold text-2xl gap-x-4 hover:shadow-slide-right hover:text-black duration-500 transition" to={"/dashboard"}>
                            <FaUser/>
                            DASHBOARD
                        </Link>
                        <Link className="w-80 h-24 flex pl-10 items-center border-8 border-white rounded-md font-bold text-2xl gap-x-4 hover:shadow-slide-right hover:text-black duration-500 transition" to={"/settings"}>
                            <FaGear/>
                            SETTINGS
                        </Link>
                        <Link className="w-80 h-24 flex pl-10 items-center border-8 border-white rounded-md font-bold text-2xl gap-x-4 hover:shadow-slide-right hover:text-black duration-500 transition" to={"/tutorial"}>
                            <FaBookOpen/>
                            TUTORIAL
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    )
}