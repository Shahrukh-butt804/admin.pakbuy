import Table from "../../components/table";

export default function Orders() {
  return (
    <div >
      <header className="flex justify-center md:justify-between items-center md:px-6">
        <p className="text-4xl md:text-5xl font-bold text-white">Orders</p>
      </header>
      <Table navigateTo="/order-detail" />
    </div>
  )
}
