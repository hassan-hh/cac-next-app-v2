import { useState, useEffect } from 'react'
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

const Metrics = ({ data }) => {

    const [time, setTime] = useState(Date.now());
    console.log('time', time)

    const [memory, setMemory] = useState(0)
    const [heapMemory, setHeapMemory] = useState(0)
    const [nonHeapMemory, setNonHeapMemory] = useState(0)
    const [runnableThread, setRunnableThread] = useState(0)
    const [timedWaitingThread, setTimedWaitingThread] = useState(0)
    const [waitingThread, setWaitingThread] = useState(0)
    const [blockedThread, setBlockedThread] = useState(0)

    const usedMemory = data.gauges[`jvm.memory.total.used`].value
    const maxMemory = data.gauges[`jvm.memory.total.max`].value
    const memoryDiff = (usedMemory / maxMemory) * 100
    //const mystring = heapUsed.toString(10)

    const usedHeapMemory = data.gauges[`jvm.memory.heap.used`].value
    const maxHeapMemory = data.gauges[`jvm.memory.heap.max`].value
    const heapMemoryDiff = (usedHeapMemory / maxHeapMemory) * 100
    //const mystring = usedHeap.toString(10)

    const usedNonHeapMemory = data.gauges[`jvm.memory.non-heap.used`].value
    const maxNonHeapMemory = data.gauges[`jvm.memory.non-heap.committed`].value
    const nonHeapMemoryDiff = (usedNonHeapMemory / maxNonHeapMemory) * 100
    //const mystring = usedHeap.toString(10)

    const threads = data.gauges[`jvm.threads.count`].value

    const runnable = data.gauges[`jvm.threads.runnable.count`].value
    const runnableDiff = (runnable / threads) * 100

    const timedWaiting = data.gauges[`jvm.threads.timed_waiting.count`].value
    const timedWaitingDiff = (timedWaiting / threads) * 100
    
    const waiting = data.gauges[`jvm.threads.waiting.count`].value
    const waitingDiff = (waiting / threads) * 100

    const blocked = data.gauges[`jvm.threads.blocked.count`].value
    const blockedDiff = (blocked / threads) * 100

    const markSweepTime = data.gauges[`jvm.garbage.G1-Old-Generation.count`].value
    const markSweepCount = data.gauges[`jvm.garbage.G1-Old-Generation.time`].value
    const scavengeTime = data.gauges[`jvm.garbage.G1-Young-Generation.count`].value
    const scavengeCount = data.gauges[`jvm.garbage.G1-Young-Generation.time`].value

    const activeRequests = data.counters[`com.codahale.metrics.servlet.InstrumentedFilter.activeRequests`].count
    const totalRequests = data.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`].count
    const requestsDiff = (activeRequests / totalRequests) * 100


    const brCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`].count
    const brM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`].m1_rate
        //let brM1Rate = brM1.toFixed(2); //const convertedStr = stringifyObject.replace(/_/g,' ').toLowerCase()
    const brM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`].m5_rate
        //let brM5Rate = brM5.toFixed(2);
    const brM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`].m15_rate
        //let brM15Rate = brM15.toFixed(2);
    const brMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`].mean_rate
        //let brMeanRate = brMean.toFixed(2);

    const crCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`].count
    const crM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`].m1_rate
        //let crM1Rate = crM1.toFixed(2);
    const crM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`].m5_rate
        //let crM5Rate = crM5.toFixed(2);
    const crM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`].m15_rate
        //let crM15Rate = crM15.toFixed(2);
    const crMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`].mean_rate
        //let crMeanRate = crMean.toFixed(2);

    const ncCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`].count
    const ncM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`].m1_rate
        //let ncM1Rate = ncM1.toFixed(2);
    const ncM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`].m5_rate
        //let ncM5Rate = ncM5.toFixed(2);
    const ncM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`].m15_rate
        //let ncM15Rate = ncM15.toFixed(2);
    const ncMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`].mean_rate
        //let ncMeanRate = ncMean.toFixed(2);

    const nfCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`].count
    const nfM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`].m1_rate
        //let nfM1Rate = nfM1.toFixed(2);
    const nfM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`].m5_rate
        //let nfM5Rate = nfM5.toFixed(2);
    const nfM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`].m15_rate
        //let nfM15Rate = nfM15.toFixed(2);
    const nfMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`].mean_rate
        //let nfMeanRate = nfMean.toFixed(2);
    
    const okCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`].count
    const okM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`].m1_rate
        //let okM1Rate = okM1.toFixed(2);
    const okM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`].m5_rate
        //let okM5Rate = okM5.toFixed(2);
    const okM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`].m15_rate
        //let okM15Rate = okM15.toFixed(2);
    const okMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`].mean_rate
        //let okMeanRate = okMean.toFixed(2);
    
    const otherCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`].count
    const otherM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`].m1_rate
        //let otherM1Rate = otherM1.toFixed(2);
    const otherM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`].m5_rate
        //let otherM5Rate = otherM5.toFixed(2);
    const otherM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`].m15_rate
        //let otherM15Rate = otherM15.toFixed(2);
    const otherMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`].mean_rate
        //let otherMeanRate = otherMean.toFixed(2);
    
    const seCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`].count
    const seM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`].m1_rate
        //let seM1Rate = sekM1.toFixed(2);
    const seM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`].m5_rate
        //let seM5Rate = seM5.toFixed(2);
    const seM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`].m15_rate
        //let seM15Rate = seM15.toFixed(2);
    const seMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`].mean_rate
        //let seMeanRate = seMean.toFixed(2);
    
    //const okTotal = okCount + okM1Rate + okM5Rate + okM15Rate + okMeanRate
    // const countDiff = (count / metersTotal) * 100
    // const mOneDiff = (mOneRate / metersTotal) * 100
    // const mFiveDiff = (mFiveRate / metersTotal) * 100
    // const mFifteenDiff = (mFifteenRate / metersTotal) * 100
    // const meanDiff = (meanRate / metersTotal) * 100
    // const metersDiffTotal = countDiff + mOneDiff + mFiveDiff + mFifteenDiff + meanDiff

    //console.log('mone', mOneRate)

    useEffect(() => {
        
        const interval = setInterval(() => setTime(Date.now()), 500)
        setMemory(memoryDiff)
        setHeapMemory(heapMemoryDiff)
        setNonHeapMemory(nonHeapMemoryDiff)
        setRunnableThread(runnableDiff)
        setTimedWaitingThread(timedWaitingDiff)
        setWaitingThread(waitingDiff)
        setBlockedThread(blockedDiff)
         return () => {
            clearInterval(interval);
        };
    }, [usedHeapMemory, maxHeapMemory, heapMemoryDiff, heapMemory, data])

    console.log('metrics', data)

    return (
        <>
            <Meta title="Metrics" />
            <Header title="Application Metrics" subTitle=""/>
            {   !data ?
                <Error />
                :
                <>
                    <div className="flex flex-row justify-around mb-12">
                        <div className="w-full flex flex-col">
                            <h1 className="text-2xl pb-2">JVM Metrics</h1>
                            <h2 className="text-xl">Memory</h2>
                            <p className="text-sm mt-3">Total Memory ({usedMemory}M / {maxMemory}M)</p>
                            <div className="w-3/4">
                                <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                                    <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${memory}%` }}>
                                    </div>
                                    <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{memory}%</span>
                                </div>
                                <p className="text-sm mt-3">Heap Memory ({usedHeapMemory}M / {maxHeapMemory}M)</p>
                                <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                                    <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${heapMemory}%` }}>
                                    </div>
                                    <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{heapMemory}%</span>
                                </div>
                                <p className="text-sm mt-3">Non Heap Memory ({usedNonHeapMemory}M / {maxNonHeapMemory}M)</p>
                                <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                                    <div className="bg-red-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${nonHeapMemory}%` }}>
                                    </div>
                                    <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{nonHeapMemory}%</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mt-10">
                            <div className="flex">
                                <h2 className="text-xl">
                                    Threads -
                                </h2>
                                <span className="flex text-sm mt-1 ml-1">Total: {threads}
                                    <span className="flex h-3 w-3 m-1 ml-1">
                                    <span className="animate-ping relative inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                    <span className="absolute inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                </span>
                            </div>
                            <p className="text-sm mt-3">Runnable ({runnable})</p>
                            <div className="w-3/4">
                                <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                                    <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${runnableThread}%` }}>
                                    </div>
                                    <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{runnableThread}%</span>
                                </div>
                                <p className="text-sm mt-3">Timed Waiting ({timedWaiting})</p>
                                <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                                    <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${timedWaitingThread}%` }}>
                                    </div>
                                    <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{timedWaitingThread}%</span>
                                </div>
                                <p className="text-sm mt-3">Waiting ({waiting})</p>
                                <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                                    <div className="bg-yellow-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${waitingThread}%` }}>
                                    </div>
                                    <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{waitingThread}%</span>
                                </div>
                                <p className="text-sm mt-3">Blocked ({blocked})</p>
                                <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                                    <div className="bg-gray-400 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${blockedThread}%` }}>
                                    </div>
                                    <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{blockedThread}%</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mt-10">
                            <div className="flex">
                                <h2 className="text-xl">
                                    Garbage Collections
                                </h2>
                            </div>
                            <p className="text-sm mt-3">Mark Sweep count - G1 old ({markSweepTime})</p>
                            <div className="w-3/4">
                                <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                                    <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${markSweepTime}` }}>
                                    </div>
                                    <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{markSweepTime}</span>
                                </div>
                                <p className="text-sm mt-3">Mark Sweep time - G1 old ({markSweepCount})</p>
                                <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                                    <div className="bg-yellow-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${markSweepCount}` }}>
                                    </div>
                                    <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{markSweepCount}</span>
                                </div>
                                <p className="text-sm mt-3">Scavenge count - G1 young ({scavengeTime})</p>
                                <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                                    <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${scavengeTime}` }}>
                                    </div>
                                    <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{scavengeTime}</span>
                                </div>
                                <p className="text-sm mt-3">Scavenge time - G1 young ({scavengeCount})</p>
                                <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                                    <div className="bg-yellow-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${scavengeCount}` }}>
                                    </div>
                                    <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{scavengeCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl">HTTP requests (events per second) - response meters</h1>
                    <p className="text-sm mt-2">Active Requests: {activeRequests} - Total Requests: {totalRequests}</p>
                    {/* <div className="h-96 flex flex-col justify-between mt-5 px-3">
                        <span>badRequest</span>
                        <span>created</span>
                        <span>noContent</span>
                        <span>notFound</span>
                        <span>ok</span>{okCount}
                        <span>other</span>
                        <span>serverError</span>
                    </div>
                    <div className="flex flex-row justify-between mt-5 px-3">
                        <span>Request Name</span>
                        <span>Count</span>
                        <span>Mean</span>
                        <span>Average (1 min)</span>
                        <span>Average (5 min)</span>
                        <span>Average (15 min)</span>
                    </div> */}
                        <table className="min-w-full divide-y divide-gray-200 shadow-sm mt-5">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        Request Name
                                    </th>
                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        HTTP Status Code
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        Count
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        Mean
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        Average (1 min)
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        Average (5 min)
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        Average (15 min)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-xs">
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Bad Request</p>
                                    </td>
                                    <td className="px-6">
                                        <p>400</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{brCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{brM1}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{brM5}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{brM15}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{brMean}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Created</p>
                                    </td>
                                    <td className="px-6">
                                        <p>201</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{crCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{crM1}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{crM5}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{crM15}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{crMean}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>No Content</p>
                                    </td>
                                    <td className="px-6">
                                        <p>204</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ncCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ncM1}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ncM5}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ncM15}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ncMean}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Not Found</p>
                                    </td>
                                    <td className="px-6">
                                        <p>404</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{nfCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{nfM1}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{nfM5}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{nfM15}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{nfMean}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Ok</p>
                                    </td>
                                    <td className="px-6">
                                        <p>200</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{okCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{okM1}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{okM5}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{okM15}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{okMean}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Other</p>
                                    </td>
                                    <td className="px-6">
                                        <p>303</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{otherCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{otherM1}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{otherM5}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{otherM15}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{otherMean}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Server Error</p>
                                    </td>
                                    <td className="px-6">
                                        <p>500</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{seCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{seM1}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{seM5}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{seM15}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{seMean}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    {/* <div className="flex flex-row justify-between mt-5 px-3">
                        <span>Name</span>
                        <span>Count</span>
                        <span>Mean</span>
                        <span>Average (1 min)</span>
                        <span>Average (5 min)</span>
                        <span>Average (15 min)</span>
                    </div>
                    <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                        <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${requestsDiff}%` }}>
                        </div>
                        <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{requestsDiff}%</span>
                    </div> */}
                    <h1 className="text-2xl mt-10">Services statistics (time in millisecond) - response timers</h1>
                    <div className="flex flex-row justify-between mt-5 px-3">
                        <span>Name</span>
                        <span>Count</span>
                        <span>Mean</span>
                        <span>Min</span>
                        <span>p50</span>
                        <span>p75</span>
                        <span>p95</span>
                        <span>p99</span>
                        <span>Max</span>
                    </div>
                    <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs">
                        <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000" style={{ width: `${0}%` }}>
                        </div>
                        <span className="absolute transform translate-y-2/4 top-0 left-0 pl-2">{}%</span>
                    </div>
                </>
            }
        </>
    )
}

export default Metrics