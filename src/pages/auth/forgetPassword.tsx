

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function ForgetPassword() {
    const navigate = useNavigate()

    async function handleSubmit(e: any) {
        e.preventDefault()
        navigate("/verify-otp")
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
                                type="text"
                                placeholder="Enter your email/ user name"
                                required
                                className="w-full  rounded-lg border  px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                            />
                        </div>

                        <div className="flex flex-col  items-center gap-4 ">
                            <button
                                type="submit"
                                className="w-full md:w-xs bgPink blackText  font-semibold  rounded-lg  transition-colors"
                            >
                                Continue
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
