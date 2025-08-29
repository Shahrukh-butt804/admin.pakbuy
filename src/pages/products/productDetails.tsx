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
export default function ProductDetails() {
    const navigate = useNavigate()
    const { id } = useParams()
    console.log("🚀 ~ CustomerDetail ~ id:", id)
    return (
        <div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center px-4 md:px-6 mb-6 text-white mr-7">
                <div className="flex items-center gap-2 text-3xl font-bold">
                    <ChevronLeft
                        className="cursor-pointer w-10 h-10"
                        onClick={() => navigate(-1)}
                    />
                    <span>Product Details</span>
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                >
                    Edit PRODUCT
                </button>
            </div>



            <div className='glass flex flex-col gap-10 mx-4 md:mx-12 '>
                <div className='flex flex-col gap-10    '>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6  font-extralight md:max-w-3xl md:px-10">
                        <div className="flex flex-col">
                            <span className="text-gray-400">Product Name</span>
                            <span>Muse S Athena</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">SKU</span>
                            <span>BW22-BL</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Collection Name</span>
                            <span>CHOOSE Mind</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Price</span>
                            <span>$600.00</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Stock</span>
                            <span>23</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Status</span>
                            <span>In Stock</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-400">Ratings</span>
                            <span>5 out of 4</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400">Description</span>
                            <span>Train your brain to achieve peak focus, endurance, and resilience with exclusive EEG and fNIRS technology</span>
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
