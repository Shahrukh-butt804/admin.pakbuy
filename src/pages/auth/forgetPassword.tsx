

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useForgetPasswordMutation } from "../../redux/services/authSlice";
import { useState } from "react";
import Swal from "sweetalert2";
import Spinner from "../../components/spinner";

export default function ForgetPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation()

    async function handleSubmit(e: any) {
        e.preventDefault()

        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Email is required!',
            })
            return
        }

        try {
            const res: any = await forgetPassword({email})

            if (res?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.data?.message || 'something went wrong!',
                });
                navigate("/verify-otp", { state: { email } })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: res?.error?.data?.message || 'something went wrong!',
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error?.error?.data?.message || error?.message || error?.data?.message || 'something went wrong!',
            })
            console.log("🚀 ~ handleSubmit ~ error:", error)

        }
    }

    return (
        <div>
            <div className="min-h-screen  flex flex-col items-center justify-center p-4 ">
                <img src="./images/logo.png" alt="logo" />
                <div className="rounded-2xl p-10 max-w-lg w-full text-white shadow-lg backdrop-blur-sm glass">
                    <h3 className="font-semibold text-2xl md:text-4xl  pinkText text-center">Forgot Password</h3>
                    <p className="text-center mb-6 text-xs text-gray-300">Enter your email to recover your password.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-1 text-xs">Email/User name</label>
                            <input
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                placeholder="Enter your email/ user name"
                                required
                                className="w-full  rounded-lg border  px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                            />
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
