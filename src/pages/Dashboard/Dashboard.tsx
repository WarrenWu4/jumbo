import Sidebar from "../../components/Sidebar"

export default function Dashboard() {
    return (
        <div className="flex w-screen h-screen bg-neutral-200 p-2">
            <Sidebar/>
            <main className="w-full h-hull bg-white rounded-lg ml-2"></main>
        </div>
    )
}