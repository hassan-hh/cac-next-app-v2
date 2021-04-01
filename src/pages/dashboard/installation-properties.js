import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import ClientConfig from '../../ClientConfig'

   
export const getStaticProps = async () => {
    const CatsUrl = ClientConfig.SiteUrl
    const res = await fetch(`${CatsUrl}/installation/properties`)
    const data = await res.json()

    return {
        props: {
            data
        }
    }
}

const InstallationProperties = ({ data }) => {
    console.log(data)
    return (
        <>
            <Meta title="Installation Properties" />
            <Header title="Installation Properties"/>
            {/* <DashboardNav/> */}
            <div className="h-screen max-w-full">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Operation System
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Filter
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Key
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Value
                        </th>
                        </tr>
                    </thead>
                {data.map(item => (
                    // <div className="flex flex-row items-center justify-evenly">
                    // <div className="w-full grid grid-cols-4 gap-4">
                    //     <p>{item.filter}</p>
                    //     <p>{item.osName}</p>
                    //     <p>{item.key}</p>
                    //     <p className="w-20 break-all">{item.value}</p>
                    // </div>
                    // </div>
                        <tbody key={item.key} className="bg-white divide-y divide-gray-200">
                            <tr>
                            <td className="px-6 py-4">
                                <p>{item.osName}</p>
                            </td>
                            <td className="px-6 py-4">
                                <p>{item.filter}</p>
                            </td>
                            <td className="px-6 py-4">
                                {/* <p className="min-w-full w-96 break-all">{item.key}</p> before changing those two and below*/}
                                <p className="w-96 md:w-40 lg:w-44 xl:w-72 break-all">{item.key}</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="w-96 md:w-40 lg:w-44 xl:w-72 break-all">{item.value}</p>
                            </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </>
    )
}
export default InstallationProperties