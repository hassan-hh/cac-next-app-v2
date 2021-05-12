import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Link from 'next/link'
import ClientConfig from '../../ClientConfig'

 export const getStaticProps = async () => {
    const CatsUrl = ClientConfig.apiUrl
    const res = await fetch(`${CatsUrl}/dataMessageDefinition`)
    const data = await res.json()
        
        return {
            props: {
                data
            },
            //Does this page always get updated? a new content added on daily basis?
            // Next.js will attempt to re-generate the page:
            // - When a request comes in 
            // - At most once every second
            revalidate: 1, //In seconds
        }
    }

const DataMessageDefinitions = ({ data }) => {

     console.log(data)

    return (
        <>
            <Meta title="Data Message Definition Administation" />
            <Header title="Data Message Definition Administation" subTitle="" />
            <Link href="#">
                <a  className="bg-gray-900 text-white transition-all ease-in-out duration-300 uppercase shadow-sm mr-3 px-4 py-2 rounded-md text-sm font-medium">Refresh</a>
            </Link>
            <Link href="#">
                <a className="bg-gray-900 text-white transition-all ease-in-out duration-300 uppercase shadow-sm px-8 py-2 rounded-md text-sm font-medium">Add</a>
            </Link>

            <div className="h-screen max-w-full mt-8 overflow-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Definition Key
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Data Source Identifier
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Object Class
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Version Number
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map(item => (
                            <tr key={item.definitionKey} className="hover:bg-gray-100 text-sm">
                                <td className="px-6 py-1">
                                    <p>{item.definitionKey}</p>
                                </td>
                                <td className="px-6 py-1">
                                    <p>{item.idDataSource}</p>
                                </td>
                                <td className="px-6 py-1">
                                    <p>{item.objectClass}</p>
                                </td>
                                <td className="px-6 py-1">
                                    <p>{item.versionNumber}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default DataMessageDefinitions