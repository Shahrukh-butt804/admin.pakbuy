import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../components/spinner";
import { useGetCouponByIdQuery, useToggleCouponStatusMutation } from "../../redux/services/couponSlice";
import Swal from "sweetalert2";

export default function CouponDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: coupon, isLoading, refetch } = useGetCouponByIdQuery(id, { refetchOnMountOrArgChange: true });
    const [updateCouponStatus, { isLoading: isUpdating }] = useToggleCouponStatusMutation();

    const handleToggleCouponStatus = async () => {
        const res: any = await updateCouponStatus({ id });
        try {
            if (res?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res?.data?.message || 'something went wrong!',
                })
                refetch()
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
            console.log("🚀 ~ handleToggleCouponStatus ~ error:", error)

        }
    };

    if (isLoading) {
        return (
            <div className="grid place-content-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="p-0 md:p-8 glass text-white rounded-xl shadow-lg max-w-7xl mx-2 md:mx-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-1">
                    <ChevronLeft
                        className="cursor-pointer w-5 h-5 md:w-8 md:h-8 mb-2 md:mb-3"
                        onClick={() => navigate(-1)}
                    />
                    <h2 className="text-2xl md:text-3xl font-bold">Coupon Details</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                    <button
                        onClick={handleToggleCouponStatus}
                        disabled={isUpdating}
                        type="submit"
                        className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors whitespace-nowrap"
                    >
                        {isUpdating ? <Spinner /> : coupon?.isActive ? "Deactivate Coupon" : "Activate Coupon"}
                    </button>       <button
                        onClick={() => navigate(`/edit-coupon/${id}`)}
                        type="submit"
                        className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors whitespace-nowrap"
                    >
                        Edit Coupon
                    </button>
                </div>
            </div>


            <div className='glass flex flex-col gap-10 md:mx-8 text-sm'>
                <div className='flex flex-col gap-10 '>

                    {/* Coupon Details */}

                    <div className="grid grid-cols-1  lg:grid-cols-3 gap-y-6  font-extralight md:max-w-5xl ">
                        <div className="flex flex-col">
                            <span className="text-gray-400">Coupon ID</span>
                            <span>{coupon?._id || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Created At</span>
                            <span>{new Date(coupon?.createdAt).toLocaleDateString() || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Expiry Date</span>
                            <span>{new Date(coupon?.expiryDate).toLocaleDateString() || "N/A"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Coupon Code</span>
                            <span>{coupon?.code || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Coupon Value</span>
                            <span>{coupon?.value || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Coupon Type</span>
                            <span>{coupon?.type || "N/A"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Status</span>
                            <span className={`${!coupon?.isActive ? "text-red-400" : "text-green-400 "} font-bold`}>{coupon?.isActive ? "Active" : "Inactive"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Coupon limit</span>
                            <span>{coupon?.limit || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Per User Limit</span>
                            <span>{coupon?.perUserLimit || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Used By User</span>
                            <span>{coupon?.usedBy.length ?? "N/A"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Description</span>
                            <span>{coupon?.description || "N/A"}</span>
                        </div>

                    </div>


                </div>

            </div>


        </div>
    );
}
