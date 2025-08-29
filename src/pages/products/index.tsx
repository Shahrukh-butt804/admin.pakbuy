import Table from "../../components/table";

export default function Products() {
    return (
        <div >
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center px-4 md:px-6 mb-6 text-white mr-7">
            <h1 className="text-2xl font-bold text-white">Product Management</h1>

                <button
                    type="submit"
                    className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
                >
                    Add PRODUCT
                </button>
            </div>
            <Table navigateTo="/product-detail" />
        </div>
    )
}
