import { useState, useEffect } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Error from '../_error'

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/management/metrics`)
    const data = await res.json()

    return {
        props: {
            data
        },
        revalidate: 1, //In seconds
    }
}

const Metrics = ({ data }) => {

    const [memory, setMemory] = useState(0)
    const [heapMemory, setHeapMemory] = useState(0)
    const [nonHeapMemory, setNonHeapMemory] = useState(0)
    const [runnableThread, setRunnableThread] = useState(0)
    const [timedWaitingThread, setTimedWaitingThread] = useState(0)
    const [waitingThread, setWaitingThread] = useState(0)
    const [blockedThread, setBlockedThread] = useState(0)

    const usedMemory = data.gauges[`jvm.memory.total.used`].value
    const maxMemory = data.gauges[`jvm.memory.total.max`].value
    const memoryDiff = usedMemory / maxMemory * 100

    const usedHeapMemory = data.gauges[`jvm.memory.heap.used`].value
    const maxHeapMemory = data.gauges[`jvm.memory.heap.max`].value
    const heapMemoryDiff = usedHeapMemory / maxHeapMemory * 100

    const usedNonHeapMemory = data.gauges[`jvm.memory.non-heap.used`].value
    const maxNonHeapMemory = data.gauges[`jvm.memory.non-heap.committed`].value
    const nonHeapMemoryDiff = usedNonHeapMemory / maxNonHeapMemory * 100

    const threads = data.gauges[`jvm.threads.count`].value

    const runnable = data.gauges[`jvm.threads.runnable.count`].value
    const runnableDiff = runnable / threads * 100

    const timedWaiting = data.gauges[`jvm.threads.timed_waiting.count`].value
    const timedWaitingDiff = timedWaiting / threads * 100
    
    const waiting = data.gauges[`jvm.threads.waiting.count`].value
    const waitingDiff = waiting / threads * 100

    const blocked = data.gauges[`jvm.threads.blocked.count`].value
    const blockedDiff = blocked / threads * 100

    const markSweepTime = data.gauges[`jvm.garbage.G1-Old-Generation.count`].value
    const markSweepCount = data.gauges[`jvm.garbage.G1-Old-Generation.time`].value
    const scavengeTime = data.gauges[`jvm.garbage.G1-Young-Generation.count`].value
    const scavengeCount = data.gauges[`jvm.garbage.G1-Young-Generation.time`].value

    const activeRequests = data.counters[`com.codahale.metrics.servlet.InstrumentedFilter.activeRequests`].count //active requests
    const totalRequests = data.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`].count //total requests 

    // HTTP requests (events per second) - response meters
    const brCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`].count
    const brM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`].m1_rate
    const brM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`].m5_rate
    const brM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`].m15_rate
    const brMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`].mean_rate

    const crCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`].count
    const crM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`].m1_rate
    const crM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`].m5_rate
    const crM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`].m15_rate
    const crMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`].mean_rate

    const ncCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`].count
    const ncM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`].m1_rate
    const ncM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`].m5_rate
    const ncM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`].m15_rate
    const ncMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`].mean_rate

    const nfCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`].count
    const nfM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`].m1_rate
    const nfM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`].m5_rate
    const nfM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`].m15_rate
    const nfMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`].mean_rate
    
    const okCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`].count
    const okM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`].m1_rate
    const okM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`].m5_rate
    const okM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`].m15_rate
    const okMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`].mean_rate
    
    const otherCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`].count
    const otherM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`].m1_rate
    const otherM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`].m5_rate
    const otherM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`].m15_rate
    const otherMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`].mean_rate
    
    const seCount = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`].count
    const seM1 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`].m1_rate
    const seM5 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`].m5_rate
    const seM15 = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`].m15_rate
    const seMean = data.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`].mean_rate

    // Service Type Account Controller
    const accnpaCount = data.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`].count
    const accnpaMean = data.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`].mean
        let accnpaMeanTr = accnpaMean.toFixed(9);
    const accnpaMin = data.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`].min
        let accnpaMinTr = accnpaMin.toFixed(9);
    const accnpaP50 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`].p50
        let accnpaP50Tr = accnpaP50.toFixed(9);
    const accnpaP75 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`].p75
        let accnpaP75Tr = accnpaP75.toFixed(9);
    const accnpaP95 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`].p95
        let accnpaP95Tr = accnpaP95.toFixed(9);
    const accnpaP99 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`].p99
        let accnpaP99Tr = accnpaP99.toFixed(9);
    const accnpaMax = data.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`].max
        let accnpaMaxTr = accnpaMax.toFixed(9);
    
    const accnpcCount = data.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`].count
    const accnpcMean = data.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`].mean
        let accnpcMeanTr = accnpcMean.toFixed(9);
    const accnpcMin = data.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`].min
        let accnpcMinTr = accnpcMin.toFixed(9);
    const accnpcP50 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`].p50
        let accnpcP50Tr = accnpcP50.toFixed(9);
    const accnpcP75 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`].p75
        let accnpcP75Tr = accnpcP75.toFixed(9);
    const accnpcP95 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`].p95
        let accnpcP95Tr = accnpcP95.toFixed(9);
    const accnpcP99 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`].p99
        let accnpcP99Tr = accnpcP99.toFixed(9);
    const accnpcMax = data.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`].max
        let accnpcMaxTr = accnpcMax.toFixed(9);
    
    const accnpxrCount = data.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`].count
    const accnpxrMean = data.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`].mean
        let accnpxrMeanTr = accnpxrMean.toFixed(9);
    const accnpxrMin = data.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`].min
        let accnpxrMinTr = accnpxrMin.toFixed(9);
    const accnpxrP50 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`].p50
        let accnpxrP50Tr = accnpxrP50.toFixed(9);
    const accnpxrP75 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`].p75
        let accnpxrP75Tr = accnpxrP75.toFixed(9);
    const accnpxrP95 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`].p95
        let accnpxrP95Tr = accnpxrP95.toFixed(9);
    const accnpxrP99 = data.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`].p99
        let accnpxrP99Tr = accnpxrP99.toFixed(9);
    const accnpxrMax = data.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`].max
        let accnpxrMaxTr = accnpxrMax.toFixed(9);
    
    const acgaCount = data.timers[`com.cats.server.controllers.AccountController.getAccounts`].count
    const acgaMean = data.timers[`com.cats.server.controllers.AccountController.getAccounts`].mean
        let acgaMeanTr = acgaMean.toFixed(9);
    const acgaMin = data.timers[`com.cats.server.controllers.AccountController.getAccounts`].min
        let acgaMinTr = acgaMin.toFixed(9);
    const acgaP50 = data.timers[`com.cats.server.controllers.AccountController.getAccounts`].p50
        let acgaP50Tr = acgaP50.toFixed(9);
    const acgaP75 = data.timers[`com.cats.server.controllers.AccountController.getAccounts`].p75
        let acgaP75Tr = acgaP75.toFixed(9);
    const acgaP95 = data.timers[`com.cats.server.controllers.AccountController.getAccounts`].p95
        let acgaP95Tr = acgaP95.toFixed(9);
    const acgaP99 = data.timers[`com.cats.server.controllers.AccountController.getAccounts`].p99
        let acgaP99Tr = acgaP99.toFixed(9);
    const acgaMax = data.timers[`com.cats.server.controllers.AccountController.getAccounts`].max
        let acgaMaxTr = acgaMax.toFixed(9);
    
    const acgacpCount = data.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`].count
    const acgacpMean = data.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`].mean
        let acgacpMeanTr = acgacpMean.toFixed(9);
    const acgacpMin = data.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`].min
        let acgacpMinTr = acgacpMin.toFixed(9);
    const acgacpP50 = data.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`].p50
        let acgacpP50Tr = acgacpP50.toFixed(9);
    const acgacpP75 = data.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`].p75
        let acgacpP75Tr = acgacpP75.toFixed(9);
    const acgacpP95 = data.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`].p95
        let acgacpP95Tr = acgacpP95.toFixed(9);
    const acgacpP99 = data.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`].p99
        let acgacpP99Tr = acgacpP99.toFixed(9);
    const acgacpMax = data.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`].max
        let acgacpMaxTr = acgacpMax.toFixed(9);
    
    const acgaoCount = data.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`].count
    const acgaoMean = data.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`].mean
        let acgaoMeanTr = acgaoMean.toFixed(9);
    const acgaoMin = data.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`].min
        let acgaoMinTr = acgaoMin.toFixed(9);
    const acgaoP50 = data.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`].p50
        let acgaoP50Tr = acgaoP50.toFixed(9);
    const acgaoP75 = data.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`].p75
        let acgaoP75Tr = acgaoP75.toFixed(9);
    const acgaoP95 = data.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`].p95
        let acgaoP95Tr = acgaoP95.toFixed(9);
    const acgaoP99 = data.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`].p99
        let acgaoP99Tr = acgaoP99.toFixed(9);
    const acgaoMax = data.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`].max
        let acgaoMaxTr = acgaoMax.toFixed(9);
    
    const acgceCount = data.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`].count
    const acgceMean = data.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`].mean
        let acgceMeanTr = acgceMean.toFixed(9);
    const acgceMin = data.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`].min
        let acgceMinTr = acgceMin.toFixed(9);
    const acgceP50 = data.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`].p50
        let acgceP50Tr = acgceP50.toFixed(9);
    const acgceP75 = data.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`].p75
        let acgceP75Tr = acgceP75.toFixed(9);
    const acgceP95 = data.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`].p95
        let acgceP95Tr = acgceP95.toFixed(9);
    const acgceP99 = data.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`].p99
        let acgceP99Tr = acgceP99.toFixed(9);
    const acgceMax = data.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`].max
        let acgceMaxTr = acgceMax.toFixed(9);
    
    const acgcrCount = data.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`].count
    const acgcrMean = data.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`].mean
        let acgcrMeanTr = acgcrMean.toFixed(9);
    const acgcrMin = data.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`].min
        let acgcrMinTr = acgcrMin.toFixed(9);
    const acgcrP50 = data.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`].p50
        let acgcrP50Tr = acgcrP50.toFixed(9);
    const acgcrP75 = data.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`].p75
        let acgcrP75Tr = acgcrP75.toFixed(9);
    const acgcrP95 = data.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`].p95
        let acgcrP95Tr = acgcrP95.toFixed(9);
    const acgcrP99 = data.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`].p99
        let acgcrP99Tr = acgcrP99.toFixed(9);
    const acgcrMax = data.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`].max
        let acgcrMaxTr = acgcrMax.toFixed(9);
    
    const acgeCount = data.timers[`com.cats.server.controllers.AccountController.getEntities`].count
    const acgeMean = data.timers[`com.cats.server.controllers.AccountController.getEntities`].mean
        let acgeMeanTr = acgeMean.toFixed(9);
    const acgeMin = data.timers[`com.cats.server.controllers.AccountController.getEntities`].min
        let acgeMinTr = acgeMin.toFixed(9);
    const acgeP50 = data.timers[`com.cats.server.controllers.AccountController.getEntities`].p50
        let acgeP50Tr = acgeP50.toFixed(9);
    const acgeP75 = data.timers[`com.cats.server.controllers.AccountController.getEntities`].p75
        let acgeP75Tr = acgeP75.toFixed(9);
    const acgeP95 = data.timers[`com.cats.server.controllers.AccountController.getEntities`].p95
        let acgeP95Tr = acgeP95.toFixed(9);
    const acgeP99 = data.timers[`com.cats.server.controllers.AccountController.getEntities`].p99
        let acgeP99Tr = acgeP99.toFixed(9);
    const acgeMax = data.timers[`com.cats.server.controllers.AccountController.getEntities`].max
        let acgeMaxTr = acgeMax.toFixed(9);
    
    const acgrCount = data.timers[`com.cats.server.controllers.AccountController.getRegions`].count
    const acgrMean = data.timers[`com.cats.server.controllers.AccountController.getRegions`].mean
        let acgrMeanTr = acgrMean.toFixed(9);
    const acgrMin = data.timers[`com.cats.server.controllers.AccountController.getRegions`].min
        let acgrMinTr = acgrMin.toFixed(9);
    const acgrP50 = data.timers[`com.cats.server.controllers.AccountController.getRegions`].p50
        let acgrP50Tr = acgrP50.toFixed(9);
    const acgrP75 = data.timers[`com.cats.server.controllers.AccountController.getRegions`].p75
        let acgrP75Tr = acgrP75.toFixed(9);
    const acgrP95 = data.timers[`com.cats.server.controllers.AccountController.getRegions`].p95
        let acgrP95Tr = acgrP95.toFixed(9);
    const acgrP99 = data.timers[`com.cats.server.controllers.AccountController.getRegions`].p99
        let acgrP99Tr = acgrP99.toFixed(9);
    const acgrMax = data.timers[`com.cats.server.controllers.AccountController.getRegions`].max
        let acgrMaxTr = acgrMax.toFixed(9);
    
    // Audit Controller
    const accsCount = data.timers[`com.cats.server.controllers.AuditController.createSession`].count
    const accsMean = data.timers[`com.cats.server.controllers.AuditController.createSession`].mean
        let accsMeanTr = accsMean.toFixed(9);
    const accsMin = data.timers[`com.cats.server.controllers.AuditController.createSession`].min
        let accsMinTr = accsMin.toFixed(9);
    const accsP50 = data.timers[`com.cats.server.controllers.AuditController.createSession`].p50
        let accsP50Tr = accsP50.toFixed(9);
    const accsP75 = data.timers[`com.cats.server.controllers.AuditController.createSession`].p75
        let accsP75Tr = accsP75.toFixed(9);
    const accsP95 = data.timers[`com.cats.server.controllers.AuditController.createSession`].p95
        let accsP95Tr = accsP95.toFixed(9);
    const accsP99 = data.timers[`com.cats.server.controllers.AuditController.createSession`].p99
        let accsP99Tr = accsP99.toFixed(9);
    const accsMax = data.timers[`com.cats.server.controllers.AuditController.createSession`].max
        let accsMaxTr = accsMax.toFixed(9);
    
    const acusCount = data.timers[`com.cats.server.controllers.AuditController.updateSession`].count
    const acusMean = data.timers[`com.cats.server.controllers.AuditController.updateSession`].mean
        let acusMeanTr = acusMean.toFixed(9);
    const acusMin = data.timers[`com.cats.server.controllers.AuditController.updateSession`].min
        let acusMinTr = acusMin.toFixed(9);
    const acusP50 = data.timers[`com.cats.server.controllers.AuditController.updateSession`].p50
        let acusP50Tr = acusP50.toFixed(9);
    const acusP75 = data.timers[`com.cats.server.controllers.AuditController.updateSession`].p75
        let acusP75Tr = acusP75.toFixed(9);
    const acusP95 = data.timers[`com.cats.server.controllers.AuditController.updateSession`].p95
        let acusP95Tr = acusP95.toFixed(9);
    const acusP99 = data.timers[`com.cats.server.controllers.AuditController.updateSession`].p99
        let acusP99Tr = acusP99.toFixed(9);
    const acusMax = data.timers[`com.cats.server.controllers.AuditController.updateSession`].max
        let acusMaxTr = acusMax.toFixed(9);
    
    // Bookmark Controller
    const bcaorbCount = data.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`].count
    const bcaorbMean = data.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`].mean
        let bcaorbMeanTr = bcaorbMean.toFixed(9);
    const bcaorbMin = data.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`].min
        let bcaorbMinTr = bcaorbMin.toFixed(9);
    const bcaorbP50 = data.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`].p50
        let bcaorbP50Tr = bcaorbP50.toFixed(9);
    const bcaorbP75 = data.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`].p75
        let bcaorbP75Tr = bcaorbP75.toFixed(9);
    const bcaorbP95 = data.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`].p95
        let bcaorbP95Tr = bcaorbP95.toFixed(9);
    const bcaorbP99 = data.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`].p99
        let bcaorbP99Tr = bcaorbP99.toFixed(9);
    const bcaorbMax = data.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`].max
        let bcaorbMaxTr = bcaorbMax.toFixed(9);
    
    const bccsCount = data.timers[`com.cats.server.controllers.BookmarkController.createSession`].count
    const bccsMean = data.timers[`com.cats.server.controllers.BookmarkController.createSession`].mean
        let bccsMeanTr = bccsMean.toFixed(9)
    const bccsMin = data.timers[`com.cats.server.controllers.BookmarkController.createSession`].min
        let bccsMinTr = bccsMin.toFixed(9)
    const bccsP50 = data.timers[`com.cats.server.controllers.BookmarkController.createSession`].p50
        let bccsP50Tr = bccsP50.toFixed(9)
    const bccsP75 = data.timers[`com.cats.server.controllers.BookmarkController.createSession`].p75
        let bccsP75Tr = bccsP75.toFixed(9)
    const bccsP95 = data.timers[`com.cats.server.controllers.BookmarkController.createSession`].p95
        let bccsP95Tr = bccsP95.toFixed(9)
    const bccsP99 = data.timers[`com.cats.server.controllers.BookmarkController.createSession`].p99
        let bccsP99Tr = bccsP99.toFixed(9)
    const bccsMax = data.timers[`com.cats.server.controllers.BookmarkController.createSession`].max
        let bccsMaxTr = bccsMax.toFixed(9)
    
    // Corp Action Controller
    const cacgeCount = data.timers[`com.cats.server.controllers.CorpActionController.getEvent`].count
    const cacgeMean = data.timers[`com.cats.server.controllers.CorpActionController.getEvent`].mean
        let cacgeMeanTr = cacgeMean.toFixed(9)
    const cacgeMin = data.timers[`com.cats.server.controllers.CorpActionController.getEvent`].min
        let cacgeMinTr = cacgeMin.toFixed(9)
    const cacgeP50 = data.timers[`com.cats.server.controllers.CorpActionController.getEvent`].p50
        let cacgeP50Tr = cacgeP50.toFixed(9)
    const cacgeP75 = data.timers[`com.cats.server.controllers.CorpActionController.getEvent`].p75
        let cacgeP75Tr = cacgeP75.toFixed(9)
    const cacgeP95 = data.timers[`com.cats.server.controllers.CorpActionController.getEvent`].p95
        let cacgeP95Tr = cacgeP95.toFixed(9)
    const cacgeP99 = data.timers[`com.cats.server.controllers.CorpActionController.getEvent`].p99
        let cacgeP99Tr = cacgeP99.toFixed(9)
    const cacgeMax = data.timers[`com.cats.server.controllers.CorpActionController.getEvent`].max
        let cacgeMaxTr = cacgeMax.toFixed(9)
    
    const cacgercCount = data.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`].count
    const cacgercMean = data.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`].mean
        let cacgercMeanTr = cacgercMean.toFixed(9)
    const cacgercMin = data.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`].min
        let cacgercMinTr = cacgercMin.toFixed(9)
    const cacgercP50 = data.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`].p50
        let cacgercP50Tr = cacgercP50.toFixed(9)
    const cacgercP75 = data.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`].p75
        let cacgercP75Tr = cacgercP75.toFixed(9)
    const cacgercP95 = data.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`].p95
        let cacgercP95Tr = cacgercP95.toFixed(9)
    const cacgercP99 = data.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`].p99
        let cacgercP99Tr = cacgercP99.toFixed(9)
    const cacgercMax = data.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`].max
        let cacgercMaxTr = cacgercMax.toFixed(9)
    
    const cacgesCount = data.timers[`com.cats.server.controllers.CorpActionController.getEvents`].count
    const cacgesMean = data.timers[`com.cats.server.controllers.CorpActionController.getEvents`].mean
        let cacgesMeanTr = cacgesMean.toFixed(9)
    const cacgesMin = data.timers[`com.cats.server.controllers.CorpActionController.getEvents`].min
        let cacgesMinTr = cacgesMin.toFixed(9)
    const cacgesP50 = data.timers[`com.cats.server.controllers.CorpActionController.getEvents`].p50
        let cacgesP50Tr = cacgesP50.toFixed(9)
    const cacgesP75 = data.timers[`com.cats.server.controllers.CorpActionController.getEvents`].p75
        let cacgesP75Tr = cacgesP75.toFixed(9)
    const cacgesP95 = data.timers[`com.cats.server.controllers.CorpActionController.getEvents`].p95
        let cacgesP95Tr = cacgesP95.toFixed(9)
    const cacgesP99 = data.timers[`com.cats.server.controllers.CorpActionController.getEvents`].p99
        let cacgesP99Tr = cacgesP99.toFixed(9)
    const cacgesMax = data.timers[`com.cats.server.controllers.CorpActionController.getEvents`].max
        let cacgesMaxTr = cacgesMax.toFixed(9)

    const cacgtgCount = data.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`].count
    const cacgtgMean = data.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`].mean
        let cacgtgMeanTr = cacgtgMean.toFixed(9)
    const cacgtgMin = data.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`].min
        let cacgtgMinTr = cacgtgMin.toFixed(9)
    const cacgtgP50 = data.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`].p50
        let cacgtgP50Tr = cacgtgP50.toFixed(9)
    const cacgtgP75 = data.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`].p75
        let cacgtgP75Tr = cacgtgP75.toFixed(9)
    const cacgtgP95 = data.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`].p95
        let cacgtgP95Tr = cacgtgP95.toFixed(9)
    const cacgtgP99 = data.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`].p99
        let cacgtgP99Tr = cacgtgP99.toFixed(9)
    const cacgtgMax = data.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`].max
        let cacgtgMaxTr = cacgtgMax.toFixed(9)

    //Dashboard Controller
    const dcccdbCount = data.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`].count
    const dcccdbMean = data.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`].mean
        let dcccdbMeanTr = dcccdbMean.toFixed(9)
    const dcccdbMin = data.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`].min
        let dcccdbMinTr = dcccdbMin.toFixed(9)
    const dcccdbP50 = data.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`].p50
        let dcccdbP50Tr = dcccdbP50.toFixed(9)
    const dcccdbP75 = data.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`].p75
        let dcccdbP75Tr = dcccdbP75.toFixed(9)
    const dcccdbP95 = data.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`].p95
        let dcccdbP95Tr = dcccdbP95.toFixed(9)
    const dcccdbP99 = data.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`].p99
        let dcccdbP99Tr = dcccdbP99.toFixed(9)
    const dcccdbMax = data.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`].max
        let dcccdbMaxTr = dcccdbMax.toFixed(9)
    
    const dccebCount = data.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`].count
    const dccebMean = data.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`].mean
        let dccebMeanTr = dccebMean.toFixed(9)
    const dccebMin = data.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`].min
        let dccebMinTr = dccebMin.toFixed(9)
    const dccebP50 = data.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`].p50
        let dccebP50Tr = dccebP50.toFixed(9)
    const dccebP75 = data.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`].p75
        let dccebP75Tr = dccebP75.toFixed(9)
    const dccebP95 = data.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`].p95
        let dccebP95Tr = dccebP95.toFixed(9)
    const dccebP99 = data.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`].p99
        let dccebP99Tr = dccebP99.toFixed(9)
    const dccebMax = data.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`].max
        let dccebMaxTr = dccebMax.toFixed(9)
    
    const dccpebCount = data.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`].count
    const dccpebMean = data.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`].mean
        let dccpebMeanTr = dccpebMean.toFixed(9)
    const dccpebMin = data.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`].min
        let dccpebMinTr = dccpebMin.toFixed(9)
    const dccpebP50 = data.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`].p50
        let dccpebP50Tr = dccpebP50.toFixed(9)
    const dccpebP75 = data.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`].p75
        let dccpebP75Tr = dccpebP75.toFixed(9)
    const dccpebP95 = data.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`].p95
        let dccpebP95Tr = dccpebP95.toFixed(9)
    const dccpebP99 = data.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`].p99
        let dccpebP99Tr = dccpebP99.toFixed(9)
    const dccpebMax = data.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`].max
        let dccpebMaxTr = dccpebMax.toFixed(9)
    
    const dcddCount = data.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`].count
    const dcddMean = data.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`].mean
        let dcddMeanTr = dcddMean.toFixed(9)
    const dcddMin = data.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`].min
        let dcddMinTr = dcddMin.toFixed(9)
    const dcddP50 = data.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`].p50
        let dcddP50Tr = dcddP50.toFixed(9)
    const dcddP75 = data.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`].p75
        let dcddP75Tr = dcddP75.toFixed(9)
    const dcddP95 = data.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`].p95
        let dcddP95Tr = dcddP95.toFixed(9)
    const dcddP99 = data.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`].p99
        let dcddP99Tr = dcddP99.toFixed(9)
    const dcddMax = data.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`].max
        let dcddMaxTr = dcddMax.toFixed(9)
    
    const dcgdcCount = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`].count
    const dcgdcMean = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`].mean
        let dcgdcMeanTr = dcgdcMean.toFixed(9)
    const dcgdcMin = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`].min
        let dcgdcMinTr = dcgdcMin.toFixed(9)
    const dcgdcP50 = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`].p50
        let dcgdcP50Tr = dcgdcP50.toFixed(9)
    const dcgdcP75 = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`].p75
        let dcgdcP75Tr = dcgdcP75.toFixed(9)
    const dcgdcP95 = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`].p95
        let dcgdcP95Tr = dcgdcP95.toFixed(9)
    const dcgdcP99 = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`].p99
        let dcgdcP99Tr = dcgdcP99.toFixed(9)
    const dcgdcMax = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`].max
        let dcgdcMaxTr = dcgdcMax.toFixed(9)
    
    const dcgdoCount = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`].count
    const dcgdoMean = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`].mean
        let dcgdoMeanTr = dcgdoMean.toFixed(9)
    const dcgdoMin = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`].min
        let dcgdoMinTr = dcgdoMin.toFixed(9)
    const dcgdoP50 = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`].p50
        let dcgdoP50Tr = dcgdoP50.toFixed(9)
    const dcgdoP75 = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`].p75
        let dcgdoP75Tr = dcgdoP75.toFixed(9)
    const dcgdoP95 = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`].p95
        let dcgdoP95Tr = dcgdoP95.toFixed(9)
    const dcgdoP99 = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`].p99
        let dcgdoP99Tr = dcgdoP99.toFixed(9)
    const dcgdoMax = data.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`].max
        let dcgdoMaxTr = dcgdoMax.toFixed(9)
    
    const dcgestdCount = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`].count
    const dcgestdMean = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`].mean
        let dcgestdMeanTr = dcgestdMean.toFixed(9)
    const dcgestdMin = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`].min
        let dcgestdMinTr = dcgestdMin.toFixed(9)
    const dcgestdP50 = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`].p50
        let dcgestdP50Tr = dcgestdP50.toFixed(9)
    const dcgestdP75 = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`].p75
        let dcgestdP75Tr = dcgestdP75.toFixed(9)
    const dcgestdP95 = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`].p95
        let dcgestdP95Tr = dcgestdP95.toFixed(9)
    const dcgestdP99 = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`].p99
        let dcgestdP99Tr = dcgestdP99.toFixed(9)
    const dcgestdMax = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`].max
        let dcgestdMaxTr = dcgestdMax.toFixed(9)
    
    const dcgestdcCount = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`].count
    const dcgestdcMean = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`].mean
        let dcgestdcMeanTr = dcgestdcMean.toFixed(9)
    const dcgestdcMin = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`].min
        let dcgestdcMinTr = dcgestdcMin.toFixed(9)
    const dcgestdcP50 = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`].p50
        let dcgestdcP50Tr = dcgestdcP50.toFixed(9)
    const dcgestdcP75 = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`].p75
        let dcgestdcP75Tr = dcgestdcP75.toFixed(9)
    const dcgestdcP95 = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`].p95
        let dcgestdcP95Tr = dcgestdcP95.toFixed(9)
    const dcgestdcP99 = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`].p99
        let dcgestdcP99Tr = dcgestdcP99.toFixed(9)
    const dcgestdcMax = data.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`].max
        let dcgestdcMaxTr = dcgestdcMax.toFixed(9)
    
    const dcgercCount = data.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`].count
    const dcgercMean = data.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`].mean
        let dcgercMeanTr = dcgercMean.toFixed(9)
    const dcgercMin = data.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`].min
        let dcgercMinTr = dcgercMin.toFixed(9)
    const dcgercP50 = data.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`].p50
        let dcgercP50Tr = dcgercP50.toFixed(9)
    const dcgercP75 = data.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`].p75
        let dcgercP75Tr = dcgercP75.toFixed(9)
    const dcgercP95 = data.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`].p95
        let dcgercP95Tr = dcgercP95.toFixed(9)
    const dcgercP99 = data.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`].p99
        let dcgercP99Tr = dcgercP99.toFixed(9)
    const dcgercMax = data.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`].max
        let dcgercMaxTr = dcgercMax.toFixed(9)
    
    const dcgeCount = data.timers[`com.cats.server.controllers.DashboardController.getEvents`].count
    const dcgeMean = data.timers[`com.cats.server.controllers.DashboardController.getEvents`].mean
        let dcgeMeanTr = dcgeMean.toFixed(9)
    const dcgeMin = data.timers[`com.cats.server.controllers.DashboardController.getEvents`].min
        let dcgeMinTr = dcgeMin.toFixed(9)
    const dcgeP50 = data.timers[`com.cats.server.controllers.DashboardController.getEvents`].p50
        let dcgeP50Tr = dcgeP50.toFixed(9)
    const dcgeP75 = data.timers[`com.cats.server.controllers.DashboardController.getEvents`].p75
        let dcgeP75Tr = dcgeP75.toFixed(9)
    const dcgeP95 = data.timers[`com.cats.server.controllers.DashboardController.getEvents`].p95
        let dcgeP95Tr = dcgeP95.toFixed(9)
    const dcgeP99 = data.timers[`com.cats.server.controllers.DashboardController.getEvents`].p99
        let dcgeP99Tr = dcgeP99.toFixed(9)
    const dcgeMax = data.timers[`com.cats.server.controllers.DashboardController.getEvents`].max
        let dcgeMaxTr = dcgeMax.toFixed(9)
    
    const dcgnoeCount = data.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`].count
    const dcgnoeMean = data.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`].mean
        let dcgnoeMeanTr = dcgnoeMean.toFixed(9)
    const dcgnoeMin = data.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`].min
        let dcgnoeMinTr = dcgnoeMin.toFixed(9)
    const dcgnoeP50 = data.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`].p50
        let dcgnoeP50Tr = dcgnoeP50.toFixed(9)
    const dcgnoeP75 = data.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`].p75
        let dcgnoeP75Tr = dcgnoeP75.toFixed(9)
    const dcgnoeP95 = data.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`].p95
        let dcgnoeP95Tr = dcgnoeP95.toFixed(9)
    const dcgnoeP99 = data.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`].p99
        let dcgnoeP99Tr = dcgnoeP99.toFixed(9)
    const dcgnoeMax = data.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`].max
        let dcgnoeMaxTr = dcgnoeMax.toFixed(9)
    
    const dcgnofweCount = data.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`].count
    const dcgnofweMean = data.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`].mean
        let dcgnofweMeanTr = dcgnofweMean.toFixed(9)
    const dcgnofweMin = data.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`].min
        let dcgnofweMinTr = dcgnofweMin.toFixed(9)
    const dcgnofweP50 = data.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`].p50
        let dcgnofweP50Tr = dcgnofweP50.toFixed(9)
    const dcgnofweP75 = data.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`].p75
        let dcgnofweP75Tr = dcgnofweP75.toFixed(9)
    const dcgnofweP95 = data.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`].p95
        let dcgnofweP95Tr = dcgnofweP95.toFixed(9)
    const dcgnofweP99 = data.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`].p99
        let dcgnofweP99Tr = dcgnofweP99.toFixed(9)
    const dcgnofweMax = data.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`].max
        let dcgnofweMaxTr = dcgnofweMax.toFixed(9)
    
    const dclcbCount = data.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`].count
    const dclcbMean = data.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`].mean
        let dclcbMeanTr = dclcbMean.toFixed(9)
    const dclcbMin = data.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`].min
        let dclcbMinTr = dclcbMin.toFixed(9)
    const dclcbP50 = data.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`].p50
        let dclcbP50Tr = dclcbP50.toFixed(9)
    const dclcbP75 = data.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`].p75
        let dclcbP75Tr = dclcbP75.toFixed(9)
    const dclcbP95 = data.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`].p95
        let dclcbP95Tr = dclcbP95.toFixed(9)
    const dclcbP99 = data.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`].p99
        let dclcbP99Tr = dclcbP99.toFixed(9)
    const dclcbMax = data.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`].max
        let dclcbMaxTr = dclcbMax.toFixed(9)
    
    const dcldbCount = data.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`].count
    const dcldbMean = data.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`].mean
        let dcldbMeanTr = dcldbMean.toFixed(9)
    const dcldbMin = data.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`].min
        let dcldbMinTr = dcldbMin.toFixed(9)
    const dcldbP50 = data.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`].p50
        let dcldbP50Tr = dcldbP50.toFixed(9)
    const dcldbP75 = data.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`].p75
        let dcldbP75Tr = dcldbP75.toFixed(9)
    const dcldbP95 = data.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`].p95
        let dcldbP95Tr = dcldbP95.toFixed(9)
    const dcldbP99 = data.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`].p99
        let dcldbP99Tr = dcldbP99.toFixed(9)
    const dcldbMax = data.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`].max
        let dcldbMaxTr = dcldbMax.toFixed(9)
    
    const dclebCount = data.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`].count
    const dclebMean = data.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`].mean
        let dclebMeanTr = dclebMean.toFixed(9)
    const dclebMin = data.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`].min
        let dclebMinTr = dclebMin.toFixed(9)
    const dclebP50 = data.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`].p50
        let dclebP50Tr = dclebP50.toFixed(9)
    const dclebP75 = data.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`].p75
        let dclebP75Tr = dclebP75.toFixed(9)
    const dclebP95 = data.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`].p95
        let dclebP95Tr = dclebP95.toFixed(9)
    const dclebP99 = data.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`].p99
        let dclebP99Tr = dclebP99.toFixed(9)
    const dclebMax = data.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`].max
        let dclebMaxTr = dclebMax.toFixed(9)

    const dclexbCount = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`].count
    const dclexbMean = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`].mean
        let dclexbMeanTr = dclexbMean.toFixed(9)
    const dclexbMin = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`].min
        let dclexbMinTr = dclexbMin.toFixed(9)
    const dclexbP50 = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`].p50
        let dclexbP50Tr = dclexbP50.toFixed(9)
    const dclexbP75 = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`].p75
        let dclexbP75Tr = dclexbP75.toFixed(9)
    const dclexbP95 = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`].p95
        let dclexbP95Tr = dclexbP95.toFixed(9)
    const dclexbP99 = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`].p99
        let dclexbP99Tr = dclexbP99.toFixed(9)
    const dclexbMax = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`].max
        let dclexbMaxTr = dclexbMax.toFixed(9)
    
    const dclexbcCount = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`].count
    const dclexbcMean = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`].mean
        let dclexbcMeanTr = dclexbcMean.toFixed(9)
    const dclexbcMin = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`].min
        let dclexbcMinTr = dclexbcMin.toFixed(9)
    const dclexbcP50 = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`].p50
        let dclexbcP50Tr = dclexbcP50.toFixed(9)
    const dclexbcP75 = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`].p75
        let dclexbcP75Tr = dclexbcP75.toFixed(9)
    const dclexbcP95 = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`].p95
        let dclexbcP95Tr = dclexbcP95.toFixed(9)
    const dclexbcP99 = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`].p99
        let dclexbcP99Tr = dclexbcP99.toFixed(9)
    const dclexbcMax = data.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`].max
        let dclexbcMaxTr = dclexbcMax.toFixed(9)
    
    const dcsdcCount = data.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`].count
    const dcsdcMean = data.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`].mean
        let dcsdcMeanTr = dcsdcMean.toFixed(9)
    const dcsdcMin = data.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`].min
        let dcsdcMinTr = dcsdcMin.toFixed(9)
    const dcsdcP50 = data.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`].p50
        let dcsdcP50Tr = dcsdcP50.toFixed(9)
    const dcsdcP75 = data.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`].p75
        let dcsdcP75Tr = dcsdcP75.toFixed(9)
    const dcsdcP95 = data.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`].p95
        let dcsdcP95Tr = dcsdcP95.toFixed(9)
    const dcsdcP99 = data.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`].p99
        let dcsdcP99Tr = dcsdcP99.toFixed(9)
    const dcsdcMax = data.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`].max
        let dcsdcMaxTr = dcsdcMax.toFixed(9)
    
    const dcshCount = data.timers[`com.cats.server.controllers.DashboardController.sayHello`].count
    const dcshMean = data.timers[`com.cats.server.controllers.DashboardController.sayHello`].mean
        let dcshMeanTr = dcshMean.toFixed(9)
    const dcshMin = data.timers[`com.cats.server.controllers.DashboardController.sayHello`].min
        let dcshMinTr = dcshMin.toFixed(9)
    const dcshP50 = data.timers[`com.cats.server.controllers.DashboardController.sayHello`].p50
        let dcshP50Tr = dcshP50.toFixed(9)
    const dcshP75 = data.timers[`com.cats.server.controllers.DashboardController.sayHello`].p75
        let dcshP75Tr = dcshP75.toFixed(9)
    const dcshP95 = data.timers[`com.cats.server.controllers.DashboardController.sayHello`].p95
        let dcshP95Tr = dcshP95.toFixed(9)
    const dcshP99 = data.timers[`com.cats.server.controllers.DashboardController.sayHello`].p99
        let dcshP99Tr = dcshP99.toFixed(9)
    const dcshMax = data.timers[`com.cats.server.controllers.DashboardController.sayHello`].max
        let dcshMaxTr = dcshMax.toFixed(9)
    
    const dcstCount = data.timers[`com.cats.server.controllers.DashboardController.sayToggle`].count
    const dcstMean = data.timers[`com.cats.server.controllers.DashboardController.sayToggle`].mean
        let dcstMeanTr = dcstMean.toFixed(9)
    const dcstMin = data.timers[`com.cats.server.controllers.DashboardController.sayToggle`].min
        let dcstMinTr = dcstMin.toFixed(9)
    const dcstP50 = data.timers[`com.cats.server.controllers.DashboardController.sayToggle`].p50
        let dcstP50Tr = dcstP50.toFixed(9)
    const dcstP75 = data.timers[`com.cats.server.controllers.DashboardController.sayToggle`].p75
        let dcstP75Tr = dcstP75.toFixed(9)
    const dcstP95 = data.timers[`com.cats.server.controllers.DashboardController.sayToggle`].p95
        let dcstP95Tr = dcstP95.toFixed(9)
    const dcstP99 = data.timers[`com.cats.server.controllers.DashboardController.sayToggle`].p99
        let dcstP99Tr = dcstP99.toFixed(9)
    const dcstMax = data.timers[`com.cats.server.controllers.DashboardController.sayToggle`].max
        let dcstMaxTr = dcstMax.toFixed(9)
    
    const dcspdiCount = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`].count
    const dcspdiMean = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`].mean
        let dcspdiMeanTr = dcspdiMean.toFixed(9)
    const dcspdiMin = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`].min
        let dcspdiMinTr = dcspdiMin.toFixed(9)
    const dcspdiP50 = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`].p50
        let dcspdiP50Tr = dcspdiP50.toFixed(9)
    const dcspdiP75 = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`].p75
        let dcspdiP75Tr = dcspdiP75.toFixed(9)
    const dcspdiP95 = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`].p95
        let dcspdiP95Tr = dcspdiP95.toFixed(9)
    const dcspdiP99 = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`].p99
        let dcspdiP99Tr = dcspdiP99.toFixed(9)
    const dcspdiMax = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`].max
        let dcspdiMaxTr = dcspdiMax.toFixed(9)
    
    const dcspdicCount = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`].count
    const dcspdicMean = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`].mean
        let dcspdicMeanTr = dcspdicMean.toFixed(9)
    const dcspdicMin = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`].min
        let dcspdicMinTr = dcspdicMin.toFixed(9)
    const dcspdicP50 = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`].p50
        let dcspdicP50Tr = dcspdicP50.toFixed(9)
    const dcspdicP75 = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`].p75
        let dcspdicP75Tr = dcspdicP75.toFixed(9)
    const dcspdicP95 = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`].p95
        let dcspdicP95Tr = dcspdicP95.toFixed(9)
    const dcspdicP99 = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`].p99
        let dcspdicP99Tr = dcspdicP99.toFixed(9)
    const dcspdicMax = data.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`].max
        let dcspdicMaxTr = dcspdicMax.toFixed(9)
    
    const dcssCount = data.timers[`com.cats.server.controllers.DashboardController.searchStatistics`].count
    const dcssMean = data.timers[`com.cats.server.controllers.DashboardController.searchStatistics`].mean
        let dcssMeanTr = dcssMean.toFixed(9)
    const dcssMin = data.timers[`com.cats.server.controllers.DashboardController.searchStatistics`].min
        let dcssMinTr = dcssMin.toFixed(9)
    const dcssP50 = data.timers[`com.cats.server.controllers.DashboardController.searchStatistics`].p50
        let dcssP50Tr = dcssP50.toFixed(9)
    const dcssP75 = data.timers[`com.cats.server.controllers.DashboardController.searchStatistics`].p75
        let dcssP75Tr = dcssP75.toFixed(9)
    const dcssP95 = data.timers[`com.cats.server.controllers.DashboardController.searchStatistics`].p95
        let dcssP95Tr = dcssP95.toFixed(9)
    const dcssP99 = data.timers[`com.cats.server.controllers.DashboardController.searchStatistics`].p99
        let dcssP99Tr = dcssP99.toFixed(9)
    const dcssMax = data.timers[`com.cats.server.controllers.DashboardController.searchStatistics`].max
        let dcssMaxTr = dcssMax.toFixed(9)
    
    // Data Message Definition Controller
    const dmdcgCount = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`].count
    const dmdcgMean = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`].mean
        let dmdcgMeanTr = dmdcgMean.toFixed(9)
    const dmdcgMin = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`].min
        let dmdcgMinTr = dmdcgMin.toFixed(9)
    const dmdcgP50 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`].p50
        let dmdcgP50Tr = dmdcgP50.toFixed(9)
    const dmdcgP75 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`].p75
        let dmdcgP75Tr = dmdcgP75.toFixed(9)
    const dmdcgP95 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`].p95
        let dmdcgP95Tr = dmdcgP95.toFixed(9)
    const dmdcgP99 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`].p99
        let dmdcgP99Tr = dmdcgP99.toFixed(9)
    const dmdcgMax = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`].max
        let dmdcgMaxTr = dmdcgMax.toFixed(9)
    
    const dmdcgaCount = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`].count
    const dmdcgaMean = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`].mean
        let dmdcgaMeanTr = dmdcgaMean.toFixed(9)
    const dmdcgaMin = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`].min
        let dmdcgaMinTr = dmdcgaMin.toFixed(9)
    const dmdcgaP50 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`].p50
        let dmdcgaP50Tr = dmdcgaP50.toFixed(9)
    const dmdcgaP75 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`].p75
        let dmdcgaP75Tr = dmdcgaP75.toFixed(9)
    const dmdcgaP95 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`].p95
        let dmdcgaP95Tr = dmdcgaP95.toFixed(9)
    const dmdcgaP99 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`].p99
        let dmdcgaP99Tr = dmdcgaP99.toFixed(9)
    const dmdcgaMax = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`].max
        let dmdcgaMaxTr = dmdcgaMax.toFixed(9)
    
    const dmdcsCount = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`].count
    const dmdcsMean = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`].mean
        let dmdcsMeanTr = dmdcsMean.toFixed(9)
    const dmdcsMin = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`].min
        let dmdcsMinTr = dmdcsMin.toFixed(9)
    const dmdcsP50 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`].p50
        let dmdcsP50Tr = dmdcsP50.toFixed(9)
    const dmdcsP75 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`].p75
        let dmdcsP75Tr = dmdcsP75.toFixed(9)
    const dmdcsP95 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`].p95
        let dmdcsP95Tr = dmdcsP95.toFixed(9)
    const dmdcsP99 = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`].p99
        let dmdcsP99Tr = dmdcsP99.toFixed(9)
    const dmdcsMax = data.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`].max
        let dmdcsMaxTr = dmdcsMax.toFixed(9)
    
    // Diary Controller
    const dccCount = data.timers[`com.cats.server.controllers.DiaryController.count`].count
    const dccMean = data.timers[`com.cats.server.controllers.DiaryController.count`].mean
        let dccMeanTr = dccMean.toFixed(9)
    const dccMin = data.timers[`com.cats.server.controllers.DiaryController.count`].min
        let dccMinTr = dccMin.toFixed(9)
    const dccP50 = data.timers[`com.cats.server.controllers.DiaryController.count`].p50
        let dccP50Tr = dccP50.toFixed(9)
    const dccP75 = data.timers[`com.cats.server.controllers.DiaryController.count`].p75
        let dccP75Tr = dccP75.toFixed(9)
    const dccP95 = data.timers[`com.cats.server.controllers.DiaryController.count`].p95
        let dccP95Tr = dccP95.toFixed(9)
    const dccP99 = data.timers[`com.cats.server.controllers.DiaryController.count`].p99
        let dccP99Tr = dccP99.toFixed(9)
    const dccMax = data.timers[`com.cats.server.controllers.DiaryController.count`].max
        let dccMaxTr = dccMax.toFixed(9)
    
    const dcsCount = data.timers[`com.cats.server.controllers.DiaryController.search`].count
    const dcsMean = data.timers[`com.cats.server.controllers.DiaryController.search`].mean
        let dcsMeanTr = dcsMean.toFixed(9)
    const dcsMin = data.timers[`com.cats.server.controllers.DiaryController.search`].min
        let dcsMinTr = dcsMin.toFixed(9)
    const dcsP50 = data.timers[`com.cats.server.controllers.DiaryController.search`].p50
        let dcsP50Tr = dcsP50.toFixed(9)
    const dcsP75 = data.timers[`com.cats.server.controllers.DiaryController.search`].p75
        let dcsP75Tr = dcsP75.toFixed(9)
    const dcsP95 = data.timers[`com.cats.server.controllers.DiaryController.search`].p95
        let dcsP95Tr = dcsP95.toFixed(9)
    const dcsP99 = data.timers[`com.cats.server.controllers.DiaryController.search`].p99
        let dcsP99Tr = dcsP99.toFixed(9)
    const dcsMax = data.timers[`com.cats.server.controllers.DiaryController.search`].max
        let dcsMaxTr = dcsMax.toFixed(9)
    
    // Election Controller
    const ecceCount = data.timers[`com.cats.server.controllers.ElectionController.canElect`].count
    const ecceMean = data.timers[`com.cats.server.controllers.ElectionController.canElect`].mean
        let ecceMeanTr = ecceMean.toFixed(9)
    const ecceMin = data.timers[`com.cats.server.controllers.ElectionController.canElect`].min
        let ecceMinTr = ecceMin.toFixed(9)
    const ecceP50 = data.timers[`com.cats.server.controllers.ElectionController.canElect`].p50
        let ecceP50Tr = ecceP50.toFixed(9)
    const ecceP75 = data.timers[`com.cats.server.controllers.ElectionController.canElect`].p75
        let ecceP75Tr = ecceP75.toFixed(9)
    const ecceP95 = data.timers[`com.cats.server.controllers.ElectionController.canElect`].p95
        let ecceP95Tr = ecceP95.toFixed(9)
    const ecceP99 = data.timers[`com.cats.server.controllers.ElectionController.canElect`].p99
        let ecceP99Tr = ecceP99.toFixed(9)
    const ecceMax = data.timers[`com.cats.server.controllers.ElectionController.canElect`].max
        let ecceMaxTr = ecceMax.toFixed(9)
    
    const ecdeCount = data.timers[`com.cats.server.controllers.ElectionController.deleteElection`].count
    const ecdeMean = data.timers[`com.cats.server.controllers.ElectionController.deleteElection`].mean
        let ecdeMeanTr = ecdeMean.toFixed(9)
    const ecdeMin = data.timers[`com.cats.server.controllers.ElectionController.deleteElection`].min
        let ecdeMinTr = ecdeMin.toFixed(9)
    const ecdeP50 = data.timers[`com.cats.server.controllers.ElectionController.deleteElection`].p50
        let ecdeP50Tr = ecdeP50.toFixed(9)
    const ecdeP75 = data.timers[`com.cats.server.controllers.ElectionController.deleteElection`].p75
        let ecdeP75Tr = ecdeP75.toFixed(9)
    const ecdeP95 = data.timers[`com.cats.server.controllers.ElectionController.deleteElection`].p95
        let ecdeP95Tr = ecdeP95.toFixed(9)
    const ecdeP99 = data.timers[`com.cats.server.controllers.ElectionController.deleteElection`].p99
        let ecdeP99Tr = ecdeP99.toFixed(9)
    const ecdeMax = data.timers[`com.cats.server.controllers.ElectionController.deleteElection`].max
        let ecdeMaxTr = ecdeMax.toFixed(9)
    
    const ecdbeCount = data.timers[`com.cats.server.controllers.ElectionController.doBulkElection`].count
    const ecdbeMean = data.timers[`com.cats.server.controllers.ElectionController.doBulkElection`].mean
        let ecdbeMeanTr = ecdbeMean.toFixed(9)
    const ecdbeMin = data.timers[`com.cats.server.controllers.ElectionController.doBulkElection`].min
        let ecdbeMinTr = ecdbeMin.toFixed(9)
    const ecdbeP50 = data.timers[`com.cats.server.controllers.ElectionController.doBulkElection`].p50
        let ecdbeP50Tr = ecdbeP50.toFixed(9)
    const ecdbeP75 = data.timers[`com.cats.server.controllers.ElectionController.doBulkElection`].p75
        let ecdbeP75Tr = ecdbeP75.toFixed(9)
    const ecdbeP95 = data.timers[`com.cats.server.controllers.ElectionController.doBulkElection`].p95
        let ecdbeP95Tr = ecdbeP95.toFixed(9)
    const ecdbeP99 = data.timers[`com.cats.server.controllers.ElectionController.doBulkElection`].p99
        let ecdbeP99Tr = ecdbeP99.toFixed(9)
    const ecdbeMax = data.timers[`com.cats.server.controllers.ElectionController.doBulkElection`].max
        let ecdbeMaxTr = ecdbeMax.toFixed(9)
    
    const eceeCount = data.timers[`com.cats.server.controllers.ElectionController.editElection`].count
    const eceeMean = data.timers[`com.cats.server.controllers.ElectionController.editElection`].mean
        let eceeMeanTr = eceeMean.toFixed(9)
    const eceeMin = data.timers[`com.cats.server.controllers.ElectionController.editElection`].min
        let eceeMinTr = eceeMin.toFixed(9)
    const eceeP50 = data.timers[`com.cats.server.controllers.ElectionController.editElection`].p50
        let eceeP50Tr = eceeP50.toFixed(9)
    const eceeP75 = data.timers[`com.cats.server.controllers.ElectionController.editElection`].p75
        let eceeP75Tr = eceeP75.toFixed(9)
    const eceeP95 = data.timers[`com.cats.server.controllers.ElectionController.editElection`].p95
        let eceeP95Tr = eceeP95.toFixed(9)
    const eceeP99 = data.timers[`com.cats.server.controllers.ElectionController.editElection`].p99
        let eceeP99Tr = eceeP99.toFixed(9)
    const eceeMax = data.timers[`com.cats.server.controllers.ElectionController.editElection`].max
        let eceeMaxTr = eceeMax.toFixed(9)
    
    const ecgercCount = data.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`].count
    const ecgercMean = data.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`].mean
        let ecgercMeanTr = ecgercMean.toFixed(9)
    const ecgercMin = data.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`].min
        let ecgercMinTr = ecgercMin.toFixed(9)
    const ecgercP50 = data.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`].p50
        let ecgercP50Tr = ecgercP50.toFixed(9)
    const ecgercP75 = data.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`].p75
        let ecgercP75Tr = ecgercP75.toFixed(9)
    const ecgercP95 = data.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`].p95
        let ecgercP95Tr = ecgercP95.toFixed(9)
    const ecgercP99 = data.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`].p99
        let ecgercP99Tr = ecgercP99.toFixed(9)
    const ecgercMax = data.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`].max
        let ecgercMaxTr = ecgercMax.toFixed(9)
    
    const ecgeCount = data.timers[`com.cats.server.controllers.ElectionController.getElections`].count
    const ecgeMean = data.timers[`com.cats.server.controllers.ElectionController.getElections`].mean
        let ecgeMeanTr = ecgeMean.toFixed(9)
    const ecgeMin = data.timers[`com.cats.server.controllers.ElectionController.getElections`].min
        let ecgeMinTr = ecgeMin.toFixed(9)
    const ecgeP50 = data.timers[`com.cats.server.controllers.ElectionController.getElections`].p50
        let ecgeP50Tr = ecgeP50.toFixed(9)
    const ecgeP75 = data.timers[`com.cats.server.controllers.ElectionController.getElections`].p75
        let ecgeP75Tr = ecgeP75.toFixed(9)
    const ecgeP95 = data.timers[`com.cats.server.controllers.ElectionController.getElections`].p95
        let ecgeP95Tr = ecgeP95.toFixed(9)
    const ecgeP99 = data.timers[`com.cats.server.controllers.ElectionController.getElections`].p99
        let ecgeP99Tr = ecgeP99.toFixed(9)
    const ecgeMax = data.timers[`com.cats.server.controllers.ElectionController.getElections`].max
        let ecgeMaxTr = ecgeMax.toFixed(9)
    
    const ecgssCount = data.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`].count
    const ecgssMean = data.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`].mean
        let ecgssMeanTr = ecgssMean.toFixed(9)
    const ecgssMin = data.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`].min
        let ecgssMinTr = ecgssMin.toFixed(9)
    const ecgssP50 = data.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`].p50
        let ecgssP50Tr = ecgssP50.toFixed(9)
    const ecgssP75 = data.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`].p75
        let ecgssP75Tr = ecgssP75.toFixed(9)
    const ecgssP95 = data.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`].p95
        let ecgssP95Tr = ecgssP95.toFixed(9)
    const ecgssP99 = data.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`].p99
        let ecgssP99Tr = ecgssP99.toFixed(9)
    const ecgssMax = data.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`].max
        let ecgssMaxTr = ecgssMax.toFixed(9)
    
    // File Browser Controller
    const fbccfdhCount = data.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`].count
    const fbccfdhMean = data.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`].mean
        let fbccfdhMeanTr = fbccfdhMean.toFixed(9)
    const fbccfdhMin = data.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`].min
        let fbccfdhMinTr = fbccfdhMin.toFixed(9)
    const fbccfdhP50 = data.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`].p50
        let fbccfdhP50Tr = fbccfdhP50.toFixed(9)
    const fbccfdhP75 = data.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`].p75
        let fbccfdhP75Tr = fbccfdhP75.toFixed(9)
    const fbccfdhP95 = data.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`].p95
        let fbccfdhP95Tr = fbccfdhP95.toFixed(9)
    const fbccfdhP99 = data.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`].p99
        let fbccfdhP99Tr = fbccfdhP99.toFixed(9)
    const fbccfdhMax = data.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`].max
        let fbccfdhMaxTr = fbccfdhMax.toFixed(9)
    
    const fbcdhCount = data.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`].count
    const fbcdhMean = data.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`].mean
        let fbcdhMeanTr = fbcdhMean.toFixed(9)
    const fbcdhMin = data.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`].min
        let fbcdhMinTr = fbcdhMin.toFixed(9)
    const fbcdhP50 = data.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`].p50
        let fbcdhP50Tr = fbcdhP50.toFixed(9)
    const fbcdhP75 = data.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`].p75
        let fbcdhP75Tr = fbcdhP75.toFixed(9)
    const fbcdhP95 = data.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`].p95
        let fbcdhP95Tr = fbcdhP95.toFixed(9)
    const fbcdhP99 = data.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`].p99
        let fbcdhP99Tr = fbcdhP99.toFixed(9)
    const fbcdhMax = data.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`].max
        let fbcdhMaxTr = fbcdhMax.toFixed(9)
    
    const fbcgfrCount = data.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`].count
    const fbcgfrMean = data.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`].mean
        let fbcgfrMeanTr = fbcgfrMean.toFixed(9)
    const fbcgfrMin = data.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`].min
        let fbcgfrMinTr = fbcgfrMin.toFixed(9)
    const fbcgfrP50 = data.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`].p50
        let fbcgfrP50Tr = fbcgfrP50.toFixed(9)
    const fbcgfrP75 = data.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`].p75
        let fbcgfrP75Tr = fbcgfrP75.toFixed(9)
    const fbcgfrP95 = data.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`].p95
        let fbcgfrP95Tr = fbcgfrP95.toFixed(9)
    const fbcgfrP99 = data.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`].p99
        let fbcgfrP99Tr = fbcgfrP99.toFixed(9)
    const fbcgfrMax = data.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`].max
        let fbcgfrMaxTr = fbcgfrMax.toFixed(9)
    
    const fbcgpCount = data.timers[`com.cats.server.controllers.FileBrowserController.getPath`].count
    const fbcgpMean = data.timers[`com.cats.server.controllers.FileBrowserController.getPath`].mean
        let fbcgpMeanTr = fbcgpMean.toFixed(9)
    const fbcgpMin = data.timers[`com.cats.server.controllers.FileBrowserController.getPath`].min
        let fbcgpMinTr = fbcgpMin.toFixed(9)
    const fbcgpP50 = data.timers[`com.cats.server.controllers.FileBrowserController.getPath`].p50
        let fbcgpP50Tr = fbcgpP50.toFixed(9)
    const fbcgpP75 = data.timers[`com.cats.server.controllers.FileBrowserController.getPath`].p75
        let fbcgpP75Tr = fbcgpP75.toFixed(9)
    const fbcgpP95 = data.timers[`com.cats.server.controllers.FileBrowserController.getPath`].p95
        let fbcgpP95Tr = fbcgpP95.toFixed(9)
    const fbcgpP99 = data.timers[`com.cats.server.controllers.FileBrowserController.getPath`].p99
        let fbcgpP99Tr = fbcgpP99.toFixed(9)
    const fbcgpMax = data.timers[`com.cats.server.controllers.FileBrowserController.getPath`].max
        let fbcgpMaxTr = fbcgpMax.toFixed(9)
    
    const fbcgrpCount = data.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`].count
    const fbcgrpMean = data.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`].mean
        let fbcgrpMeanTr = fbcgrpMean.toFixed(9)
    const fbcgrpMin = data.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`].min
        let fbcgrpMinTr = fbcgrpMin.toFixed(9)
    const fbcgrpP50 = data.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`].p50
        let fbcgrpP50Tr = fbcgrpP50.toFixed(9)
    const fbcgrpP75 = data.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`].p75
        let fbcgrpP75Tr = fbcgrpP75.toFixed(9)
    const fbcgrpP95 = data.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`].p95
        let fbcgrpP95Tr = fbcgrpP95.toFixed(9)
    const fbcgrpP99 = data.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`].p99
        let fbcgrpP99Tr = fbcgrpP99.toFixed(9)
    const fbcgrpMax = data.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`].max
        let fbcgrpMaxTr = fbcgrpMax.toFixed(9)
    
    // Installation Controller 
    const icgciCount = data.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`].count
    const icgciMean = data.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`].mean
        let icgciMeanTr = icgciMean.toFixed(9)
    const icgciMin = data.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`].min
        let icgciMinTr = icgciMin.toFixed(9)
    const icgciP50 = data.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`].p50
        let icgciP50Tr = icgciP50.toFixed(9)
    const icgciP75 = data.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`].p75
        let icgciP75Tr = icgciP75.toFixed(9)
    const icgciP95 = data.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`].p95
        let icgciP95Tr = icgciP95.toFixed(9)
    const icgciP99 = data.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`].p99
        let icgciP99Tr = icgciP99.toFixed(9)
    const icgciMax = data.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`].max
        let icgciMaxTr = icgciMax.toFixed(9)
    
    const icgiCount = data.timers[`com.cats.server.controllers.InstallationController.getInstallations`].count
    const icgiMean = data.timers[`com.cats.server.controllers.InstallationController.getInstallations`].mean
        let icgiMeanTr = icgiMean.toFixed(9)
    const icgiMin = data.timers[`com.cats.server.controllers.InstallationController.getInstallations`].min
        let icgiMinTr = icgiMin.toFixed(9)
    const icgiP50 = data.timers[`com.cats.server.controllers.InstallationController.getInstallations`].p50
        let icgiP50Tr = icgiP50.toFixed(9)
    const icgiP75 = data.timers[`com.cats.server.controllers.InstallationController.getInstallations`].p75
        let icgiP75Tr = icgiP75.toFixed(9)
    const icgiP95 = data.timers[`com.cats.server.controllers.InstallationController.getInstallations`].p95
        let icgiP95Tr = icgiP95.toFixed(9)
    const icgiP99 = data.timers[`com.cats.server.controllers.InstallationController.getInstallations`].p99
        let icgiP99Tr = icgiP99.toFixed(9)
    const icgiMax = data.timers[`com.cats.server.controllers.InstallationController.getInstallations`].max
        let icgiMaxTr = icgiMax.toFixed(9)
    
    // Installation Property Controller
    const ipcgpsCount = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`].count
    const ipcgpsMean = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`].mean
        let ipcgpsMeanTr = ipcgpsMean.toFixed(9)
    const ipcgpsMin = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`].min
        let ipcgpsMinTr = ipcgpsMin.toFixed(9)
    const ipcgpsP50 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`].p50
        let ipcgpsP50Tr = ipcgpsP50.toFixed(9)
    const ipcgpsP75 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`].p75
        let ipcgpsP75Tr = ipcgpsP75.toFixed(9)
    const ipcgpsP95 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`].p95
        let ipcgpsP95Tr = ipcgpsP95.toFixed(9)
    const ipcgpsP99 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`].p99
        let ipcgpsP99Tr = ipcgpsP99.toFixed(9)
    const ipcgpsMax = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`].max
        let ipcgpsMaxTr = ipcgpsMax.toFixed(9)
    
    const ipcgpcsvCount = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`].count
    const ipcgpcsvMean = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`].mean
        let ipcgpcsvMeanTr = ipcgpcsvMean.toFixed(9)
    const ipcgpcsvMin = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`].min
        let ipcgpcsvMinTr = ipcgpcsvMin.toFixed(9)
    const ipcgpcsvP50 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`].p50
        let ipcgpcsvP50Tr = ipcgpcsvP50.toFixed(9)
    const ipcgpcsvP75 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`].p75
        let ipcgpcsvP75Tr = ipcgpcsvP75.toFixed(9)
    const ipcgpcsvP95 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`].p95
        let ipcgpcsvP95Tr = ipcgpcsvP95.toFixed(9)
    const ipcgpcsvP99 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`].p99
        let ipcgpcsvP99Tr = ipcgpcsvP99.toFixed(9)
    const ipcgpcsvMax = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`].max
        let ipcgpcsvMaxTr = ipcgpcsvMax.toFixed(9)
        
    const ipcgpjCount = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`].count
    const ipcgpjMean = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`].mean
        let ipcgpjMeanTr = ipcgpjMean.toFixed(9)
    const ipcgpjMin = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`].min
        let ipcgpjMinTr = ipcgpjMin.toFixed(9)
    const ipcgpjP50 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`].p50
        let ipcgpjP50Tr = ipcgpjP50.toFixed(9)
    const ipcgpjP75 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`].p75
        let ipcgpjP75Tr = ipcgpjP75.toFixed(9)
    const ipcgpjP95 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`].p95
        let ipcgpjP95Tr = ipcgpjP95.toFixed(9)
    const ipcgpjP99 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`].p99
        let ipcgpjP99Tr = ipcgpjP99.toFixed(9)
    const ipcgpjMax = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`].max
        let ipcgpjMaxTr = ipcgpjMax.toFixed(9)
        
    const ipcgppCount = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`].count
    const ipcgppMean = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`].mean
        let ipcgppMeanTr = ipcgppMean.toFixed(9)
    const ipcgppMin = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`].min
        let ipcgppMinTr = ipcgppMin.toFixed(9)
    const ipcgppP50 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`].p50
        let ipcgppP50Tr = ipcgppP50.toFixed(9)
    const ipcgppP75 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`].p75
        let ipcgppP75Tr = ipcgppP75.toFixed(9)
    const ipcgppP95 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`].p95
        let ipcgppP95Tr = ipcgppP95.toFixed(9)
    const ipcgppP99 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`].p99
        let ipcgppP99Tr = ipcgppP99.toFixed(9)
    const ipcgppMax = data.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`].max
        let ipcgppMaxTr = ipcgppMax.toFixed(9)
        
    const ipcgpCount = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`].count
    const ipcgpMean = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`].mean
        let ipcgpMeanTr = ipcgpMean.toFixed(9)
    const ipcgpMin = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`].min
        let ipcgpMinTr = ipcgpMin.toFixed(9)
    const ipcgpP50 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`].p50
        let ipcgpP50Tr = ipcgpP50.toFixed(9)
    const ipcgpP75 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`].p75
        let ipcgpP75Tr = ipcgpP75.toFixed(9)
    const ipcgpP95 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`].p95
        let ipcgpP95Tr = ipcgpP95.toFixed(9)
    const ipcgpP99 = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`].p99
        let ipcgpP99Tr = ipcgpP99.toFixed(9)
    const ipcgpMax = data.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`].max
        let ipcgpMaxTr = ipcgpMax.toFixed(9)
    
    const ipcsCount = data.timers[`com.cats.server.controllers.InstallationPropertyController.save`].count
    const ipcsMean = data.timers[`com.cats.server.controllers.InstallationPropertyController.save`].mean
        let ipcsMeanTr = ipcsMean.toFixed(9)
    const ipcsMin = data.timers[`com.cats.server.controllers.InstallationPropertyController.save`].min
        let ipcsMinTr = ipcsMin.toFixed(9)
    const ipcsP50 = data.timers[`com.cats.server.controllers.InstallationPropertyController.save`].p50
        let ipcsP50Tr = ipcsP50.toFixed(9)
    const ipcsP75 = data.timers[`com.cats.server.controllers.InstallationPropertyController.save`].p75
        let ipcsP75Tr = ipcsP75.toFixed(9)
    const ipcsP95 = data.timers[`com.cats.server.controllers.InstallationPropertyController.save`].p95
        let ipcsP95Tr = ipcsP95.toFixed(9)
    const ipcsP99 = data.timers[`com.cats.server.controllers.InstallationPropertyController.save`].p99
        let ipcsP99Tr = ipcsP99.toFixed(9)
    const ipcsMax = data.timers[`com.cats.server.controllers.InstallationPropertyController.save`].max
        let ipcsMaxTr = ipcsMax.toFixed(9)
    
    //Object Note Controller  
    const oncgonCount = data.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`].count
    const oncgonMean = data.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`].mean
        let oncgonMeanTr = oncgonMean.toFixed(9)
    const oncgonMin = data.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`].min
        let oncgonMinTr = oncgonMin.toFixed(9)
    const oncgonP50 = data.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`].p50
        let oncgonP50Tr = oncgonP50.toFixed(9)
    const oncgonP75 = data.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`].p75
        let oncgonP75Tr = oncgonP75.toFixed(9)
    const oncgonP95 = data.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`].p95
        let oncgonP95Tr = oncgonP95.toFixed(9)
    const oncgonP99 = data.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`].p99
        let oncgonP99Tr = oncgonP99.toFixed(9)
    const oncgonMax = data.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`].max
        let oncgonMaxTr = oncgonMax.toFixed(9)
    
    //Simple Rule Controller  
    const srcgbdCount = data.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`].count
    const srcgbdMean = data.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`].mean
        let srcgbdMeanTr = srcgbdMean.toFixed(9)
    const srcgbdMin = data.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`].min
        let srcgbdMinTr = srcgbdMin.toFixed(9)
    const srcgbdP50 = data.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`].p50
        let srcgbdP50Tr = srcgbdP50.toFixed(9)
    const srcgbdP75 = data.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`].p75
        let srcgbdP75Tr = srcgbdP75.toFixed(9)
    const srcgbdP95 = data.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`].p95
        let srcgbdP95Tr = srcgbdP95.toFixed(9)
    const srcgbdP99 = data.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`].p99
        let srcgbdP99Tr = srcgbdP99.toFixed(9)
    const srcgbdMax = data.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`].max
        let srcgbdMaxTr = srcgbdMax.toFixed(9)
    
    const srcgrsdCount = data.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`].count
    const srcgrsdMean = data.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`].mean
        let srcgrsdMeanTr = srcgrsdMean.toFixed(9)
    const srcgrsdMin = data.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`].min
        let srcgrsdMinTr = srcgrsdMin.toFixed(9)
    const srcgrsdP50 = data.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`].p50
        let srcgrsdP50Tr = srcgrsdP50.toFixed(9)
    const srcgrsdP75 = data.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`].p75
        let srcgrsdP75Tr = srcgrsdP75.toFixed(9)
    const srcgrsdP95 = data.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`].p95
        let srcgrsdP95Tr = srcgrsdP95.toFixed(9)
    const srcgrsdP99 = data.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`].p99
        let srcgrsdP99Tr = srcgrsdP99.toFixed(9)
    const srcgrsdMax = data.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`].max
        let srcgrsdMaxTr = srcgrsdMax.toFixed(9)
    
    const srcsCount = data.timers[`com.cats.server.controllers.SimpleRuleController.save`].count
    const srcsMean = data.timers[`com.cats.server.controllers.SimpleRuleController.save`].mean
        let srcsMeanTr = srcsMean.toFixed(9)
    const srcsMin = data.timers[`com.cats.server.controllers.SimpleRuleController.save`].min
        let srcsMinTr = srcsMin.toFixed(9)
    const srcsP50 = data.timers[`com.cats.server.controllers.SimpleRuleController.save`].p50
        let srcsP50Tr = srcsP50.toFixed(9)
    const srcsP75 = data.timers[`com.cats.server.controllers.SimpleRuleController.save`].p75
        let srcsP75Tr = srcsP75.toFixed(9)
    const srcsP95 = data.timers[`com.cats.server.controllers.SimpleRuleController.save`].p95
        let srcsP95Tr = srcsP95.toFixed(9)
    const srcsP99 = data.timers[`com.cats.server.controllers.SimpleRuleController.save`].p99
        let srcsP99Tr = srcsP99.toFixed(9)
    const srcsMax = data.timers[`com.cats.server.controllers.SimpleRuleController.save`].max
        let srcsMaxTr = srcsMax.toFixed(9)
    
    //Static Data Controller 
    const sdcgcCount = data.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`].count
    const sdcgcMean = data.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`].mean
        let sdcgcMeanTr = sdcgcMean.toFixed(9)
    const sdcgcMin = data.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`].min
        let sdcgcMinTr = sdcgcMin.toFixed(9)
    const sdcgcP50 = data.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`].p50
        let sdcgcP50Tr = sdcgcP50.toFixed(9)
    const sdcgcP75 = data.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`].p75
        let sdcgcP75Tr = sdcgcP75.toFixed(9)
    const sdcgcP95 = data.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`].p95
        let sdcgcP95Tr = sdcgcP95.toFixed(9)
    const sdcgcP99 = data.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`].p99
        let sdcgcP99Tr = sdcgcP99.toFixed(9)
    const sdcgcMax = data.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`].max
        let sdcgcMaxTr = sdcgcMax.toFixed(9)
    
    const sdcgipkCount = data.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`].count
    const sdcgipkMean = data.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`].mean
        let sdcgipkMeanTr = sdcgipkMean.toFixed(9)
    const sdcgipkMin = data.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`].min
        let sdcgipkMinTr = sdcgipkMin.toFixed(9)
    const sdcgipkP50 = data.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`].p50
        let sdcgipkP50Tr = sdcgipkP50.toFixed(9)
    const sdcgipkP75 = data.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`].p75
        let sdcgipkP75Tr = sdcgipkP75.toFixed(9)
    const sdcgipkP95 = data.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`].p95
        let sdcgipkP95Tr = sdcgipkP95.toFixed(9)
    const sdcgipkP99 = data.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`].p99
        let sdcgipkP99Tr = sdcgipkP99.toFixed(9)
    const sdcgipkMax = data.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`].max
        let sdcgipkMaxTr = sdcgipkMax.toFixed(9)
        
    const sdcgpCount = data.timers[`com.cats.server.controllers.StaticDataController.getPlace`].count
    const sdcgpMean = data.timers[`com.cats.server.controllers.StaticDataController.getPlace`].mean
        let sdcgpMeanTr = sdcgpMean.toFixed(9)
    const sdcgpMin = data.timers[`com.cats.server.controllers.StaticDataController.getPlace`].min
        let sdcgpMinTr = sdcgpMin.toFixed(9)
    const sdcgpP50 = data.timers[`com.cats.server.controllers.StaticDataController.getPlace`].p50
        let sdcgpP50Tr = sdcgpP50.toFixed(9)
    const sdcgpP75 = data.timers[`com.cats.server.controllers.StaticDataController.getPlace`].p75
        let sdcgpP75Tr = sdcgpP75.toFixed(9)
    const sdcgpP95 = data.timers[`com.cats.server.controllers.StaticDataController.getPlace`].p95
        let sdcgpP95Tr = sdcgpP95.toFixed(9)
    const sdcgpP99 = data.timers[`com.cats.server.controllers.StaticDataController.getPlace`].p99
        let sdcgpP99Tr = sdcgpP99.toFixed(9)
    const sdcgpMax = data.timers[`com.cats.server.controllers.StaticDataController.getPlace`].max
        let sdcgpMaxTr = sdcgpMax.toFixed(9)
    
    //System Exception Controller
    const secgetCount = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`].count
    const secgetMean = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`].mean
        let secgetMeanTr = secgetMean.toFixed(9)
    const secgetMin = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`].min
        let secgetMinTr = secgetMin.toFixed(9)
    const secgetP50 = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`].p50
        let secgetP50Tr = secgetP50.toFixed(9)
    const secgetP75 = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`].p75
        let secgetP75Tr = secgetP75.toFixed(9)
    const secgetP95 = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`].p95
        let secgetP95Tr = secgetP95.toFixed(9)
    const secgetP99 = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`].p99
        let secgetP99Tr = secgetP99.toFixed(9)
    const secgetMax = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`].max
        let secgetMaxTr = secgetMax.toFixed(9)

    const secgebicaCount = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`].count
    const secgebicaMean = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`].mean
        let secgebicaMeanTr = secgebicaMean.toFixed(9)
    const secgebicaMin = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`].min
        let secgebicaMinTr = secgebicaMin.toFixed(9)
    const secgebicaP50 = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`].p50
        let secgebicaP50Tr = secgebicaP50.toFixed(9)
    const secgebicaP75 = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`].p75
        let secgebicaP75Tr = secgebicaP75.toFixed(9)
    const secgebicaP95 = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`].p95
        let secgebicaP95Tr = secgebicaP95.toFixed(9)
    const secgebicaP99 = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`].p99
        let secgebicaP99Tr = secgebicaP99.toFixed(9)
    const secgebicaMax = data.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`].max
        let secgebicaMaxTr = secgebicaMax.toFixed(9)
    
    //User Controller
    const ucaarCount = data.timers[`com.cats.server.controllers.UserController.approveAccountRequest`].count
    const ucaarMean = data.timers[`com.cats.server.controllers.UserController.approveAccountRequest`].mean
        let ucaarMeanTr = ucaarMean.toFixed(9)
    const ucaarMin = data.timers[`com.cats.server.controllers.UserController.approveAccountRequest`].min
        let ucaarMinTr = ucaarMin.toFixed(9)
    const ucaarP50 = data.timers[`com.cats.server.controllers.UserController.approveAccountRequest`].p50
        let ucaarP50Tr = ucaarP50.toFixed(9)
    const ucaarP75 = data.timers[`com.cats.server.controllers.UserController.approveAccountRequest`].p75
        let ucaarP75Tr = ucaarP75.toFixed(9)
    const ucaarP95 = data.timers[`com.cats.server.controllers.UserController.approveAccountRequest`].p95
        let ucaarP95Tr = ucaarP95.toFixed(9)
    const ucaarP99 = data.timers[`com.cats.server.controllers.UserController.approveAccountRequest`].p99
        let ucaarP99Tr = ucaarP99.toFixed(9)
    const ucaarMax = data.timers[`com.cats.server.controllers.UserController.approveAccountRequest`].max
        let ucaarMaxTr = ucaarMax.toFixed(9)

    const ucaCount = data.timers[`com.cats.server.controllers.UserController.authenticate`].count
    const ucaMean = data.timers[`com.cats.server.controllers.UserController.authenticate`].mean
        let ucaMeanTr = ucaMean.toFixed(9)
    const ucaMin = data.timers[`com.cats.server.controllers.UserController.authenticate`].min
        let ucaMinTr = ucaMin.toFixed(9)
    const ucaP50 = data.timers[`com.cats.server.controllers.UserController.authenticate`].p50
        let ucaP50Tr = ucaP50.toFixed(9)
    const ucaP75 = data.timers[`com.cats.server.controllers.UserController.authenticate`].p75
        let ucaP75Tr = ucaP75.toFixed(9)
    const ucaP95 = data.timers[`com.cats.server.controllers.UserController.authenticate`].p95
        let ucaP95Tr = ucaP95.toFixed(9)
    const ucaP99 = data.timers[`com.cats.server.controllers.UserController.authenticate`].p99
        let ucaP99Tr = ucaP99.toFixed(9)
    const ucaMax = data.timers[`com.cats.server.controllers.UserController.authenticate`].max
        let ucaMaxTr = ucaMax.toFixed(9)
        
    const uccpCount = data.timers[`com.cats.server.controllers.UserController.changePassword`].count
    const uccpMean = data.timers[`com.cats.server.controllers.UserController.changePassword`].mean
        let uccpMeanTr = uccpMean.toFixed(9)
    const uccpMin = data.timers[`com.cats.server.controllers.UserController.changePassword`].min
        let uccpMinTr = uccpMin.toFixed(9)
    const uccpP50 = data.timers[`com.cats.server.controllers.UserController.changePassword`].p50
        let uccpP50Tr = uccpP50.toFixed(9)
    const uccpP75 = data.timers[`com.cats.server.controllers.UserController.changePassword`].p75
        let uccpP75Tr = uccpP75.toFixed(9)
    const uccpP95 = data.timers[`com.cats.server.controllers.UserController.changePassword`].p95
        let uccpP95Tr = uccpP95.toFixed(9)
    const uccpP99 = data.timers[`com.cats.server.controllers.UserController.changePassword`].p99
        let uccpP99Tr = uccpP99.toFixed(9)
    const uccpMax = data.timers[`com.cats.server.controllers.UserController.changePassword`].max
        let uccpMaxTr = uccpMax.toFixed(9)
        
    const ucchpCount = data.timers[`com.cats.server.controllers.UserController.checkPassword`].count
    const ucchpMean = data.timers[`com.cats.server.controllers.UserController.checkPassword`].mean
        let ucchpMeanTr = ucchpMean.toFixed(9)
    const ucchpMin = data.timers[`com.cats.server.controllers.UserController.checkPassword`].min
        let ucchpMinTr = ucchpMin.toFixed(9)
    const ucchpP50 = data.timers[`com.cats.server.controllers.UserController.checkPassword`].p50
        let ucchpP50Tr = ucchpP50.toFixed(9)
    const ucchpP75 = data.timers[`com.cats.server.controllers.UserController.checkPassword`].p75
        let ucchpP75Tr = ucchpP75.toFixed(9)
    const ucchpP95 = data.timers[`com.cats.server.controllers.UserController.checkPassword`].p95
        let ucchpP95Tr = ucchpP95.toFixed(9)
    const ucchpP99 = data.timers[`com.cats.server.controllers.UserController.checkPassword`].p99
        let ucchpP99Tr = ucchpP99.toFixed(9)
    const ucchpMax = data.timers[`com.cats.server.controllers.UserController.checkPassword`].max
        let ucchpMaxTr = ucchpMax.toFixed(9)
        
    const ucdaCount = data.timers[`com.cats.server.controllers.UserController.deactivateAccount`].count
    const ucdaMean = data.timers[`com.cats.server.controllers.UserController.deactivateAccount`].mean
        let ucdaMeanTr = ucdaMean.toFixed(9)
    const ucdaMin = data.timers[`com.cats.server.controllers.UserController.deactivateAccount`].min
        let ucdaMinTr = ucdaMin.toFixed(9)
    const ucdaP50 = data.timers[`com.cats.server.controllers.UserController.deactivateAccount`].p50
        let ucdaP50Tr = ucdaP50.toFixed(9)
    const ucdaP75 = data.timers[`com.cats.server.controllers.UserController.deactivateAccount`].p75
        let ucdaP75Tr = ucdaP75.toFixed(9)
    const ucdaP95 = data.timers[`com.cats.server.controllers.UserController.deactivateAccount`].p95
        let ucdaP95Tr = ucdaP95.toFixed(9)
    const ucdaP99 = data.timers[`com.cats.server.controllers.UserController.deactivateAccount`].p99
        let ucdaP99Tr = ucdaP99.toFixed(9)
    const ucdaMax = data.timers[`com.cats.server.controllers.UserController.deactivateAccount`].max
        let ucdaMaxTr = ucdaMax.toFixed(9)

    const ucfpCount = data.timers[`com.cats.server.controllers.UserController.forgottenPassword`].count
    const ucfpMean = data.timers[`com.cats.server.controllers.UserController.forgottenPassword`].mean
        let ucfpMeanTr = ucfpMean.toFixed(9)
    const ucfpMin = data.timers[`com.cats.server.controllers.UserController.forgottenPassword`].min
        let ucfpMinTr = ucfpMin.toFixed(9)
    const ucfpP50 = data.timers[`com.cats.server.controllers.UserController.forgottenPassword`].p50
        let ucfpP50Tr = ucfpP50.toFixed(9)
    const ucfpP75 = data.timers[`com.cats.server.controllers.UserController.forgottenPassword`].p75
        let ucfpP75Tr = ucfpP75.toFixed(9)
    const ucfpP95 = data.timers[`com.cats.server.controllers.UserController.forgottenPassword`].p95
        let ucfpP95Tr = ucfpP95.toFixed(9)
    const ucfpP99 = data.timers[`com.cats.server.controllers.UserController.forgottenPassword`].p99
        let ucfpP99Tr = ucfpP99.toFixed(9)
    const ucfpMax = data.timers[`com.cats.server.controllers.UserController.forgottenPassword`].max
        let ucfpMaxTr = ucfpMax.toFixed(9)
        
    const ucgiCount = data.timers[`com.cats.server.controllers.UserController.getImage`].count
    const ucgiMean = data.timers[`com.cats.server.controllers.UserController.getImage`].mean
        let ucgiMeanTr = ucgiMean.toFixed(9)
    const ucgiMin = data.timers[`com.cats.server.controllers.UserController.getImage`].min
        let ucgiMinTr = ucgiMin.toFixed(9)
    const ucgiP50 = data.timers[`com.cats.server.controllers.UserController.getImage`].p50
        let ucgiP50Tr = ucgiP50.toFixed(9)
    const ucgiP75 = data.timers[`com.cats.server.controllers.UserController.getImage`].p75
        let ucgiP75Tr = ucgiP75.toFixed(9)
    const ucgiP95 = data.timers[`com.cats.server.controllers.UserController.getImage`].p95
        let ucgiP95Tr = ucgiP95.toFixed(9)
    const ucgiP99 = data.timers[`com.cats.server.controllers.UserController.getImage`].p99
        let ucgiP99Tr = ucgiP99.toFixed(9)
    const ucgiMax = data.timers[`com.cats.server.controllers.UserController.getImage`].max
        let ucgiMaxTr = ucgiMax.toFixed(9)
        
    const ucgifCount = data.timers[`com.cats.server.controllers.UserController.getImageForm`].count
    const ucgifMean = data.timers[`com.cats.server.controllers.UserController.getImageForm`].mean
        let ucgifMeanTr = ucgifMean.toFixed(9)
    const ucgifMin = data.timers[`com.cats.server.controllers.UserController.getImageForm`].min
        let ucgifMinTr = ucgifMin.toFixed(9)
    const ucgifP50 = data.timers[`com.cats.server.controllers.UserController.getImageForm`].p50
        let ucgifP50Tr = ucgifP50.toFixed(9)
    const ucgifP75 = data.timers[`com.cats.server.controllers.UserController.getImageForm`].p75
        let ucgifP75Tr = ucgifP75.toFixed(9)
    const ucgifP95 = data.timers[`com.cats.server.controllers.UserController.getImageForm`].p95
        let ucgifP95Tr = ucgifP95.toFixed(9)
    const ucgifP99 = data.timers[`com.cats.server.controllers.UserController.getImageForm`].p99
        let ucgifP99Tr = ucgifP99.toFixed(9)
    const ucgifMax = data.timers[`com.cats.server.controllers.UserController.getImageForm`].max
        let ucgifMaxTr = ucgifMax.toFixed(9)
        
    const ucgmuaCount = data.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`].count
    const ucgmuaMean = data.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`].mean
        let ucgmuaMeanTr = ucgmuaMean.toFixed(9)
    const ucgmuaMin = data.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`].min
        let ucgmuaMinTr = ucgmuaMin.toFixed(9)
    const ucgmuaP50 = data.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`].p50
        let ucgmuaP50Tr = ucgmuaP50.toFixed(9)
    const ucgmuaP75 = data.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`].p75
        let ucgmuaP75Tr = ucgmuaP75.toFixed(9)
    const ucgmuaP95 = data.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`].p95
        let ucgmuaP95Tr = ucgmuaP95.toFixed(9)
    const ucgmuaP99 = data.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`].p99
        let ucgmuaP99Tr = ucgmuaP99.toFixed(9)
    const ucgmuaMax = data.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`].max
        let ucgmuaMaxTr = ucgmuaMax.toFixed(9)
        
    const ucgsdCount = data.timers[`com.cats.server.controllers.UserController.getSystemDate`].count
    const ucgsdMean = data.timers[`com.cats.server.controllers.UserController.getSystemDate`].mean
        let ucgsdMeanTr = ucgsdMean.toFixed(9)
    const ucgsdMin = data.timers[`com.cats.server.controllers.UserController.getSystemDate`].min
        let ucgsdMinTr = ucgsdMin.toFixed(9)
    const ucgsdP50 = data.timers[`com.cats.server.controllers.UserController.getSystemDate`].p50
        let ucgsdP50Tr = ucgsdP50.toFixed(9)
    const ucgsdP75 = data.timers[`com.cats.server.controllers.UserController.getSystemDate`].p75
        let ucgsdP75Tr = ucgsdP75.toFixed(9)
    const ucgsdP95 = data.timers[`com.cats.server.controllers.UserController.getSystemDate`].p95
        let ucgsdP95Tr = ucgsdP95.toFixed(9)
    const ucgsdP99 = data.timers[`com.cats.server.controllers.UserController.getSystemDate`].p99
        let ucgsdP99Tr = ucgsdP99.toFixed(9)
    const ucgsdMax = data.timers[`com.cats.server.controllers.UserController.getSystemDate`].max
        let ucgsdMaxTr = ucgsdMax.toFixed(9)
    
    const uciaCount = data.timers[`com.cats.server.controllers.UserController.isAuthenticated`].count
    const uciaMean = data.timers[`com.cats.server.controllers.UserController.isAuthenticated`].mean
        let uciaMeanTr = uciaMean.toFixed(9)
    const uciaMin = data.timers[`com.cats.server.controllers.UserController.isAuthenticated`].min
        let uciaMinTr = uciaMin.toFixed(9)
    const uciaP50 = data.timers[`com.cats.server.controllers.UserController.isAuthenticated`].p50
        let uciaP50Tr = uciaP50.toFixed(9)
    const uciaP75 = data.timers[`com.cats.server.controllers.UserController.isAuthenticated`].p75
        let uciaP75Tr = uciaP75.toFixed(9)
    const uciaP95 = data.timers[`com.cats.server.controllers.UserController.isAuthenticated`].p95
        let uciaP95Tr = uciaP95.toFixed(9)
    const uciaP99 = data.timers[`com.cats.server.controllers.UserController.isAuthenticated`].p99
        let uciaP99Tr = uciaP99.toFixed(9)
    const uciaMax = data.timers[`com.cats.server.controllers.UserController.isAuthenticated`].max
        let uciaMaxTr = uciaMax.toFixed(9)    
    
    const uciuaCount = data.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`].count
    const uciuaMean = data.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`].mean
        let uciuaMeanTr = uciuaMean.toFixed(9)
    const uciuaMin = data.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`].min
        let uciuaMinTr = uciuaMin.toFixed(9)
    const uciuaP50 = data.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`].p50
        let uciuaP50Tr = uciuaP50.toFixed(9)
    const uciuaP75 = data.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`].p75
        let uciuaP75Tr = uciuaP75.toFixed(9)
    const uciuaP95 = data.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`].p95
        let uciuaP95Tr = uciuaP95.toFixed(9)
    const uciuaP99 = data.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`].p99
        let uciuaP99Tr = uciuaP99.toFixed(9)
    const uciuaMax = data.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`].max
        let uciuaMaxTr = uciuaMax.toFixed(9)
    
    const ucraCount = data.timers[`com.cats.server.controllers.UserController.reactivateAccount`].count
    const ucraMean = data.timers[`com.cats.server.controllers.UserController.reactivateAccount`].mean
        let ucraMeanTr = ucraMean.toFixed(9)
    const ucraMin = data.timers[`com.cats.server.controllers.UserController.reactivateAccount`].min
        let ucraMinTr = ucraMin.toFixed(9)
    const ucraP50 = data.timers[`com.cats.server.controllers.UserController.reactivateAccount`].p50
        let ucraP50Tr = ucraP50.toFixed(9)
    const ucraP75 = data.timers[`com.cats.server.controllers.UserController.reactivateAccount`].p75
        let ucraP75Tr = ucraP75.toFixed(9)
    const ucraP95 = data.timers[`com.cats.server.controllers.UserController.reactivateAccount`].p95
        let ucraP95Tr = ucraP95.toFixed(9)
    const ucraP99 = data.timers[`com.cats.server.controllers.UserController.reactivateAccount`].p99
        let ucraP99Tr = ucraP99.toFixed(9)
    const ucraMax = data.timers[`com.cats.server.controllers.UserController.reactivateAccount`].max
        let ucraMaxTr = ucraMax.toFixed(9)
    
    const ucrarCount = data.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`].count
    const ucrarMean = data.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`].mean
        let ucrarMeanTr = ucrarMean.toFixed(9)
    const ucrarMin = data.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`].min
        let ucrarMinTr = ucrarMin.toFixed(9)
    const ucrarP50 = data.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`].p50
        let ucrarP50Tr = ucrarP50.toFixed(9)
    const ucrarP75 = data.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`].p75
        let ucrarP75Tr = ucrarP75.toFixed(9)
    const ucrarP95 = data.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`].p95
        let ucrarP95Tr = ucrarP95.toFixed(9)
    const ucrarP99 = data.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`].p99
        let ucrarP99Tr = ucrarP99.toFixed(9)
    const ucrarMax = data.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`].max
        let ucrarMaxTr = ucrarMax.toFixed(9)

    const ucrqaCount = data.timers[`com.cats.server.controllers.UserController.requestAccount`].count
    const ucrqaMean = data.timers[`com.cats.server.controllers.UserController.requestAccount`].mean
        let ucrqaMeanTr = ucrqaMean.toFixed(9)
    const ucrqaMin = data.timers[`com.cats.server.controllers.UserController.requestAccount`].min
        let ucrqaMinTr = ucrqaMin.toFixed(9)
    const ucrqaP50 = data.timers[`com.cats.server.controllers.UserController.requestAccount`].p50
        let ucrqaP50Tr = ucrqaP50.toFixed(9)
    const ucrqaP75 = data.timers[`com.cats.server.controllers.UserController.requestAccount`].p75
        let ucrqaP75Tr = ucrqaP75.toFixed(9)
    const ucrqaP95 = data.timers[`com.cats.server.controllers.UserController.requestAccount`].p95
        let ucrqaP95Tr = ucrqaP95.toFixed(9)
    const ucrqaP99 = data.timers[`com.cats.server.controllers.UserController.requestAccount`].p99
        let ucrqaP99Tr = ucrqaP99.toFixed(9)
    const ucrqaMax = data.timers[`com.cats.server.controllers.UserController.requestAccount`].max
        let ucrqaMaxTr = ucrqaMax.toFixed(9)

    const ucrpCount = data.timers[`com.cats.server.controllers.UserController.resetPassword`].count
    const ucrpMean = data.timers[`com.cats.server.controllers.UserController.resetPassword`].mean
        let ucrpMeanTr = ucrpMean.toFixed(9)
    const ucrpMin = data.timers[`com.cats.server.controllers.UserController.resetPassword`].min
        let ucrpMinTr = ucrpMin.toFixed(9)
    const ucrpP50 = data.timers[`com.cats.server.controllers.UserController.resetPassword`].p50
        let ucrpP50Tr = ucrpP50.toFixed(9)
    const ucrpP75 = data.timers[`com.cats.server.controllers.UserController.resetPassword`].p75
        let ucrpP75Tr = ucrpP75.toFixed(9)
    const ucrpP95 = data.timers[`com.cats.server.controllers.UserController.resetPassword`].p95
        let ucrpP95Tr = ucrpP95.toFixed(9)
    const ucrpP99 = data.timers[`com.cats.server.controllers.UserController.resetPassword`].p99
        let ucrpP99Tr = ucrpP99.toFixed(9)
    const ucrpMax = data.timers[`com.cats.server.controllers.UserController.resetPassword`].max
        let ucrpMaxTr = ucrpMax.toFixed(9)
    
    const ucsarCount = data.timers[`com.cats.server.controllers.UserController.searchAccountRequest`].count
    const ucsarMean = data.timers[`com.cats.server.controllers.UserController.searchAccountRequest`].mean
        let ucsarMeanTr = ucsarMean.toFixed(9)
    const ucsarMin = data.timers[`com.cats.server.controllers.UserController.searchAccountRequest`].min
        let ucsarMinTr = ucsarMin.toFixed(9)
    const ucsarP50 = data.timers[`com.cats.server.controllers.UserController.searchAccountRequest`].p50
        let ucsarP50Tr = ucsarP50.toFixed(9)
    const ucsarP75 = data.timers[`com.cats.server.controllers.UserController.searchAccountRequest`].p75
        let ucsarP75Tr = ucsarP75.toFixed(9)
    const ucsarP95 = data.timers[`com.cats.server.controllers.UserController.searchAccountRequest`].p95
        let ucsarP95Tr = ucsarP95.toFixed(9)
    const ucsarP99 = data.timers[`com.cats.server.controllers.UserController.searchAccountRequest`].p99
        let ucsarP99Tr = ucsarP99.toFixed(9)
    const ucsarMax = data.timers[`com.cats.server.controllers.UserController.searchAccountRequest`].max
        let ucsarMaxTr = ucsarMax.toFixed(9)

    const ucsarcCount = data.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`].count
    const ucsarcMean = data.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`].mean
        let ucsarcMeanTr = ucsarcMean.toFixed(9)
    const ucsarcMin = data.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`].min
        let ucsarcMinTr = ucsarcMin.toFixed(9)
    const ucsarcP50 = data.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`].p50
        let ucsarcP50Tr = ucsarcP50.toFixed(9)
    const ucsarcP75 = data.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`].p75
        let ucsarcP75Tr = ucsarcP75.toFixed(9)
    const ucsarcP95 = data.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`].p95
        let ucsarcP95Tr = ucsarcP95.toFixed(9)
    const ucsarcP99 = data.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`].p99
        let ucsarcP99Tr = ucsarcP99.toFixed(9)
    const ucsarcMax = data.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`].max
        let ucsarcMaxTr = ucsarcMax.toFixed(9)

    const ucsaacCount = data.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`].count
    const ucsaacMean = data.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`].mean
        let ucsaacMeanTr = ucsaacMean.toFixed(9)
    const ucsaacMin = data.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`].min
        let ucsaacMinTr = ucsaacMin.toFixed(9)
    const ucsaacP50 = data.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`].p50
        let ucsaacP50Tr = ucsaacP50.toFixed(9)
    const ucsaacP75 = data.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`].p75
        let ucsaacP75Tr = ucsaacP75.toFixed(9)
    const ucsaacP95 = data.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`].p95
        let ucsaacP95Tr = ucsaacP95.toFixed(9)
    const ucsaacP99 = data.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`].p99
        let ucsaacP99Tr = ucsaacP99.toFixed(9)
    const ucsaacMax = data.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`].max
        let ucsaacMaxTr = ucsaacMax.toFixed(9)

    const ucsaaCount = data.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`].count
    const ucsaaMean = data.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`].mean
        let ucsaaMeanTr = ucsaaMean.toFixed(9)
    const ucsaaMin = data.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`].min
        let ucsaaMinTr = ucsaaMin.toFixed(9)
    const ucsaaP50 = data.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`].p50
        let ucsaaP50Tr = ucsaaP50.toFixed(9)
    const ucsaaP75 = data.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`].p75
        let ucsaaP75Tr = ucsaaP75.toFixed(9)
    const ucsaaP95 = data.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`].p95
        let ucsaaP95Tr = ucsaaP95.toFixed(9)
    const ucsaaP99 = data.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`].p99
        let ucsaaP99Tr = ucsaaP99.toFixed(9)
    const ucsaaMax = data.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`].max
        let ucsaaMaxTr = ucsaaMax.toFixed(9)

    const ucsdacCount = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`].count
    const ucsdacMean = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`].mean
        let ucsdacMeanTr = ucsdacMean.toFixed(9)
    const ucsdacMin = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`].min
        let ucsdacMinTr = ucsdacMin.toFixed(9)
    const ucsdacP50 = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`].p50
        let ucsdacP50Tr = ucsdacP50.toFixed(9)
    const ucsdacP75 = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`].p75
        let ucsdacP75Tr = ucsdacP75.toFixed(9)
    const ucsdacP95 = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`].p95
        let ucsdacP95Tr = ucsdacP95.toFixed(9)
    const ucsdacP99 = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`].p99
        let ucsdacP99Tr = ucsdacP99.toFixed(9)
    const ucsdacMax = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`].max
        let ucsdacMaxTr = ucsdacMax.toFixed(9)
    
    const ucsdaCount = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`].count
    const ucsdaMean = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`].mean
        let ucsdaMeanTr = ucsdaMean.toFixed(9)
    const ucsdaMin = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`].min
        let ucsdaMinTr = ucsdaMin.toFixed(9)
    const ucsdaP50 = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`].p50
        let ucsdaP50Tr = ucsdaP50.toFixed(9)
    const ucsdaP75 = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`].p75
        let ucsdaP75Tr = ucsdaP75.toFixed(9)
    const ucsdaP95 = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`].p95
        let ucsdaP95Tr = ucsdaP95.toFixed(9)
    const ucsdaP99 = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`].p99
        let ucsdaP99Tr = ucsdaP99.toFixed(9)
    const ucsdaMax = data.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`].max
        let ucsdaMaxTr = ucsdaMax.toFixed(9)

    const ucuuCount = data.timers[`com.cats.server.controllers.UserController.updateUser`].count
    const ucuuMean = data.timers[`com.cats.server.controllers.UserController.updateUser`].mean
        let ucuuMeanTr = ucuuMean.toFixed(9)
    const ucuuMin = data.timers[`com.cats.server.controllers.UserController.updateUser`].min
        let ucuuMinTr = ucuuMin.toFixed(9)
    const ucuuP50 = data.timers[`com.cats.server.controllers.UserController.updateUser`].p50
        let ucuuP50Tr = ucuuP50.toFixed(9)
    const ucuuP75 = data.timers[`com.cats.server.controllers.UserController.updateUser`].p75
        let ucuuP75Tr = ucuuP75.toFixed(9)
    const ucuuP95 = data.timers[`com.cats.server.controllers.UserController.updateUser`].p95
        let ucuuP95Tr = ucuuP95.toFixed(9)
    const ucuuP99 = data.timers[`com.cats.server.controllers.UserController.updateUser`].p99
        let ucuuP99Tr = ucuuP99.toFixed(9)
    const ucuuMax = data.timers[`com.cats.server.controllers.UserController.updateUser`].max
        let ucuuMaxTr = ucuuMax.toFixed(9)
    
    const ucuiCount = data.timers[`com.cats.server.controllers.UserController.uploadImage`].count
    const ucuiMean = data.timers[`com.cats.server.controllers.UserController.uploadImage`].mean
        let ucuiMeanTr = ucuiMean.toFixed(9)
    const ucuiMin = data.timers[`com.cats.server.controllers.UserController.uploadImage`].min
        let ucuiMinTr = ucuiMin.toFixed(9)
    const ucuiP50 = data.timers[`com.cats.server.controllers.UserController.uploadImage`].p50
        let ucuiP50Tr = ucuiP50.toFixed(9)
    const ucuiP75 = data.timers[`com.cats.server.controllers.UserController.uploadImage`].p75
        let ucuiP75Tr = ucuiP75.toFixed(9)
    const ucuiP95 = data.timers[`com.cats.server.controllers.UserController.uploadImage`].p95
        let ucuiP95Tr = ucuiP95.toFixed(9)
    const ucuiP99 = data.timers[`com.cats.server.controllers.UserController.uploadImage`].p99
        let ucuiP99Tr = ucuiP99.toFixed(9)
    const ucuiMax = data.timers[`com.cats.server.controllers.UserController.uploadImage`].max
        let ucuiMaxTr = ucuiMax.toFixed(9)
    
    //User Event Controller
    const ueccCount = data.timers[`com.cats.server.controllers.UserEventController.count`].count
    const ueccMean = data.timers[`com.cats.server.controllers.UserEventController.count`].mean
        let ueccMeanTr = ueccMean.toFixed(9)
    const ueccMin = data.timers[`com.cats.server.controllers.UserEventController.count`].min
        let ueccMinTr = ueccMin.toFixed(9)
    const ueccP50 = data.timers[`com.cats.server.controllers.UserEventController.count`].p50
        let ueccP50Tr = ueccP50.toFixed(9)
    const ueccP75 = data.timers[`com.cats.server.controllers.UserEventController.count`].p75
        let ueccP75Tr = ueccP75.toFixed(9)
    const ueccP95 = data.timers[`com.cats.server.controllers.UserEventController.count`].p95
        let ueccP95Tr = ueccP95.toFixed(9)
    const ueccP99 = data.timers[`com.cats.server.controllers.UserEventController.count`].p99
        let ueccP99Tr = ueccP99.toFixed(9)
    const ueccMax = data.timers[`com.cats.server.controllers.UserEventController.count`].max
        let ueccMaxTr = ueccMax.toFixed(9)
            
    const uecsCount = data.timers[`com.cats.server.controllers.UserEventController.search`].count
    const uecsMean = data.timers[`com.cats.server.controllers.UserEventController.search`].mean
        let uecsMeanTr = uecsMean.toFixed(9)
    const uecsMin = data.timers[`com.cats.server.controllers.UserEventController.search`].min
        let uecsMinTr = uecsMin.toFixed(9)
    const uecsP50 = data.timers[`com.cats.server.controllers.UserEventController.search`].p50
        let uecsP50Tr = uecsP50.toFixed(9)
    const uecsP75 = data.timers[`com.cats.server.controllers.UserEventController.search`].p75
        let uecsP75Tr = uecsP75.toFixed(9)
    const uecsP95 = data.timers[`com.cats.server.controllers.UserEventController.search`].p95
        let uecsP95Tr = uecsP95.toFixed(9)
    const uecsP99 = data.timers[`com.cats.server.controllers.UserEventController.search`].p99
        let uecsP99Tr = uecsP99.toFixed(9)
    const uecsMax = data.timers[`com.cats.server.controllers.UserEventController.search`].max
        let uecsMaxTr = uecsMax.toFixed(9)
    
    //Version Controller
    const vcgvCount = data.timers[`com.cats.server.controllers.VersionController.getVersion`].count
    const vcgvMean = data.timers[`com.cats.server.controllers.VersionController.getVersion`].mean
        let vcgvMeanTr = vcgvMean.toFixed(9)
    const vcgvMin = data.timers[`com.cats.server.controllers.VersionController.getVersion`].min
        let vcgvMinTr = vcgvMin.toFixed(9)
    const vcgvP50 = data.timers[`com.cats.server.controllers.VersionController.getVersion`].p50
        let vcgvP50Tr = vcgvP50.toFixed(9)
    const vcgvP75 = data.timers[`com.cats.server.controllers.VersionController.getVersion`].p75
        let vcgvP75Tr = vcgvP75.toFixed(9)
    const vcgvP95 = data.timers[`com.cats.server.controllers.VersionController.getVersion`].p95
        let vcgvP95Tr = vcgvP95.toFixed(9)
    const vcgvP99 = data.timers[`com.cats.server.controllers.VersionController.getVersion`].p99
        let vcgvP99Tr = vcgvP99.toFixed(9)
    const vcgvMax = data.timers[`com.cats.server.controllers.VersionController.getVersion`].max
        let vcgvMaxTr = vcgvMax.toFixed(9)
    
    //Instrumented Filter
    const ifrCount = data.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`].count
    const ifrMean = data.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`].mean
        let ifrMeanTr = ifrMean.toFixed(9)
    const ifrMin = data.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`].min
        let ifrMinTr = ifrMin.toFixed(9)
    const ifrP50 = data.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`].p50
        let ifrP50Tr = ifrP50.toFixed(9)
    const ifrP75 = data.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`].p75
        let ifrP75Tr = ifrP75.toFixed(9)
    const ifrP95 = data.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`].p95
        let ifrP95Tr = ifrP95.toFixed(9)
    const ifrP99 = data.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`].p99
        let ifrP99Tr = ifrP99.toFixed(9)
    const ifrMax = data.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`].max
        let ifrMaxTr = ifrMax.toFixed(9)
    
    useEffect(() => {
        setMemory(memoryDiff)
        setHeapMemory(heapMemoryDiff)
        setNonHeapMemory(nonHeapMemoryDiff)
        setRunnableThread(runnableDiff)
        setTimedWaitingThread(timedWaitingDiff)
        setWaitingThread(waitingDiff)
        setBlockedThread(blockedDiff)
    }, [])

    return (
        <>
            <Meta title="Metrics" />
            <Header title="Application Metrics" subTitle=""/>
            {   !data ?
                <Error />
                :
                <>
                    <div className="flex flex-col lg:flex-row justify-around mb-12">
                        <div className="w-full flex flex-col">
                            <h1 className="text-2xl pb-2">JVM Metrics</h1>
                            <h2 className="text-xl">Memory</h2>
                            <p className="text-sm mt-3">Total Memory ({usedMemory}M / {maxMemory}M)</p>
                            <div className="w-full lg:w-3/4">
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
                            <div className="w-full lg:w-3/4">
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
                            <div className="w-full lg:w-3/4">
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
                    <h1 className="text-2xl">HTTP requests (events per second)</h1>
                    <p className="text-sm mt-2">Active Requests: {activeRequests} - Total Requests: {totalRequests}</p>
                    <div className="overflow-auto max-w-full">
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
                    </div>
                    <h1 className="text-2xl mt-10 mb-5">Services statistics (time in millisecond)</h1>
                    <div className="h-screen max-w-full overflow-auto">
                        <table className="min-w-full divide-y divide-gray-200 shadow-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                    Service Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        Count
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        Mean
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        Min
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        p50
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        p75
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        p95
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        p99
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                        Max
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-xs">
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Account Controller - Create New Party Account</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpaCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpaMeanTr > 0 ? accnpaMeanTr : accnpaMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpaMinTr > 0 ? accnpaMinTr : accnpaMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpaP50Tr > 0 ? accnpaP50Tr : accnpaP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpaP75Tr > 0 ? accnpaP75Tr : accnpaP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpaP95Tr > 0 ? accnpaP95Tr : accnpaP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpaP99Tr > 0 ? accnpaP99Tr : accnpaP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpaMaxTr > 0 ? accnpaMaxTr : accnpaMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Account Controller - Create New Party Communication</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpcCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpcMeanTr > 0 ? accnpcMean : accnpcMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpcMinTr > 0 ? accnpcMinTr : accnpcMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpcP50Tr > 0 ? accnpcP50tr : accnpcP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpcP75Tr > 0 ? accnpcP75Tr : accnpcP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpcP95Tr > 0 ? accnpcP95Tr : accnpcP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpcP99Tr > 0 ? accnpcP99Tr : accnpcP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpcMaxTr > 0 ? accnpcMaxTr : accnpcMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Account Controller - Create New Party X Ref</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpxrCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpxrMeanTr > 0 ? accnpxrMeanTr : accnpxrMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpxrMinTr > 0 ? accnpxrMinTr : accnpxrMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpxrP50Tr > 0 ? accnpxrP50Tr : accnpxrP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpxrP75Tr > 0 ? accnpxrP75Tr : accnpxrP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpxrP95Tr > 0 ? accnpxrP95Tr : accnpxrP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpxrP99Tr > 0 ? accnpxrP99Tr : accnpxrP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accnpxrMaxTr > 0 ? accnpxrMaxTr : accnpxrMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Account Controller - Get Accounts</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaMeanTr > 0 ? acgaMeanTr : acgaMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaMinTr > 0 ? acgaMinTr : acgaMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaP50Tr > 0 ? acgaP50Tr : acgaP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaP75Tr > 0 ? acgaP75Tr : acgaP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaP95Tr > 0 ? acgaP95Tr : acgaP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaP99Tr > 0 ? acgaP99Tr : acgaP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaMaxTr > 0 ? acgaMaxTr : acgaMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Account Controller - Get Allowed Counter Parties</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgacpCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgacpMeanTr > 0 ? acgacpMeanTr : acgacpMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgacpMinTr > 0 ? acgacpMinTr : acgacpMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgacpP50Tr > 0 ? acgacpP50Tr : acgacpP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgacpP75Tr > 0 ? acgacpP75Tr : acgacpP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgacpP95Tr > 0 ? acgacpP95Tr : acgacpP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgacpP99Tr > 0 ? acgacpP99Tr : acgacpP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgacpMaxTr > 0 ? acgacpMaxTr : acgacpMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Account Controller - Get Allowed Owners</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaoCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaoMeanTr > 0 ? acgaoMeanTr : acgaoMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaoMinTr > 0 ? acgaoMinTr : acgaoMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaoP50Tr > 0 ? acgaoP50Tr : acgaoP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaoP75Tr > 0 ? acgaoP75Tr : acgaoP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaoP95Tr > 0 ? acgaoP95Tr : acgaoP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaoP99Tr > 0 ? acgaoP99Tr : acgaoP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgaoMaxTr > 0 ? acgaoMaxTr : acgaoMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Account Controller - Get Current Entity</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgceCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgceMeanTr > 0 ? acgceMeanTr : acgceMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgceMinTr > 0 ? acgceMinTr : acgceMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgceP50Tr > 0 ? acgceP50Tr : acgceP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgceP75Tr > 0 ? acgceP75Tr : acgceP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgceP95Tr > 0 ? acgceP95Tr : acgceP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgceP99Tr > 0 ? acgceP99Tr : acgceP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgceMaxTr > 0 ? acgceMaxTr : acgceMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Account Controller - Get Current Region</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgcrCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgcrMeanTr > 0 ? acgcrMeanTr : acgcrMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgcrMinTr > 0 ? acgcrMinTr : acgcrMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgcrP50Tr > 0 ? acgcrP50Tr : acgcrP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgcrP75Tr > 0 ? acgcrP75Tr : acgcrP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgcrP95Tr > 0 ? acgcrP95Tr : acgcrP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgcrP99Tr > 0 ? acgcrP99Tr : acgcrP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgcrMaxTr > 0 ? acgcrMaxTr : acgcrMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Account Controller - Get Entities</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgeCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgeMeanTr > 0 ? acgeMeanTr : acgeMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgeMinTr > 0 ? acgeMinTr : acgeMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgeP50Tr > 0 ? acgeP50Tr : acgeP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgeP75Tr > 0 ? acgeP75Tr : acgeP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgeP95Tr > 0 ? acgeP95Tr : acgeP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgeP99Tr > 0 ? acgeP99Tr : acgeP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgeMaxTr > 0 ? acgeMaxTr : acgeMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Account Controller - Get Regions</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgrCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgrMeanTr > 0 ? acgrMeanTr : acgrMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgrMinTr > 0 ? acgrMinTr : acgrMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgrP50Tr > 0 ? acgrP50Tr : acgrP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgrP75Tr > 0 ? acgrP75Tr : acgrP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgrP95Tr > 0 ? acgrP95Tr : acgrP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgrP99Tr > 0 ? acgrP99Tr : acgrP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acgrMaxTr > 0 ? acgrMaxTr : acgrMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Audit Controller - Create Session</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accsCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accsMeanTr > 0 ? accsMeanTr : accsMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accsMinTr > 0 ? accsMinTr : accsMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accsP50Tr > 0 ? accsP50Tr : accsP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accsP75Tr > 0 ? accsP75Tr : accsP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accsP95Tr > 0 ? accsP95Tr : accsP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accsP99Tr > 0 ? accsP99Tr : accsP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{accsMaxTr > 0 ? accsMaxTr  : accsMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Audit Controller - Update Session</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acusCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acusMeanTr > 0 ? acusMeanTr : acusMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acusMinTr > 0 ? acusMinTr : acusMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acusP50Tr > 0 ? acusP50Tr : acusP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acusP75Tr > 0 ? acusP75Tr : acusP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acusP95Tr > 0 ? acusP95Tr : acusP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acusP99Tr > 0 ? acusP99Tr : acusP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{acusMaxTr > 0 ? acusMaxTr : acusMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Bookmark Controller - Add or Remove Bookmark</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bcaorbCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bcaorbMeanTr > 0 ? bcaorbMeanTr : bcaorbMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bcaorbMinTr > 0 ? bcaorbMinTr : bcaorbMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bcaorbP50Tr > 0 ? bcaorbP50Tr : bcaorbP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bcaorbP75Tr > 0 ? bcaorbP75Tr : bcaorbP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bcaorbP95Tr > 0 ? bcaorbP95Tr : bcaorbP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bcaorbP99Tr > 0 ? bcaorbP99Tr : bcaorbP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bcaorbMaxTr > 0 ? bcaorbMaxTr : bcaorbMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Bookmark Controller - Create Session</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bccsCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bccsMeanTr > 0 ? bccsMeanTr : bccsMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bccsMinTr > 0 ? bccsMinTr : bccsMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bccsP50Tr > 0 ? bccsP50Tr : bccsP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bccsP75Tr > 0 ? bccsP75Tr : bccsP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bccsP95Tr > 0 ? bccsP95Tr : bccsP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bccsP99Tr > 0 ? bccsP99Tr : bccsP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{bccsMaxTr > 0 ? bccsMaxTr : bccsMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Corp Action Controller - Get Event</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgeCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgeMeanTr > 0 ? cacgeMeanTr : cacgeMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgeMinTr > 0 ? cacgeMinTr : cacgeMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgeP50Tr > 0 ? cacgeP50Tr : cacgeP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgeP75Tr > 0 ? cacgeP75Tr : cacgeP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgeP95Tr > 0 ? cacgeP95Tr : cacgeP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgeP99Tr > 0 ? cacgeP99Tr : cacgeP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgeMaxTr > 0 ? cacgeMaxTr : cacgeMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Corp Action Controller - Get Event Row Count</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgercCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgercMeanTr > 0 ? cacgercMeanTr : cacgercMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgercMinTr > 0 ? cacgercMinTr : cacgercMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgercP50Tr > 0 ? cacgercP50Tr : cacgercP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgercP75Tr > 0 ? cacgercP75Tr : cacgercP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgercP95Tr > 0 ? cacgercP95Tr : cacgercP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgercP99Tr > 0 ? cacgercP99Tr : cacgercP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgercMaxTr > 0 ? cacgercMaxTr : cacgercMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Corp Action Controller - Get Events</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgesCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgesMeanTr > 0 ? cacgesMeanTr : cacgesMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgesMinTr > 0 ? cacgesMinTr : cacgesMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgesP50Tr > 0 ? cacgesP50Tr : cacgesP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgesP75Tr > 0 ? cacgesP75Tr : cacgesP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgesP95Tr > 0 ? cacgesP95Tr : cacgesP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgesP99Tr > 0 ? cacgesP99Tr : cacgesP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgesMaxTr > 0 ? cacgesMaxTr : cacgesMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Corp Action Controller - Get Type Groups</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgtgCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgtgMeanTr > 0 ? cacgtgMeanTr : cacgtgMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgtgMinTr > 0 ? cacgtgMinTr : cacgtgMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgtgP50Tr > 0 ? cacgtgP50Tr : cacgtgP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgtgP75Tr > 0 ? cacgtgP75Tr : cacgtgP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgtgP95Tr > 0 ? cacgtgP95Tr : cacgtgP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgtgP99Tr > 0 ? cacgtgP99Tr : cacgtgP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{cacgtgMaxTr > 0 ? cactgtgMaxTr : cacgtgMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Custom Current Diary Breakdown</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcccdbCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcccdbMeanTr > 0 ? dcccdbMeanTr : dcccdbMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcccdbMinTr > 0 ? dcccdbMinTr : dcccdbMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcccdbP50Tr > 0 ? dcccdbP50Tr : dcccdbP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcccdbP75Tr > 0 ? dcccdbP75Tr : dcccdbP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcccdbP95Tr > 0 ? dcccdbP95Tr : dcccdbP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcccdbP99Tr > 0 ? dcccdbP99Tr : dcccdbP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcccdbMaxTr > 0 ? dcccdbMaxTr : dcccdbMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Custom Events Breakdown</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccebCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccebMeanTr > 0 ? dccebMeanTr : dccebMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccebMinTr > 0 ? dccebMinTr : dccebMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccebP50Tr > 0 ? dccebP50Tr : dccebP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccebP75Tr > 0 ? dccebP75Tr : dccebP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccebP95Tr > 0 ? dccebP95Tr : dccebP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccebP99Tr > 0 ? dccebP99Tr : dccebP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccebMaxTr > 0 ? dccebMaxTr : dccebMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Custom Pending Events Breakdown</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccpebCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccpebMeanTr > 0 ? dccpebMeanTr : dccpebMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccpebMinTr > 0 ? dcpebbMinTr : dccpebMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccpebP50Tr > 0 ? dccpebP50Tr : dccpebP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccpebP75Tr > 0 ? dccpebP75Tr : dccpebP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccpebP95Tr > 0 ? dccpebP95Tr : dccpebP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccpebP99Tr > 0 ? dccpebP99Tr : dccpebP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccpebMaxTr > 0 ? dccpebMaxTr : dccpebMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Delete Dashboard</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcddCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcddMeanTr > 0 ? dcddMeanTr : dcddMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcddMinTr > 0 ? dcddMinTr : dcddMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcddP50Tr > 0 ? dcddP50Tr : dcddP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcddP75Tr > 0 ? dcddP75Tr : dcddP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcddP95Tr > 0 ? dcddP95Tr : dcddP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcddP99Tr > 0 ? dcddP99Tr : dcddP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcddMaxTr > 0 ? dcddMaxTr : dcddMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Get Dashboard Config</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdcCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdcMeanTr > 0 ? dcgdcMeanTr : dcgdcMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdcMinTr > 0 ? dcgdcMinTr : dcgdcMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdcP50Tr > 0 ? dcgdcP50Tr : dcgdcP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdcP75Tr > 0 ? dcgdcP75Tr : dcgdcP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdcP95Tr > 0 ? dcgdcP95Tr : dcgdcP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdcP99Tr > 0 ? dcgdcP99Tr : dcgdcP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdcMaxTr > 0 ? dcgdcMaxTr : dcgdcMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Get Dashboard Options</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdoCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdoMeanTr > 0 ? dcgdoMeanTr : dcgdoMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdoMinTr > 0 ? dcgdoMinTr : dcgdoMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdoP50Tr > 0 ? dcgdoP50Tr : dcgdoP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdoP75Tr > 0 ? dcgdoP75Tr : dcgdoP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdoP95Tr > 0 ? dcgdoP95Tr : dcgdoP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdoP99Tr > 0 ? dcgdoP99Tr : dcgdoP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgdoMaxTr > 0 ? dcgdoMaxTr : dcgdoMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Get Entity Statistics Table Data</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdMeanTr > 0 ? dcgestdMeanTr : dcgestdMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdMinTr > 0 ? dcgestdMinTr : dcgestdMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdP50Tr > 0 ? dcgestdP50Tr : dcgestdP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdP75Tr > 0 ? dcgestdP75Tr : dcgestdP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdP95Tr > 0 ? dcgestdP95Tr : dcgestdP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdP99Tr > 0 ? dcgestdP99Tr : dcgestdP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdMaxTr > 0 ? dcgestdMaxTr : dcgestdMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Get Entity Statistics Table Data Count</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdcCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdcMeanTr > 0 ? dcgestdcMeanTr : dcgestdcMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdcMinTr > 0 ? dcgestdcMinTr : dcgestdcMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdcP50Tr > 0 ? dcgestdcP50Tr : dcgestdcP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdcP75Tr > 0 ? dcgestdcP75Tr : dcgestdcP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdcP95Tr > 0 ? dcgestdcP95Tr : dcgestdcP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdcP99Tr > 0 ? dcgestdcP99Tr : dcgestdcP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgestdcMaxTr > 0 ? dcgestdcMaxTr : dcgestdcMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Get Event Row Count</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgercCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgercMeanTr > 0 ? dcgercMeanTr : dcgercMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgercMinTr > 0 ? dcgercMinTr : dcgercMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgercP50Tr > 0 ? dcgercP50Tr : dcgercP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgercP75Tr > 0 ? dcgercP75Tr : dcgercP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgercP95Tr > 0 ? dcgercP95Tr : dcgercP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgercP99Tr > 0 ? dcgercP99Tr : dcgercP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgercMaxTr > 0 ? dcgercMaxTr : dcgercMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Get Events</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgeCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgeMeanTr > 0 ? dcgeMeanTr : dcgeMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgeMinTr > 0 ? dcgeMinTr : dcgeMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgeP50Tr > 0 ? dcgeP50Tr : dcgeP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgeP75Tr > 0 ? dcgeP75Tr : dcgeP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgeP95Tr > 0 ? dcgeP95Tr : dcgeP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgeP99Tr > 0 ? dcgeP99Tr : dcgeP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgeMaxTr > 0 ? dcgeMaxTr : dcgeMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Get Numbers Of Events</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnoeCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnoeMeanTr > 0 ? dcgnoeMeanTr : dcgnoeMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnoeMinTr > 0 ? dcgnoeMinTr : dcgnoeMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnoeP50Tr > 0 ? dcgnoeP50Tr : dcgnoeP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnoeP75Tr > 0 ? dcgnoeP75Tr : dcgnoeP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnoeP95Tr > 0 ? dcgnoeP95Tr : dcgnoeP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnoeP99Tr > 0 ? dcgnoeP99Tr : dcgnoeP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnoeMaxTr > 0 ? dcgnoeMaxTr : dcgnoeMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Get Numbers Of Files With Exceptions</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnofweCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnofweMeanTr > 0 ? dcgnofweMeanTr : dcgnofweMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnofweMinTr > 0 ? dcgnofweMinTr : dcgnofweMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnofweP50Tr > 0 ? dcgnofweP50Tr : dcgnofweP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnofweP75Tr > 0 ? dcgnofweP75Tr : dcgnofweP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnofweP95Tr > 0 ? dcgnofweP95Tr : dcgnofweP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnofweP99Tr > 0 ? dcgnofweP99Tr : dcgnofweP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcgnofweMaxTr > 0 ? dcgnofweMaxTr : dcgnofweMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - List Claim Breakdown</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclcbCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclcbMeanTr > 0 ? dclcbMeanTr : dclcbMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclcbMinTr > 0 ? dclcbMinTr : dclcbMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclcbP50Tr > 0 ? dclcbP50Tr : dclcbP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclcbP75Tr > 0 ? dclcbP75Tr : dclcbP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclcbP95Tr > 0 ? dclcbP95Tr : dclcbP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclcbP99Tr > 0 ? dclcbP99Tr : dclcbP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclcbMaxTr > 0 ? dclcbMaxTr : dclcbMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - List Diray Breakdown</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcldbCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcldbMeanTr > 0 ? dcldbMeanTr : dcldbMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcldbMinTr > 0 ? dcldbMinTr : dcldbMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcldbP50Tr > 0 ? dcldbP50Tr : dcldbP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcldbP75Tr > 0 ? dcldbP75Tr : dcldbP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcldbP95Tr > 0 ? dcldbP95Tr : dcldbP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcldbP99Tr > 0 ? dcldbP99Tr : dcldbP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcldbMaxTr > 0 ? dcldbMaxTr : dcldbMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - List Events Breakdown</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclebCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclebMeanTr > 0 ? dclebMeanTr : dclebMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclebMinTr > 0 ? dclebMinTr : dclebMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclebP50Tr > 0 ? dclebP50Tr : dclebP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclebP75Tr > 0 ? dclebP75Tr : dclebP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclebP95Tr > 0 ? dclebP95Tr : dclebP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclebP99Tr > 0 ? dclebP99Tr : dclebP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclebMaxTr > 0 ? dclebMaxTr : dclebMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - List Exception Breakdown</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbMeanTr > 0 ? dclexbMeanTr : dclexbMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbMinTr > 0 ? dclexbMinTr : dclexbMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbP50Tr > 0 ? dclexbP50Tr : dclexbP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbP75Tr > 0 ? dclexbP75Tr : dclexbP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbP95Tr > 0 ? dclexbP95Tr : dclexbP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbP99Tr > 0 ? dclexbP99Tr : dclexbP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbMaxTr > 0 ? dclexbMaxTr : dclexbMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - List Exception Breakdown Count</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbcCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbcMeanTr > 0 ? dclexbcMeanTr : dclexbcMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbcMinTr > 0 ? dclexbcMinTr : dclexbcMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbcP50Tr > 0 ? dclexbcP50Tr : dclexbcP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbcP75Tr > 0 ? dclexbcP75Tr : dclexbcP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbcP95Tr > 0 ? dclexbcP95Tr : dclexbcP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbcP99Tr > 0 ? dclexbcP99Tr : dclexbcP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dclexbcMaxTr > 0 ? dclexbcMaxTr : dclexbcMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Save Dashboard Config</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsdcCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsdcMeanTr > 0 ? dcsdcMeanTr : dcsdcMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsdcMinTr > 0 ? dcsdcMinTr : dcsdcMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsdcP50Tr > 0 ? dcsdcP50Tr : dcsdcP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsdcP75Tr > 0 ? dcsdcP75Tr : dcsdcP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsdcP95Tr > 0 ? dcsdcP95Tr : dcsdcP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsdcP99Tr > 0 ? dcsdcP99Tr : dcsdcP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsdcMaxTr > 0 ? dcsdcMaxTr : dcsdcMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Say Hello</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcshCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcshMeanTr > 0 ? dcshMeanTr : dcshMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcshMinTr > 0 ? dcshMinTr : dcshMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcshP50Tr > 0 ? dcshP50Tr : dcshP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcshP75Tr > 0 ? dcshP75Tr : dcshP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcshP95Tr > 0 ? dcshP95Tr : dcshP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcshP99Tr > 0 ? dcshP99Tr : dcshP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcshMaxTr > 0 ? dcshMaxTr : dcshMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Say Toggle</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcstCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcstMeanTr > 0 ? dcstMeanTr : dcstMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcstMinTr > 0 ? dcstMinTr : dcstMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcstP50Tr > 0 ? dcstP50Tr : dcstP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcstP75Tr > 0 ? dcstP75Tr : dcstP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcstP95Tr > 0 ? dcstP95Tr : dcstP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcstP99Tr > 0 ? dcstP99Tr : dcstP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcstMaxTr > 0 ? dcstMaxTr : dcstMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Search Pay Date Items</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdiCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdiMeanTr > 0 ? dcspdiMeanTr : dcspdiMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdiMinTr > 0 ? dcspdiMinTr : dcspdiMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdiP50Tr > 0 ? dcspdiP50Tr : dcspdiP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdiP75Tr > 0 ? dcspdiP75Tr : dcspdiP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdiP95Tr > 0 ? dcspdiP95Tr : dcspdiP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdiP99Tr > 0 ? dcspdiP99Tr : dcspdiP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdiMaxTr > 0 ? dcspdiMaxTr : dcspdiMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Search Pay Date Items Count</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdicCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdicMeanTr > 0 ? dcspdicMeanTr : dcspdicMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdicMinTr > 0 ? dcspdicMinTr : dcspdicMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdicP50Tr > 0 ? dcspdicP50Tr : dcspdicP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdicP75Tr > 0 ? dcspdicP75Tr : dcspdicP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdicP95Tr > 0 ? dcspdicP95Tr : dcspdicP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdicP99Tr > 0 ? dcspdicP99Tr : dcspdicP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcspdicMaxTr > 0 ? dcspdicMaxTr : dcspdicMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Dashboard Controller - Search Statistics</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcssCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcssMeanTr > 0 ? dcssMeanTr : dcssMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcssMinTr > 0 ? dcssMinTr : dcssMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcssP50Tr > 0 ? dcssP50Tr : dcssP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcssP75Tr > 0 ? dcssP75Tr : dcssP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcssP95Tr > 0 ? dcssP95Tr : dcssP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcssP99Tr > 0 ? dcssP99Tr : dcssP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcssMaxTr > 0 ? dcssMaxTr : dcssMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Data Message Definition Controller - Get</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgMeanTr > 0 ? dmdcgMeanTr : dmdcgMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgMinTr > 0 ? dmdcgMinTr : dmdcgMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgP50Tr > 0 ? dmdcgP50Tr : dmdcgP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgP75Tr > 0 ? dmdcgP75Tr : dmdcgP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgP95Tr > 0 ? dmdcgP95Tr : dmdcgP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgP99Tr > 0 ? dmdcgP99Tr : dmdcgP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgMaxTr > 0 ? dmdcgMaxTr : dmdcgMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Data Message Definition Controller - Get All</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgaCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgaMeanTr > 0 ? dmdcgaMeanTr : dmdcgaMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgaMinTr > 0 ? dmdcgaMinTr : dmdcgaMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgaP50Tr > 0 ? dmdcgaP50Tr : dmdcgaP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgaP75Tr > 0 ? dmdcgaP75Tr : dmdcgaP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgaP95Tr > 0 ? dmdcgaP95Tr : dmdcgaP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgaP99Tr > 0 ? dmdcgaP99Tr : dmdcgaP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcgaMaxTr > 0 ? dmdcgaMaxTr : dmdcgaMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Data Message Definition Controller - Save</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcsCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcsMeanTr > 0 ? dmdcsMeanTr : dmdcsMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcsMinTr > 0 ? dmdcsMinTr : dmdcsMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcsP50Tr > 0 ? dmdcsP50Tr : dmdcsP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcsP75Tr > 0 ? dmdcsP75Tr : dmdcsP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcsP95Tr > 0 ? dmdcsP95Tr : dmdcsP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcsP99Tr > 0 ? dmdcsP99Tr : dmdcsP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dmdcsMaxTr > 0 ? dmdcsMaxTr : dmdcsMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Diary Controller - Count</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccMeanTr > 0 ? dccMeanTr : dccMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccMinTr > 0 ? dccMinTr : dccMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccP50Tr > 0 ? dccP50Tr : dccP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccP75Tr > 0 ? dccP75Tr : dccP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccP95Tr > 0 ? dccP95Tr : dccP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccP99Tr > 0 ? dccP99Tr : dccP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dccMaxTr > 0 ? dccMaxTr : dccMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Diary Controller - Search</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsMeanTr > 0 ? dcsMeanTr : dcsMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsMinTr > 0 ? dcsMinTr : dcsMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsP50Tr > 0 ? dcsP50Tr : dcsP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsP75Tr > 0 ? dcsP75Tr : dcsP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsP95Tr > 0 ? dcsP95Tr : dcsP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsP99Tr > 0 ? dcsP99Tr : dcsP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{dcsMaxTr > 0 ? dcsMaxTr : dcsMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Election Controller - Can Elect</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecceCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecceMeanTr > 0 ? ecceMeanTr : ecceMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecceMinTr > 0 ? ecceMinTr : ecceMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecceP50Tr > 0 ? ecceP50Tr : ecceP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecceP75Tr > 0 ? ecceP75Tr : ecceP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecceP95Tr > 0 ? ecceP95Tr : ecceP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecceP99Tr > 0 ? ecceP99Tr : ecceP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecceMaxTr > 0 ? ecceMaxTr : ecceMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Election Controller - Delete Election</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdeCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdeMeanTr > 0 ? ecdeMeanTr : ecdeMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdeMinTr > 0 ? ecdeMinTr : ecdeMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdeP50Tr > 0 ? ecdeP50Tr : ecdeP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdeP75Tr > 0 ? ecdeP75Tr : ecdeP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdeP95Tr > 0 ? ecdeP95Tr : ecdeP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdeP99Tr > 0 ? ecdeP99Tr : ecdeP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdeMaxTr > 0 ? ecdeMaxTr : ecdeMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Election Controller - Do Bulk Election</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdbeCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdbeMeanTr > 0 ? ecdbeMeanTr : ecdbeMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdbeMinTr > 0 ? ecdbeMinTr : ecdbeMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdbeP50Tr > 0 ? ecdbeP50Tr : ecdbeP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdbeP75Tr > 0 ? ecdbeP75Tr : ecdbeP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdbeP95Tr > 0 ? ecdbeP95Tr : ecdbeP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdbeP99Tr > 0 ? ecdbeP99Tr : ecdbeP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecdbeMaxTr > 0 ? ecdbeMaxTr : ecdbeMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Election Controller - Edit Election</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{eceeCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{eceeMeanTr > 0 ? eceeMeanTr : eceeMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{eceeMinTr > 0 ? eceeMinTr : eceeMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{eceeP50Tr > 0 ? eceeP50Tr : eceeP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{eceeP75Tr > 0 ? eceeP75Tr : eceeP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{eceeP95Tr > 0 ? eceeP95Tr : eceeP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{eceeP99Tr > 0 ? eceeP99Tr : eceeP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{eceeMaxTr > 0 ? eceeMaxTr : eceeMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Election Controller - Get Election Row Count</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgercCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgercMeanTr > 0 ? ecgercMeanTr : ecgercMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgercMinTr > 0 ? ecgercMinTr : ecgercMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgercP50Tr > 0 ? ecgercP50Tr : ecgercP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgercP75Tr > 0 ? ecgercP75Tr : ecgercP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgercP95Tr > 0 ? ecgercP95Tr : ecgercP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgercP99Tr > 0 ? ecgercP99Tr : ecgercP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgercMaxTr > 0 ? ecgercMaxTr : ecgercMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Election Controller - Get Elections</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgeCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgeMeanTr > 0 ? ecgeMeanTr : ecgeMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgeMinTr > 0 ? ecgeMinTr : ecgeMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgeP50Tr > 0 ? ecgeP50Tr : ecgeP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgeP75Tr > 0 ? ecgeP75Tr : ecgeP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgeP95Tr > 0 ? ecgeP95Tr : ecgeP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgeP99Tr > 0 ? ecgeP99Tr : ecgeP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgeMaxTr > 0 ? ecgeMaxTr : ecgeMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Election Controller - Get Saved Searches</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgssCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgssMeanTr > 0 ? ecgeMeanTr : ecgeMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgssMinTr > 0 ? ecgssMinTr : ecgssMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgssP50Tr > 0 ? ecgssP50Tr : ecgssP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgssP75Tr > 0 ? ecgssP75Tr : ecgssP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgssP95Tr > 0 ? ecgssP95Tr : ecgssP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgssP99Tr > 0 ? ecgssP99Tr : ecgssP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ecgssMaxTr > 0 ? ecgssMaxTr : ecgssMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>File Browser Controller - Comm File Download Handler</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbccfdhCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbccfdhMeanTr > 0 ? fbccfdhMeanTr : fbccfdhMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbccfdhMinTr > 0 ? fbccfdhMinTr : fbccfdhMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbccfdhP50Tr > 0 ? fbccfdhP50Tr : fbccfdhP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbccfdhP75Tr > 0 ? fbccfdhP75Tr : fbccfdhP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbccfdhP95Tr > 0 ? fbccfdhP95Tr : fbccfdhP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbccfdhP99Tr > 0 ? fbccfdhP99Tr : fbccfdhP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbccfdhMaxTr > 0 ? fbccfdhMaxTr : fbccfdhMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>File Browser Controller - Download Handler</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcdhCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcdhMeanTr > 0 ? fbcdhMeanTr : fbcdhMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcdhMinTr > 0 ? fbcdhMinTr : fbcdhMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcdhP50Tr > 0 ? fbcdhP50Tr : fbcdhP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcdhP75Tr > 0 ? fbcdhP75Tr : fbcdhP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcdhP95Tr > 0 ? fbcdhP95Tr : fbcdhP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcdhP99Tr > 0 ? fbcdhP99Tr : fbcdhP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcdhMaxTr > 0 ? fbcdhMaxTr : fbcdhMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>File Browser Controller - Get File Roots</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgfrCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgfrMeanTr > 0 ? fbcgfrMeanTr : fbcgfrMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgfrMinTr > 0 ? fbcgfrMinTr : fbcgfrMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgfrP50Tr > 0 ? fbcgfrP50Tr : fbcgfrP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgfrP75Tr > 0 ? fbcgfrP75Tr : fbcgfrP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgfrP95Tr > 0 ? fbcgfrP95Tr : fbcgfrP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgfrP99Tr > 0 ? fbcgfrP99Tr : fbcgfrP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgfrMaxTr > 0 ? fbcgfrMaxTr : fbcgfrMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>File Browser Controller - Get Path</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgpCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgpMeanTr > 0 ? fbcgpMeanTr : fbcgpMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgpMinTr > 0 ? fbcgpMinTr : fbcgpMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgpP50Tr > 0 ? fbcgpP50Tr : fbcgpP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgpP75Tr > 0 ? fbcgpP75Tr : fbcgpP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgpP95Tr > 0 ? fbcgpP95Tr : fbcgpP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgpP99Tr > 0 ? fbcgpP99Tr : fbcgpP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgpMaxTr > 0 ? fbcgpMaxTr : fbcgpMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>File Browser Controller - Get Root Path</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgrpCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgrpMeanTr > 0 ? fbcgrpMeanTr : fbcgrpMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgrpMinTr > 0 ? fbcgrpMinTr : fbcgrpMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgrpP50Tr > 0 ? fbcgrpP50Tr : fbcgrpP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgrpP75Tr > 0 ? fbcgrpP75Tr : fbcgrpP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgrpP95Tr > 0 ? fbcgrpP95Tr : fbcgrpP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgrpP99Tr > 0 ? fbcgrpP99Tr : fbcgrpP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{fbcgrpMaxTr > 0 ? fbcgrpMaxTr : fbcgrpMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Installation Controller - Get Current Installation</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgciCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgciMeanTr > 0 ? icgciMeanTr : icgciMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgciMinTr > 0 ? icgciMinTr : icgciMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgciP50Tr > 0 ? icgciP50Tr : icgciP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgciP75Tr > 0 ? icgciP75Tr : icgciP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgciP95Tr > 0 ? icgciP95Tr : icgciP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgciP99Tr > 0 ? icgciP99Tr : icgciP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgciMaxTr > 0 ? icgciMaxTr : icgciMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Installation Controller - Get Installations</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgiCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgiMeanTr > 0 ? icgiMeanTr : icgiMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgiMinTr > 0 ? icgiMinTr : icgiMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgiP50Tr > 0 ? icgiP50Tr : icgiP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgiP75Tr > 0 ? icgiP75Tr : icgiP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgiP95Tr > 0 ? icgiP95Tr : icgiP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgiP99Tr > 0 ? icgiP99Tr : icgiP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{icgiMaxTr > 0 ? icgiMaxTr : icgiMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Installation Property Controller - Get Properties</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpsCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpsMeanTr > 0 ? ipcgpsMeanTr : ipcgpsMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpsMinTr > 0 ? ipcgpsMinTr : ipcgpsMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpsP50Tr > 0 ? ipcgpsP50Tr : ipcgpsP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpsP75Tr > 0 ? ipcgpsP75Tr : ipcgpsP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpsP95Tr > 0 ? ipcgpsP95Tr : ipcgpsP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpsP99Tr > 0 ? ipcgpsP99Tr : ipcgpsP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpsMaxTr > 0 ? ipcgpsMaxTr : ipcgpsMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Installation Property Controller - Get Properties as CSV</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpcsvCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpcsvMeanTr > 0 ? ipcgpcsvMeanTr : ipcgpcsvMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpcsvMinTr > 0 ? ipcgpcsvMinTr : ipcgpcsvMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpcsvP50Tr > 0 ? ipcgpcsvP50Tr : ipcgpcsvP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpcsvP75Tr > 0 ? ipcgpcsvP75Tr : ipcgpcsvP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpcsvP95Tr > 0 ? ipcgpcsvP95Tr : ipcgpcsvP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpcsvP99Tr > 0 ? ipcgpcsvP99Tr : ipcgpcsvP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpcsvMaxTr > 0 ? ipcgpcsvMaxTr : ipcgpcsvMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Installation Property Controller - Get Properties as JSON</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpjCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpjMeanTr > 0 ? ipcgpjMeanTr : ipcgpjMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpjMinTr > 0 ? ipcgpjMinTr : ipcgpjMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpjP50Tr > 0 ? ipcgpjP50Tr : ipcgpjP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpjP75Tr > 0 ? ipcgpjP75Tr : ipcgpjP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpjP95Tr > 0 ? ipcgpjP95Tr : ipcgpjP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpjP99Tr > 0 ? ipcgpjP99Tr : ipcgpjP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpjMaxTr > 0 ? ipcgpjMaxTr : ipcgpjMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Installation Property Controller - Get Properties as Props</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgppCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgppMeanTr > 0 ? ipcgppMeanTr : ipcgppMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgppMinTr > 0 ? ipcgppMinTr : ipcgppMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgppP50Tr > 0 ? ipcgppP50Tr : ipcgppP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgppP75Tr > 0 ? ipcgppP75Tr : ipcgppP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgppP95Tr > 0 ? ipcgppP95Tr : ipcgppP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgppP99Tr > 0 ? ipcgppP99Tr : ipcgppP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgppMaxTr > 0 ? ipcgppMaxTr : ipcgppMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Installation Property Controller - Get Property</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpMeanTr > 0 ? ipcgpMeanTr : ipcgpMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpMinTr > 0 ? ipcgpMinTr : ipcgpMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpP50Tr > 0 ? ipcgpP50Tr : ipcgpP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpP75Tr > 0 ? ipcgpP75Tr : ipcgpP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpP95Tr > 0 ? ipcgpP95Tr : ipcgpP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpP99Tr > 0 ? ipcgpP99Tr : ipcgpP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcgpMaxTr > 0 ? ipcgpMaxTr : ipcgpMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Installation Property Controller - Save</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcsCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcsMeanTr > 0 ? ipcsMeanTr : ipcsMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcsMinTr > 0 ? ipcsMinTr : ipcsMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcsP50Tr > 0 ? ipcsP50Tr : ipcsP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcsP75Tr > 0 ? ipcsP75Tr : ipcsP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcsP95Tr > 0 ? ipcsP95Tr : ipcsP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcsP99Tr > 0 ? ipcsP99Tr : ipcsP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ipcsMaxTr > 0 ? ipcsMaxTr : ipcsMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Object Note Controller - Get Object Notes</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{oncgonCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{oncgonMeanTr > 0 ? oncgonMeanTr : oncgonMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{oncgonMinTr > 0 ? oncgonMinTr : oncgonMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{oncgonP50Tr > 0 ? oncgonP50Tr : oncgonP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{oncgonP75Tr > 0 ? oncgonP75Tr : oncgonP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{oncgonP95Tr > 0 ? oncgonP95Tr : oncgonP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{oncgonP99Tr > 0 ? oncgonP99Tr : oncgonP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{oncgonMaxTr > 0 ? oncgonMaxTr : oncgonMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Simple Rule Controller - Get By Description</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdMeanTr > 0 ? srcgbdMeanTr : srcgbdMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdMinTr > 0 ? srcgbdMinTr : srcgbdMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdP50Tr > 0 ? srcgbdP50Tr : srcgbdP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdP75Tr > 0 ? srcgbdP75Tr : srcgbdP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdP95Tr > 0 ? srcgbdP95Tr : srcgbdP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdP99Tr > 0 ? srcgbdP99Tr : srcgbdP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdMaxTr > 0 ? srcgbdMaxTr : srcgbdMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Simple Rule Controller - Get By Description</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdMeanTr > 0 ? srcgbdMeanTr : srcgbdMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdMinTr > 0 ? srcgbdMinTr : srcgbdMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdP50Tr > 0 ? srcgbdP50Tr : srcgbdP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdP75Tr > 0 ? srcgbdP75Tr : srcgbdP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdP95Tr > 0 ? srcgbdP95Tr : srcgbdP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdP99Tr > 0 ? srcgbdP99Tr : srcgbdP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcgbdMaxTr > 0 ? srcgbdMaxTr : srcgbdMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Simple Rule Controller - Save</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcsCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcsMeanTr > 0 ? srcsMeanTr : srcsMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcsMinTr > 0 ? srcsMinTr : srcsMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcsP50Tr > 0 ? srcsP50Tr : srcsP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcsP75Tr > 0 ? srcsP75Tr : srcsP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcsP95Tr > 0 ? srcsP95Tr : srcsP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcsP99Tr > 0 ? srcsP99Tr : srcsP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{srcsMaxTr > 0 ? srcsMaxTr : srcsMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Static Data Controller - Get Currencies</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgcCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgcMeanTr > 0 ? sdcgcMeanTr : sdcgcMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgcMinTr > 0 ? sdcgcMinTr : sdcgcMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgcP50Tr > 0 ? sdcgcP50Tr : sdcgcP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgcP75Tr > 0 ? sdcgcP75Tr : sdcgcP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgcP95Tr > 0 ? sdcgcP95Tr : sdcgcP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgcP99Tr > 0 ? sdcgcP99Tr : sdcgcP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgcMaxTr > 0 ? sdcgcMaxTr : sdcgcMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Static Data Controller - Get Instrument Property Keys</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgipkCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgipkMeanTr > 0 ? sdcgipkMeanTr : sdcgipkMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgipkMinTr > 0 ? sdcgipkMinTr : sdcgipkMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgipkP50Tr > 0 ? sdcgipkP50Tr : sdcgipkP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgipkP75Tr > 0 ? sdcgipkP75Tr : sdcgipkP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgipkP95Tr > 0 ? sdcgipkP95Tr : sdcgipkP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgipkP99Tr > 0 ? sdcgipkP99Tr : sdcgipkP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgipkMaxTr > 0 ? sdcgipkMaxTr : sdcgipkMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Static Data Controller - Get Place</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgpCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgpMeanTr > 0 ? sdcgpMeanTr : sdcgpMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgpMinTr > 0 ? sdcgpMinTr : sdcgpMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgpP50Tr > 0 ? sdcgpP50Tr : sdcgpP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgpP75Tr > 0 ? sdcgpP75Tr : sdcgpP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgpP95Tr > 0 ? sdcgpP95Tr : sdcgpP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgpP99Tr > 0 ? sdcgpP99Tr : sdcgpP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{sdcgpMaxTr > 0 ? sdcgpMaxTr : sdcgpMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>System Exception Controller - Get Exception Types</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgetCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgetMeanTr > 0 ? secgetMeanTr : secgetMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgetMinTr > 0 ? secgetMinTr : secgetMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgetP50Tr > 0 ? secgetP50Tr : secgetP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgetP75Tr > 0 ? secgetP75Tr : secgetP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgetP95Tr > 0 ? secgetP95Tr : secgetP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgetP99Tr > 0 ? secgetP99Tr : secgetP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgetMaxTr > 0 ? secgetMaxTr : secgetMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>System Exception Controller - Get Exception By Id CA</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgebicaCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgebicaMeanTr > 0 ? secgebicaMeanTr : secgebicaMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgebicaMinTr > 0 ? secgebicaMinTr : secgebicaMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgebicaP50Tr > 0 ? secgebicaP50Tr : secgebicaP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgebicaP75Tr > 0 ? secgebicaP75Tr : secgebicaP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgebicaP95Tr > 0 ? secgebicaP95Tr : secgebicaP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgebicaP99Tr > 0 ? secgebicaP99Tr : secgebicaP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{secgebicaMaxTr > 0 ? secgebicaMaxTr : secgebicaMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Approve Account Request</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaarCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaarMeanTr > 0 ? ucaarMeanTr : ucaarMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaarMinTr > 0 ? ucaarMinTr : ucaarMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaarP50Tr > 0 ? ucaarP50Tr : ucaarP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaarP75Tr > 0 ? ucaarP75Tr : ucaarP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaarP95Tr > 0 ? ucaarP95Tr : ucaarP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaarP99Tr > 0 ? ucaarP99Tr : ucaarP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaarMaxTr > 0 ? ucaarMaxTr : ucaarMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Authenticate</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaMeanTr > 0 ? ucaMeanTr : ucaMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaMinTr > 0 ? ucaMinTr : ucaMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaP50Tr > 0 ? ucaP50Tr : ucaP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaP75Tr > 0 ? ucaP75Tr : ucaP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaP95Tr > 0 ? ucaP95Tr : ucaP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaP99Tr > 0 ? ucaP99Tr : ucaP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucaMaxTr > 0 ? ucaMaxTr : ucaMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Change Password</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uccpCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uccpMeanTr > 0 ? uccpMeanTr : uccpMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uccpMinTr > 0 ? uccpMinTr : uccpMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uccpP50Tr > 0 ? uccpP50Tr : uccpP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uccpP75Tr > 0 ? uccpP75Tr : uccpP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uccpP95Tr > 0 ? uccpP95Tr : uccpP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uccpP99Tr > 0 ? uccpP99Tr : uccpP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uccpMaxTr > 0 ? uccpMaxTr : uccpMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Check Password</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucchpCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucchpMeanTr > 0 ? ucchpMeanTr : ucchpMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucchpMinTr > 0 ? ucchpMinTr : ucchpMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucchpP50Tr > 0 ? ucchpP50Tr : ucchpP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucchpP75Tr > 0 ? ucchpP75Tr : ucchpP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucchpP95Tr > 0 ? ucchpP95Tr : ucchpP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucchpP99Tr > 0 ? ucchpP99Tr : ucchpP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucchpMaxTr > 0 ? ucchpMaxTr : ucchpMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Deactivate Account</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucdaCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucdaMeanTr > 0 ? ucdaMeanTr : ucdaMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucdaMinTr > 0 ? ucdaMinTr : ucdaMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucdaP50Tr > 0 ? ucdaP50Tr : ucdaP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucdaP75Tr > 0 ? ucdaP75Tr : ucdaP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucdaP95Tr > 0 ? ucdaP95Tr : ucdaP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucdaP99Tr > 0 ? ucdaP99Tr : ucdaP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucdaMaxTr > 0 ? ucdaMaxTr : ucdaMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Forgotten Password</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucfpCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucfpMeanTr > 0 ? ucfpMeanTr : ucfpMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucfpMinTr > 0 ? ucfpMinTr : ucfpMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucfpP50Tr > 0 ? ucfpP50Tr : ucfpP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucfpP75Tr > 0 ? ucfpP75Tr : ucfpP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucfpP95Tr > 0 ? ucfpP95Tr : ucfpP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucfpP99Tr > 0 ? ucfpP99Tr : ucfpP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucfpMaxTr > 0 ? ucfpMaxTr : ucfpMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Get Image</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgiCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgiMeanTr > 0 ? ucgiMeanTr : ucgiMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgiMinTr > 0 ? ucgiMinTr : ucgiMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgiP50Tr > 0 ? ucgiP50Tr : ucgiP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgiP75Tr > 0 ? ucgiP75Tr : ucgiP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgiP95Tr > 0 ? ucgiP95Tr : ucgiP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgiP99Tr > 0 ? ucgiP99Tr : ucgiP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgiMaxTr > 0 ? ucgiMaxTr : ucgiMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Get Image Form</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgifCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgifMeanTr > 0 ? ucgifMeanTr : ucgifMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgifMinTr > 0 ? ucgifMinTr : ucgifMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgifP50Tr > 0 ? ucgifP50Tr : ucgifP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgifP75Tr > 0 ? ucgifP75Tr : ucgifP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgifP95Tr > 0 ? ucgifP95Tr : ucgifP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgifP99Tr > 0 ? ucgifP99Tr : ucgifP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgifMaxTr > 0 ? ucgifMaxTr : ucgifMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Get Match User Accounts</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgmuaCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgmuaMeanTr > 0 ? ucgmuaMeanTr : ucgmuaMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgmuaMinTr > 0 ? ucgmuaMinTr : ucgmuaMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgmuaP50Tr > 0 ? ucgmuaP50Tr : ucgmuaP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgmuaP75Tr > 0 ? ucgmuaP75Tr : ucgmuaP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgmuaP95Tr > 0 ? ucgmuaP95Tr : ucgmuaP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgmuaP99Tr > 0 ? ucgmuaP99Tr : ucgmuaP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgmuaMaxTr > 0 ? ucgmuaMaxTr : ucgmuaMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Get System Date</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgsdCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgsdMeanTr > 0 ? ucgsdMeanTr : ucgsdMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgsdMinTr > 0 ? ucgsdMinTr : ucgsdMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgsdP50Tr > 0 ? ucgsdP50Tr : ucgsdP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgsdP75Tr > 0 ? ucgsdP75Tr : ucgsdP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgsdP95Tr > 0 ? ucgsdP95Tr : ucgsdP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgsdP99Tr > 0 ? ucgsdP99Tr : ucgsdP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucgsdMaxTr > 0 ? ucgsdMaxTr : ucgsdMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Is Authenticated</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciaCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciaMeanTr > 0 ? uciaMeanTr : uciaMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciaMinTr > 0 ? uciaMinTr : uciaMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciaP50Tr > 0 ? uciaP50Tr : uciaP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciaP75Tr > 0 ? uciaP75Tr : uciaP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciaP95Tr > 0 ? uciaP95Tr : uciaP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciaP99Tr > 0 ? uciaP99Tr : uciaP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciaMaxTr > 0 ? uciaMaxTr : uciaMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Is Username Available</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciuaCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciuaMeanTr > 0 ? uciuaMeanTr : uciuaMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciuaMinTr > 0 ? uciuaMinTr : uciuaMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciuaP50Tr > 0 ? uciuaP50Tr : uciuaP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciuaP75Tr > 0 ? uciuaP75Tr : uciuaP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciuaP95Tr > 0 ? uciuaP95Tr : uciuaP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciuaP99Tr > 0 ? uciuaP99Tr : uciuaP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uciuaMaxTr > 0 ? uciuaMaxTr : uciuaMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Reactivate Account</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraMeanTr > 0 ? ucraMeanTr : ucraMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraMinTr > 0 ? ucraMinTr : ucraMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraP50Tr > 0 ? ucraP50Tr : ucraP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraP75Tr > 0 ? ucraP75Tr : ucraP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraP95Tr > 0 ? ucraP95Tr : ucraP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraP99Tr > 0 ? ucraP99Tr : ucraP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraMaxTr > 0 ? ucraMaxTr : ucraMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Reactivate Account Request</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrarCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrarMeanTr > 0 ? ucrarMeanTr : ucrarMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrarMinTr > 0 ? ucrarMinTr : ucrarMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrarP50Tr > 0 ? ucrarP50Tr : ucrarP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrarP75Tr > 0 ? ucrarP75Tr : ucrarP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrarP95Tr > 0 ? ucrarP95Tr : ucrarP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrarP99Tr > 0 ? ucrarP99Tr : ucrarP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrarMaxTr > 0 ? ucrarMaxTr : ucrarMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Request Account</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraMeanTr > 0 ? ucraMeanTr : ucraMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraMinTr > 0 ? ucraMinTr : ucraMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraP50Tr > 0 ? ucraP50Tr : ucraP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraP75Tr > 0 ? ucraP75Tr : ucraP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraP95Tr > 0 ? ucraP95Tr : ucraP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraP99Tr > 0 ? ucraP99Tr : ucraP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucraMaxTr > 0 ? ucraMaxTr : ucraMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Reset Password</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrpCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrpMeanTr > 0 ? ucrpMeanTr : ucrpMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrpMinTr > 0 ? ucrpMinTr : ucrpMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrpP50Tr > 0 ? ucrpP50Tr : ucrpP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrpP75Tr > 0 ? ucrpP75Tr : ucrpP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrpP95Tr > 0 ? ucrpP95Tr : ucrpP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrpP99Tr > 0 ? ucrpP99Tr : ucrpP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucrpMaxTr > 0 ? ucrpMaxTr : ucrpMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Search Account Request</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarMeanTr > 0 ? ucsarMeanTr : ucsarMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarMinTr > 0 ? ucsarMinTr : ucsarMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarP50Tr > 0 ? ucsarP50Tr : ucsarP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarP75Tr > 0 ? ucsarP75Tr : ucsarP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarP95Tr > 0 ? ucsarP95Tr : ucsarP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarP99Tr > 0 ? ucsarP99Tr : ucsarP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarMaxTr > 0 ? ucsarMaxTr : ucsarMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Search Account Request Count</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarcCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarcMeanTr > 0 ? ucsarcMeanTr : ucsarcMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarcMinTr > 0 ? ucsarcMinTr : ucsarcMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarcP50Tr > 0 ? ucsarcP50Tr : ucsarcP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarcP75Tr > 0 ? ucsarcP75Tr : ucsarcP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarcP95Tr > 0 ? ucsarcP95Tr : ucsarcP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarcP99Tr > 0 ? ucsarcP99Tr : ucsarcP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsarcMaxTr > 0 ? ucsarcMaxTr : ucsarcMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Search Active Account Count</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaacCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaacMeanTr > 0 ? ucsaacMeanTr : ucsaacMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaacMinTr > 0 ? ucsaacMinTr : ucsaacMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaacP50Tr > 0 ? ucsaacP50Tr : ucsaacP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaacP75Tr > 0 ? ucsaacP75Tr : ucsaacP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaacP95Tr > 0 ? ucsaacP95Tr : ucsaacP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaacP99Tr > 0 ? ucsaacP99Tr : ucsaacP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaacMaxTr > 0 ? ucsaacMaxTr : ucsaacMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Seach Active Accounts</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaaCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaaMeanTr > 0 ? ucsaaMeanTr : ucsaaMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaaMinTr > 0 ? ucsaaMinTr : ucsaaMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaaP50Tr > 0 ? ucsaaP50Tr : ucsaaP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaaP75Tr > 0 ? ucsaaP75Tr : ucsaaP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaaP95Tr > 0 ? ucsaaP95Tr : ucsaaP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaaP99Tr > 0 ? ucsaaP99Tr : ucsaaP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsaaMaxTr > 0 ? ucsaaMaxTr : ucsaaMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Serach Deactivated Account Count</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdacCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdacMeanTr > 0 ? ucsdacMeanTr : ucsdacMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdacMinTr > 0 ? ucsdacMinTr : ucsdacMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdacP50Tr > 0 ? ucsdacP50Tr : ucsdacP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdacP75Tr > 0 ? ucsdacP75Tr : ucsdacP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdacP95Tr > 0 ? ucsdacP95Tr : ucsdacP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdacP99Tr > 0 ? ucsdacP99Tr : ucsdacP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdacMaxTr > 0 ? ucsdacMaxTr : ucsdacMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Search Deactivated Accounts</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdaCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdaMeanTr > 0 ? ucsdaMeanTr : ucsdaMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdaMinTr > 0 ? ucsdaMinTr : ucsdaMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdaP50Tr > 0 ? ucsdaP50Tr : ucsdaP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdaP75Tr > 0 ? ucsdaP75Tr : ucsdaP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdaP95Tr > 0 ? ucsdaP95Tr : ucsdaP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdaP99Tr > 0 ? ucsdaP99Tr : ucsdaP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucsdaMaxTr > 0 ? ucsdaMaxTr : ucsdaMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Update User</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuuCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuuMeanTr > 0 ? ucuuMeanTr : ucuuMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuuMinTr > 0 ? ucuuMinTr : ucuuMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuuP50Tr > 0 ? ucuuP50Tr : ucuuP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuuP75Tr > 0 ? ucuuP75Tr : ucuuP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuuP95Tr > 0 ? ucuuP95Tr : ucuuP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuuP99Tr > 0 ? ucuuP99Tr : ucuuP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuuMaxTr > 0 ? ucuuMaxTr : ucuuMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Controller - Upload Image</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuiCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuiMeanTr > 0 ? ucuiMeanTr : ucuiMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuiMinTr > 0 ? ucuiMinTr : ucuiMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuiP50Tr > 0 ? ucuiP50Tr : ucuiP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuiP75Tr > 0 ? ucuiP75Tr : ucuiP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuiP95Tr > 0 ? ucuiP95Tr : ucuiP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuiP99Tr > 0 ? ucuiP99Tr : ucuiP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ucuiMaxTr > 0 ? ucuiMaxTr : ucuiMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Event Controller - Count</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ueccCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ueccMeanTr > 0 ? ueccMeanTr : ueccMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ueccMinTr > 0 ? ueccMinTr : ueccMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ueccP50Tr > 0 ? ueccP50Tr : ueccP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ueccP75Tr > 0 ? ueccP75Tr : ueccP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ueccP95Tr > 0 ? ueccP95Tr : ueccP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ueccP99Tr > 0 ? ueccP99Tr : ueccP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ueccMaxTr > 0 ? ueccMaxTr : ueccMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>User Event Controller - Search</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uecsCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uecsMeanTr > 0 ? uecsMeanTr : uecsMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uecsMinTr > 0 ? uecsMinTr : uecsMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uecsP50Tr > 0 ? uecsP50Tr : uecsP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uecsP75Tr > 0 ? uecsP75Tr : uecsP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uecsP95Tr > 0 ? uecsP95Tr : uecsP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uecsP99Tr > 0 ? uecsP99Tr : uecsP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{uecsMaxTr > 0 ? uecsMaxTr : uecsMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Version Controller - Get Version</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{vcgvCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{vcgvMeanTr > 0 ? vcgvMeanTr : vcgvMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{vcgvMinTr > 0 ? vcgvMinTr : vcgvMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{vcgvP50Tr > 0 ? vcgvP50Tr : vcgvP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{vcgvP75Tr > 0 ? vcgvP75Tr : vcgvP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{vcgvP95Tr > 0 ? vcgvP95Tr : vcgvP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{vcgvP99Tr > 0 ? vcgvP99Tr : vcgvP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{vcgvMaxTr > 0 ? vcgvMaxTr : vcgvMax}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-1">
                                        <p>Instrumented Filter - Requests</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ifrCount}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ifrMeanTr > 0 ? ifrMeanTr : ifrMean}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ifrMinTr > 0 ? ifrMinTr : ifrMin}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ifrP50Tr > 0 ? ifrP50Tr : ifrP50}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ifrP75Tr > 0 ? ifrP75Tr : ifrP75}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ifrP95Tr > 0 ? ifrP95Tr : ifrP95}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ifrP99Tr > 0 ? ifrP99Tr : ifrP99}</p>
                                    </td>
                                    <td className="px-6">
                                        <p>{ifrMaxTr > 0 ? ifrMaxTr : ifrMax}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </>
    )
}
export default Metrics