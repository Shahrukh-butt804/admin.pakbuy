import { useState } from "react";
import Spinner from "../../components/spinner";
import Table from "../../components/table";
import { useGetAllProductsQuery } from "../../redux/services/productSlice";
import { useNavigate } from "react-router";

export default function Products() {
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        keyword: ""
    })
    const { data, isLoading } = useGetAllProductsQuery({ ...pagination }, { refetchOnMountOrArgChange: true })

    if (isLoading) {
        return (
            <div className='grid place-content-center'>
                <Spinner size='lg' />
            </div>
        )
    }


    return (
        <div >
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between  items-start md:items-center px-4 md:px-6  text-white mr-7">

                <header className="flex justify-center md:justify-between items-center ">
                    <p className="text-4xl md:text-5xl font-bold text-white">Product Management</p>
                </header>

                <button
                    onClick={() => navigate("/add-product")}
                    type="submit"
                    className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                >
                    Add PRODUCT
                </button>
            </div>
            <Table
                tableData={{ data: data.packages, exlucdedFields: ["__v", "updatedAt", "products" ,"discountPrice"] }}
                navigateTo="/product-detail"
                setPagination={setPagination}
                pagination={data?.pagination || {}}
            />
        </div>
    )
}
