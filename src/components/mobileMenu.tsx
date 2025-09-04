"use client";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router";
import { useLogoutMutation } from "../redux/services/authSlice";
import Swal from "sweetalert2";
import { logout, selectUser } from "../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { pages } from "../components/layout"
import { ImageUrl } from "../utils/Functions";






export default function MobileMenu() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const user = useSelector(selectUser);

    const [logoutUser] = useLogoutMutation()
    const handleLogout = async () => {
        try {
            const res: any = await logoutUser({})

            if (res?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.data?.message || 'something went wrong!',
                })
                dispatch(logout())
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
            console.log("🚀 ~ handleLogout ~ error:", error)
        }


    }
    return (
        <div className="bg-black relative">
            <Menu onClick={() => setOpen(true)} className="h-8 w-8 mb-5" />

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="fixed inset-0  bg-opacity-50 z-40"
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div
                            className="fixed top-0 left-0 h-full w-64 blackGlass shadow-xl z-50 p-4 flex flex-col"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                        >
                            <div className="flex justify-end items-center ">
                                <X
                                    onClick={() => setOpen(false)}
                                    className="h-7 w-7 " />
                            </div>

                            {/* profile section */}
                            <div className="flex items-center gap-4  mb-10">
                                <div className="flex items-center gap-2">
                                    <img className="w-10 h-10 rounded-full" src="https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="Image" />
                                    <div className="flex flex-col">
                                        <span className="text-sm ">Hi, {user?.fullName || ""} </span>
                                        <span className="text-xs hoverPink">View Profile</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-200 mb-5" />


                            <nav className="space-y-4">
                                {pages.map((page) => (
                                    <div
                                        onClick={() => {
                                            navigate(page.link)
                                            setOpen(false)
                                        }}
                                        key={page.title}
                                        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer" ${location.pathname === page.link && "underline underline-offset-4 "}`}
                                    >
                                        <img
                                            src={`${ImageUrl(page.icon)}`}
                                            alt={page.title}
                                            className="h-6 w-6"
                                        />
                                        <span className="">
                                            {page.title}
                                        </span>
                                    </div>
                                ))}
                            </nav>
                            <div className=" mb-10 absolute bottom-0">
                                <div onClick={handleLogout} className="rounded-lg hoverBgPink hover:text-black px-4 py-2 flex flex-row gap-2 items-center cursor-pointer">
                                    <LogOut size={20} />
                                    Logout
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
