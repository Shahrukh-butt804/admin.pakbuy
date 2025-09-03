import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../components/spinner";
import { useGetCouponByIdQuery } from "../../redux/services/couponSlice";

export default function CouponDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: coupon, isLoading } = useGetCouponByIdQuery(id, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        return (
            <div className="grid place-content-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 glass text-white rounded-xl shadow-lg max-w-7xl mx-4 md:mx-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-1">
                    <ChevronLeft
                        className="cursor-pointer w-5 h-5 md:w-8 md:h-8 mb-2 md:mb-3"
                        onClick={() => navigate(-1)}
                    />
                    <h2 className="text-2xl md:text-3xl font-bold">Coupon Details</h2>
                </div>
                <button
                    onClick={() => navigate(`/edit-coupon/${id}`)}
                    type="submit"
                    className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                    Edit Coupon
                </button>
            </div>

            <h3 className="text-2xl font-semibold mb-4">{coupon.code || ""}</h3>


        </div>
    );
}
