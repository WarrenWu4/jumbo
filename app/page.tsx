import NavBar from "./components/nav/navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { use } from "react";

const getUser = async() => {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const data = await supabase.auth.getUser()
    return data.data.user;
}

const Home = () => {

    const user = use(getUser());
    
    return ( 
    <div className="w-screen h-screen relative bg-background-dark text-white">
        <NavBar/>
        <h1>Dashboard Page</h1>
        <h1>hi {user?.user_metadata.name}</h1>
    </div>
    )
}

export default Home;