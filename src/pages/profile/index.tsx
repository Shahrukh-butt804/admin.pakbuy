import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice";
import { UPLOADS_URL } from "../../constants/api";

export default function Profile() {
    const user = useSelector(selectUser);
    console.log("🚀 ~ Profile ~ user:", user)
    return (
        <div>
            <div className="text-3xl font-bold text-white  mb-10  md:px-8 flex justify-center md:justify-start items-start"> My Profile</div>
            <div className='flex flex-col gap-10 glass mx-4 md:mx-12 '>

                <div className="flex flex-col-reverse lg:flex-row gap-5 justify-between items-start py-2">

                    <div className="flex  items-center gap-2  lg:px-10">

                        <img className="w-24 h-24 rounded-full" src={user?.image ? UPLOADS_URL + user?.image : "https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt="Image" />
                        <div className="flex flex-col">
                            <span className=" ">{user?.fullName || ""}</span>
                            <span className="text-sm text-gray-400 ">{user?.email || ""} </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row  gap-4 w-full md:w-max">
                        <button
                            type="submit"
                            className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors "
                        >
                            Edit profile
                        </button>   <button
                            type="submit"
                            className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                        >
                            Update Password
                        </button>
                    </div>



                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6  font-extralight md:max-w-3xl lg:px-10">


                    <div className="flex flex-col">
                        <span className="text-gray-400">Full Name</span>
                        <span>{user?.fullName || ""}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400">Email</span>
                        <span>{user?.email || ""}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400">Registered On</span>
                        <span>{new Date(user?.createdAt || "").toLocaleDateString()}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-gray-400">Is Active</span>
                        <span>{user?.isActive ? "Yes" : "No"}</span>
                    </div>

                </div>





            </div>
        </div>
    )
}
