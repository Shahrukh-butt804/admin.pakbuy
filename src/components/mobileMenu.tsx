"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-black">
            <Menu onClick={() => setOpen(true)} className="h-8 w-8  mb-5" />

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div
                            className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 p-4 flex flex-col"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                        >
                            <button
                                onClick={() => setOpen(false)}
                                className="self-end mb-6 p-2 rounded-lg hover:bg-gray-100"
                            >
                                <X className="h-6 w-6 text-gray-800" />
                            </button>

                            <nav className="space-y-4">
                                <a href="/dashboard" className="block text-lg text-gray-800 hover:text-pink-500">
                                    Dashboard
                                </a>
                                <a href="/profile" className="block text-lg text-gray-800 hover:text-pink-500">
                                    Profile
                                </a>
                                <a href="/settings" className="block text-lg text-gray-800 hover:text-pink-500">
                                    Settings
                                </a>
                                <a href="/logout" className="block text-lg text-red-600 hover:text-red-800">
                                    Logout
                                </a>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
