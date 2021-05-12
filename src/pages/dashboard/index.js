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
            <Header title="My Tasks" subTitle=""/>
            {/* <DashboardNav/> */}
            <div className="h-screen max-w-full">
                <table className="h-screen min-w-full divide-y divide-gray-200 shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                CA
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Task Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Task Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Task Time Deadline
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Dates
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Dashboard