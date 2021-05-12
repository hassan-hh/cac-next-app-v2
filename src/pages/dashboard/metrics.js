import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Error from '../_error'
import ClientConfig from '../../ClientConfig'


export const getStaticProps = async () => {
    const CatsUrl = ClientConfig.apiUrl
    const res = await fetch(`${CatsUrl}/management/metrics`)
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

// export const All = ({data}) => {
//     return (
//         data.timers.map(item => {
//             {item.com.cats.server.controllers.AccountController.createNewPartyAccount}
//         })
//     )
// }

const Metrics = ({ data }) => {
    // const array = []
    // console.log('metrics', data)
    // console.log('metrics keys', data.keys(timers.duration_units))
    return (

        <>
            <Meta title="Metrics" />
            <Header title="Application Metrics" subTitle=""/>
            {   !data ?
                <Error />
                :
                <div className="flex flex-col">
                    
                    {data.version}
                    {/* {data.keys(HikariPool_1.pool.Wait.duration_units)} */}
                    {/* <All data={data}/> */}
                    {/* {data.timers.map(time => {
                        {time.duration_units}
                    })} */}
                    {/* {data.map(item => {
                        {item.HikariPool_1.pool.Wait}
                    })} */}
                    <div className="mt-2 bg-gray-600 rounded-full">
                        <div className={`${data.counters} w-9/12 bg-green-500 py-1 rounded-full`}></div>
                    </div>
                    <div className="mt-2 bg-gray-600 rounded-full">
                        <div className="w-9/12 bg-green-500 py-1 rounded-full"></div>
                    </div>
                    <div className="mt-2 bg-gray-600 rounded-full">
                        <div className="w-9/12 bg-green-500 py-1 rounded-full"></div>
                    </div>
                    <div className="mt-2 bg-gray-600 rounded-full">
                        <div className="w-6/12 bg-red-500 text-center py-0 rounded-full"><div className="text-white text-sm inline-block bg-red-400 px-2 py-0 rounded-full">50%</div></div>
                    </div>
                    <div className="mt-2 bg-gray-600 rounded-full">
                        <div className="w-6/12 bg-red-500 text-center py-0 rounded-full"><div className="text-white text-sm inline-block bg-red-400 px-2 py-0 rounded-full">50%</div></div>
                    </div>
                    <div className="mt-2 bg-gray-600 rounded-full">
                        <div className="w-6/12 bg-red-500 text-center py-0 rounded-full"><div className="text-white text-sm inline-block bg-red-400 px-2 py-0 rounded-full">50%</div></div>
                    </div>
                </div>
            }
        </>
    )
}

export default Metrics