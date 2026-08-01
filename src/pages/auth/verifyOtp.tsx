import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useVerifyOtpMutation } from "../../redux/services/authSlice";
import { useState } from "react";
import Swal from "sweetalert2";
import Spinner from "../../components/spinner";


export default function VerifyOtp() {
    const navigate = useNavigate()
    const location = useLocation();
    const email = location.state?.email

    const [otp, setOtp] = useState("")

    const [verifyOtp, { isLoading }] = useVerifyOtpMutation()
    async function handleSubmit(e: any) {
        e.preventDefault()

        if (!email || !otp) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Please fill all the fields',
            })
            return
        }

        try {
            const res: any = await verifyOtp({ email, otp: Number(otp) });

            if (res?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.data?.message || 'something went wrong!',
                });
                navigate("/reset-password", { state: { email, otp } })

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
            console.log("🚀 ~ handleSubmit ~ error:", error)

        }
    }

    return (
        <div>
            <div className="min-h-screen  flex flex-col items-center justify-center p-4 ">
                <img src="./images/logo.png" className="w-56 h-56" alt="logo" />
                <div className="rounded-2xl p-10 max-w-lg w-full text-white shadow-lg backdrop-blur-sm glass">
                    <div className=" flex justify-center items-center ">
                        <img src="./images/emailLogo.png" alt="logo" />
                    </div>
                    <h3 className="font-semibold text-2xl md:text-4xl  pinkText text-center">Confirm Email</h3>
                    <p className="text-center mb-6 text-xs text-gray-300">An email has been sent to you with a verification code. Please enter it here.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-1 text-xs">Verification Code</label>
                            <input
                                name="otp"
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                                type="text"
                                placeholder="Enter your Verification Code"
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
