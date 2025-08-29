import { useState } from "react";
import { Eye, Search } from "lucide-react";
import { useNavigate } from "react-router";

const Table = ({ navigateTo }: { navigateTo?: string }) => {
    const navigate = useNavigate()
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    const data = [
        { id: 1, firstName: "Eva", lastName: "Fox", email: "eva@email.com", date: "MM/DD/YYYY", orders: 5 },
        { id: 2, firstName: "Linda", lastName: "Arcand", email: "linda@email.com", date: "MM/DD/YYYY", orders: 2 },
        { id: 3, firstName: "Kevin", lastName: "Vetrovs", email: "kevin@email.com", date: "MM/DD/YYYY", orders: 8 },
        { id: 4, firstName: "Sarah", lastName: "Jones", email: "sarah@email.com", date: "MM/DD/YYYY", orders: 0 },
        { id: 5, firstName: "Jennifer", lastName: "Smith", email: "jennifer@email.com", date: "MM/DD/YYYY", orders: 1 },
    ];

    return (
        <div className="md:px-6">
            {/* Top Controls */}
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 gap-5 md:gap-0 p-4 md:p-0 md:px-6 ">
                <div>
                    <label className="text-sm mr-3">Show entries</label>
                    <select
                        value={entriesPerPage}
                        onChange={(e: any) => setEntriesPerPage(e.target.value)}
                        className="bg-transparent border glass  appearance-none text-sm"
                        style={{ padding: "8px 35px" }}
                    >
                        <option value={10} className="bg-black/80">10</option>
                        <option value={20} className="bg-black/80">20</option>
                        <option value={50} className="bg-black/80">50</option>
                    </select>
                </div>

                <div className="flex items-center bg-[#111827]  rounded-lg  glass" style={{ padding: "12px 15px" }}>
                    <input
                        type="text"
                        placeholder="Search Here..."
                        className="bg-transparent focus:outline-none text-sm"
                    />
                    <Search className="w-5 h-5 text-white" />
                </div>
            </div>

            {/* Table */}
            <div className="glass border border-white/20 rounded-2xl shadow-lg overflow-hidden max-w-screen" >
                <div className="overflow-x-scroll lg:overflow-auto">
                    <table className="w-full min-w-[700px] text-left text-sm ">
                        <thead className="uppercase border-b border-white/10">
                            <tr>
                                <th className="px-4 py-3">S.No</th>
                                <th className="px-4 py-3">First Name</th>
                                <th className="px-4 py-3">Last Name</th>
                                <th className="px-4 py-3">Email Address</th>
                                <th className="px-4 py-3">Registration Date</th>
                                <th className="px-4 py-3">Orders</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, i) => (
                                <tr key={row.id} className="hover:bg-white/5 transition">
                                    <td className="px-4 py-3">{String(i + 1).padStart(2, "0")}</td>
                                    <td className="px-4 py-3">{row.firstName}</td>
                                    <td className="px-4 py-3">{row.lastName}</td>
                                    <td className="px-4 py-3">{row.email}</td>
                                    <td className="px-4 py-3">{row.date}</td>
                                    <td className="px-4 py-3">{row.orders}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => navigate(`${navigateTo}/${row.id}`)}
                                            className="bg-pink-200 text-black p-2 rounded-full hover:bg-pink-300 removebgColor">
                                            <Eye className="w-6 h-6 pinkText" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center mt-4 text-sm ">
                <p className="mx-2 md:mx-0">Showing 5 out of 20 entries</p>
                <div className="flex items-center space-x-2 glass cursor-pointer mx-2 md:mx-0 " style={{ padding: "8px 0px", borderRadius: "10px" }}>
                    <button className="px-3 py-1 removebgColor ">Previous</button>
                    <button className="px-3 py-1 removebgColor" >01 </button>
                    <button className="px-3 py-1 removebgColor" >02 </button>
                    <button className="px-3 py-1 removebgColor" >03 </button>
                    <button className="px-3 py-1 removebgColor" >Next</button>
                </div>
            </div>

        </div>
    );
};

export default Table;
