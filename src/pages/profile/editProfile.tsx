import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../redux/reducers/userSlice";
import { UPLOADS_URL } from "../../constants/api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Camera } from "lucide-react";
import { useUpDateProfileMutation } from "../../redux/services/profileSlice";
import Spinner from "../../components/spinner";
import Swal from "sweetalert2";

export default function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [fullName, setFullName] = useState(user?.fullName || "");
    const [previewUrl, setPreviewUrl] = useState<any>(null);
    const [fileObj, setFileObj] = useState(null);
    
    const ref = useRef<HTMLInputElement>(null);
    const [upDateProfile, { isLoading }] = useUpDateProfileMutation();

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setFileObj(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    async function handleSave() {

        const formData = new FormData();
        formData.append("fullName", fullName);
        if (fileObj) {
            formData.append("image", fileObj);
        }

        try {
            const res = await upDateProfile(formData).unwrap();
            if (res?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.message || 'something went wrong!',
                });
                dispatch(setUser(res?.user))
                navigate("/")
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'update Failed',
                    text: res?.error?.data?.message || 'something went wrong!',
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'update Failed',
                text: error?.error?.data?.message || error?.message || error?.data?.message || 'something went wrong!',
            });
            console.log("🚀 ~ handleSubmit ~ error:", error);
        }


    }


    return (
        <div className="px-4 md:px-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center md:text-left">
                My Profile
            </h1>

            <input onChange={handleFileChange} ref={ref} type="file" className="hidden" />

            {/* Profile Card */}
            <div className="glass rounded-2xl p-6 md:p-10 flex flex-col gap-8">
                <div className="flex  items-center gap-2  lg:px-10 relative">
                    <Camera
                        onClick={() => ref?.current?.click()}
                        className="w-5 h-5 pinkText absolute top-20 left-30" />

                    <img className="w-24 h-24 rounded-full" crossOrigin="anonymous" src={previewUrl || (user?.image ? UPLOADS_URL + user?.image : "https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg")} alt="Image" />

                    <div className="flex flex-col">
                        <span className=" ">{user?.fullName || ""}</span>
                        <span className="text-sm text-gray-400 ">{user?.email || ""} </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 font-light md:max-w-3xl">
                    <div className="flex flex-col">
                        <label className="text-gray-400">Full Name</label>
                        <input
                            type="text"
                            defaultValue={user?.fullName || ""}
                            onChange={(e) => setFullName(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-600 bg-transparent text-white"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-400">Email</label>
                        <input
                            type="email"
                            disabled
                            defaultValue={user?.email || ""}
                            className="px-3 py-2 rounded-lg border border-gray-600 bg-transparent text-white"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-400">Registered On</label>
                        <input
                            type="text"
                            value={
                                user?.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString()
                                    : ""
                            }
                            disabled
                            className="px-3 py-2 rounded-lg border border-gray-600 bg-transparent text-gray-400 cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-400">Active</label>
                        <input
                            type="text"
                            value={user?.isActive ? "Yes" : "No"}
                            disabled
                            className="px-3 py-2 rounded-lg border border-gray-600 bg-transparent text-gray-400 cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row  gap-4 w-full md:w-max">
                        <button
                            onClick={() => navigate(-1)}
                            type="submit"
                            className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors "
                        >
                            Go back
                        </button>
                        <button
                            disabled={isLoading}
                            onClick={handleSave}
                            type="submit"
                            className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                        >
                            {isLoading ? <Spinner /> : "Update Profile"}

                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
