import { useState } from "react";
import { Eye, Search } from "lucide-react";
import { useNavigate } from "react-router";


const Table = ({ navigateTo, tableData, setPagination, pagination }: { navigateTo?: string, tableData?: { data: any, exlucdedFields?: string[] }, setPagination?: any, pagination?: any }) => {
    const navigate = useNavigate()
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [keyword, setkeyword] = useState("")

    const rows = tableData?.data?.length ? tableData.data : [];

    const columns = rows.length > 0
        ? Object.keys(rows[0]).filter((col) => !tableData?.exlucdedFields?.includes(col))
        : [];


    const handleChange = (e: any) => {
        const { value } = e.target;
        setPagination((prevPagination: any) => ({
            ...prevPagination,
            "keyword": value,
        }));
        setkeyword(value)
    };

    const handleEntryChange = (e: any) => {
        const { name, value } = e.target;
        setPagination((prevPagination: any) => ({
            ...prevPagination,
            [name]: value,
        }));
        setEntriesPerPage(value)
    };



    return (
        <div className="p-3 md:px-6">
            {/* Top Controls */}
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 gap-5 md:gap-0 p-4 md:p-0 md:px-6 text-gray-200">
                <div>
                    <label className="text-sm mr-3">Show entries</label>
                    <select
                        name="limit"
                        value={entriesPerPage}
                        onChange={handleEntryChange}
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
                        type="keyword"
                        placeholder="Search Here..."
                        className="bg-transparent focus:outline-none text-sm"
                        value={keyword}
                        onChange={handleChange}
                    />
                    <Search className="w-5 h-5 text-white" />
                </div>
            </div>

            {/* Table */}
            <div className="glass border border-white/20 rounded-2xl shadow-lg overflow-hidden max-w-screen text-gray-200" >
                <div className="overflow-x-scroll lg:overflow-auto">

                    <table className="w-full min-w-[700px] text-left text-sm">
                        <thead className="uppercase border-b border-white/10">
                            <tr>
                                {columns.length > 0 && (
                                    <>
                                        <th className="px-4 py-3">S.No</th>
                                        {columns.map((col) => (
                                            <th key={col} className="px-4 py-3">
                                                {col.replace(/([A-Z])/g, " $1").trim()} {/* makes firstName → First Name */}
                                            </th>
                                        ))}
                                        <th className="px-4 py-3">Action</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length > 0 ? rows.map((row: any, i: number) => (
                                <tr key={row.id || i} className="hover:bg-white/5 transition">
                                    <td className="px-4 py-3">{String(i + 1).padStart(2, "0")}</td>
                                    {columns.map((col) => (
                                        col === "content" ?
                                            <td key={col} className="px-4 py-3">
                                                <div dangerouslySetInnerHTML={{ __html: row[col].length > 200 ? String(row[col]).slice(0, 40) + "..." : row[col] }} />
                                            </td>
                                            :

                                            <td key={col} className="px-4 py-3">
                                                {col === "createdAt" || col === "expiryDate" || col === "updatedAt" ? new Date(row[col]).toLocaleDateString() :
                                                    col === "totalAmount" || col === "amount" ? `$ ${row[col].toFixed(2)}`
                                                        : String(row[col]).length > 200 ? String(row[col]).slice(0, 140) + "..." : String(row[col]) || "N/A"}
                                            </td>


                                    ))}
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => navigate(`${navigateTo}/${row._id}`)}
                                            className="bg-pink-200 text-black p-2 rounded-full hover:bg-pink-300 removebgColor"
                                        >
                                            <Eye className="w-6 h-6 pinkText" />
                                        </button>
                                    </td>
                                </tr>
                            )) :
                                <tr>
                                    <td colSpan={columns.length + 2} className="px-4 py-3 text-center font-bold text-xl">
                                        No Data Found
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>

                </div>
            </div>

            {/* Footer */}
            <Pagination setPagination={setPagination} pagination={pagination} />


        </div>
    );
};

export default Table;


const Pagination = ({ setPagination, pagination }: any) => {
    const { totalDocs, currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

    return (
        <div className="flex flex-col md:flex-row justify-start md:justify-between items-center mt-4 text-sm text-gray-200">
            <p className="mx-2 md:mx-0">
                Showing page {currentPage} of {totalPages} (Total {totalDocs} entries)
            </p>

            <div
                className="flex items-center space-x-2 glass cursor-pointer mx-2 md:mx-0"
                style={{ padding: "8px 0px", borderRadius: "10px" }}
            >
                <button
                    className="px-3 py-1 removebgColor"
                    disabled={!hasPrevPage}
                    onClick={() => setPagination((prevPagination: any) => ({ ...prevPagination, page: prevPagination.page - 1 }))}
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={`px-3 py-1  ${page === currentPage ? "bgPink blackText rounded-md" : "removebgColor"
                            }`}
                        onClick={() => setPagination((prevPagination: any) => ({ ...prevPagination, page: prevPagination.page = page }))}
                    >
                        {page.toString().padStart(2, "0")}
                    </button>
                ))}

                <button
                    className="px-3 py-1 removebgColor"
                    disabled={!hasNextPage}
                    onClick={() => setPagination((prevPagination: any) => ({ ...prevPagination, page: prevPagination.page + 1 }))}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
