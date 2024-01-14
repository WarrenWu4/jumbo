import { BiLoader } from "react-icons/bi"
import MainLayout from "../layouts/MainLayout";

export default function LoadingPage() {
    return (
        <MainLayout className="justify-center">

            <div className="flex items-center gap-x-2 text-2xl font-bold">

                <BiLoader className="animate-spin"/>
                Loading...

            </div>

        </MainLayout>
    )
}