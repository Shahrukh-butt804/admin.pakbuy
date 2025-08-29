import Table from "../../components/table";

export default function Customers() {
  return (
    <div >
      <header className="flex justify-between items-center md:px-6">
        <h1 className="text-2xl font-bold text-white">Customers</h1>
      </header>
      <Table />
    </div>
  )
}
