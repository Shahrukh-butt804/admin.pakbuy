import { useNavigate, useParams } from 'react-router'
import { ChevronLeft } from "lucide-react";
import { useGetUserByIdQuery, useToggleUserStatusMutation } from '../../redux/services/userManagement';
import { UPLOADS_URL } from '../../constants/api';
import Spinner from '../../components/spinner';
import Swal from 'sweetalert2';

export default function CustomerDetail() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: user, isLoading } = useGetUserByIdQuery(id, { skip: !id })
    const [toggleUser, { isLoading: toggleUserLoading }] = useToggleUserStatusMutation()

    async function handleToggleUserStatus() {
        try {
            const res: any = await toggleUser({ id: user?._id });
            console.log("🚀 ~ handleToggleUserStatus ~ res:", res)

            if (res?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.data?.message || 'something went wrong!',
                })
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
            console.log("🚀 ~ handleToggleUserStatus ~ error:", error)

        }
    }



    if (isLoading) {
        return (
            <div className='grid place-content-center'>
                <Spinner size='lg' />
            </div>
        )
    }


    return (
        <div>
            <div className="text-3xl font-bold text-white flex  items-center gap-2 mb-10 md:px-6"><ChevronLeft className='cursor-pointer w-10 h-10' onClick={() => navigate(-1)} /> Customer Details</div>
            <div className='flex flex-col gap-10 glass mx-4 md:mx-12 '>
                <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-2 py-6 md:px-10">
                    <div className='flex items-center gap-2'>
                        <img className="w-24 h-24 rounded-full" crossOrigin='anonymous' src={user?.image ? UPLOADS_URL + user?.image : "https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt="Image" />
                        <div className="flex flex-col">
                            <span className=" ">{user?.fullName || ""} </span>
                            <span className="text-sm text-gray-400 ">{user?.email || ""}</span>
                        </div>
                    </div>
                    <div><button
                        disabled={toggleUserLoading}
                        onClick={handleToggleUserStatus}
                        className="w-[200px] bgPink blackText  font-semibold  rounded-lg  transition-colors"
                    > {toggleUserLoading ? <Spinner  /> : user?.isActive ? "Banned" : "Unbanned"} </button></div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6  font-extralight md:max-w-3xl md:px-10">
                    <div className="flex flex-col">
                        <span className="text-gray-400">Full Name</span>
                        <span>{user?.fullName || ""}</span>
                    </div>
                    {/* <div className="flex flex-col">
                        <span className="text-gray-400">Last Name</span>
                        <span>Doe</span>
                    </div> */}
                    <div className="flex flex-col">
                        <span className="text-gray-400">Registered On</span>
                        <span>{user?.createdAt || ""}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-gray-400">Email Address</span>
                        <span>{user?.email || ""}</span>
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
                        <span className="text-gray-400">Is Actve</span>
                        <span className={`${user?.isActive ? "text-green-500" : "text-red-500"} font-semibold`}>{user?.isActive ? "Active" : "Banned"}</span>
                    </div>
                    {/* <div className="flex flex-col">
                        <span className="text-gray-400">Address</span>
                        <span>123 Street, City</span>
                    </div> */}
                    <div className="flex flex-col">
                        <span className="text-gray-400">Collections Purchased</span>
                        <span>15</span>
                    </div>
                </div>





            </div>
        </div>
    )
}
