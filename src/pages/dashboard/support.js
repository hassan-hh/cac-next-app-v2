import DashboardNav from '../../components/dashboard/DashboardNav'
import Header from '../../components/dashboard/Header'
import StatusCard from '../../components/dashboard/cards/StatusCard'
import TableCard from '../../components/dashboard/cards/TableCard'
import ServicesCard from '../../components/dashboard/cards/ServicesCard'
import Meta from '../../components/seo/Meta'

const Support = () => {

    return (
        <>
            <Meta title="User Dashboard" />
            {/* <DashboardNav/> */}
            <Header title="Support Dashboard" subTitle="TODAY'S OVERVIEW"/>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mb-8">
            <div className="col-span-2 mb-4 xl:mb-0"><StatusCard title="CATS Daemon Status" btnName="View Daemon Processes"/></div>
            <div className="col-span-2 mb-4 xl:mb-0"><StatusCard title="CATS Batch Status" btnName="View Batch Processes"/></div>
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
                <div><ServicesCard error="DOWN" service="DATABASE"/></div>
                <div><ServicesCard error="DOWN" service="MQ CONNECTION"/></div>
            </div>
            </div>
            <div className="grid grid-cols-1 mb-8">
                <TableCard title="CATS Dates Overview"/>
            </div>
            <div className="grid grid-cols-1 pb-8">
                <TableCard title="Disclosures Block Status"/>
            </div>
        </>
    )
}
export default Support