import Table from "../../components/table";

export default function Orders() {
  return (
    <div >
      <header className="flex justify-between items-center md:px-6">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
      </header>
      <Table navigateTo="/order-detail" />
    </div>
  )
}
