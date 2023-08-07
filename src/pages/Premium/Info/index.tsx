import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";

export default function Info() {
    return (
        <div className="w-screen h-screen flex flex-col relative">

            <Navbar/>

            <div className="w-full h-full px-12 py-12">

                <div className="text-4xl font-bold">Compare Plans</div>

                <div className="flex flex-col md:flex-row mt-8 gap-y-8 md:gap-x-8">
                    <div className="w-full md:w-1/2 px-4 py-2 border-4 border-solid border-black dark:border-white rounded-md">
                        <h1 className="text-xl font-bold">Free Tier</h1>
                        <ul className="list-decimal mx-8 my-4 text-lg font-medium">
                            <li>Max 20 Sets</li>
                            <li>Max 3 Card Faces</li>
                            <li>No Special Profile Icon</li>
                        </ul>
                        <div className="w-fit px-4 py-3 mb-4 font-bold border-4 border-solid border-black dark:border-white rounded-md">
                            Log in to access free tier!
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4 py-2 border-4 border-solid border-black dark:border-white rounded-md">
                        <h1 className="text-xl font-bold">Premium Tier</h1>
                        <ul className="list-decimal mx-8 my-4 text-lg font-medium">
                            <li>Unlimited Sets</li>
                            <li>5 Card Faces</li>
                            <li>Special Profile Icon</li>
                        </ul>
                        <Link to={"/shop"} className="flex w-fit mb-4 px-4 py-3 rounded-md font-bold box-border border-4 border-solid border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-[0.6s]">
                            Get Premium
                        </Link>
                    </div>
                </div>

            </div>


        </div>
    )
}