import { twMerge } from "tailwind-merge";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface CenteredLayoutProps {
    children?: string | JSX.Element | JSX.Element[];
    className?: string;
}

export default function CenteredLayout({children, className}: CenteredLayoutProps) {
    return (
        <div className={twMerge("w-full h-full flex flex-col justify-between items-center py-16", className)}>

            <Navbar/>

            {children}

            <Footer/>
        
        </div>
    )
}
