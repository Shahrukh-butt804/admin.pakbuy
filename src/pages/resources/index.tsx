import { useState } from "react";
import Table from "../../components/table";

export default function Resources() {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        keyword: ""
    })
    return (
        <div >
            <header className="flex justify-between items-center md:px-6">
                <p className="text-4xl md:text-5xl font-bold text-white">Resources</p>
            </header>
            <Table navigateTo="/resource-detail"
                setPagination={setPagination}
                pagination={pagination || {}} />
        </div>
    )
}
