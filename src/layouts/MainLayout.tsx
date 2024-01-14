import { twMerge } from "tailwind-merge";

interface MainLayoutProps {
    children: string | JSX.Element | JSX.Element[];
    className?: string;
}

export default function MainLayout({children, className}: MainLayoutProps) {
    return (
    <div className={twMerge("w-full h-full px-4 flex flex-col items-center border-4 border-red-600", className)}>
        {children}
    </div>
    )
}
