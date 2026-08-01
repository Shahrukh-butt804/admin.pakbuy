import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useResetPasswordMutation } from "../../redux/services/authSlice";
import Spinner from "../../components/spinner";


export default function Resetpassword() {

    const navigate = useNavigate()
    const location = useLocation();
    const { email, otp } = location.state

    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const handleOnChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    async function handleSubmit(e: any) {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Passwords do not match',
            })
            return
        }

        try {
            const res: any = await resetPassword({ email, otp: Number(otp), password: formData.password });

            if (res?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.data?.message || 'something went wrong!',
                });
                navigate("/login")

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
            console.log(error)
        }

    }



    return (
        <div>
            <div className="min-h-screen  flex flex-col items-center justify-center p-4 ">
                <img src="./images/logo.png" className="w-56 h-56" alt="logo" />
                <div className="rounded-2xl p-10 max-w-lg w-full text-white shadow-lg backdrop-blur-sm glass">
                    <h3 className="font-semibold text-2xl md:text-4xl  pinkText text-center">Reset Password</h3>
                    <p className="text-center mb-6 text-xs text-gray-300">Enter your email to recover your password.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block mb-1 text-xs">New Password*</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    onChange={handleOnChange}
                                    value={formData.password}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your New Password"
                                    required
                                    className="w-full rounded-lg border px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 pr-10"
                                />

                                <span
                                    className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-pink-300"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </span>
                            </div>
                        </div>


                        <div>
                            <label className="block mb-1 text-xs">Confirm Password*</label>
                            <div className="relative">
                                <input
                                    name="confirmPassword"
                                    onChange={handleOnChange}
                                    value={formData.confirmPassword}
                                    type={confirmPassword ? "text" : "password"}
                                    placeholder="Confirm your Password"
                                    required
                                    className="w-full rounded-lg border px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 pr-10"
                                />

                                <span
                                    className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-pink-300"
                                    onClick={() => setConfirmPassword(!confirmPassword)}
                                >
                                    {confirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </span>
                            </div>
                        </div>



                        <div className="flex flex-col  items-center gap-4 ">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full md:w-xs bgPink blackText  font-semibold  rounded-lg  transition-colors"
                            >
                                {isLoading ? <Spinner /> : "Continue"}
                            </button>
                            <div
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 cursor-pointer ">
                                <ArrowLeft className="w-5 h-5" /> <span className="underline underline-offset-4">Go back to Login</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
