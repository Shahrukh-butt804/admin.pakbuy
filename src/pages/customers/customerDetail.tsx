import { useNavigate, useParams } from 'react-router'
import { ChevronLeft } from "lucide-react";

export default function CustomerDetail() {
    const navigate = useNavigate()
    const { id } = useParams()
    console.log("🚀 ~ CustomerDetail ~ id:", id)
    return (
        <div>
            <div className="text-3xl font-bold text-white flex  items-center gap-2 mb-10 md:px-6"><ChevronLeft className='cursor-pointer w-10 h-10' onClick={() => navigate(-1)} /> Customer Details</div>
            <div className='flex flex-col gap-10 glass mx-4 md:mx-12 '>
                <div className="flex items-center gap-2 py-6 md:px-10">
                    <img className="w-24 h-24 rounded-full" src="https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="Image" />
                    <div className="flex flex-col">
                        <span className=" ">Eva Fox </span>
                        <span className="text-sm text-gray-400 ">eva@email.com </span>
                    </div>


                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6  font-extralight md:max-w-3xl md:px-10">
                    <div className="flex flex-col">
                        <span className="text-gray-400">First Name</span>
                        <span>John</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400">Last Name</span>
                        <span>Doe</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400">Registered On</span>
                        <span>2025-08-28</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-gray-400">Email Address</span>
                        <span>john.doe@email.com</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400">Phone Number</span>
                        <span>+123456789</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400">Newsletter</span>
                        <span>Subscribed</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-gray-400">Address</span>
                        <span>123 Street, City</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400">Collections Purchased</span>
                        <span>15</span>
                    </div>
                </div>





            </div>
        </div>
    )
}
