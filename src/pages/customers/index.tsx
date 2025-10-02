import { useState } from "react";
import Spinner from "../../components/spinner";
import Table from "../../components/table";
import { useGetAllUsersQuery, useGetGrowthDataQuery } from "../../redux/services/userManagement";
import MembershipGrowthChart from "../../components/growthChart";


export default function Members() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    keyword: ""
  })
  const [weeksBack, setWeeksBack] = useState(12);
  const [isTableVisible, setIsTableVisible] = useState(false);


  const { data, isLoading } = useGetAllUsersQuery({ ...pagination }, { refetchOnMountOrArgChange: true })
  const { data: growthData, isLoading: growthDataLoading , isFetching: growthDataFetching } = useGetGrowthDataQuery({ weeksBack }, { refetchOnMountOrArgChange: true })


  if (isLoading || growthDataLoading) {
    return (
      <div className='grid place-content-center'>
        <Spinner size='lg' />
      </div>
    )
  }


  return (
    <div >
      <header className="flex flex-col md:flex-row justify-center md:justify-between items-center md:px-6">
        <p className="text-4xl md:text-5xl font-bold text-white">Members</p>
        <div className="flex justify-center">
          <button
            onClick={() => setIsTableVisible(!isTableVisible)}
            className="px-4 py-2 bgPink blackText font-semibold rounded-lg transition-colors"
          >{isTableVisible ? "Hide" : "Show"} Graph</button>
        </div>
      </header>


      {isTableVisible &&
        <div className="p-3 md:px-6">
          <MembershipGrowthChart data={growthData.growth} weeksBack={growthData.weeksBack} setWeeksBack={setWeeksBack} growthDataFetching={growthDataFetching} />
        </div>
      }

      <Table
        tableData={{ data: data?.Users, exlucdedFields: ["password", "__v", "otp", "updatedAt", "refreshToken", "image"] }}
        navigateTo="/customer-detail"
        setPagination={setPagination}
        pagination={data?.pagination || {}}
      />
    </div>
  )
}
