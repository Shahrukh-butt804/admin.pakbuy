import Spinner from "../../components/spinner";
import Table from "../../components/table";
import { useGetAllUsersQuery } from "../../redux/services/userManagement";

export default function Customers() {
  const { data, isLoading } = useGetAllUsersQuery({})


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
        <p className="text-4xl md:text-5xl font-bold text-white">Customers</p>
      </header>
      <Table tableData={{ data: data?.Users, exlucdedFields: ["password", "__v", "otp", "updatedAt", "refreshToken", "image"] }} navigateTo="/customer-detail" />
    </div>
  )
}
