import { useEffect } from "react";

export default function Dashboard() {

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    return (
        <div className="w-full h-full flex justify-center items-center text-4xl font-bold py-12 px-4 text-center">
            Select/add a set to get started!
        </div>
    )
}