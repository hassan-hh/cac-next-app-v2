import DashboardNav from '../../components/dashboard/DashboardNav'
import Header from '../../components/dashboard/Header'
import StatusCard from '../../components/dashboard/cards/StatusCard'
import TableCard from '../../components/dashboard/cards/TableCard'
import ServicesCard from '../../components/dashboard/cards/ServicesCard'
import Meta from '../../components/seo/Meta'
// import ClientConfig from '../../ClientConfig'


export const getStaticProps = async () => {
    // const CatsUrl = ClientConfig.apiUrl
    // const res = await fetch(`${CatsUrl}/account/regions`)
    // const data = await res.text()

    return {
        props: {
            //data
        }
    }
}



const Dashboard = ({data}) => {

    return (
        <>
            <Meta title="User Dashboard"/>
            <Header title="User Dashboard" subTitle="EXTRA TEXT GOES HERE"/>
            {/* <DashboardNav/> */}
            <div className="h-64 border-dashed border-4 border-white p-4 text-md">
            </div>
        </>
    )
}
export default Dashboard