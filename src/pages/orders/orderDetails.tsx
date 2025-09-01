import { useNavigate, useParams } from 'react-router'
import { ChevronLeft } from "lucide-react";
import { useGetOrderByIdQuery } from '../../redux/services/orderSlice';
import Spinner from '../../components/spinner';
import React from 'react';


export default function OrderDetails() {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data: order, isLoading } = useGetOrderByIdQuery(id, { skip: !id })
    console.log("🚀 ~ OrderDetails ~ order:", order)


    if (isLoading) {
        return (
            <div className='grid place-content-center'>
                <Spinner size='lg' />
            </div>
        )
    }


    return (
        <div>
            <div className="text-3xl font-bold text-white flex  items-center gap-2 mb-5 md:px-6"><ChevronLeft className='cursor-pointer w-10 h-10' onClick={() => navigate(-1)} /> Order Details</div>

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
                            <span>{order?.status || "N/A"}</span>
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
