import DashboardNav from '../../components/dashboard/DashboardNav'
import Header from '../../components/dashboard/Header'
import StatusCard from '../../components/dashboard/cards/StatusCard'
import TableCard from '../../components/dashboard/cards/TableCard'
import ServicesCard from '../../components/dashboard/cards/ServicesCard'
import Meta from '../../components/seo/Meta'
import ClientConfig from '../../ClientConfig'


const Dashboard = () => {

    return (
        <>
            <Meta title="User Dashboard" />
            {/* <DashboardNav/> */}
            <div class="h-64 border-dashed border-4 border-white p-4 text-md">
            <h1>Dashboard</h1>
            </div>
        </>
    )
}
export default Dashboard