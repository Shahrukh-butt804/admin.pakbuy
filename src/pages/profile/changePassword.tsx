import { useState } from "react";
import { useNavigate } from "react-router";
import { useChangePasswordMutation } from "../../redux/services/authSlice";
import Swal from "sweetalert2";
import Spinner from "../../components/spinner";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [updatePassword, { isLoading }] = useChangePasswordMutation()

    const handleOnChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handlePasswordUpdate = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'New password and confirm password does not match',
            })
            return;
        }

        try {
            const res: any = await updatePassword({ oldPassword: formData.oldPassword, newPassword: formData.newPassword })
            console.log("🚀 ~ handlePasswordUpdate ~ res:", res)
            if (res?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.data?.message || 'something went wrong!',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: res?.error?.data?.message || 'something went wrong!',
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: error?.error?.data?.message || error?.message || error?.data?.message || 'something went wrong!',
            })
            console.log("🚀 ~ handlePasswordUpdate ~ error:", error)

        }
    };

    return (
        <div>
            <div className="text-3xl font-bold text-white mb-10 md:px-8 flex justify-center md:justify-start items-start">
                ChangePassword
            </div>
            <div className="flex flex-col gap-10 glass mx-4 md:mx-12 text-gray-200">

                {/* Password Update Fields */}
                <div className="flex flex-col gap-4 md:max-w-2xl ">
                    <div className="flex flex-col relative">
                        <label className="text-white">Old Password</label>
                        <input
                            name="oldPassword"
                            type={showOldPassword ? "text" : "password"}
                            value={formData.oldPassword}
                            onChange={handleOnChange}
                            className="px-3 py-2 border rounded-lg bg-transparent text-white"
                        />
                        <span
                            className="absolute right-3 bottom-3 cursor-pointer text-gray-400 hover:text-pink-300"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                        >
                            {showOldPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </span>
                    </div>

                    <div className="flex flex-col relative">
                        <label className="text-white">New Password</label>
                        <input
                            name="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={formData.newPassword}
                            onChange={handleOnChange}
                            className="px-3 py-2 border rounded-lg bg-transparent text-white"
                        />
                        <span
                            className="absolute right-3 bottom-3 cursor-pointer text-gray-400 hover:text-pink-300"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </span>
                    </div>

                    <div className="flex flex-col relative">
                        <label className="text-white">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleOnChange}
                            className="px-3 py-2 border rounded-lg bg-transparent text-white"
                        />
                        <span
                            className="absolute right-3 bottom-3 cursor-pointer text-gray-400 hover:text-pink-300"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row  gap-4 w-full md:w-max">
                    <button
                        onClick={() => navigate(-1)}
                        type="submit"
                        className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors "
                    >
                        Go Back
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={handlePasswordUpdate}
                        type="submit"
                        className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                    >
                        {isLoading ? <Spinner /> : "Update Password"}

                    </button>
                </div>
            </div>
        </div>
    );
}
