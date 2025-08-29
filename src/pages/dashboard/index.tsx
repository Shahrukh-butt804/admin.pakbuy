import OrdersBarChart from "../../components/barChart";

// Example props structure for dynamic data
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

const statusColors: any = {
    Paid: "text-green-400",
    Pending: "text-orange-400",
    // add more status colors if needed
};

function Dashboard({ data }: any) {
    return (
        <div className="p-4 md:px-6 from-gray-800 via-gray-900 to-black md:min-h-screen  text-white">
            <header className="flex justify-between items-center pb-8">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-8 lg:h-40">
                {data.stats.map((stat: any, idx: any) => {
                    if (stat.label === "Orders") {
                        return (
                            <div key={idx} className="glass rounded-lg lg:ml-9 flex flex-col justify-start gap-5 lg:col-span-3">
                                <div className="flex justify-between">
                                    <div className="pinkText">{stat.label}</div>
                                    <div className="pinkText">
                                        View All
                                    </div>
                                </div>
                                <div className="flex gap-6 mt-4 text-lg">
                                    {Object.entries(stat.counts).map(([key, value]: any) => (
                                        <div className="flex flex-col-reverse items-center  w-full  " key={key}>
                                            {key} <span className="font-bold text-2xl ">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div key={idx} className="glass rounded-lg flex justify-between items-center lg:col-span-2  ">
                            <div className="flex flex-col gap-1">
                                <div className="text-4xl font-semibold">
                                    {stat.isMoney ? `$${stat.value.toLocaleString()}` : stat.value}
                                </div>
                                <div className="">{stat.label}</div>
                                <div className="text-xs text-green-400">+{stat.growth}%</div>
                            </div>


                            <img src={stat.image} alt="Image" className="w-24 h-24 mb-2" />
                        </div>
                    );
                })}
            </div>

            {/* charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 ">
                <div className="glass rounded-lg lg:mr-12 lg:col-span-3"><OrdersBarChart /></div>

                {/* recen order */}
                <div className="glass rounded-lg lg:col-span-2 mt-5 lg:mt-0">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold pinkText">Recent Orders</h2>
                        <div className="pinkText">
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
                            {data.recentOrders.map((order: any, index: any) => (
                                <>
                                    <div className="my-6" />
                                    <tr key={index}>
                                        <td>{order.customer}</td>
                                        <td>{order.date}</td>
                                        <td>${order.amount.toFixed(2)}</td>
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
    return <Dashboard data={sampleData} />;
}
