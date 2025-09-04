import { useNavigate } from "react-router";
import OrdersBarChart from "../../components/barChart";
import Spinner from "../../components/spinner";
import { useGetReportQuery } from "../../redux/services/userManagement";
import { ImageUrl } from "../../utils/Functions";


const statusColors: any = {
    confirmed: "text-green-400",
    delivered: "text-orange-400",
    cancelled: "text-red-400",
};

function Dashboard() {
    const navigate = useNavigate()
    const { data: reportData, isLoading } = useGetReportQuery({})




    if (isLoading) {
        return (
            <div className='grid place-content-center'>
                <Spinner size='lg' />
            </div>
        )
    }


    return (
        <div className="px-4 md:px-6 from-gray-800 via-gray-900 to-black   text-white">
            <header className="flex justify-center md:justify-between items-center ">
                <p className="text-4xl md:text-5xl font-bold text-white">Dashboard</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-14 lg:h-32">


                <div className="glass rounded-lg flex justify-between items-center lg:col-span-2  ">
                    <div className="flex flex-col gap-1">
                        <div className="text-4xl font-semibold">
                            {reportData?.monthlyRevenue || 0}
                        </div>
                        <div className="">Monthly Revenue</div>
                        <div className="text-xs text-green-400">+{10}%</div>
                    </div>


                    <img src={ImageUrl("revenue.png")} alt="Image" className="w-24 h-24 mb-2" />
                </div>
                <div className="glass rounded-lg flex justify-between items-center lg:col-span-2  ">
                    <div className="flex flex-col gap-1">
                        <div className="text-4xl font-semibold">
                            {reportData?.totalSubscriptionsRevenue || 0}
                        </div>
                        <div className="">Total Subscriptions Revenue</div>
                        <div className="text-xs text-green-400">+{10}%</div>
                    </div>


                    <img src={ImageUrl("chart.png")} alt="Image" className="w-24 h-24 mb-2" />
                </div>



                <div className="glass rounded-lg lg:ml-9 flex flex-col justify-start gap-5 lg:col-span-3">
                    <div className="flex justify-between">
                        <div className="pinkText">Orders</div>
                        <div
                            onClick={() => navigate("/orders")}
                            className="pinkText cursor-pointer">
                            View All
                        </div>
                    </div>
                    <div className="flex gap-6 mt-4 text-lg">
                        {Object.entries(reportData.orders).map(([key, value]: any) => (
                            <div className="flex flex-col-reverse items-center  w-full  " key={key}>
                                {key} <span className="font-bold text-2xl ">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>



            </div>

            {/* charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 ">
                <div className="glass rounded-lg lg:mr-13 lg:col-span-3"><OrdersBarChart Mydata={reportData?.ordersOverTime} /></div>

                {/* recen order */}
                <div className="glass rounded-lg lg:col-span-2 mt-5 lg:mt-0">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold pinkText">Recent Orders</h2>
                        <div
                            onClick={() => navigate("/orders")}
                            className="pinkText cursor-pointer">
                            View All
                        </div>
                    </div>
                    <table className="w-full text-left font-extralight">
                        <thead >
                            <tr>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData?.recentOrderTable && reportData?.recentOrderTable?.length > 0 && reportData?.recentOrderTable?.map((order: any, index: any) => (
                                <>
                                    <div className="my-6" />
                                    <tr key={index}>
                                        <td>{order.customer || ""}</td>
                                        <td>{order.date || ""}</td>
                                        <td>${Number(order.amount).toFixed(2) || ""}</td>
                                        <td className={statusColors[order.status] || "text-gray-400"}>{order.status}</td>
                                    </tr>
                                    <div className="h-px  bg-gray-700" /></>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    // Pass the dynamic data as a prop to Dashboard
    return <Dashboard />;
}
