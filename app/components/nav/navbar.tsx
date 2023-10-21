import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { ImStatsBars } from "react-icons/im";
import { BsPersonCircle } from "react-icons/bs";

const NavBar = () => {
    return (
        <div className="w-full h-[60px] border-solid border-white border-4 rounded-t-lg absolute bottom-0 left-0 px-4 flex justify-between items-center">
            <Link href={"/dashboard"}>
                <AiOutlineHome className="text-white" size={36}/>
            </Link>
            <Link href={"/stats"}>
                <ImStatsBars className="text-white" size={36}/>
            </Link>
            <Link href={"/profile"}>
                <BsPersonCircle className="text-white" size={36}/>
            </Link>
        </div>
    )
}

export default NavBar;