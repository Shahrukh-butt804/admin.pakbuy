import Table from "../../components/table";

export default function Customers() {
  return (
    <div >
      <header className="flex justify-center md:justify-between items-center md:px-6">
        <p className="text-4xl md:text-5xl font-bold text-white">Customers</p>
      </header>
      <Table navigateTo="/customer-detail" />
    </div>
  )
}
