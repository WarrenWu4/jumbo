import { FcGoogle } from "react-icons/fc"

const Page = () => {

    return ( 
        <div className="w-screen h-screen relative bg-background-dark text-white flex flex-col items-center justify-center">

            <div className="p-4 border-4 border-solid border-white flex flex-col items-center justify-center gap-y-4 rounded-md">

                <h1 className="text-2xl w-full text-center font-bold pb-2 border-b-4 border-solid border-white">Login Methods</h1>

                {/* by default form uses google oauth */}
                <form action="/auth/login" method="POST" className="flex flex-col gap-y-3">
                    <button type="submit" className="border-4 border-white border-solid rounded-md px-4 py-3 flex justify-center items-center gap-x-2 font-semibold text-xl hover:bg-white hover:text-background-dark transition-all duration-700">
                        Google Login <FcGoogle size={24}/>
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Page;