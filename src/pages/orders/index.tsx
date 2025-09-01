import Spinner from "../../components/spinner";
import Table from "../../components/table";
import { useGetAllOrdersQuery } from "../../redux/services/orderSlice";

export default function Orders() {

  const { data, isLoading } = useGetAllOrdersQuery({})


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
        <p className="text-4xl md:text-5xl font-bold text-white">Orders</p>
      </header>
      <Table tableData={{ data: data?.orders, exlucdedFields: ["products", "__v", "stripeSource", "updatedAt",  "_id", "shippingAddress", "billingAddress"] }} navigateTo="/order-detail" />

    </div>
  )
}
