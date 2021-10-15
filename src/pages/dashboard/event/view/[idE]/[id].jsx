import Meta from '../../../../../components/seo/Meta'
import Header from '../../../../../components/dashboard/Header'
import TabsPanel from '../../../../../components/dashboard/TabsPanel'
import Error from '../../../../_error'

export const getServerSideProps = async (context) => {//this is single page for any type of post, pages, comments, with dynamic routing
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${context.params?.idE}/${context.params?.id}`, {
        headers: { 
            Cookie: context.req?.headers?.cookie 
        }
    }) 
    //e.g evets/SGP/2224 as the endpoint and it should return json res/display EVENTS DATA in the console log
    //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${idEntity}/${idCA}`)
    const errorCode = res.ok ? 200 : res.statusCode
    const data = await res.json()

    return {
        props: {
            data: data || {}, 
            errorCode: errorCode || null
        }
    }
}

const EventView = ({ data, errorCode }) => {
    return (
        <>
            <Meta title="Event View" />
            <Header title="Event View" />
            {   errorCode > 300 ?
                <Error statusCode={errorCode} />
                :
                <>
                <h1 className="text-green-500 text-lg mb-5 font-semibold">{data?.idEntity}/{data?.idCA}</h1>
                <div className="flex flex-col lg:flex-row lg:space-x-4 mb-4">
                    <div className="overflow-auto w-full lg:w-2/3 mb-4 lg:mb-0 shadow-sm rounded-md">
                        <table className="min-w-full bg-white text-sm h-64">
                            <tbody className="">
                                <tr>
                                    <td className="px-6">
                                        <p className="flex flex-row justify-between w-60 text-right"><span className="text-green-500">Reference</span> {data?.idEntity}/{data?.idCA}</p>
                                    </td>
                                    <td className="px-6">
                                        <p className="flex flex-row justify-between w-60 text-right"><span className="text-green-500">Entitled Date</span> {data?.entitledDate || 'Unknown'}</p>
                                    </td>
                                    <td className="px-6">
                                        <p className="flex flex-row justify-between w-60 text-right"><span className="text-green-500">Settled Date</span> {data?.settledDate || 'Unknown'}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6">
                                        <p className="flex flex-row justify-between w-60 text-right"><span className="text-green-500">Instrument</span> {data?.instrument?.txInstName || 'Unknown'}</p>
                                    </td>
                                    <td className="px-6">
                                        <p className="flex flex-row justify-between w-60 text-right"><span className="text-green-500">ISIN</span> {data?.instrument?.idISIN || 'Unknown'}</p>
                                    </td>
                                    <td className="px-6">
                                        <p className="flex flex-row justify-between w-60 text-right"><span className="text-green-500">Country</span> {data?.idEntity || 'Unknown'}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6">
                                        <p className="flex flex-row justify-between w-60 text-right"><span className="text-green-500">Event Status</span> {data?.idEntity}/{data?.idCA}</p>
                                    </td>
                                    <td className="px-6">
                                        <p className="flex flex-row justify-between w-60 text-right"><span className="text-green-500">Modified Date</span> {data?.dtModified || 'Unknown'}</p>
                                    </td>
                                    <td className="px-6">
                                        <p className="flex flex-row justify-between w-60 text-right"><span className="text-green-500">Source</span> {data?.instrument?.idSource || 'Unknown'}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-white h-60 w-full lg:w-1/3 shadow-sm rounded-md overflow-hidden">
                        <div className="bg-gray-100 text-xl p-3">
                            <h2>Dates</h2>
                        </div>
                    </div>
                </div>
                <TabsPanel />
                </>
            }
        </>
    )
}
export default EventView