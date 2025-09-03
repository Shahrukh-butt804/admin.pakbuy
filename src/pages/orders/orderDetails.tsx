import { ChevronLeft } from "lucide-react";
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import Spinner from '../../components/spinner';
import { useGetOrderByIdQuery, useUpdateOrderStatusMutation } from '../../redux/services/orderSlice';


export default function OrderDetails() {
    const navigate = useNavigate()
    const { id } = useParams()


    const { data: order, isLoading, refetch } = useGetOrderByIdQuery(id, { skip: !id })
    const [updateOrderStatus] = useUpdateOrderStatusMutation()

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        try {
            const res: any = await updateOrderStatus({ id, body: { status: selected } })
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
                    title: 'Opps!',
                    text: res?.error?.data?.message || 'something went wrong!',
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Opps!',
                text: error?.error?.data?.message || error?.message || error?.data?.message || 'something went wrong!',
            })
            console.log("🚀 ~ handleChange ~ error:", error)

        }
    };


    if (isLoading) {
        return (
            <div className='grid place-content-center'>
                <Spinner size='lg' />
            </div>
        )
    }


    return (
        <div>
            <div className="text-xl font-bold text-white flex  items-center gap-2 mb-5 md:px-6">
                <div className='w-full flex flex-col md:flex-row justify-between  gap-2 mx-4 md:mx-0  md:mr-7'>
                    <div className='flex items-center gap-2'>
                        <ChevronLeft className='cursor-pointer w-8 h-8 mb-6' onClick={() => navigate(-1)} />
                        <p className="text-2xl md:text-3xl"> Order Details</p>
                    </div>
                    <select
                        value={order.status}
                        onChange={handleChange}
                        className="border px-4 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                        <option className="text-black text-xs md:text-lg" value="confirmed">confirmed</option>
                        <option className="text-black text-xs md:text-lg" value="dispatched">dispatched</option>
                        <option className="text-black text-xs md:text-lg" value="delivered">delivered</option>
                        <option className="text-black text-xs md:text-lg" value="cancelled">cancelled</option>
                    </select>
                </div>

            </div>

            <div className='glass flex flex-col gap-10 mx-4 md:mx-12 text-sm'>
                <div className='flex flex-col gap-10 '>

                    {/* Order Details */}
                    <span className='md:px-10 text-xl font-bold'>Order Details</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6  font-extralight md:max-w-5xl md:px-10">
                        <div className="flex flex-col">
                            <span className="text-gray-400">Order ID</span>
                            <span>{order?._id || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Date</span>
                            <span>{new Date(order?.createdAt).toLocaleDateString() || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Amount</span>
                            <span>{order?.totalAmount || "N/A"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Order Note</span>
                            <span>{order?.orderNote || "N/A"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Status</span>
                            <span className={`${order?.status === "cancelled" && "text-red-400 font-bold" }`}>{order?.status || "N/A"}</span>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <span className='md:px-10 text-xl font-bold'>Customer Details</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6  font-extralight md:max-w-5xl md:px-10">
                        <div className="flex flex-col">
                            <span className="text-gray-400">Name</span>
                            <span>{order?.user?.fullName || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Email</span>
                            <span>{order?.user?.email || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Phone Number</span>
                            <span>{order?.shippingAddress?.phone || "N/A"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Billing Address</span>
                            <span>{order?.billingAddress?.country + " ," + order?.billingAddress?.state + " ," + order?.billingAddress?.city || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Shipping Address</span>
                            <span>{order?.shippingAddress?.country + " ," + order?.shippingAddress?.state + " ," + order?.shippingAddress?.city || "N/A"}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Collections Purchased</span>
                            <span>
                                CHOOSE{" "}
                                {order?.products && order?.products.length > 0
                                    ? order.products
                                        .filter((p: any) => p.packageId) // avoid nulls
                                        .map((p: any) => p.packageId.name)
                                        .join(", ")
                                    : "N/A"}
                            </span>
                        </div>
                    </div>

                </div>
                <div className='md:px-10'>
                    <p>Ordered Items from Collections</p>
                    <div className="glass rounded-lg col-span-2 max-w-4xl">
                        <table className="w-full text-left font-extralight">
                            <thead >
                                <tr>
                                    <th>Collection Name </th>
                                    <th>Products </th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.products?.length > 0 &&
                                    order.products.some((p: any) => p.packageId !== null) &&
                                    order.products.map((orderData: any, index: number) => (
                                        <React.Fragment key={index}>
                                            <div className="my-6" />
                                            <tr>
                                                <td>{orderData.packageId?.name || "N/A"}</td>
                                                <td>
                                                    {orderData.packageId?.products
                                                        ?.map((product: any) => product.name)
                                                        .join(", ") || "N/A"}
                                                </td>
                                                <td>{orderData.packageId?.price ?? "N/A"}</td>
                                                <td>{orderData.quantity}</td>
                                                <td>{order.totalAmount}</td>
                                            </tr>
                                            <div className="h-px bg-gray-700" />
                                        </React.Fragment>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
