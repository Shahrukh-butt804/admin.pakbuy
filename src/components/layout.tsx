import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "./header";
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "../redux/services/authSlice";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import { ImageUrl } from "../utils/Functions";


export const pages = [
    {
        title: "Dashboard",
        link: "/",
        icon: "dashboard-icon.png"
    },
    {
        title: "Members",
        link: "/members",
        icon: "customer-icon.png"
    },
    {
        title: "Collections",
        link: "/collections",
        icon: "order-icon.png"
    },
    {
        title: "Products",
        link: "/products",
        icon: "product-icon.png"
    },
    {
        title: "Orders",
        link: "/orders",
        icon: "order-icon.png"
    },
    {
        title: "Resources",
        link: "/resources",
        icon: "resources-icon.png"
    },
    {
        title: "Coupons",
        link: "/coupons",
        icon: "product-icon.png"
    },
    {
        title: "Email Management",
        link: "/email-management",
        icon: "customer-icon.png"
    },
]


export default function Layout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();

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
            console.log("🚀 ~ handleLogout ~ error:", error)
        }


    }

    return (
        <div className="flex h-screen ">
            {/* Sidebar */}
            <aside className="w-64 blackGlass shadow-lg hidden md:flex flex-col">
                <div className="p-4 font-bold text-xl ">
                    <img src={ImageUrl("logo.png")} className="w-48" alt="Logo" />
                </div>
                <nav className="flex-1 space-y-3">
                    {pages.map((page, index) => (
                        <div
                            key={index}
                            className={`rounded-lg hoverBgPink text-white hover:text-black px-4 py-2 flex flex-row gap-2 items-center cursor-pointer ${page.link === location.pathname && "bgPink !text-black"}`}
                            onClick={() => navigate(page.link)}
                        >
                            <img src={`${ImageUrl(page.icon)}`} alt={page.title} />
                            {page.title}
                        </div>
                    ))}
                </nav>

                <div className=" mb-10 text-white">
                    <div className="border-b border-gray-200 my-2" />
                    <div onClick={handleLogout} className="rounded-lg hoverBgPink hover:text-black px-4 py-2 flex flex-row gap-2 items-center cursor-pointer">
                        <LogOut size={20} />
                        Logout
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <Header />


                {/* Page Content */}
                <main className="flex-1 overflow-y-auto pb-10 max-w-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
