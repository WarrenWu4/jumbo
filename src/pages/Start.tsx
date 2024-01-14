import { NavLink } from "react-router-dom";
import CenteredLayout from "../layouts/CenteredLayout";

export default function Start() {

    const StartActionStyle = "block py-3 px-4 border-y-8 border-r-8 rounded-r-lg font-bold text-xl transition-all duration-500 hover:text-2xl "

    function googleLogin() {
        alert("google login")
    }

    return (
        <CenteredLayout>

            <div>

                <div className="w-56 aspect-square border-8 rounded-lg"></div>

                <div className="[&>*]:my-4">

                    <button className={StartActionStyle} type="button" onClick={googleLogin}>

                        Google Login

                    </button>

                    <NavLink className={StartActionStyle} to={"/"}>

                        Dashboard

                    </NavLink>

                </div>

            </div>

        </CenteredLayout>
    )
}