import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/services/authSlice";
import Swal from "sweetalert2";
import Spinner from "../../components/spinner";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userSlice";


export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [formDate, setFormData] = useState({
        email: '',
        password: ''
    })

    const [login, { isLoading }] = useLoginMutation()

    const handleOnChange = (e: any) => {
        setFormData({
            ...formDate,
            [e.target.name]: e.target.value
        })
    }


    async function handleSubmit(e: any) {

        e.preventDefault()
        if (!formDate.email || !formDate.password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Please fill all the fields',
            })
            return
        }

        try {
            const res: any = await login(formDate);

            if (res?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.data?.message || 'something went wrong!',
                });
                dispatch(setUser(res?.data?.user))
                navigate("/")
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
            });
            console.log("🚀 ~ handleSubmit ~ error:", error);
        }
    }

    return (
        <div>
            <div className="min-h-screen  flex flex-col items-center justify-center p-4 ">
                <img src="./images/logo.png" alt="logo" />
                <div className="rounded-2xl p-10 max-w-lg w-full text-white shadow-lg backdrop-blur-sm glass">
                    <h2 className="text-xl text-center mb-1">Welcome !</h2>
                    <h3 className="font-semibold text-2xl md:text-4xl  pinkText text-center">Admin Login</h3>
                    <p className="text-center mb-6 text-xs text-gray-300">Enter credentials to login.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-1 text-xs">Email</label>
                            <input
                                name="email"
                                value={formDate.email}
                                type="text"
                                placeholder="Enter your email"
                                required
                                className="w-full  rounded-lg border  px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                                onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-xs">Password*</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    value={formDate.password}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your Password"
                                    required
                                    className="w-full rounded-lg border px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 pr-10"
                                    onChange={handleOnChange}
                                />

                                <span
                                    className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-pink-300"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-xs ">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="accent-pink-200" />
                                <span>&nbsp;  Remember me</span>
                            </label>
                            <span
                                onClick={() => navigate("/forget-password")}
                                className="hover:underline underline-offset-4 cursor-pointer">Forgot Password ?</span>
                        </div>
                        <div className=" text-center">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full md:w-xs bgPink blackText  font-semibold  rounded-lg  transition-colors"
                            >
                                {isLoading ? <Spinner /> : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
