import { useState } from "react";
import Table from "../../components/table";
import { useGetAllResourcesQuery } from "../../redux/services/resourceSlice";
import Spinner from "../../components/spinner";

export default function Resources() {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        keyword: ""
    })

    const { data, isLoading } = useGetAllResourcesQuery({ ...pagination })


    if (isLoading) {
        return (
            <div className='grid place-content-center'>
                <Spinner size='lg' />
            </div>
        )
    }


    return (
        <div >
            <header className="flex justify-center md:justify-between items-center md:px-6">
                <p className="text-4xl md:text-5xl font-bold text-white">Resources</p>
            </header>
            <Table
                tableData={{ data: data?.resources, exlucdedFields: ["_id", "__v", "createdAt"] }}
                navigateTo="/resource-detail"
                setPagination={setPagination}
                pagination={data?.pagination || {}}


            />
        </div>
    )
}
