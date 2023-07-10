import { useMemo } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { IconType } from "react-icons";
import { HiHome, HiStar, HiShoppingCart } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export default function Sidebar() {

    const path = useLocation().pathname;
    console.log(path)
    const dashRoutes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: path === '/dashboard',
            href: '/dashboard'
        },
        {
            icon: HiStar,
            label: 'Starred',
            active: path === '/dashboard/starred',
            href: '/dashboard/starred'
        },
        {
            icon: HiShoppingCart,
            label: 'Market',
            active: path === '/dashboard/market',
            href: '/dashboard/market'
        }
    ], [path])

    return (
        <div className="flex h-full bg-white rounded-lg">
            <div className="hidden md:flex flex-col gap-y-2 h-full w-[250px] p-2">
                <div className="font-bold text-2xl px-5 py-4 mb-8">JUMBO</div>
                <div className="flex flex-col gap-y-4 px-5 py-4">
                    {
                        dashRoutes.map((item) => <SidebarButton
                            key={item.label}
                            {...item}
                        />)
                    }
                </div>

                <div className="flex flex-col text-center px-5 py-4 mt-8 items-center [&>*]:mb-3">
                    <h4 className="font-bold">Upgrade to Pro</h4>
                    <p>Unlock tons of new features!</p>
                    <NavLink to="/upgrade" className="rounded-xl py-2 px-6 bg-green-200 font-bold text-md hover:bg-green-300 transition duration-300">Upgrade</NavLink>
                </div>

            </div>
        </div>
    )
}

interface SidebarButtonProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

const SidebarButton:React.FC<SidebarButtonProps> = ({icon:Icon, label, active, href}) => {
    return (
        <NavLink to={href} className={twMerge(`flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-black transition text-neutral-600 py-1`, active && "text-black")}>
            <Icon size={26}/>
            <p className="truncate w-full">{label}</p>
        </NavLink>
    )
}