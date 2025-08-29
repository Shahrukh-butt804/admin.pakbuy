import { useNavigate, useParams } from 'react-router'
import { ChevronLeft } from "lucide-react";


const sampleData = {
    userName: "John Doe",
    avatarUrl: "avatar.png",
    stats: [
        { label: "Monthly Revenue", value: 10540, growth: 22.45, isMoney: true, image: "/images/revenue.png" },
        { label: "Monthly Sales", value: 37, growth: 15.54, isMoney: false, image: "/images/chart.png" },
        {
            label: "Orders",
            counts: { New: 10, Processing: 28, Ship: 90 },
        },
    ],
    recentOrders: [
        { customer: "Alice James", date: "24.05.2023", amount: 124.97, status: "Paid" },
        { customer: "Angela Jones", date: "23.05.2023", amount: 55.42, status: "Pending" },
        { customer: "Amanda Will", date: "23.05.2023", amount: 89.9, status: "Paid" },
        { customer: "Emily Jade", date: "22.05.2023", amount: 144.94, status: "Pending" },
    ],
};
export default function OrderDetails() {
    const navigate = useNavigate()
    const { id } = useParams()
    console.log("🚀 ~ CustomerDetail ~ id:", id)
    return (
        <div>
            <div className="text-3xl font-bold text-white flex  items-center gap-2 mb-5 md:px-6"><ChevronLeft className='cursor-pointer w-10 h-10' onClick={() => navigate(-1)} /> Order Details</div>

            <div className='glass flex flex-col gap-10 mx-4 md:mx-12 text-sm'>
                <div className='flex flex-col gap-10 '>

                    {/* Order Details */}
                    <span className='md:px-10 text-xl font-bold'>Order Details</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6  font-extralight md:max-w-3xl md:px-10">
                        <div className="flex flex-col">
                            <span className="text-gray-400">Order ID</span>
                            <span>#1123</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Date</span>
                            <span>Jun 23, 25</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Payment</span>
                            <span>Paid</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Shipping Method</span>
                            <span>lorem Ipsum</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Tracking Number</span>
                            <span>2345</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Status</span>
                            <span>In Stock</span>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <span className='md:px-10 text-xl font-bold'>Customer Details</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6  font-extralight md:max-w-3xl md:px-10">
                        <div className="flex flex-col">
                            <span className="text-gray-400">Name</span>
                            <span>Alex jones</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Email</span>
                            <span>alex@gmail.com</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Phone Number</span>
                            <span>+1 234 5668739</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Billing Address</span>
                            <span>lorem Ipsum</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Shipping Address</span>
                            <span>lorem Ipsum</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Collections Purchased</span>
                            <span>CHOOSE ultra</span>
                        </div>
                    </div>

                </div>
                <div className='md:px-10'>
                    <p>Ordered Items from Collections</p>
                    <div className="glass rounded-lg col-span-2 max-w-2xl">
                        <table className="w-full text-left font-extralight">
                            <thead >
                                <tr>
                                    <th>Collection Name </th>
                                    <th>Product Name </th>
                                    <th>Price</th>
                                    <th>Coupon Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleData.recentOrders.map((order: any, index: any) => (
                                    <>
                                        <div className="my-6" />
                                        <tr key={index}>
                                            <td>{order.customer}</td>
                                            <td>{order.date}</td>
                                            <td>${order.amount.toFixed(2)}</td>
                                            <td className={"text-gray-400"}>{order.status}</td>
                                        </tr>
                                        <div className="h-px  bg-gray-700" /></>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
