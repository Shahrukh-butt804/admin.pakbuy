import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { UPLOADS_URL } from "../constants/api";
import { selectUser } from "../redux/reducers/userSlice";
import { ImageUrl } from "../utils/Functions";
import MobileMenu from "./mobileMenu";

export default function Header() {

    const user = useSelector(selectUser);

    return (
        <div className="p-8 px-4  md:px-14 flex justify-between md:justify-end items-center">
            <div className="md:hidden">
                <img src={ImageUrl("logo.png")} className="w-48" alt="Logo" />
            </div>

            <div className="hidden md:flex items-center gap-4  ">
                {/* <div><NotificationIcon /></div> */}
                <div className="flex items-center gap-2">
                    <img className="w-10 h-10 rounded-full" crossOrigin="anonymous" src={user?.image ? UPLOADS_URL + user?.image : "https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt="Image" />
                    <div className="flex flex-col">
                        <span className="text-sm text-white">Hi, {user?.fullName || ""} </span>
                        <span className="text-xs text-white">View Profile</span>
                    </div>
                    <div>
                        <Dropdown />
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <MobileMenu />
            </div>
        </div>
    )
}



function Dropdown() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block text-left cursor-pointer">
            <ChevronDown color="#fff" onClick={() => setOpen(!open)} className="ml-2 h-4 w-4" />

            {open && (
                <div className="absolute right-0 z-10 mt-5 w-40 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <div
                            onClick={() => {
                                navigate("/profile");
                                setOpen(false);
                            }}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        >
                            My Profile
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
