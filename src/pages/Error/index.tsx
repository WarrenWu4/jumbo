import { BsBoxArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div className="w-screen h-screen overflow-x-hidden flex flex-col justify-center items-center font-bold text-4xl">
            Error 404: Page not found D:
            <Link to={"/"} className="border-4 border-black border-solid text-2xl font-semibold px-4 py-2 flex items-center rounded-lg mt-4">Home <BsBoxArrowUpRight className="ml-4" size={24} /></Link>
        </div>
    )
}