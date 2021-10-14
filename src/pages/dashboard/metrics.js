import { useState, useEffect } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Error from '../_error'

export const getServerSideProps = async ({req}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/management/metrics`, {
        headers: { 
            Cookie: req.headers?.cookie || ''
        }
    })
    const data = await res.json()
    const errorCode = res.ok ? 200 : res.statusCode

    return {
        props: {
            data: data || {},
            errorCode: errorCode || null
        },
    }
}

const Metrics = ({ data, errorCode }) => {

    if (errorCode > 300) {
        return (
            <>
                <Meta title="Metrics" />
                <Header title="Application Metrics" subTitle="" />
                <Error statusCode={errorCode} />
            </>
        )
    }

    const [memory, setMemory] = useState(0)
    const [heapMemory, setHeapMemory] = useState(0)
    const [nonHeapMemory, setNonHeapMemory] = useState(0)
    const [runnableThread, setRunnableThread] = useState(0)
    const [timedWaitingThread, setTimedWaitingThread] = useState(0)
    const [waitingThread, setWaitingThread] = useState(0)
    const [blockedThread, setBlockedThread] = useState(0)

    const usedMemory = data?.gauges && data?.gauges[`jvm.memory.total.used`]?.value
    const maxMemory = data?.gauges && data?.gauges[`jvm.memory.total.max`]?.value
    const memoryDiff = usedMemory / maxMemory * 100

    const usedHeapMemory = data?.gauges && data?.gauges[`jvm.memory.heap.used`]?.value
    const maxHeapMemory = data?.gauges && data?.gauges[`jvm.memory.heap.max`]?.value
    const heapMemoryDiff = usedHeapMemory / maxHeapMemory * 100

    const usedNonHeapMemory = data?.gauges && data?.gauges[`jvm.memory.non-heap.used`]?.value
    const maxNonHeapMemory = data?.gauges && data?.gauges[`jvm.memory.non-heap.committed`]?.value
    const nonHeapMemoryDiff = usedNonHeapMemory / maxNonHeapMemory * 100

    const threads = data?.gauges && data?.gauges[`jvm.threads.count`]?.value
    
    const runnable = data?.gauges && data?.gauges[`jvm.threads.runnable.count`]?.value
    const runnableDiff = runnable / threads * 100

    const timedWaiting = data?.gauges && data?.gauges[`jvm.threads.timed_waiting.count`]?.value
    const timedWaitingDiff = timedWaiting / threads * 100
    
    const waiting = data?.gauges && data?.gauges[`jvm.threads.waiting.count`]?.value
    const waitingDiff = waiting / threads * 100

    const blocked = data?.gauges && data?.gauges[`jvm.threads.blocked.count`]?.value
    const blockedDiff = blocked / threads * 100

    const markSweepTime = data?.gauges && data?.gauges[`jvm.garbage.G1-Old-Generation.count`]?.value 
    const markSweepCount = data?.gauges && data?.gauges[`jvm.garbage.G1-Old-Generation.time`]?.value
    const scavengeTime = data?.gauges && data?.gauges[`jvm.garbage.G1-Young-Generation.count`]?.value
    const scavengeCount = data?.gauges && data?.gauges[`jvm.garbage.G1-Young-Generation.time`]?.value

    //active requests
    const activeRequests = data?.counters && data?.counters[`com.codahale.metrics.servlet.InstrumentedFilter.activeRequests`]?.count
    //total requests
    const totalRequests = data?.timers && data?.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`]?.count

    //HTTP requests (events per second) - response meters
    const brCount = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`]?.count
    const brM1 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`]?.m1_rate
    const brM5 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`]?.m5_rate
    const brM15 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`]?.m15_rate
    const brMean = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.badRequest`]?.mean_rate

    const crCount = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`]?.count
    const crM1 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`]?.m1_rate
    const crM5 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`]?.m5_rate
    const crM15 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`]?.m15_rate
    const crMean = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.created`]?.mean_rate

    const ncCount = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`]?.count 
    const ncM1 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`]?.m1_rate
    const ncM5 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`]?.m5_rate
    const ncM15 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`]?.m15_rate
    const ncMean = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.noContent`]?.mean_rate

    const nfCount = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`]?.count
    const nfM1 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`]?.m1_rate
    const nfM5 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`]?.m5_rate
    const nfM15 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`]?.m15_rate
    const nfMean = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound`]?.mean_rate
    
    const okCount = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`]?.count
    const okM1 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`]?.m1_rate
    const okM5 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`]?.m5_rate
    const okM15 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`]?.m15_rate
    const okMean = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok`]?.mean_rate
    
    const otherCount = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`]?.count
    const otherM1 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`]?.m1_rate
    const otherM5 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`]?.m5_rate
    const otherM15 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`]?.m15_rate
    const otherMean = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.other`]?.mean_rate
    
    const seCount = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`]?.count
    const seM1 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`]?.m1_rate
    const seM5 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`]?.m5_rate
    const seM15 = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`]?.m15_rate
    const seMean = data?.meters && data?.meters[`com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError`]?.mean_rate

    //Service Type Account Controller
    const accnpaCount = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`]?.count
    const accnpaMean = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`]?.mean
    const accnpaMin = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`]?.min
    const accnpaP50 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`]?.p50
    const accnpaP75 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`]?.p75
    const accnpaP95 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`]?.p95
    const accnpaP99 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`]?.p99
    const accnpaMax = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyAccount`]?.max
    
    const accnpcCount = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`]?.count
    const accnpcMean = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`]?.mean
    const accnpcMin = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`]?.min
    const accnpcP50 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`]?.p50
    const accnpcP75 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`]?.p75
    const accnpcP95 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`]?.p95
    const accnpcP99 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`]?.p99
    const accnpcMax = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyCommunication`]?.max
    
    const accnpxrCount = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`]?.count
    const accnpxrMean = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`]?.mean
    const accnpxrMin = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`]?.min
    const accnpxrP50 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`]?.p50
    const accnpxrP75 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`]?.p75
    const accnpxrP95 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`]?.p95
    const accnpxrP99 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`]?.p99
    const accnpxrMax = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.createNewPartyXRef`]?.max
    
    const acgaCount = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAccounts`]?.count
    const acgaMean = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAccounts`]?.mean
    const acgaMin = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAccounts`]?.min
    const acgaP50 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAccounts`]?.p50
    const acgaP75 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAccounts`]?.p75
    const acgaP95 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAccounts`]?.p95
    const acgaP99 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAccounts`]?.p99
    const acgaMax = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAccounts`]?.max
    
    const acgacpCount = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`]?.count
    const acgacpMean = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`]?.mean
    const acgacpMin = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`]?.min
    const acgacpP50 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`]?.p50
    const acgacpP75 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`]?.p75
    const acgacpP95 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`]?.p95
    const acgacpP99 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`]?.p99
    const acgacpMax = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedCounterparties`]?.max
    
    const acgaoCount = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`]?.count
    const acgaoMean = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`]?.mean
    const acgaoMin = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`]?.min
    const acgaoP50 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`]?.p50
    const acgaoP75 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`]?.p75
    const acgaoP95 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`]?.p95
    const acgaoP99 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`]?.p99
    const acgaoMax = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getAllowedOwners`]?.max
    
    const acgceCount = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`]?.count
    const acgceMean = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`]?.mean
    const acgceMin = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`]?.min
    const acgceP50 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`]?.p50
    const acgceP75 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`]?.p75
    const acgceP95 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`]?.p95
    const acgceP99 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`]?.p99
    const acgceMax = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentEntity`]?.max
    
    const acgcrCount = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`]?.count
    const acgcrMean = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`]?.mean
    const acgcrMin = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`]?.min
    const acgcrP50 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`]?.p50
    const acgcrP75 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`]?.p75
    const acgcrP95 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`]?.p95
    const acgcrP99 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`]?.p99
    const acgcrMax = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getCurrentRegion`]?.max
    
    const acgeCount = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getEntities`]?.count
    const acgeMean = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getEntities`]?.mean
    const acgeMin = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getEntities`]?.min
    const acgeP50 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getEntities`]?.p50
    const acgeP75 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getEntities`]?.p75
    const acgeP95 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getEntities`]?.p95
    const acgeP99 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getEntities`]?.p99
    const acgeMax = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getEntities`]?.max
    
    const acgrCount = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getRegions`]?.count
    const acgrMean = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getRegions`]?.mean
    const acgrMin = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getRegions`]?.min
    const acgrP50 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getRegions`]?.p50
    const acgrP75 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getRegions`]?.p75
    const acgrP95 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getRegions`]?.p95
    const acgrP99 = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getRegions`]?.p99
    const acgrMax = data?.timers && data?.timers[`com.cats.server.controllers.AccountController.getRegions`]?.max
    
    // Audit Controller
    const accsCount = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.createSession`]?.count
    const accsMean = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.createSession`]?.mean
    const accsMin = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.createSession`]?.min
    const accsP50 = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.createSession`]?.p50
    const accsP75 = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.createSession`]?.p75
    const accsP95 = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.createSession`]?.p95
    const accsP99 = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.createSession`]?.p99
    const accsMax = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.createSession`]?.max
    
    const acusCount = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.updateSession`]?.count
    const acusMean = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.updateSession`]?.mean
    const acusMin = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.updateSession`]?.min
    const acusP50 = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.updateSession`]?.p50
    const acusP75 = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.updateSession`]?.p75
    const acusP95 = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.updateSession`]?.p95
    const acusP99 = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.updateSession`]?.p99
    const acusMax = data?.timers && data?.timers[`com.cats.server.controllers.AuditController.updateSession`]?.max
    
    // Bookmark Controller
    const bcaorbCount = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`]?.count
    const bcaorbMean = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`]?.mean
    const bcaorbMin = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`]?.min
    const bcaorbP50 = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`]?.p50
    const bcaorbP75 = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`]?.p75
    const bcaorbP95 = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`]?.p95
    const bcaorbP99 = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`]?.p99
    const bcaorbMax = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.addOrRemoveBookmark`]?.max
    
    const bccsCount = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.createSession`]?.count
    const bccsMean = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.createSession`]?.mean
    const bccsMin = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.createSession`]?.min
    const bccsP50 = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.createSession`]?.p50
    const bccsP75 = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.createSession`]?.p75
    const bccsP95 = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.createSession`]?.p95
    const bccsP99 = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.createSession`]?.p99
    const bccsMax = data?.timers && data?.timers[`com.cats.server.controllers.BookmarkController.createSession`]?.max
    
    // Corp Action Controller
    const cacgeCount = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvent`]?.count
    const cacgeMean = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvent`]?.mean
    const cacgeMin = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvent`]?.min
    const cacgeP50 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvent`]?.p50
    const cacgeP75 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvent`]?.p75
    const cacgeP95 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvent`]?.p95
    const cacgeP99 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvent`]?.p99
    const cacgeMax = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvent`]?.max
    
    const cacgercCount = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`]?.count
    const cacgercMean = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`]?.mean
    const cacgercMin = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`]?.min
    const cacgercP50 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`]?.p50
    const cacgercP75 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`]?.p75
    const cacgercP95 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`]?.p95
    const cacgercP99 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`]?.p99
    const cacgercMax = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEventRowCount`]?.max
    
    const cacgesCount = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvents`]?.count
    const cacgesMean = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvents`]?.mean
    const cacgesMin = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvents`]?.min
    const cacgesP50 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvents`]?.p50
    const cacgesP75 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvents`]?.p75
    const cacgesP95 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvents`]?.p95
    const cacgesP99 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvents`]?.p99
    const cacgesMax = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getEvents`]?.max

    const cacgtgCount = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`]?.count
    const cacgtgMean = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`]?.mean
    const cacgtgMin = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`]?.min
    const cacgtgP50 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`]?.p50
    const cacgtgP75 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`]?.p75
    const cacgtgP95 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`]?.p95
    const cacgtgP99 = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`]?.p99
    const cacgtgMax = data?.timers && data?.timers[`com.cats.server.controllers.CorpActionController.getTypeGroups`]?.max

    //Dashboard Controller
    const dcccdbCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`]?.count
    const dcccdbMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`]?.mean
    const dcccdbMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`]?.min
    const dcccdbP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`]?.p50
    const dcccdbP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`]?.p75
    const dcccdbP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`]?.p95
    const dcccdbP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`]?.p99
    const dcccdbMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customCurrentDiaryBreakdown`]?.max
    
    const dccebCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`]?.count
    const dccebMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`]?.mean
    const dccebMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`]?.min
    const dccebP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`]?.p50
    const dccebP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`]?.p75
    const dccebP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`]?.p95
    const dccebP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`]?.p99
    const dccebMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customEventsBreakdown`]?.max
    
    const dccpebCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`]?.count
    const dccpebMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`]?.mean
    const dccpebMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`]?.min
    const dccpebP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`]?.p50
    const dccpebP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`]?.p75
    const dccpebP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`]?.p95
    const dccpebP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`]?.p99
    const dccpebMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.customPendingEventsBreakdown`]?.max
    
    const dcddCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`]?.count
    const dcddMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`]?.mean
    const dcddMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`]?.min
    const dcddP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`]?.p50
    const dcddP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`]?.p75
    const dcddP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`]?.p95
    const dcddP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`]?.p99
    const dcddMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.deleteDashboard`]?.max
    
    const dcgdcCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`]?.count
    const dcgdcMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`]?.mean
    const dcgdcMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`]?.min
    const dcgdcP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`]?.p50
    const dcgdcP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`]?.p75
    const dcgdcP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`]?.p95
    const dcgdcP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`]?.p99
    const dcgdcMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardConfig`]?.max
    
    const dcgdoCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`]?.count
    const dcgdoMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`]?.mean
    const dcgdoMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`]?.min
    const dcgdoP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`]?.p50
    const dcgdoP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`]?.p75
    const dcgdoP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`]?.p95
    const dcgdoP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`]?.p99
    const dcgdoMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getDashBoardOptions`]?.max
    
    const dcgestdCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`]?.count
    const dcgestdMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`]?.mean
    const dcgestdMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`]?.min
    const dcgestdP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`]?.p50
    const dcgestdP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`]?.p75
    const dcgestdP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`]?.p95
    const dcgestdP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`]?.p99
    const dcgestdMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableData`]?.max
    
    const dcgestdcCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`]?.count
    const dcgestdcMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`]?.mean
    const dcgestdcMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`]?.min
    const dcgestdcP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`]?.p50
    const dcgestdcP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`]?.p75
    const dcgestdcP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`]?.p95
    const dcgestdcP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`]?.p99
    const dcgestdcMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEntityStatisticsTableDataCount`]?.max
    
    const dcgercCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`]?.count
    const dcgercMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`]?.mean
    const dcgercMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`]?.min
    const dcgercP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`]?.p50
    const dcgercP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`]?.p75
    const dcgercP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`]?.p95
    const dcgercP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`]?.p99
    const dcgercMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEventRowCount`]?.max
    
    const dcgeCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEvents`]?.count
    const dcgeMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEvents`]?.mean
    const dcgeMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEvents`]?.min
    const dcgeP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEvents`]?.p50
    const dcgeP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEvents`]?.p75
    const dcgeP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEvents`]?.p95
    const dcgeP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEvents`]?.p99
    const dcgeMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getEvents`]?.max
    
    const dcgnoeCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`]?.count
    const dcgnoeMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`]?.mean
    const dcgnoeMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`]?.min
    const dcgnoeP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`]?.p50
    const dcgnoeP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`]?.p75
    const dcgnoeP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`]?.p95
    const dcgnoeP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`]?.p99
    const dcgnoeMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumOfEvents`]?.max
    
    const dcgnofweCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`]?.count
    const dcgnofweMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`]?.mean
    const dcgnofweMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`]?.min
    const dcgnofweP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`]?.p50
    const dcgnofweP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`]?.p75
    const dcgnofweP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`]?.p95
    const dcgnofweP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`]?.p99
    const dcgnofweMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.getNumberOfFilesWithExceptions`]?.max
    
    const dclcbCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`]?.count
    const dclcbMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`]?.mean
    const dclcbMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`]?.min
    const dclcbP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`]?.p50
    const dclcbP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`]?.p75
    const dclcbP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`]?.p95
    const dclcbP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`]?.p99
    const dclcbMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listClaimBreakdown`]?.max
    
    const dcldbCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`]?.count
    const dcldbMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`]?.mean
    const dcldbMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`]?.min
    const dcldbP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`]?.p50
    const dcldbP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`]?.p75
    const dcldbP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`]?.p95
    const dcldbP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`]?.p99
    const dcldbMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listDiaryBreakdown`]?.max
    
    const dclebCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`]?.count
    const dclebMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`]?.mean
    const dclebMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`]?.min
    const dclebP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`]?.p50
    const dclebP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`]?.p75
    const dclebP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`]?.p95
    const dclebP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`]?.p99
    const dclebMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listEventsBreakdown`]?.max

    const dclexbCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`]?.count
    const dclexbMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`]?.mean
    const dclexbMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`]?.min
    const dclexbP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`]?.p50
    const dclexbP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`]?.p75
    const dclexbP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`]?.p95
    const dclexbP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`]?.p99
    const dclexbMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdown`]?.max
    
    const dclexbcCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`]?.count
    const dclexbcMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`]?.mean
    const dclexbcMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`]?.min
    const dclexbcP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`]?.p50
    const dclexbcP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`]?.p75
    const dclexbcP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`]?.p95
    const dclexbcP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`]?.p99
    const dclexbcMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.listExceptionBreakdownCount`]?.max
    
    const dcsdcCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`]?.count
    const dcsdcMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`]?.mean
    const dcsdcMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`]?.min
    const dcsdcP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`]?.p50
    const dcsdcP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`]?.p75
    const dcsdcP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`]?.p95
    const dcsdcP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`]?.p99
    const dcsdcMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.saveDashboardConfig`]?.max
    
    const dcshCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayHello`]?.count
    const dcshMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayHello`]?.mean
    const dcshMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayHello`]?.min
    const dcshP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayHello`]?.p50
    const dcshP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayHello`]?.p75
    const dcshP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayHello`]?.p95
    const dcshP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayHello`]?.p99
    const dcshMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayHello`]?.max
    
    const dcstCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayToggle`]?.count
    const dcstMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayToggle`]?.mean
    const dcstMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayToggle`]?.min
    const dcstP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayToggle`]?.p50
    const dcstP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayToggle`]?.p75
    const dcstP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayToggle`]?.p95
    const dcstP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayToggle`]?.p99
    const dcstMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.sayToggle`]?.max
    
    const dcspdiCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`]?.count
    const dcspdiMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`]?.mean
    const dcspdiMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`]?.min
    const dcspdiP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`]?.p50
    const dcspdiP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`]?.p75
    const dcspdiP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`]?.p95
    const dcspdiP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`]?.p99
    const dcspdiMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItems`]?.max
    
    const dcspdicCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`]?.count
    const dcspdicMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`]?.mean
    const dcspdicMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`]?.min
    const dcspdicP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`]?.p50
    const dcspdicP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`]?.p75
    const dcspdicP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`]?.p95
    const dcspdicP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`]?.p99
    const dcspdicMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchPayDateItemsCount`]?.max
    
    const dcssCount = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchStatistics`]?.count
    const dcssMean = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchStatistics`]?.mean
    const dcssMin = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchStatistics`]?.min
    const dcssP50 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchStatistics`]?.p50
    const dcssP75 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchStatistics`]?.p75
    const dcssP95 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchStatistics`]?.p95
    const dcssP99 = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchStatistics`]?.p99
    const dcssMax = data?.timers && data?.timers[`com.cats.server.controllers.DashboardController.searchStatistics`]?.max
    
    // Data Message Definition Controller
    const dmdcgCount = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`]?.count
    const dmdcgMean = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`]?.mean
    const dmdcgMin = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`]?.min
    const dmdcgP50 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`]?.p50
    const dmdcgP75 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`]?.p75
    const dmdcgP95 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`]?.p95
    const dmdcgP99 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`]?.p99
    const dmdcgMax = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.get`]?.max
    
    const dmdcgaCount = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`]?.count
    const dmdcgaMean = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`]?.mean
    const dmdcgaMin = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`]?.min
    const dmdcgaP50 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`]?.p50
    const dmdcgaP75 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`]?.p75
    const dmdcgaP95 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`]?.p95
    const dmdcgaP99 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`]?.p99
    const dmdcgaMax = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.getAll`]?.max
    
    const dmdcsCount = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`]?.count
    const dmdcsMean = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`]?.mean
    const dmdcsMin = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`]?.min
    const dmdcsP50 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`]?.p50
    const dmdcsP75 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`]?.p75
    const dmdcsP95 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`]?.p95
    const dmdcsP99 = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`]?.p99
    const dmdcsMax = data?.timers && data?.timers[`com.cats.server.controllers.DataMessageDefinitionController.save`]?.max
    
    // Diary Controller
    const dccCount = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.count`]?.count
    const dccMean = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.count`]?.mean
    const dccMin = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.count`]?.min
    const dccP50 = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.count`]?.p50
    const dccP75 = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.count`]?.p75
    const dccP95 = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.count`]?.p95
    const dccP99 = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.count`]?.p99
    const dccMax = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.count`]?.max
    
    const dcsCount = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.search`]?.count
    const dcsMean = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.search`]?.mean
    const dcsMin = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.search`]?.min
    const dcsP50 = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.search`]?.p50
    const dcsP75 = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.search`]?.p75
    const dcsP95 = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.search`]?.p95
    const dcsP99 = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.search`]?.p99
    const dcsMax = data?.timers && data?.timers[`com.cats.server.controllers.DiaryController.search`]?.max
    
    // Election Controller
    const ecceCount = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.canElect`]?.count
    const ecceMean = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.canElect`]?.mean
    const ecceMin = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.canElect`]?.min
    const ecceP50 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.canElect`]?.p50
    const ecceP75 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.canElect`]?.p75
    const ecceP95 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.canElect`]?.p95
    const ecceP99 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.canElect`]?.p99
    const ecceMax = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.canElect`]?.max
    
    const ecdeCount = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.deleteElection`]?.count
    const ecdeMean = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.deleteElection`]?.mean
    const ecdeMin = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.deleteElection`]?.min
    const ecdeP50 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.deleteElection`]?.p50
    const ecdeP75 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.deleteElection`]?.p75
    const ecdeP95 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.deleteElection`]?.p95
    const ecdeP99 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.deleteElection`]?.p99
    const ecdeMax = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.deleteElection`]?.max
    
    const ecdbeCount = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.doBulkElection`]?.count
    const ecdbeMean = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.doBulkElection`]?.mean
    const ecdbeMin = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.doBulkElection`]?.min
    const ecdbeP50 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.doBulkElection`]?.p50
    const ecdbeP75 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.doBulkElection`]?.p75
    const ecdbeP95 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.doBulkElection`]?.p95
    const ecdbeP99 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.doBulkElection`]?.p99
    const ecdbeMax = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.doBulkElection`]?.max
    
    const eceeCount = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.editElection`]?.count
    const eceeMean = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.editElection`]?.mean
    const eceeMin = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.editElection`]?.min
    const eceeP50 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.editElection`]?.p50
    const eceeP75 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.editElection`]?.p75
    const eceeP95 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.editElection`]?.p95
    const eceeP99 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.editElection`]?.p99
    const eceeMax = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.editElection`]?.max
    
    const ecgercCount = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`]?.count
    const ecgercMean = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`]?.mean
    const ecgercMin = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`]?.min
    const ecgercP50 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`]?.p50
    const ecgercP75 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`]?.p75
    const ecgercP95 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`]?.p95
    const ecgercP99 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`]?.p99
    const ecgercMax = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElectionRowCount`]?.max
    
    const ecgeCount = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElections`]?.count
    const ecgeMean = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElections`]?.mean
    const ecgeMin = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElections`]?.min
    const ecgeP50 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElections`]?.p50
    const ecgeP75 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElections`]?.p75
    const ecgeP95 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElections`]?.p95
    const ecgeP99 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElections`]?.p99
    const ecgeMax = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getElections`]?.max
    
    const ecgssCount = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`]?.count
    const ecgssMean = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`]?.mean
    const ecgssMin = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`]?.min
    const ecgssP50 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`]?.p50
    const ecgssP75 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`]?.p75
    const ecgssP95 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`]?.p95
    const ecgssP99 = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`]?.p99
    const ecgssMax = data?.timers && data?.timers[`com.cats.server.controllers.ElectionController.getSavedSearches`]?.max
    
    // File Browser Controller
    const fbccfdhCount = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`]?.count
    const fbccfdhMean = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`]?.mean
    const fbccfdhMin = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`]?.min
    const fbccfdhP50 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`]?.p50
    const fbccfdhP75 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`]?.p75
    const fbccfdhP95 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`]?.p95
    const fbccfdhP99 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`]?.p99
    const fbccfdhMax = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.commFileDownloadHandler`]?.max
    
    const fbcdhCount = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`]?.count
    const fbcdhMean = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`]?.mean
    const fbcdhMin = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`]?.min
    const fbcdhP50 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`]?.p50
    const fbcdhP75 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`]?.p75
    const fbcdhP95 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`]?.p95
    const fbcdhP99 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`]?.p99
    const fbcdhMax = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.downloadHandler`]?.max
    
    const fbcgfrCount = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`]?.count
    const fbcgfrMean = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`]?.mean
    const fbcgfrMin = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`]?.min
    const fbcgfrP50 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`]?.p50
    const fbcgfrP75 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`]?.p75
    const fbcgfrP95 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`]?.p95
    const fbcgfrP99 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`]?.p99
    const fbcgfrMax = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getFileRoots`]?.max
    
    const fbcgpCount = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getPath`]?.count
    const fbcgpMean = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getPath`]?.mean
    const fbcgpMin = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getPath`]?.min
    const fbcgpP50 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getPath`]?.p50
    const fbcgpP75 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getPath`]?.p75
    const fbcgpP95 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getPath`]?.p95
    const fbcgpP99 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getPath`]?.p99
    const fbcgpMax = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getPath`]?.max
    
    const fbcgrpCount = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`]?.count
    const fbcgrpMean = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`]?.mean
    const fbcgrpMin = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`]?.min
    const fbcgrpP50 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`]?.p50
    const fbcgrpP75 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`]?.p75
    const fbcgrpP95 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`]?.p95
    const fbcgrpP99 = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`]?.p99
    const fbcgrpMax = data?.timers && data?.timers[`com.cats.server.controllers.FileBrowserController.getRootPath`]?.max
    
    // Installation Controller 
    const icgciCount = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`]?.count
    const icgciMean = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`]?.mean
    const icgciMin = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`]?.min
    const icgciP50 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`]?.p50
    const icgciP75 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`]?.p75
    const icgciP95 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`]?.p95
    const icgciP99 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`]?.p99
    const icgciMax = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getCurrentInstallation`]?.max
    
    const icgiCount = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getInstallations`]?.count
    const icgiMean = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getInstallations`]?.mean
    const icgiMin = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getInstallations`]?.min
    const icgiP50 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getInstallations`]?.p50
    const icgiP75 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getInstallations`]?.p75
    const icgiP95 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getInstallations`]?.p95
    const icgiP99 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getInstallations`]?.p99
    const icgiMax = data?.timers && data?.timers[`com.cats.server.controllers.InstallationController.getInstallations`]?.max
    
    // Installation Property Controller
    const ipcgpsCount = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`]?.count
    const ipcgpsMean = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`]?.mean
    const ipcgpsMin = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`]?.min
    const ipcgpsP50 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`]?.p50
    const ipcgpsP75 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`]?.p75
    const ipcgpsP95 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`]?.p95
    const ipcgpsP99 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`]?.p99
    const ipcgpsMax = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperties`]?.max
    
    const ipcgpcsvCount = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`]?.count
    const ipcgpcsvMean = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`]?.mean
    const ipcgpcsvMin = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`]?.min
    const ipcgpcsvP50 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`]?.p50
    const ipcgpcsvP75 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`]?.p75
    const ipcgpcsvP95 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`]?.p95
    const ipcgpcsvP99 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`]?.p99
    const ipcgpcsvMax = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsCSV`]?.max
        
    const ipcgpjCount = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`]?.count
    const ipcgpjMean = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`]?.mean
    const ipcgpjMin = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`]?.min
    const ipcgpjP50 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`]?.p50
    const ipcgpjP75 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`]?.p75
    const ipcgpjP95 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`]?.p95
    const ipcgpjP99 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`]?.p99
    const ipcgpjMax = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsJson`]?.max
        
    const ipcgppCount = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`]?.count
    const ipcgppMean = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`]?.mean
    const ipcgppMin = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`]?.min
    const ipcgppP50 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`]?.p50
    const ipcgppP75 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`]?.p75
    const ipcgppP95 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`]?.p95
    const ipcgppP99 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`]?.p99
    const ipcgppMax = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getPropertiesAsProps`]?.max
        
    const ipcgpCount = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`]?.count
    const ipcgpMean = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`]?.mean
    const ipcgpMin = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`]?.min
    const ipcgpP50 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`]?.p50
    const ipcgpP75 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`]?.p75
    const ipcgpP95 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`]?.p95
    const ipcgpP99 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`]?.p99
    const ipcgpMax = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.getProperty`]?.max
    
    const ipcsCount = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.save`]?.count
    const ipcsMean = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.save`]?.mean
    const ipcsMin = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.save`]?.min
    const ipcsP50 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.save`]?.p50
    const ipcsP75 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.save`]?.p75
    const ipcsP95 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.save`]?.p95
    const ipcsP99 = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.save`]?.p99
    const ipcsMax = data?.timers && data?.timers[`com.cats.server.controllers.InstallationPropertyController.save`]?.max
    
    //Object Note Controller  
    const oncgonCount = data?.timers && data?.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`]?.count
    const oncgonMean = data?.timers && data?.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`]?.mean
    const oncgonMin = data?.timers && data?.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`]?.min
    const oncgonP50 = data?.timers && data?.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`]?.p50
    const oncgonP75 = data?.timers && data?.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`]?.p75
    const oncgonP95 = data?.timers && data?.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`]?.p95
    const oncgonP99 = data?.timers && data?.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`]?.p99
    const oncgonMax = data?.timers && data?.timers[`com.cats.server.controllers.ObjectNoteController.getObjectNotes`]?.max
    
    //Simple Rule Controller  
    const srcgbdCount = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`]?.count
    const srcgbdMean = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`]?.mean
    const srcgbdMin = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`]?.min
    const srcgbdP50 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`]?.p50
    const srcgbdP75 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`]?.p75
    const srcgbdP95 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`]?.p95
    const srcgbdP99 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`]?.p99
    const srcgbdMax = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getByDescription`]?.max
    
    const srcgrsdCount = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`]?.count
    const srcgrsdMean = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`]?.mean
    const srcgrsdMin = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`]?.min
    const srcgrsdP50 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`]?.p50
    const srcgrsdP75 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`]?.p75
    const srcgrsdP95 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`]?.p95
    const srcgrsdP99 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`]?.p99
    const srcgrsdMax = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.getRuleSetDescriptions`]?.max
    
    const srcsCount = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.save`]?.count
    const srcsMean = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.save`]?.mean
    const srcsMin = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.save`]?.min
    const srcsP50 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.save`]?.p50
    const srcsP75 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.save`]?.p75
    const srcsP95 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.save`]?.p95
    const srcsP99 = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.save`]?.p99
    const srcsMax = data?.timers && data?.timers[`com.cats.server.controllers.SimpleRuleController.save`]?.max
    
    //Static Data Controller 
    const sdcgcCount = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`]?.count
    const sdcgcMean = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`]?.mean
    const sdcgcMin = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`]?.min
    const sdcgcP50 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`]?.p50
    const sdcgcP75 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`]?.p75
    const sdcgcP95 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`]?.p95
    const sdcgcP99 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`]?.p99
    const sdcgcMax = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getCurrencies`]?.max
    
    const sdcgipkCount = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`]?.count
    const sdcgipkMean = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`]?.mean
    const sdcgipkMin = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`]?.min
    const sdcgipkP50 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`]?.p50
    const sdcgipkP75 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`]?.p75
    const sdcgipkP95 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`]?.p95
    const sdcgipkP99 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`]?.p99
    const sdcgipkMax = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getInstrumentPropertyKeys`]?.max
        
    const sdcgpCount = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getPlace`]?.count
    const sdcgpMean = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getPlace`]?.mean
    const sdcgpMin = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getPlace`]?.min
    const sdcgpP50 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getPlace`]?.p50
    const sdcgpP75 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getPlace`]?.p75
    const sdcgpP95 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getPlace`]?.p95
    const sdcgpP99 = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getPlace`]?.p99
    const sdcgpMax = data?.timers && data?.timers[`com.cats.server.controllers.StaticDataController.getPlace`]?.max
    
    //System Exception Controller
    const secgetCount = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`]?.count
    const secgetMean = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`]?.mean
    const secgetMin = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`]?.min
    const secgetP50 = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`]?.p50
    const secgetP75 = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`]?.p75
    const secgetP95 = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`]?.p95
    const secgetP99 = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`]?.p99
    const secgetMax = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionTypes`]?.max

    const secgebicaCount = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`]?.count
    const secgebicaMean = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`]?.mean
    const secgebicaMin = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`]?.min
    const secgebicaP50 = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`]?.p50
    const secgebicaP75 = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`]?.p75
    const secgebicaP95 = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`]?.p95
    const secgebicaP99 = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`]?.p99
    const secgebicaMax = data?.timers && data?.timers[`com.cats.server.controllers.SystemExceptionController.getExceptionsByIdCA`]?.max
    
    //User Controller
    const ucaarCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.approveAccountRequest`]?.count
    const ucaarMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.approveAccountRequest`]?.mean
    const ucaarMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.approveAccountRequest`]?.min
    const ucaarP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.approveAccountRequest`]?.p50
    const ucaarP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.approveAccountRequest`]?.p75
    const ucaarP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.approveAccountRequest`]?.p95
    const ucaarP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.approveAccountRequest`]?.p99
    const ucaarMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.approveAccountRequest`]?.max

    const ucaCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.authenticate`]?.count
    const ucaMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.authenticate`]?.mean
    const ucaMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.authenticate`]?.min
    const ucaP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.authenticate`]?.p50
    const ucaP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.authenticate`]?.p75
    const ucaP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.authenticate`]?.p95
    const ucaP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.authenticate`]?.p99
    const ucaMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.authenticate`]?.max
        
    const uccpCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.changePassword`]?.count
    const uccpMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.changePassword`]?.mean
    const uccpMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.changePassword`]?.min
    const uccpP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.changePassword`]?.p50
    const uccpP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.changePassword`]?.p75
    const uccpP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.changePassword`]?.p95
    const uccpP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.changePassword`]?.p99
    const uccpMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.changePassword`]?.max
        
    const ucchpCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.checkPassword`]?.count
    const ucchpMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.checkPassword`]?.mean
    const ucchpMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.checkPassword`]?.min
    const ucchpP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.checkPassword`]?.p50
    const ucchpP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.checkPassword`]?.p75
    const ucchpP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.checkPassword`]?.p95
    const ucchpP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.checkPassword`]?.p99
    const ucchpMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.checkPassword`]?.max
        
    const ucdaCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.deactivateAccount`]?.count
    const ucdaMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.deactivateAccount`]?.mean
    const ucdaMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.deactivateAccount`]?.min
    const ucdaP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.deactivateAccount`]?.p50
    const ucdaP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.deactivateAccount`]?.p75
    const ucdaP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.deactivateAccount`]?.p95
    const ucdaP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.deactivateAccount`]?.p99
    const ucdaMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.deactivateAccount`]?.max

    const ucfpCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.forgottenPassword`]?.count
    const ucfpMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.forgottenPassword`]?.mean
    const ucfpMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.forgottenPassword`]?.min
    const ucfpP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.forgottenPassword`]?.p50
    const ucfpP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.forgottenPassword`]?.p75
    const ucfpP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.forgottenPassword`]?.p95
    const ucfpP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.forgottenPassword`]?.p99
    const ucfpMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.forgottenPassword`]?.max
        
    const ucgiCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImage`]?.count
    const ucgiMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImage`]?.mean
    const ucgiMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImage`]?.min
    const ucgiP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImage`]?.p50
    const ucgiP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImage`]?.p75
    const ucgiP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImage`]?.p95
    const ucgiP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImage`]?.p99
    const ucgiMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImage`]?.max
        
    const ucgifCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImageForm`]?.count
    const ucgifMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImageForm`]?.mean
    const ucgifMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImageForm`]?.min
    const ucgifP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImageForm`]?.p50
    const ucgifP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImageForm`]?.p75
    const ucgifP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImageForm`]?.p95
    const ucgifP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImageForm`]?.p99
    const ucgifMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getImageForm`]?.max
        
    const ucgmuaCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`]?.count 
    const ucgmuaMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`]?.mean
    const ucgmuaMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`]?.min
    const ucgmuaP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`]?.p50
    const ucgmuaP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`]?.p75
    const ucgmuaP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`]?.p95
    const ucgmuaP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`]?.p99
    const ucgmuaMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getMatchingUserAccounts`]?.max
        
    const ucgsdCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getSystemDate`]?.count
    const ucgsdMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getSystemDate`]?.mean
    const ucgsdMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getSystemDate`]?.min
    const ucgsdP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getSystemDate`]?.p50
    const ucgsdP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getSystemDate`]?.p75
    const ucgsdP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getSystemDate`]?.p95
    const ucgsdP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getSystemDate`]?.p99
    const ucgsdMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.getSystemDate`]?.max
    
    const uciaCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isAuthenticated`]?.count
    const uciaMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isAuthenticated`]?.mean
    const uciaMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isAuthenticated`]?.min
    const uciaP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isAuthenticated`]?.p50
    const uciaP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isAuthenticated`]?.p75
    const uciaP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isAuthenticated`]?.p95
    const uciaP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isAuthenticated`]?.p99
    const uciaMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isAuthenticated`]?.max 
    
    const uciuaCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`]?.count
    const uciuaMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`]?.mean
    const uciuaMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`]?.min
    const uciuaP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`]?.p50
    const uciuaP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`]?.p75
    const uciuaP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`]?.p95
    const uciuaP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`]?.p99
    const uciuaMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.isUsernameAvailable`]?.max
    
    const ucraCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.reactivateAccount`]?.count
    const ucraMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.reactivateAccount`]?.mean
    const ucraMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.reactivateAccount`]?.min
    const ucraP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.reactivateAccount`]?.p50
    const ucraP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.reactivateAccount`]?.p75
    const ucraP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.reactivateAccount`]?.p95
    const ucraP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.reactivateAccount`]?.p99
    const ucraMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.reactivateAccount`]?.max
    
    const ucrarCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`]?.count
    const ucrarMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`]?.mean
    const ucrarMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`]?.min
    const ucrarP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`]?.p50
    const ucrarP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`]?.p75
    const ucrarP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`]?.p95
    const ucrarP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`]?.p99
    const ucrarMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.rejectAccountRequest`]?.max

    const ucrqaCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.requestAccount`]?.count
    const ucrqaMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.requestAccount`]?.mean
    const ucrqaMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.requestAccount`]?.min
    const ucrqaP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.requestAccount`]?.p50
    const ucrqaP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.requestAccount`]?.p75
    const ucrqaP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.requestAccount`]?.p95
    const ucrqaP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.requestAccount`]?.p99
    const ucrqaMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.requestAccount`]?.max

    const ucrpCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.resetPassword`]?.count
    const ucrpMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.resetPassword`]?.mean
    const ucrpMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.resetPassword`]?.min
    const ucrpP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.resetPassword`]?.p50
    const ucrpP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.resetPassword`]?.p75
    const ucrpP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.resetPassword`]?.p95
    const ucrpP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.resetPassword`]?.p99
    const ucrpMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.resetPassword`]?.max
    
    const ucsarCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequest`]?.count
    const ucsarMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequest`]?.mean
    const ucsarMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequest`]?.min
    const ucsarP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequest`]?.p50
    const ucsarP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequest`]?.p75
    const ucsarP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequest`]?.p95
    const ucsarP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequest`]?.p99
    const ucsarMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequest`]?.max

    const ucsarcCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`]?.count
    const ucsarcMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`]?.mean
    const ucsarcMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`]?.min
    const ucsarcP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`]?.p50
    const ucsarcP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`]?.p75
    const ucsarcP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`]?.p95
    const ucsarcP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`]?.p99
    const ucsarcMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchAccountRequestCount`]?.max

    const ucsaacCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`]?.count
    const ucsaacMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`]?.mean
    const ucsaacMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`]?.min
    const ucsaacP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`]?.p50
    const ucsaacP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`]?.p75
    const ucsaacP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`]?.p95
    const ucsaacP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`]?.p99
    const ucsaacMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccountCount`]?.max

    const ucsaaCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`]?.count
    const ucsaaMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`]?.mean
    const ucsaaMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`]?.min
    const ucsaaP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`]?.p50
    const ucsaaP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`]?.p75
    const ucsaaP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`]?.p95
    const ucsaaP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`]?.p99
    const ucsaaMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchActiveAccounts`]?.max

    const ucsdacCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`]?.count
    const ucsdacMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`]?.mean
    const ucsdacMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`]?.min
    const ucsdacP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`]?.p50
    const ucsdacP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`]?.p75
    const ucsdacP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`]?.p95
    const ucsdacP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`]?.p99
    const ucsdacMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccountCount`]?.max
    
    const ucsdaCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`]?.count
    const ucsdaMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`]?.mean
    const ucsdaMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`]?.min
    const ucsdaP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`]?.p50
    const ucsdaP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`]?.p75
    const ucsdaP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`]?.p95
    const ucsdaP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`]?.p99
    const ucsdaMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.searchDeactivatedAccounts`]?.max

    const ucuuCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.updateUser`]?.count
    const ucuuMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.updateUser`]?.mean
    const ucuuMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.updateUser`]?.min
    const ucuuP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.updateUser`]?.p50
    const ucuuP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.updateUser`]?.p75
    const ucuuP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.updateUser`]?.p95
    const ucuuP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.updateUser`]?.p99
    const ucuuMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.updateUser`]?.max
    
    const ucuiCount = data?.timers && data?.timers[`com.cats.server.controllers.UserController.uploadImage`]?.count
    const ucuiMean = data?.timers && data?.timers[`com.cats.server.controllers.UserController.uploadImage`]?.mean
    const ucuiMin = data?.timers && data?.timers[`com.cats.server.controllers.UserController.uploadImage`]?.min
    const ucuiP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.uploadImage`]?.p50
    const ucuiP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.uploadImage`]?.p75
    const ucuiP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.uploadImage`]?.p95
    const ucuiP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserController.uploadImage`]?.p99
    const ucuiMax = data?.timers && data?.timers[`com.cats.server.controllers.UserController.uploadImage`]?.max
    
    //User Event Controller
    const ueccCount = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.count`]?.count
    const ueccMean = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.count`]?.mean
    const ueccMin = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.count`]?.min
    const ueccP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.count`]?.p50
    const ueccP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.count`]?.p75
    const ueccP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.count`]?.p95
    const ueccP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.count`]?.p99
    const ueccMax = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.count`]?.max
            
    const uecsCount = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.search`]?.count
    const uecsMean = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.search`]?.mean
    const uecsMin = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.search`]?.min
    const uecsP50 = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.search`]?.p50
    const uecsP75 = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.search`]?.p75
    const uecsP95 = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.search`]?.p95
    const uecsP99 = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.search`]?.p99
    const uecsMax = data?.timers && data?.timers[`com.cats.server.controllers.UserEventController.search`]?.max
    
    //Version Controller
    const vcgvCount = data?.timers && data?.timers[`com.cats.server.controllers.VersionController.getVersion`]?.count
    const vcgvMean = data?.timers && data?.timers[`com.cats.server.controllers.VersionController.getVersion`]?.mean
    const vcgvMin = data?.timers && data?.timers[`com.cats.server.controllers.VersionController.getVersion`]?.min
    const vcgvP50 = data?.timers && data?.timers[`com.cats.server.controllers.VersionController.getVersion`]?.p50
    const vcgvP75 = data?.timers && data?.timers[`com.cats.server.controllers.VersionController.getVersion`]?.p75
    const vcgvP95 = data?.timers && data?.timers[`com.cats.server.controllers.VersionController.getVersion`]?.p95
    const vcgvP99 = data?.timers && data?.timers[`com.cats.server.controllers.VersionController.getVersion`]?.p99
    const vcgvMax = data?.timers && data?.timers[`com.cats.server.controllers.VersionController.getVersion`]?.max
    
    //Instrumented Filter
    const ifrCount = data?.timers && data?.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`]?.count
    const ifrMean = data?.timers && data?.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`]?.mean
    const ifrMin = data?.timers && data?.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`]?.min
    const ifrP50 = data?.timers && data?.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`]?.p50
    const ifrP75 = data?.timers && data?.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`]?.p75
    const ifrP95 = data?.timers && data?.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`]?.p95
    const ifrP99 = data?.timers && data?.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`]?.p99
    const ifrMax = data?.timers && data?.timers[`com.codahale.metrics.servlet.InstrumentedFilter.requests`]?.max
    
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
            <div className="flex flex-col lg:flex-row justify-around mb-12">
                <div className="w-full flex flex-col">
                    <h1 className="text-2xl pb-2">JVM Metrics</h1>
                    <h2 className="text-xl">Memory</h2>
                    <p className="text-sm mt-3">Total Memory ({usedMemory || 0}M / {maxMemory || 0}M)</p>
                    <div className="w-full lg:w-3/4">
                        <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs z-10">
                            <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000 z-0" style={{ width: `${memory}%` }}>
                            </div>
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2">{memory || 0}%</span>
                        </div>
                        <p className="text-sm mt-3">Heap Memory ({usedHeapMemory}M / {maxHeapMemory}M)</p>
                        <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs z-10">
                            <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000 z-0" style={{ width: `${heapMemory}%` }}>
                            </div>
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2">{heapMemory || 0}%</span>
                        </div>
                        <p className="text-sm mt-3">Non Heap Memory ({usedNonHeapMemory}M / {maxNonHeapMemory}M)</p>
                        <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs z-10">
                            <div className="bg-red-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000 z-0" style={{ width: `${nonHeapMemory}%` }}>
                            </div>
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2">{nonHeapMemory || 0}%</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col mt-10">
                    <div className="flex">
                        <h2 className="text-xl">
                            Threads -
                        </h2>
                        <span className="flex text-sm mt-1 ml-1">Total: {threads || 0}
                            <span className="flex h-3 w-3 m-1 ml-1">
                            <span className="animate-ping relative inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="absolute inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                        </span>
                    </div>
                    <p className="text-sm mt-3">Runnable ({runnable || 0})</p>
                    <div className="w-full lg:w-3/4">
                        <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs z-10">
                            <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000 z-0" style={{ width: `${runnableThread}%` }}>
                            </div>
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2">{runnableThread || 0}%</span>
                        </div>
                        <p className="text-sm mt-3">Timed Waiting ({timedWaiting || 0})</p>
                        <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs z-10">
                            <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000 z-0" style={{ width: `${timedWaitingThread}%` }}>
                            </div>
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2">{timedWaitingThread || 0}%</span>
                        </div>
                        <p className="text-sm mt-3">Waiting ({waiting || 0})</p>
                        <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs z-10">
                            <div className="bg-yellow-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000 z-0" style={{ width: `${waitingThread}%` }}>
                            </div>
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2">{waitingThread || 0}%</span>
                        </div>
                        <p className="text-sm mt-3">Blocked ({blocked || 0})</p>
                        <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs z-10">
                            <div className="bg-gray-400 h-full py-4 animate-pulse transition-all ease-in-out duration-1000 z-0" style={{ width: `${blockedThread}%` }}>
                            </div>
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2">{blockedThread || 0}%</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col mt-10">
                    <div className="flex">
                        <h2 className="text-xl">
                            Garbage Collections
                        </h2>
                    </div>
                    <p className="text-sm mt-3">Mark Sweep count - G1 old ({markSweepTime || 0})</p>
                    <div className="w-full lg:w-3/4">
                        <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs z-10">
                            <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000 z-0" style={{ width: `${markSweepTime}` }}>
                            </div>
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2">{markSweepTime || 0}</span>
                        </div>
                        <p className="text-sm mt-3">Mark Sweep time - G1 old ({markSweepCount || 0})</p>
                        <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs z-10">
                            <div className="bg-yellow-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000 z-0" style={{ width: `${markSweepCount}` }}>
                            </div>
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2">{markSweepCount || 0}</span>
                        </div>
                        <p className="text-sm mt-3">Scavenge count - G1 young ({scavengeTime || 0})</p>
                        <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs z-10">
                            <div className="bg-green-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000 z-0" style={{ width: `${scavengeTime}` }}>
                            </div>
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2">{scavengeTime || 0}</span>
                        </div>
                        <p className="text-sm mt-3">Scavenge time - G1 young ({scavengeCount || 0})</p>
                        <div className="relative mt-2 bg-gray-600 rounded-full overflow-hidden text-white text-xs z-10">
                            <div className="bg-yellow-500 h-full py-4 animate-pulse transition-all ease-in-out duration-1000 z-0" style={{ width: `${scavengeCount}` }}>
                            </div>
                            <span className="absolute top-0 left-0 h-full flex items-center pl-2">{scavengeCount || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-2xl">HTTP requests (events per second)</h1>
            <p className="text-sm mt-2">Active Requests: {activeRequests || 0} - Total Requests: {totalRequests || 0}</p>
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
                                {/* <p>{ncMean}</p> */}
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
                                <p>{accnpaMean == 0 ? 0 : accnpaMean !== 'NaN' ? accnpaMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpaMin == 0 ? 0 : accnpaMin !== 'NaN' ? accnpaMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpaP50 == 0 ? 0 : accnpaP50 !== 'NaN' ? accnpaP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpaP75 == 0 ? 0 : accnpaP75 !== 'NaN' ? accnpaP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpaP95 == 0 ? 0 : accnpaP95 !== 'NaN' ? accnpaP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpaP99 == 0 ? 0 : accnpaP99 !== 'NaN' ? accnpaP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpaMax == 0 ? 0 : accnpaMax !== 'NaN' ? accnpaMax?.toFixed(9) : ''}</p>
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
                                <p>{accnpcMean == 0 ? 0 : accnpcMean !== 'NaN' ? accnpcMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpcMin == 0 ? 0 : accnpcMin !== 'NaN' ? accnpcMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpcP50 == 0 ? 0 : accnpcP50 !== 'NaN' ? accnpcP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpcP75 == 0 ? 0 : accnpcP75 !== 'NaN' ? accnpcP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpcP95 == 0 ? 0 : accnpcP95 !== 'NaN' ? accnpcP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpcP99 == 0 ? 0 : accnpcP99 !== 'NaN' ? accnpcP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpcMax == 0 ? 0 : accnpcMax !== 'NaN' ? accnpcMax?.toFixed(9) : ''}</p>
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
                                <p>{accnpxrMean == 0 ? 0 : accnpxrMean !== 'NaN' ? accnpxrMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpxrMin == 0 ? 0 : accnpxrMin !== 'NaN' ? accnpxrMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpxrP50 == 0 ? 0 : accnpxrP50 !== 'NaN' ? accnpxrP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpxrP75 == 0 ? 0 : accnpxrP75 !== 'NaN' ? accnpxrP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpxrP95 == 0 ? 0 : accnpxrP95 !== 'NaN' ? accnpxrP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpxrP99 == 0 ? 0 : accnpxrP99 !== 'NaN' ? accnpxrP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accnpxrMax == 0 ? 0 : accnpxrMax !== 'NaN' ? accnpxrMax?.toFixed(9) : ''}</p>
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
                                <p>{acgaMean == 0 ? 0 : acgaMean !== 'NaN' ? acgaMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaMin == 0 ? 0 : acgaMin !== 'NaN' ? acgaMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaP50 == 0 ? 0 : acgaP50 !== 'NaN' ? acgaP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaP75 == 0 ? 0 : acgaP75 !== 'NaN' ? acgaP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaP95 == 0 ? 0 : acgaP95 !== 'NaN' ? acgaP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaP99 == 0 ? 0 : acgaP99 !== 'NaN' ? acgaP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaMax == 0 ? 0 : acgaMax !== 'NaN' ? acgaMax?.toFixed(9) : ''}</p>
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
                                <p>{acgacpMean == 0 ? 0 : acgacpMean !== 'NaN' ? acgacpMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgacpMin == 0 ? 0 : acgacpMin !== 'NaN' ? acgacpMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgacpP50 == 0 ? 0 : acgacpP50 !== 'NaN' ? acgacpP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgacpP75 == 0 ? 0 : acgacpP75 !== 'NaN' ? acgacpP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgacpP95 == 0 ? 0 : acgacpP95 !== 'NaN' ? acgacpP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgacpP99 == 0 ? 0 : acgacpP99 !== 'NaN' ? acgacpP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgacpMax == 0 ? 0 : acgacpMax !== 'NaN' ? acgacpMax?.toFixed(9) : ''}</p>
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
                                <p>{acgaoMean == 0 ? 0 : acgaoMean !== 'NaN' ? acgaoMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaoMin == 0 ? 0 : acgaoMin !== 'NaN' ? acgaoMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaoP50 == 0 ? 0 : acgaoP50 !== 'NaN' ? acgaoP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaoP75 == 0 ? 0 : acgaoP75 !== 'NaN' ? acgaoP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaoP95 == 0 ? 0 : acgaoP95 !== 'NaN' ? acgaoP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaoP99 == 0 ? 0 : acgaoP99 !== 'NaN' ? acgaoP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgaoMax == 0 ? 0 : acgaoMax !== 'NaN' ? acgaoMax?.toFixed(9) : ''}</p>
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
                                <p>{acgceMean == 0 ? 0 : acgceMean !== 'NaN' ? acgceMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgceMin == 0 ? 0 : acgceMin !== 'NaN' ? acgceMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgceP50 == 0 ? 0 : acgceP50 !== 'NaN' ? acgceP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgceP75 == 0 ? 0 : acgceP75 !== 'NaN' ? acgceP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgceP95 == 0 ? 0 : acgceP95 !== 'NaN' ? acgceP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgceP99 == 0 ? 0 : acgceP99 !== 'NaN' ? acgceP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgceMax == 0 ? 0 : acgceMax !== 'NaN' ? acgceMax?.toFixed(9) : ''}</p>
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
                                <p>{acgcrMean == 0 ? 0 : acgcrMean !== 'NaN' ? acgcrMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgcrMin == 0 ? 0 : acgcrMin !== 'NaN' ? acgcrMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgcrP50 == 0 ? 0 : acgcrP50 !== 'NaN' ? acgcrP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgcrP75 == 0 ? 0 : acgcrP75 !== 'NaN' ? acgcrP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgcrP95 == 0 ? 0 : acgcrP95 !== 'NaN' ? acgcrP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgcrP99 == 0 ? 0 : acgcrP99 !== 'NaN' ? acgcrP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgcrMax == 0 ? 0 : acgcrMax !== 'NaN' ? acgcrMax?.toFixed(9) : ''}</p>
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
                                <p>{acgeMean == 0 ? 0 : acgeMean !== 'NaN' ? acgeMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgeMin == 0 ? 0 : acgeMin !== 'NaN' ? acgeMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgeP50 == 0 ? 0 : acgeP50 !== 'NaN' ? acgeP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgeP75 == 0 ? 0 : acgeP75 !== 'NaN' ? acgeP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgeP95 == 0 ? 0 : acgeP95 !== 'NaN' ? acgeP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgeP99 == 0 ? 0 : acgeP99 !== 'NaN' ? acgeP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgeMax == 0 ? 0 : acgeMax !== 'NaN' ? acgeMax?.toFixed(9) : ''}</p>
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
                                <p>{acgrMean == 0 ? 0 : acgrMean !== 'NaN' ? acgrMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgrMin == 0 ? 0 : acgrMin !== 'NaN' ? acgrMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgrP50 == 0 ? 0 : acgrP50 !== 'NaN' ? acgrP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgrP75 == 0 ? 0 : acgrP75 !== 'NaN' ? acgrP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgrP95 == 0 ? 0 : acgrP95 !== 'NaN' ? acgrP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgrP99 == 0 ? 0 : acgrP99 !== 'NaN' ? acgrP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acgrMax == 0 ? 0 : acgrMax !== 'NaN' ? acgrMax?.toFixed(9) : ''}</p>
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
                                <p>{accsMean == 0 ? 0 : accsMean !== 'NaN' ? accsMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accsMin == 0 ? 0 : accsMin !== 'NaN' ? accsMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accsP50 == 0 ? 0 : accsP50 !== 'NaN' ? accsP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accsP75 == 0 ? 0 : accsP75 !== 'NaN' ? accsP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accsP95 == 0 ? 0 : accsP95 !== 'NaN' ? accsP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accsP99 == 0 ? 0 : accsP99 !== 'NaN' ? accsP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{accsMax == 0 ? 0 : accsMax !== 'NaN' ? accsMax?.toFixed(9) : ''}</p>
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
                                <p>{acusMean == 0 ? 0 : acusMean !== 'NaN' ? acusMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acusMin == 0 ? 0 : acusMin !== 'NaN' ? acusMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acusP50 == 0 ? 0 : acusP50 !== 'NaN' ? acusP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acusP75 == 0 ? 0 : acusP75 !== 'NaN' ? acusP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acusP95 == 0 ? 0 : acusP95 !== 'NaN' ? acusP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acusP99 == 0 ? 0 : acusP99 !== 'NaN' ? acusP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{acusMax == 0 ? 0 : acusMax !== 'NaN' ? acusMax?.toFixed(9) : ''}</p>
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
                                <p>{bcaorbMean == 0 ? 0 : bcaorbMean !== 'NaN' ? bcaorbMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bcaorbMin == 0 ? 0 : bcaorbMin !== 'NaN' ? bcaorbMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bcaorbP50 == 0 ? 0 : bcaorbP50 !== 'NaN' ? bcaorbP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bcaorbP75 == 0 ? 0 : bcaorbP75 !== 'NaN' ? bcaorbP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bcaorbP95 == 0 ? 0 : bcaorbP95 !== 'NaN' ? bcaorbP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bcaorbP99 == 0 ? 0 : bcaorbP99 !== 'NaN' ? bcaorbP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bcaorbMax == 0 ? 0 : bcaorbMax !== 'NaN' ? bcaorbMax?.toFixed(9) : ''}</p>
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
                                <p>{bccsMean == 0 ? 0 : bccsMean !== 'NaN' ? bccsMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bccsMin == 0 ? 0 : bccsMin !== 'NaN' ? bccsMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bccsP50 == 0 ? 0 : bccsP50 !== 'NaN' ? bccsP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bccsP75 == 0 ? 0 : bccsP75 !== 'NaN' ? bccsP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bccsP95 == 0 ? 0 : bccsP95 !== 'NaN' ? bccsP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bccsP99 == 0 ? 0 : bccsP99 !== 'NaN' ? bccsP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{bccsMax == 0 ? 0 : bccsMax !== 'NaN' ? bccsMax?.toFixed(9) : ''}</p>
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
                                <p>{cacgeMean == 0 ? 0 : cacgeMean !== 'NaN' ? cacgeMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgeMin == 0 ? 0 : cacgeMin !== 'NaN' ? cacgeMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgeP50 == 0 ? 0 : cacgeP50 !== 'NaN' ? cacgeP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgeP75 == 0 ? 0 : cacgeP75 !== 'NaN' ? cacgeP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgeP95 == 0 ? 0 : cacgeP95 !== 'NaN' ? cacgeP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgeP99 == 0 ? 0 : cacgeP99 !== 'NaN' ? cacgeP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgeMax == 0 ? 0 : cacgeMax !== 'NaN' ? cacgeMax?.toFixed(9) : ''}</p>
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
                                <p>{cacgercMean == 0 ? 0 : cacgercMean !== 'NaN' ? cacgercMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgercMin == 0 ? 0 : cacgercMin !== 'NaN' ? cacgercMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgercP50 == 0 ? 0 : cacgercP50 !== 'NaN' ? cacgercP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgercP75 == 0 ? 0 : cacgercP75 !== 'NaN' ? cacgercP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgercP95 == 0 ? 0 : cacgercP95 !== 'NaN' ? cacgercP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgercP99 == 0 ? 0 : cacgercP99 !== 'NaN' ? cacgercP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgercMax == 0 ? 0 : cacgercMax !== 'NaN' ? cacgercMax?.toFixed(9) : ''}</p>
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
                                <p>{cacgesMean == 0 ? 0 : cacgesMean !== 'NaN' ? cacgesMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgesMin == 0 ? 0 : cacgesMin !== 'NaN' ? cacgesMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgesP50 == 0 ? 0 : cacgesP50 !== 'NaN' ? cacgesP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgesP75 == 0 ? 0 : cacgesP75 !== 'NaN' ? cacgesP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgesP95 == 0 ? 0 : cacgesP95 !== 'NaN' ? cacgesP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgesP99 == 0 ? 0 : cacgesP99 !== 'NaN' ? cacgesP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgesMax == 0 ? 0 : cacgesMax !== 'NaN' ? cacgesMax?.toFixed(9) : ''}</p>
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
                                <p>{cacgtgMean == 0 ? 0 : cacgtgMean !== 'NaN' ? cacgtgMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgtgMin == 0 ? 0 : cacgtgMin !== 'NaN' ? cacgtgMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgtgP50 == 0 ? 0 : cacgtgP50 !== 'NaN' ? cacgtgP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgtgP75 == 0 ? 0 : cacgtgP75 !== 'NaN' ? cacgtgP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgtgP95 == 0 ? 0 : cacgtgP95 !== 'NaN' ? cacgtgP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgtgP99 == 0 ? 0 : cacgtgP99 !== 'NaN' ? cacgtgP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{cacgtgMax == 0 ? 0 : cacgtgMax !== 'NaN' ? cacgtgMax?.toFixed(9) : ''}</p>
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
                                <p>{dcccdbMean == 0 ? 0 : dcccdbMean !== 'NaN' ? dcccdbMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcccdbMin == 0 ? 0 : dcccdbMin !== 'NaN' ? dcccdbMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcccdbP50 == 0 ? 0 : dcccdbP50 !== 'NaN' ? dcccdbP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcccdbP75 == 0 ? 0 : dcccdbP75 !== 'NaN' ? dcccdbP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcccdbP95 == 0 ? 0 : dcccdbP95 !== 'NaN' ? dcccdbP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcccdbP99 == 0 ? 0 : dcccdbP99 !== 'NaN' ? dcccdbP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcccdbMax == 0 ? 0 : dcccdbMax !== 'NaN' ? dcccdbMax?.toFixed(9) : ''}</p>
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
                                <p>{dccebMean == 0 ? 0 : dccebMean !== 'NaN' ? dccebMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccebMin == 0 ? 0 : dccebMin !== 'NaN' ? dccebMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccebP50 == 0 ? 0 : dccebP50 !== 'NaN' ? dccebP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccebP75 == 0 ? 0 : dccebP75 !== 'NaN' ? dccebP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccebP95 == 0 ? 0 : dccebP95 !== 'NaN' ? dccebP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccebP99 == 0 ? 0 : dccebP99 !== 'NaN' ? dccebP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccebMax == 0 ? 0 : dccebMax !== 'NaN' ? dccebMax?.toFixed(9) : ''}</p>
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
                                <p>{dccpebMean == 0 ? 0 : dccpebMean !== 'NaN' ? dccpebMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccpebMin == 0 ? 0 : dccpebMin !== 'NaN' ? dccpebMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccpebP50 == 0 ? 0 : dccpebP50 !== 'NaN' ? dccpebP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccpebP75 == 0 ? 0 : dccpebP75 !== 'NaN' ? dccpebP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccpebP95 == 0 ? 0 : dccpebP95 !== 'NaN' ? dccpebP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccpebP99 == 0 ? 0 : dccpebP99 !== 'NaN' ? dccpebP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccpebMax == 0 ? 0 : dccpebMax !== 'NaN' ? dccpebMax?.toFixed(9) : ''}</p>
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
                                <p>{dcddMean == 0 ? 0 : dcddMean !== 'NaN' ? dcddMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcddMin == 0 ? 0 : dcddMin !== 'NaN' ? dcddMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcddP50 == 0 ? 0 : dcddP50 !== 'NaN' ? dcddP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcddP75 == 0 ? 0 : dcddP75 !== 'NaN' ? dcddP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcddP95 == 0 ? 0 : dcddP95 !== 'NaN' ? dcddP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcddP99 == 0 ? 0 : dcddP99 !== 'NaN' ? dcddP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcddMax == 0 ? 0 : dcddMax !== 'NaN' ? dcddMax?.toFixed(9) : ''}</p>
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
                                <p>{dcgdcMean == 0 ? 0 : dcgdcMean !== 'NaN' ? dcgdcMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdcMin == 0 ? 0 : dcgdcMin !== 'NaN' ? dcgdcMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdcP50 == 0 ? 0 : dcgdcP50 !== 'NaN' ? dcgdcP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdcP75 == 0 ? 0 : dcgdcP75 !== 'NaN' ? dcgdcP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdcP95 == 0 ? 0 : dcgdcP95 !== 'NaN' ? dcgdcP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdcP99 == 0 ? 0 : dcgdcP99 !== 'NaN' ? dcgdcP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdcMax == 0 ? 0 : dcgdcMax !== 'NaN' ? dcgdcMax?.toFixed(9) : ''}</p>
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
                                <p>{dcgdoMean == 0 ? 0 : dcgdoMean !== 'NaN' ? dcgdoMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdoMin == 0 ? 0 : dcgdoMin !== 'NaN' ? dcgdoMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdoP50 == 0 ? 0 : dcgdoP50 !== 'NaN' ? dcgdoP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdoP75 == 0 ? 0 : dcgdoP75 !== 'NaN' ? dcgdoP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdoP95 == 0 ? 0 : dcgdoP95 !== 'NaN' ? dcgdoP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdoP99 == 0 ? 0 : dcgdoP99 !== 'NaN' ? dcgdoP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgdoMax == 0 ? 0 : dcgdoMax !== 'NaN' ? dcgdoMax?.toFixed(9) : ''}</p>
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
                                <p>{dcgestdMean == 0 ? 0 : dcgestdMean !== 'NaN' ? dcgestdMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdMin == 0 ? 0 : dcgestdMin !== 'NaN' ? dcgestdMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdP50 == 0 ? 0 : dcgestdP50 !== 'NaN' ? dcgestdP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdP75 == 0 ? 0 : dcgestdP75 !== 'NaN' ? dcgestdP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdP95 == 0 ? 0 : dcgestdP95 !== 'NaN' ? dcgestdP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdP99 == 0 ? 0 : dcgestdP99 !== 'NaN' ? dcgestdP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdMax == 0 ? 0 : dcgestdMax !== 'NaN' ? dcgestdMax?.toFixed(9) : ''}</p>
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
                                <p>{dcgestdcMean == 0 ? 0 : dcgestdcMean !== 'NaN' ? dcgestdcMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdcMin == 0 ? 0 : dcgestdcMin !== 'NaN' ? dcgestdcMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdcP50 == 0 ? 0 : dcgestdcP50 !== 'NaN' ? dcgestdcP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdcP75 == 0 ? 0 : dcgestdcP75 !== 'NaN' ? dcgestdcP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdcP95 == 0 ? 0 : dcgestdcP95 !== 'NaN' ? dcgestdcP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdcP99 == 0 ? 0 : dcgestdcP99 !== 'NaN' ? dcgestdcP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgestdcMax == 0 ? 0 : dcgestdcMax !== 'NaN' ? dcgestdcMax?.toFixed(9) : ''}</p>
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
                                <p>{dcgercMean == 0 ? 0 : dcgercMean !== 'NaN' ? dcgercMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgercMin == 0 ? 0 : dcgercMin !== 'NaN' ? dcgercMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgercP50 == 0 ? 0 : dcgercP50 !== 'NaN' ? dcgercP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgercP75 == 0 ? 0 : dcgercP75 !== 'NaN' ? dcgercP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgercP95 == 0 ? 0 : dcgercP95 !== 'NaN' ? dcgercP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgercP99 == 0 ? 0 : dcgercP99 !== 'NaN' ? dcgercP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgercMax == 0 ? 0 : dcgercMax !== 'NaN' ? dcgercMax?.toFixed(9) : ''}</p>
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
                                <p>{dcgeMean == 0 ? 0 : dcgeMean !== 'NaN' ? dcgeMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgeMin == 0 ? 0 : dcgeMin !== 'NaN' ? dcgeMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgeP50 == 0 ? 0 : dcgeP50 !== 'NaN' ? dcgeP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgeP75 == 0 ? 0 : dcgeP75 !== 'NaN' ? dcgeP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgeP95 == 0 ? 0 : dcgeP95 !== 'NaN' ? dcgeP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgeP99 == 0 ? 0 : dcgeP99 !== 'NaN' ? dcgeP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgeMax == 0 ? 0 : dcgeMax !== 'NaN' ? dcgeMax?.toFixed(9) : ''}</p>
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
                                <p>{dcgnoeMean == 0 ? 0 : dcgnoeMean !== 'NaN' ? dcgnoeMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnoeMin == 0 ? 0 : dcgnoeMin !== 'NaN' ? dcgnoeMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnoeP50 == 0 ? 0 : dcgnoeP50 !== 'NaN' ? dcgnoeP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnoeP75 == 0 ? 0 : dcgnoeP75 !== 'NaN' ? dcgnoeP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnoeP95 == 0 ? 0 : dcgnoeP95 !== 'NaN' ? dcgnoeP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnoeP99 == 0 ? 0 : dcgnoeP99 !== 'NaN' ? dcgnoeP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnoeMax == 0 ? 0 : dcgnoeMax !== 'NaN' ? dcgnoeMax?.toFixed(9) : ''}</p>
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
                                <p>{dcgnofweMean == 0 ? 0 : dcgnofweMean !== 'NaN' ? dcgnofweMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnofweMin == 0 ? 0 : dcgnofweMin !== 'NaN' ? dcgnofweMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnofweP50 == 0 ? 0 : dcgnofweP50 !== 'NaN' ? dcgnofweP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnofweP75 == 0 ? 0 : dcgnofweP75 !== 'NaN' ? dcgnofweP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnofweP95 == 0 ? 0 : dcgnofweP95 !== 'NaN' ? dcgnofweP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnofweP99 == 0 ? 0 : dcgnofweP99 !== 'NaN' ? dcgnofweP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcgnofweMax == 0 ? 0 : dcgnofweMax !== 'NaN' ? dcgnofweMax?.toFixed(9) : ''}</p>
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
                                <p>{dclcbMean == 0 ? 0 : dclcbMean !== 'NaN' ? dclcbMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclcbMin == 0 ? 0 : dclcbMin !== 'NaN' ? dclcbMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclcbP50 == 0 ? 0 : dclcbP50 !== 'NaN' ? dclcbP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclcbP75 == 0 ? 0 : dclcbP75 !== 'NaN' ? dclcbP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclcbP95 == 0 ? 0 : dclcbP95 !== 'NaN' ? dclcbP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclcbP99 == 0 ? 0 : dclcbP99 !== 'NaN' ? dclcbP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclcbMax == 0 ? 0 : dclcbMax !== 'NaN' ? dclcbMax?.toFixed(9) : ''}</p>
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
                                <p>{dcldbMean == 0 ? 0 : dcldbMean !== 'NaN' ? dcldbMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcldbMin == 0 ? 0 : dcldbMin !== 'NaN' ? dcldbMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcldbP50 == 0 ? 0 : dcldbP50 !== 'NaN' ? dcldbP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcldbP75 == 0 ? 0 : dcldbP75 !== 'NaN' ? dcldbP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcldbP95 == 0 ? 0 : dcldbP95 !== 'NaN' ? dcldbP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcldbP99 == 0 ? 0 : dcldbP99 !== 'NaN' ? dcldbP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcldbMax == 0 ? 0 : dcldbMax !== 'NaN' ? dcldbMax?.toFixed(9) : ''}</p>
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
                                <p>{dclebMean == 0 ? 0 : dclebMean !== 'NaN' ? dclebMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclebMin == 0 ? 0 : dclebMin !== 'NaN' ? dclebMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclebP50 == 0 ? 0 : dclebP50 !== 'NaN' ? dclebP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclebP75 == 0 ? 0 : dclebP75 !== 'NaN' ? dclebP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclebP95 == 0 ? 0 : dclebP95 !== 'NaN' ? dclebP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclebP99 == 0 ? 0 : dclebP99 !== 'NaN' ? dclebP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclebMax == 0 ? 0 : dclebMax !== 'NaN' ? dclebMax?.toFixed(9) : ''}</p>
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
                                <p>{dclexbMean == 0 ? 0 : dclexbMean !== 'NaN' ? dclexbMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbMin == 0 ? 0 : dclexbMin !== 'NaN' ? dclexbMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbP50 == 0 ? 0 : dclexbP50 !== 'NaN' ? dclexbP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbP75 == 0 ? 0 : dclexbP75 !== 'NaN' ? dclexbP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbP95 == 0 ? 0 : dclexbP95 !== 'NaN' ? dclexbP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbP99 == 0 ? 0 : dclexbP99 !== 'NaN' ? dclexbP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbMax == 0 ? 0 : dclexbMax !== 'NaN' ? dclexbMax?.toFixed(9) : ''}</p>
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
                                <p>{dclexbcMean == 0 ? 0 : dclexbcMean !== 'NaN' ? dclexbcMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbcMin == 0 ? 0 : dclexbcMin !== 'NaN' ? dclexbcMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbcP50 == 0 ? 0 : dclexbcP50 !== 'NaN' ? dclexbcP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbcP75 == 0 ? 0 : dclexbcP75 !== 'NaN' ? dclexbcP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbcP95 == 0 ? 0 : dclexbcP95 !== 'NaN' ? dclexbcP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbcP99 == 0 ? 0 : dclexbcP99 !== 'NaN' ? dclexbcP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dclexbcMax == 0 ? 0 : dclexbcMax !== 'NaN' ? dclexbcMax?.toFixed(9) : ''}</p>
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
                                <p>{dcsdcMean == 0 ? 0 : dcsdcMean !== 'NaN' ? dcsdcMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsdcMin == 0 ? 0 : dcsdcMin !== 'NaN' ? dcsdcMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsdcP50 == 0 ? 0 : dcsdcP50 !== 'NaN' ? dcsdcP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsdcP75 == 0 ? 0 : dcsdcP75 !== 'NaN' ? dcsdcP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsdcP95 == 0 ? 0 : dcsdcP95 !== 'NaN' ? dcsdcP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsdcP99 == 0 ? 0 : dcsdcP99 !== 'NaN' ? dcsdcP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsdcMax == 0 ? 0 : dcsdcMax !== 'NaN' ? dcsdcMax?.toFixed(9) : ''}</p>
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
                                <p>{dcshMean == 0 ? 0 : dcshMean !== 'NaN' ? dcshMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcshMin == 0 ? 0 : dcshMin !== 'NaN' ? dcshMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcshP50 == 0 ? 0 : dcshP50 !== 'NaN' ? dcshP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcshP75 == 0 ? 0 : dcshP75 !== 'NaN' ? dcshP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcshP95 == 0 ? 0 : dcshP95 !== 'NaN' ? dcshP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcshP99 == 0 ? 0 : dcshP99 !== 'NaN' ? dcshP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcshMax == 0 ? 0 : dcshMax !== 'NaN' ? dcshMax?.toFixed(9) : ''}</p>
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
                                <p>{dcstMean == 0 ? 0 : dcstMean !== 'NaN' ? dcstMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcstMin == 0 ? 0 : dcstMin !== 'NaN' ? dcstMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcstP50 == 0 ? 0 : dcstP50 !== 'NaN' ? dcstP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcstP75 == 0 ? 0 : dcstP75 !== 'NaN' ? dcstP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcstP95 == 0 ? 0 : dcstP95 !== 'NaN' ? dcstP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcstP99 == 0 ? 0 : dcstP99 !== 'NaN' ? dcstP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcstMax == 0 ? 0 : dcstMax !== 'NaN' ? dcstMax?.toFixed(9) : ''}</p>
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
                                <p>{dcspdiMean == 0 ? 0 : dcspdiMean !== 'NaN' ? dcspdiMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdiMin == 0 ? 0 : dcspdiMin !== 'NaN' ? dcspdiMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdiP50 == 0 ? 0 : dcspdiP50 !== 'NaN' ? dcspdiP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdiP75 == 0 ? 0 : dcspdiP75 !== 'NaN' ? dcspdiP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdiP95 == 0 ? 0 : dcspdiP95 !== 'NaN' ? dcspdiP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdiP99 == 0 ? 0 : dcspdiP99 !== 'NaN' ? dcspdiP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdiMax == 0 ? 0 : dcspdiMax !== 'NaN' ? dcspdiMax?.toFixed(9) : ''}</p>
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
                                <p>{dcspdicMean == 0 ? 0 : dcspdicMean !== 'NaN' ? dcspdicMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdicMin == 0 ? 0 : dcspdicMin !== 'NaN' ? dcspdicMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdicP50 == 0 ? 0 : dcspdicP50 !== 'NaN' ? dcspdicP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdicP75 == 0 ? 0 : dcspdicP75 !== 'NaN' ? dcspdicP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdicP95 == 0 ? 0 : dcspdicP95 !== 'NaN' ? dcspdicP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdicP99 == 0 ? 0 : dcspdicP99 !== 'NaN' ? dcspdicP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcspdicMax == 0 ? 0 : dcspdicMax !== 'NaN' ? dcspdicMax?.toFixed(9) : ''}</p>
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
                                <p>{bcaorbMax == 0 ? 0 : bcaorbMax !== 'NaN' ? bcaorbMax?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcssMin == 0 ? 0 : dcssMin !== 'NaN' ? dcssMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcssP50 == 0 ? 0 : dcssP50 !== 'NaN' ? dcssP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcssP75 == 0 ? 0 : dcssP75 !== 'NaN' ? dcssP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcssP95 == 0 ? 0 : dcssP95 !== 'NaN' ? dcssP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcssP99 == 0 ? 0 : dcssP99 !== 'NaN' ? dcssP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcssMax == 0 ? 0 : dcssMax !== 'NaN' ? dcssMax?.toFixed(9) : ''}</p>
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
                                <p>{dmdcgMean == 0 ? 0 : dmdcgMean !== 'NaN' ? dmdcgMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgMin == 0 ? 0 : dmdcgMin !== 'NaN' ? dmdcgMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgP50 == 0 ? 0 : dmdcgP50 !== 'NaN' ? dmdcgP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgP75 == 0 ? 0 : dmdcgP75 !== 'NaN' ? dmdcgP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgP95 == 0 ? 0 : dmdcgP95 !== 'NaN' ? dmdcgP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgP99 == 0 ? 0 : dmdcgP99 !== 'NaN' ? dmdcgP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgMax == 0 ? 0 : dmdcgMax !== 'NaN' ? dmdcgMax?.toFixed(9) : ''}</p>
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
                                <p>{dmdcgaMean == 0 ? 0 : dmdcgaMean !== 'NaN' ? dmdcgaMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgaMin == 0 ? 0 : dmdcgaMin !== 'NaN' ? dmdcgaMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgaP50 == 0 ? 0 : dmdcgaP50 !== 'NaN' ? dmdcgaP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgaP75 == 0 ? 0 : dmdcgaP75 !== 'NaN' ? dmdcgaP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgaP95 == 0 ? 0 : dmdcgaP95 !== 'NaN' ? dmdcgaP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgaP99 == 0 ? 0 : dmdcgaP99 !== 'NaN' ? dmdcgaP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcgaMax == 0 ? 0 : dmdcgaMax !== 'NaN' ? dmdcgaMax?.toFixed(9) : ''}</p>
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
                                <p>{dmdcsMean == 0 ? 0 : dmdcsMean !== 'NaN' ? dmdcsMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcsMin == 0 ? 0 : dmdcsMin !== 'NaN' ? dmdcsMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcsP50 == 0 ? 0 : dmdcsP50 !== 'NaN' ? dmdcsP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcsP75 == 0 ? 0 : dmdcsP75 !== 'NaN' ? dmdcsP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcsP95 == 0 ? 0 : dmdcsP95 !== 'NaN' ? dmdcsP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcsP99 == 0 ? 0 : dmdcsP99 !== 'NaN' ? dmdcsP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dmdcsMax == 0 ? 0 : dmdcsMax !== 'NaN' ? dmdcsMax?.toFixed(9) : ''}</p>
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
                                <p>{dccMean == 0 ? 0 : dccMean !== 'NaN' ? dccMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccMin == 0 ? 0 : dccMin !== 'NaN' ? dccMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccP50 == 0 ? 0 : dccP50 !== 'NaN' ? dccP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccP75 == 0 ? 0 : dccP75 !== 'NaN' ? dccP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccP95 == 0 ? 0 : dccP95 !== 'NaN' ? dccP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccP99 == 0 ? 0 : dccP99 !== 'NaN' ? dccP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dccMax == 0 ? 0 : dccMax !== 'NaN' ? dccMax?.toFixed(9) : ''}</p>
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
                                <p>{dcsMean == 0 ? 0 : dcsMean !== 'NaN' ? dcsMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsMin == 0 ? 0 : dcsMin !== 'NaN' ? dcsMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsP50 == 0 ? 0 : dcsP50 !== 'NaN' ? dcsP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsP75 == 0 ? 0 : dcsP75 !== 'NaN' ? dcsP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsP95 == 0 ? 0 : dcsP95 !== 'NaN' ? dcsP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsP99 == 0 ? 0 : dcsP99 !== 'NaN' ? dcsP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsMax == 0 ? 0 : dcsMax !== 'NaN' ? dcsMax?.toFixed(9) : ''}</p>
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
                                <p>{ecceMean == 0 ? 0 : ecceMean !== 'NaN' ? ecceMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecceMin == 0 ? 0 : ecceMin !== 'NaN' ? ecceMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecceP50 == 0 ? 0 : ecceP50 !== 'NaN' ? ecceP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecceP75 == 0 ? 0 : ecceP75 !== 'NaN' ? ecceP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecceP95 == 0 ? 0 : ecceP95 !== 'NaN' ? ecceP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecceP99 == 0 ? 0 : ecceP99 !== 'NaN' ? ecceP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecceMax == 0 ? 0 : ecceMax !== 'NaN' ? ecceMax?.toFixed(9) : ''}</p>
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
                                <p>{ecdeMean == 0 ? 0 : ecdeMean !== 'NaN' ? ecdeMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdeMin == 0 ? 0 : ecdeMin !== 'NaN' ? ecdeMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdeP50 == 0 ? 0 : ecdeP50 !== 'NaN' ? ecdeP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdeP75 == 0 ? 0 : ecdeP75 !== 'NaN' ? ecdeP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdeP95 == 0 ? 0 : ecdeP95 !== 'NaN' ? ecdeP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdeP99 == 0 ? 0 : ecdeP99 !== 'NaN' ? ecdeP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdeMax == 0 ? 0 : ecdeMax !== 'NaN' ? ecdeMax?.toFixed(9) : ''}</p>
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
                                <p>{ecdbeMean == 0 ? 0 : ecdbeMean !== 'NaN' ? ecdbeMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdbeMin == 0 ? 0 : ecdbeMin !== 'NaN' ? ecdbeMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdbeP50 == 0 ? 0 : ecdbeP50 !== 'NaN' ? ecdbeP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdbeP75 == 0 ? 0 : ecdbeP75 !== 'NaN' ? ecdbeP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdbeP95 == 0 ? 0 : ecdbeP95 !== 'NaN' ? ecdbeP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdbeP99 == 0 ? 0 : ecdbeP99 !== 'NaN' ? ecdbeP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecdbeMax == 0 ? 0 : ecdbeMax !== 'NaN' ? ecdbeMax?.toFixed(9) : ''}</p>
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
                                <p>{eceeMean == 0 ? 0 : eceeMean !== 'NaN' ? eceeMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{eceeMin == 0 ? 0 : eceeMin !== 'NaN' ? eceeMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{eceeP50 == 0 ? 0 : eceeP50 !== 'NaN' ? eceeP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{eceeP75 == 0 ? 0 : eceeP75 !== 'NaN' ? eceeP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{eceeP95 == 0 ? 0 : eceeP95 !== 'NaN' ? eceeP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{eceeP99 == 0 ? 0 : eceeP99 !== 'NaN' ? eceeP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{eceeMax == 0 ? 0 : eceeMax !== 'NaN' ? eceeMax?.toFixed(9) : ''}</p>
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
                                <p>{ecgercMean == 0 ? 0 : ecgercMean !== 'NaN' ? ecgercMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgercMin == 0 ? 0 : ecgercMin !== 'NaN' ? ecgercMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgercP50 == 0 ? 0 : ecgercP50 !== 'NaN' ? ecgercP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgercP75 == 0 ? 0 : ecgercP75 !== 'NaN' ? ecgercP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgercP95 == 0 ? 0 : ecgercP95 !== 'NaN' ? ecgercP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgercP99 == 0 ? 0 : ecgercP99 !== 'NaN' ? ecgercP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgercMax == 0 ? 0 : ecgercMax !== 'NaN' ? ecgercMax?.toFixed(9) : ''}</p>
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
                                <p>{ecgeMean == 0 ? 0 : ecgeMean !== 'NaN' ? ecgeMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgeMin == 0 ? 0 : ecgeMin !== 'NaN' ? ecgeMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgeP50 == 0 ? 0 : ecgeP50 !== 'NaN' ? ecgeP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgeP75 == 0 ? 0 : ecgeP75 !== 'NaN' ? ecgeP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgeP95 == 0 ? 0 : ecgeP95 !== 'NaN' ? ecgeP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgeP99 == 0 ? 0 : ecgeP99 !== 'NaN' ? ecgeP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgeMax == 0 ? 0 : ecgeMax !== 'NaN' ? ecgeMax?.toFixed(9) : ''}</p>
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
                                <p>{ecgssMean == 0 ? 0 : ecgssMean !== 'NaN' ? ecgssMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgssMin == 0 ? 0 : ecgssMin !== 'NaN' ? ecgssMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgssP50 == 0 ? 0 : ecgssP50 !== 'NaN' ? ecgssP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgssP75 == 0 ? 0 : ecgssP75 !== 'NaN' ? ecgssP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgssP95 == 0 ? 0 : ecgssP95 !== 'NaN' ? ecgssP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgssP99 == 0 ? 0 : ecgssP99 !== 'NaN' ? ecgssP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ecgssMax == 0 ? 0 : ecgssMax !== 'NaN' ? ecgssMax?.toFixed(9) : ''}</p>
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
                                <p>{fbccfdhMean == 0 ? 0 : fbccfdhMean !== 'NaN' ? fbccfdhMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbccfdhMin == 0 ? 0 : fbccfdhMin !== 'NaN' ? fbccfdhMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbccfdhP50 == 0 ? 0 : fbccfdhP50 !== 'NaN' ? fbccfdhP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbccfdhP75 == 0 ? 0 : fbccfdhP75 !== 'NaN' ? fbccfdhP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbccfdhP95 == 0 ? 0 : fbccfdhP95 !== 'NaN' ? fbccfdhP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbccfdhP99 == 0 ? 0 : fbccfdhP99 !== 'NaN' ? fbccfdhP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbccfdhMax == 0 ? 0 : fbccfdhMax !== 'NaN' ? fbccfdhMax?.toFixed(9) : ''}</p>
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
                                <p>{fbcdhMean == 0 ? 0 : fbcdhMean !== 'NaN' ? fbcdhMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcdhMin == 0 ? 0 : fbcdhMin !== 'NaN' ? fbcdhMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcdhP50 == 0 ? 0 : fbcdhP50 !== 'NaN' ? fbcdhP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcdhP75 == 0 ? 0 : fbcdhP75 !== 'NaN' ? fbcdhP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcdhP95 == 0 ? 0 : fbcdhP95 !== 'NaN' ? fbcdhP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcdhP99 == 0 ? 0 : fbcdhP99 !== 'NaN' ? fbcdhP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcdhMax == 0 ? 0 : fbcdhMax !== 'NaN' ? fbcdhMax?.toFixed(9) : ''}</p>
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
                                <p>{fbcgfrMean == 0 ? 0 : fbcgfrMean !== 'NaN' ? fbcgfrMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgfrMin == 0 ? 0 : fbcgfrMin !== 'NaN' ? fbcgfrMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgfrP50 == 0 ? 0 : fbcgfrP50 !== 'NaN' ? fbcgfrP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgfrP75 == 0 ? 0 : fbcgfrP75 !== 'NaN' ? fbcgfrP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgfrP95 == 0 ? 0 : fbcgfrP95 !== 'NaN' ? fbcgfrP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgfrP99 == 0 ? 0 : fbcgfrP99 !== 'NaN' ? fbcgfrP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgfrMax == 0 ? 0 : fbcgfrMax !== 'NaN' ? fbcgfrMax?.toFixed(9) : ''}</p>
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
                                <p>{fbcgpMean == 0 ? 0 : fbcgpMean !== 'NaN' ? fbcgpMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgpMin == 0 ? 0 : fbcgpMin !== 'NaN' ? fbcgpMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgpP50 == 0 ? 0 : fbcgpP50 !== 'NaN' ? fbcgpP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgpP75 == 0 ? 0 : fbcgpP75 !== 'NaN' ? fbcgpP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgpP95 == 0 ? 0 : fbcgpP95 !== 'NaN' ? fbcgpP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgpP99 == 0 ? 0 : fbcgpP99 !== 'NaN' ? fbcgpP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgpMax == 0 ? 0 : fbcgpMax !== 'NaN' ? fbcgpMax?.toFixed(9) : ''}</p>
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
                                <p>{fbcgrpMean == 0 ? 0 : fbcgrpMean !== 'NaN' ? fbcgrpMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgrpMin == 0 ? 0 : fbcgrpMin !== 'NaN' ? fbcgrpMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgrpP50 == 0 ? 0 : fbcgrpP50 !== 'NaN' ? fbcgrpP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgrpP75 == 0 ? 0 : fbcgrpP75 !== 'NaN' ? fbcgrpP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgrpP95 == 0 ? 0 : fbcgrpP95 !== 'NaN' ? fbcgrpP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgrpP99 == 0 ? 0 : fbcgrpP99 !== 'NaN' ? fbcgrpP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{fbcgrpMax == 0 ? 0 : fbcgrpMax !== 'NaN' ? fbcgrpMax?.toFixed(9) : ''}</p>
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
                                <p>{icgciMean == 0 ? 0 : icgciMean !== 'NaN' ? icgciMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgciMin == 0 ? 0 : icgciMin !== 'NaN' ? icgciMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgciP50 == 0 ? 0 : icgciP50 !== 'NaN' ? icgciP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgciP75 == 0 ? 0 : icgciP75 !== 'NaN' ? icgciP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgciP95 == 0 ? 0 : icgciP95 !== 'NaN' ? icgciP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgciP99 == 0 ? 0 : icgciP99 !== 'NaN' ? icgciP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgciMax == 0 ? 0 : icgciMax !== 'NaN' ? icgciMax?.toFixed(9) : ''}</p>
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
                                <p>{icgiMean == 0 ? 0 : icgiMean !== 'NaN' ? icgiMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgiMin == 0 ? 0 : icgiMin !== 'NaN' ? icgiMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgiP50 == 0 ? 0 : icgiP50 !== 'NaN' ? icgiP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgiP75 == 0 ? 0 : icgiP75 !== 'NaN' ? icgiP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgiP95 == 0 ? 0 : icgiP95 !== 'NaN' ? icgiP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgiP99 == 0 ? 0 : icgiP99 !== 'NaN' ? icgiP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{icgiMax == 0 ? 0 : icgiMax !== 'NaN' ? icgiMax?.toFixed(9) : ''}</p>
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
                                <p>{ipcgpsMean == 0 ? 0 : ipcgpsMean !== 'NaN' ? ipcgpsMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpsMin == 0 ? 0 : ipcgpsMin !== 'NaN' ? ipcgpsMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpsP50 == 0 ? 0 : ipcgpsP50 !== 'NaN' ? ipcgpsP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpsP75 == 0 ? 0 : ipcgpsP75 !== 'NaN' ? ipcgpsP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpsP95 == 0 ? 0 : ipcgpsP95 !== 'NaN' ? ipcgpsP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpsP99 == 0 ? 0 : ipcgpsP99 !== 'NaN' ? ipcgpsP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpsMax == 0 ? 0 : ipcgpsMax !== 'NaN' ? ipcgpsMax?.toFixed(9) : ''}</p>
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
                                <p>{ipcgpcsvMean == 0 ? 0 : ipcgpcsvMean !== 'NaN' ? ipcgpcsvMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpcsvMin == 0 ? 0 : ipcgpcsvMin !== 'NaN' ? ipcgpcsvMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpcsvP50 == 0 ? 0 : ipcgpcsvP50 !== 'NaN' ? ipcgpcsvP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpcsvP75 == 0 ? 0 : ipcgpcsvP75 !== 'NaN' ? ipcgpcsvP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpcsvP95 == 0 ? 0 : ipcgpcsvP95 !== 'NaN' ? ipcgpcsvP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpcsvP99 == 0 ? 0 : ipcgpcsvP99 !== 'NaN' ? ipcgpcsvP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpcsvMax == 0 ? 0 : ipcgpcsvMax !== 'NaN' ? ipcgpcsvMax?.toFixed(9) : ''}</p>
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
                                <p>{ipcgpjMean == 0 ? 0 : ipcgpjMean !== 'NaN' ? ipcgpjMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpjMin == 0 ? 0 : ipcgpjMin !== 'NaN' ? ipcgpjMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpjP50 == 0 ? 0 : ipcgpjP50 !== 'NaN' ? ipcgpjP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpjP75 == 0 ? 0 : ipcgpjP75 !== 'NaN' ? ipcgpjP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpjP95 == 0 ? 0 : ipcgpjP95 !== 'NaN' ? ipcgpjP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpjP99 == 0 ? 0 : ipcgpjP99 !== 'NaN' ? ipcgpjP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpjMax == 0 ? 0 : ipcgpjMax !== 'NaN' ? ipcgpjMax?.toFixed(9) : ''}</p>
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
                                <p>{ipcgppMean == 0 ? 0 : ipcgppMean !== 'NaN' ? ipcgppMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgppMin == 0 ? 0 : ipcgppMin !== 'NaN' ? ipcgppMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgppP50 == 0 ? 0 : ipcgppP50 !== 'NaN' ? ipcgppP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgppP75 == 0 ? 0 : ipcgppP75 !== 'NaN' ? ipcgppP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgppP95 == 0 ? 0 : ipcgppP95 !== 'NaN' ? ipcgppP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgppP99 == 0 ? 0 : ipcgppP99 !== 'NaN' ? ipcgppP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgppMax == 0 ? 0 : ipcgppMax !== 'NaN' ? ipcgppMax?.toFixed(9) : ''}</p>
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
                                <p>{ipcgpMean == 0 ? 0 : ipcgpMean !== 'NaN' ? ipcgpMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpMin == 0 ? 0 : ipcgpMin !== 'NaN' ? ipcgpMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpP50 == 0 ? 0 : ipcgpP50 !== 'NaN' ? ipcgpP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpP75 == 0 ? 0 : ipcgpP75 !== 'NaN' ? ipcgpP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpP95 == 0 ? 0 : ipcgpP95 !== 'NaN' ? ipcgpP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpP99 == 0 ? 0 : ipcgpP99 !== 'NaN' ? ipcgpP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcgpMax == 0 ? 0 : ipcgpMax !== 'NaN' ? ipcgpMax?.toFixed(9) : ''}</p>
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
                                <p>{ipcsMean == 0 ? 0 : ipcsMean !== 'NaN' ? ipcsMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcsMin == 0 ? 0 : ipcsMin !== 'NaN' ? ipcsMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcsP50 == 0 ? 0 : ipcsP50 !== 'NaN' ? ipcsP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcsP75 == 0 ? 0 : ipcsP75 !== 'NaN' ? ipcsP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcsP95 == 0 ? 0 : ipcsP95 !== 'NaN' ? ipcsP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcsP99 == 0 ? 0 : ipcsP99 !== 'NaN' ? ipcsP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ipcsMax == 0 ? 0 : ipcsMax !== 'NaN' ? ipcsMax?.toFixed(9) : ''}</p>
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
                                <p>{oncgonMean == 0 ? 0 : oncgonMean !== 'NaN' ? oncgonMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{oncgonMin == 0 ? 0 : oncgonMin !== 'NaN' ? oncgonMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{oncgonP50 == 0 ? 0 : oncgonP50 !== 'NaN' ? oncgonP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{oncgonP75 == 0 ? 0 : oncgonP75 !== 'NaN' ? oncgonP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{oncgonP95 == 0 ? 0 : oncgonP95 !== 'NaN' ? oncgonP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{oncgonP99 == 0 ? 0 : oncgonP99 !== 'NaN' ? oncgonP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{oncgonMax == 0 ? 0 : oncgonMax !== 'NaN' ? oncgonMax?.toFixed(9) : ''}</p>
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
                                <p>{srcgbdMean == 0 ? 0 : srcgbdMean !== 'NaN' ? srcgbdMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdMin == 0 ? 0 : srcgbdMin !== 'NaN' ? srcgbdMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdP50 == 0 ? 0 : srcgbdP50 !== 'NaN' ? srcgbdP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdP75 == 0 ? 0 : srcgbdP75 !== 'NaN' ? srcgbdP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdP95 == 0 ? 0 : srcgbdP95 !== 'NaN' ? srcgbdP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdP99 == 0 ? 0 : srcgbdP99 !== 'NaN' ? srcgbdP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdMax == 0 ? 0 : srcgbdMax !== 'NaN' ? srcgbdMax?.toFixed(9) : ''}</p>
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
                                <p>{srcgbdMean == 0 ? 0 : srcgbdMean !== 'NaN' ? srcgbdMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdMin == 0 ? 0 : srcgbdMin !== 'NaN' ? srcgbdMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdP50 == 0 ? 0 : srcgbdP50 !== 'NaN' ? srcgbdP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdP75 == 0 ? 0 : srcgbdP75 !== 'NaN' ? srcgbdP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdP95 == 0 ? 0 : srcgbdP95 !== 'NaN' ? srcgbdP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdP99 == 0 ? 0 : srcgbdP99 !== 'NaN' ? srcgbdP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcgbdMax == 0 ? 0 : srcgbdMax !== 'NaN' ? srcgbdMax?.toFixed(9) : ''}</p>
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
                                <p>{srcsMean == 0 ? 0 : srcsMean !== 'NaN' ? srcsMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcsMin == 0 ? 0 : srcsMin !== 'NaN' ? srcsMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcsP50 == 0 ? 0 : srcsP50 !== 'NaN' ? srcsP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcsP75 == 0 ? 0 : srcsP75 !== 'NaN' ? srcsP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcsP95 == 0 ? 0 : srcsP95 !== 'NaN' ? srcsP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcsP99 == 0 ? 0 : srcsP99 !== 'NaN' ? srcsP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{srcsMax == 0 ? 0 : srcsMax !== 'NaN' ? srcsMax?.toFixed(9) : ''}</p>
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
                                <p>{sdcgcMean == 0 ? 0 : sdcgcMean !== 'NaN' ? sdcgcMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgcMin == 0 ? 0 : sdcgcMin !== 'NaN' ? sdcgcMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgcP50 == 0 ? 0 : sdcgcP50 !== 'NaN' ? sdcgcP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgcP75 == 0 ? 0 : sdcgcP75 !== 'NaN' ? sdcgcP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgcP95 == 0 ? 0 : sdcgcP95 !== 'NaN' ? sdcgcP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgcP99 == 0 ? 0 : sdcgcP99 !== 'NaN' ? sdcgcP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgcMax == 0 ? 0 : sdcgcMax !== 'NaN' ? sdcgcMax?.toFixed(9) : ''}</p>
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
                                <p>{sdcgipkMean == 0 ? 0 : sdcgipkMean !== 'NaN' ? sdcgipkMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgipkMin == 0 ? 0 : sdcgipkMin !== 'NaN' ? sdcgipkMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgipkP50 == 0 ? 0 : sdcgipkP50 !== 'NaN' ? sdcgipkP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgipkP75 == 0 ? 0 : sdcgipkP75 !== 'NaN' ? sdcgipkP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgipkP95 == 0 ? 0 : sdcgipkP95 !== 'NaN' ? sdcgipkP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgipkP99 == 0 ? 0 : sdcgipkP99 !== 'NaN' ? sdcgipkP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgipkMax == 0 ? 0 : sdcgipkMax !== 'NaN' ? sdcgipkMax?.toFixed(9) : ''}</p>
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
                                <p>{sdcgpMean == 0 ? 0 : sdcgpMean !== 'NaN' ? sdcgpMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgpMin == 0 ? 0 : sdcgpMin !== 'NaN' ? sdcgpMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgpP50 == 0 ? 0 : sdcgpP50 !== 'NaN' ? sdcgpP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgpP75 == 0 ? 0 : sdcgpP75 !== 'NaN' ? sdcgpP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgpP95 == 0 ? 0 : sdcgpP95 !== 'NaN' ? sdcgpP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgpP99 == 0 ? 0 : sdcgpP99 !== 'NaN' ? sdcgpP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{sdcgpMax == 0 ? 0 : sdcgpMax !== 'NaN' ? sdcgpMax?.toFixed(9) : ''}</p>
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
                                <p>{secgetMean == 0 ? 0 : secgetMean !== 'NaN' ? secgetMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgetMin == 0 ? 0 : secgetMin !== 'NaN' ? secgetMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgetP50 == 0 ? 0 : secgetP50 !== 'NaN' ? secgetP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgetP75 == 0 ? 0 : secgetP75 !== 'NaN' ? secgetP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgetP95 == 0 ? 0 : secgetP95 !== 'NaN' ? secgetP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgetP99 == 0 ? 0 : secgetP99 !== 'NaN' ? secgetP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgetMax == 0 ? 0 : secgetMax !== 'NaN' ? secgetMax?.toFixed(9) : ''}</p>
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
                                <p>{secgebicaMean == 0 ? 0 : secgebicaMean !== 'NaN' ? secgebicaMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgebicaMin == 0 ? 0 : secgebicaMin !== 'NaN' ? secgebicaMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgebicaP50 == 0 ? 0 : secgebicaP50 !== 'NaN' ? secgebicaP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgebicaP75 == 0 ? 0 : secgebicaP75 !== 'NaN' ? secgebicaP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgebicaP95 == 0 ? 0 : secgebicaP95 !== 'NaN' ? secgebicaP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgebicaP99 == 0 ? 0 : secgebicaP99 !== 'NaN' ? secgebicaP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{secgebicaMax == 0 ? 0 : secgebicaMax !== 'NaN' ? secgebicaMax?.toFixed(9) : ''}</p>
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
                                <p>{ucaarMean == 0 ? 0 : ucaarMean !== 'NaN' ? ucaarMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaarMin == 0 ? 0 : ucaarMin !== 'NaN' ? ucaarMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaarP50 == 0 ? 0 : ucaarP50 !== 'NaN' ? ucaarP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaarP75 == 0 ? 0 : ucaarP75 !== 'NaN' ? ucaarP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaarP95 == 0 ? 0 : ucaarP95 !== 'NaN' ? ucaarP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaarP99 == 0 ? 0 : ucaarP99 !== 'NaN' ? ucaarP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaarMax == 0 ? 0 : ucaarMax !== 'NaN' ? ucaarMax?.toFixed(9) : ''}</p>
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
                                <p>{ucaMean == 0 ? 0 : ucaMean !== 'NaN' ? ucaMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaMin == 0 ? 0 : ucaMin !== 'NaN' ? ucaMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaP50 == 0 ? 0 : ucaP50 !== 'NaN' ? ucaP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaP75 == 0 ? 0 : ucaP75 !== 'NaN' ? ucaP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaP95 == 0 ? 0 : ucaP95 !== 'NaN' ? ucaP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaP99 == 0 ? 0 : ucaP99 !== 'NaN' ? ucaP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucaMax == 0 ? 0 : ucaMax !== 'NaN' ? ucaMax?.toFixed(9) : ''}</p>
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
                                <p>{uccpMean == 0 ? 0 : uccpMean !== 'NaN' ? uccpMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uccpMin == 0 ? 0 : uccpMin !== 'NaN' ? uccpMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uccpP50 == 0 ? 0 : uccpP50 !== 'NaN' ? uccpP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uccpP75 == 0 ? 0 : uccpP75 !== 'NaN' ? uccpP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uccpP95 == 0 ? 0 : uccpP95 !== 'NaN' ? uccpP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uccpP99 == 0 ? 0 : uccpP99 !== 'NaN' ? uccpP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uccpMax == 0 ? 0 : uccpMax !== 'NaN' ? uccpMax?.toFixed(9) : ''}</p>
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
                                <p>{ucchpMean == 0 ? 0 : ucchpMean !== 'NaN' ? ucchpMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucchpMin == 0 ? 0 : ucchpMin !== 'NaN' ? ucchpMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{dcsMax == 0 ? 0 : dcsMax !== 'NaN' ? dcsMax?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucchpP75 == 0 ? 0 : ucchpP75 !== 'NaN' ? ucchpP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucchpP95 == 0 ? 0 : ucchpP95 !== 'NaN' ? ucchpP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucchpP99 == 0 ? 0 : ucchpP99 !== 'NaN' ? ucchpP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucchpMax == 0 ? 0 : ucchpMax !== 'NaN' ? ucchpMax?.toFixed(9) : ''}</p>
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
                                <p>{ucdaMean == 0 ? 0 : ucdaMean !== 'NaN' ? ucdaMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucdaMin == 0 ? 0 : ucdaMin !== 'NaN' ? ucdaMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucdaP50 == 0 ? 0 : ucdaP50 !== 'NaN' ? ucdaP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucdaP75 == 0 ? 0 : ucdaP75 !== 'NaN' ? ucdaP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucdaP95 == 0 ? 0 : ucdaP95 !== 'NaN' ? ucdaP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucdaP99 == 0 ? 0 : ucdaP99 !== 'NaN' ? ucdaP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucdaMax == 0 ? 0 : ucdaMax !== 'NaN' ? ucdaMax?.toFixed(9) : ''}</p>
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
                                <p>{ucfpMean == 0 ? 0 : ucfpMean !== 'NaN' ? ucfpMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucfpMin == 0 ? 0 : ucfpMin !== 'NaN' ? ucfpMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucfpP50 == 0 ? 0 : ucfpP50 !== 'NaN' ? ucfpP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucfpP75 == 0 ? 0 : ucfpP75 !== 'NaN' ? ucfpP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucfpP95 == 0 ? 0 : ucfpP95 !== 'NaN' ? ucfpP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucfpP99 == 0 ? 0 : ucfpP99 !== 'NaN' ? ucfpP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucfpMax == 0 ? 0 : ucfpMax !== 'NaN' ? ucfpMax?.toFixed(9) : ''}</p>
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
                                <p>{ucgiMean == 0 ? 0 : ucgiMean !== 'NaN' ? ucgiMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgiMin == 0 ? 0 : ucgiMin !== 'NaN' ? ucgiMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgiP50 == 0 ? 0 : ucgiP50 !== 'NaN' ? ucgiP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgiP75 == 0 ? 0 : ucgiP75 !== 'NaN' ? ucgiP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgiP95 == 0 ? 0 : ucgiP95 !== 'NaN' ? ucgiP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgiP99 == 0 ? 0 : ucgiP99 !== 'NaN' ? ucgiP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgiMax == 0 ? 0 : ucgiMax !== 'NaN' ? ucgiMax?.toFixed(9) : ''}</p>
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
                                <p>{ucgifMean == 0 ? 0 : ucgifMean !== 'NaN' ? ucgifMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgifMin == 0 ? 0 : ucgifMin !== 'NaN' ? ucgifMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgifP50 == 0 ? 0 : ucgifP50 !== 'NaN' ? ucgifP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgifP75 == 0 ? 0 : ucgifP75 !== 'NaN' ? ucgifP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgifP95 == 0 ? 0 : ucgifP95 !== 'NaN' ? ucgifP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgifP99 == 0 ? 0 : ucgifP99 !== 'NaN' ? ucgifP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgifMax == 0 ? 0 : ucgifMax !== 'NaN' ? ucgifMax?.toFixed(9) : ''}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-1">
                                <p>User Controller - Get Match User Accounts</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgmuaCount === 'undefined' ? 0 : ucgmuaCount}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgmuaMean == 0  ? 0 : ucgmuaMean !== 'NaN' ? ucgmuaMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgmuaMin == 0 ? 0 : ucgmuaMin !== 'NaN' ? ucgmuaMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgmuaP50 == 0 ? 0 : ucgmuaP50 !== 'NaN' ? ucgmuaP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgmuaP75 == 0 ? 0 : ucgmuaP75 !== 'NaN' ? ucgmuaP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgmuaP95 == 0 ? 0 : ucgmuaP95 !== 'NaN' ? ucgmuaP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgmuaP99 == 0 ? 0 : ucgmuaP99 !== 'NaN' ? ucgmuaP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgmuaMax == 0 ? 0 : ucgmuaMax !== 'NaN' ? ucgmuaMax?.toFixed(9) : ''}</p>
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
                                <p>{ucgsdMean == 0 ? 0 : ucgsdMean !== 'NaN' ? ucgsdMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgsdMin == 0 ? 0 : ucgsdMin !== 'NaN' ? ucgsdMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgsdP50 == 0 ? 0 : ucgsdP50 !== 'NaN' ? ucgsdP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgsdP75 == 0 ? 0 : ucgsdP75 !== 'NaN' ? ucgsdP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgsdP95 == 0 ? 0 : ucgsdP95 !== 'NaN' ? ucgsdP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgsdP99 == 0 ? 0 : ucgsdP99 !== 'NaN' ? ucgsdP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucgsdMax == 0 ? 0 : ucgsdMax !== 'NaN' ? ucgsdMax?.toFixed(9) : ''}</p>
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
                                <p>{uciaMean == 0 ? 0 : uciaMean !== 'NaN' ? uciaMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciaMin == 0 ? 0 : uciaMin !== 'NaN' ? uciaMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciaP50 == 0 ? 0 : uciaP50 !== 'NaN' ? uciaP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciaP75 == 0 ? 0 : uciaP75 !== 'NaN' ? uciaP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciaP95 == 0 ? 0 : uciaP95 !== 'NaN' ? uciaP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciaP99 == 0 ? 0 : uciaP99 !== 'NaN' ? uciaP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciaMax == 0 ? 0 : uciaMax !== 'NaN' ? uciaMax?.toFixed(9) : ''}</p>
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
                                <p>{uciuaMean == 0 ? 0 : uciuaMean !== 'NaN' ? uciuaMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciuaMin == 0 ? 0 : uciuaMin !== 'NaN' ? uciuaMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciuaP50 == 0 ? 0 : uciuaP50 !== 'NaN' ? uciuaP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciuaP75 == 0 ? 0 : uciuaP75 !== 'NaN' ? uciuaP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciuaP95 == 0 ? 0 : uciuaP95 !== 'NaN' ? uciuaP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciuaP99 == 0 ? 0 : uciuaP99 !== 'NaN' ? uciuaP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uciuaMax == 0 ? 0 : uciuaMax !== 'NaN' ? uciuaMax?.toFixed(9) : ''}</p>
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
                                <p>{ucraMean == 0 ? 0 : ucraMean !== 'NaN' ? ucraMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraMin == 0 ? 0 : ucraMin !== 'NaN' ? ucraMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraP50 == 0 ? 0 : ucraP50 !== 'NaN' ? ucraP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraP75 == 0 ? 0 : ucraP75 !== 'NaN' ? ucraP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraP95 == 0 ? 0 : ucraP95 !== 'NaN' ? ucraP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraP99 == 0 ? 0 : ucraP99 !== 'NaN' ? ucraP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraMax == 0 ? 0 : ucraMax !== 'NaN' ? ucraMax?.toFixed(9) : ''}</p>
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
                                <p>{ucrarMean == 0 ? 0 : ucrarMean !== 'NaN' ? ucrarMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrarMin == 0 ? 0 : ucrarMin !== 'NaN' ? ucrarMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrarP50 == 0 ? 0 : ucrarP50 !== 'NaN' ? ucrarP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrarP75 == 0 ? 0 : ucrarP75 !== 'NaN' ? ucrarP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrarP95 == 0 ? 0 : ucrarP95 !== 'NaN' ? ucrarP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrarP99 == 0 ? 0 : ucrarP99 !== 'NaN' ? ucrarP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrarMax == 0 ? 0 : ucrarMax !== 'NaN' ? ucrarMax?.toFixed(9) : ''}</p>
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
                                <p>{ucraMean == 0 ? 0 : ucraMean !== 'NaN' ? ucraMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraMin == 0 ? 0 : ucraMin !== 'NaN' ? ucraMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraP50 == 0 ? 0 : ucraP50 !== 'NaN' ? ucraP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraP75 == 0 ? 0 : ucraP75 !== 'NaN' ? ucraP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraP95 == 0 ? 0 : ucraP95 !== 'NaN' ? ucraP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraP99 == 0 ? 0 : ucraP99 !== 'NaN' ? ucraP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucraMax == 0 ? 0 : ucraMax !== 'NaN' ? ucraMax?.toFixed(9) : ''}</p>
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
                                <p>{ucrpMean == 0 ? 0 : ucrpMean !== 'NaN' ? ucrpMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrpMin == 0 ? 0 : ucrpMin !== 'NaN' ? ucrpMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrpP50 == 0 ? 0 : ucrpP50 !== 'NaN' ? ucrpP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrpP75 == 0 ? 0 : ucrpP75 !== 'NaN' ? ucrpP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrpP95 == 0 ? 0 : ucrpP95 !== 'NaN' ? ucrpP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrpP99 == 0 ? 0 : ucrpP99 !== 'NaN' ? ucrpP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucrpMax == 0 ? 0 : ucrpMax !== 'NaN' ? ucrpMax?.toFixed(9) : ''}</p>
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
                                <p>{ucsarMean == 0 ? 0 : ucsarMean !== 'NaN' ? ucsarMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarMin == 0 ? 0 : ucsarMin !== 'NaN' ? ucsarMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarP50 == 0 ? 0 : ucsarP50 !== 'NaN' ? ucsarP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarP75 == 0 ? 0 : ucsarP75 !== 'NaN' ? ucsarP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarP95 == 0 ? 0 : ucsarP95 !== 'NaN' ? ucsarP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarP99 == 0 ? 0 : ucsarP99 !== 'NaN' ? ucsarP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarMax == 0 ? 0 : ucsarMax !== 'NaN' ? ucsarMax?.toFixed(9) : ''}</p>
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
                                <p>{ucsarcMean == 0 ? 0 : ucsarcMean !== 'NaN' ? ucsarcMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarcMin == 0 ? 0 : ucsarcMin !== 'NaN' ? ucsarcMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarcP50 == 0 ? 0 : ucsarcP50 !== 'NaN' ? ucsarcP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarcP75 == 0 ? 0 : ucsarcP75 !== 'NaN' ? ucsarcP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarcP95 == 0 ? 0 : ucsarcP95 !== 'NaN' ? ucsarcP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarcP99 == 0 ? 0 : ucsarcP99 !== 'NaN' ? ucsarcP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsarcMax == 0 ? 0 : ucsarcMax !== 'NaN' ? ucsarcMax?.toFixed(9) : ''}</p>
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
                                <p>{ucsaacMean == 0 ? 0 : ucsaacMean !== 'NaN' ? ucsaacMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaacMin == 0 ? 0 : ucsaacMin !== 'NaN' ? ucsaacMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaacP50 == 0 ? 0 : ucsaacP50 !== 'NaN' ? ucsaacP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaacP75 == 0 ? 0 : ucsaacP75 !== 'NaN' ? ucsaacP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaacP95 == 0 ? 0 : ucsaacP95 !== 'NaN' ? ucsaacP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaacP99 == 0 ? 0 : ucsaacP99 !== 'NaN' ? ucsaacP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaacMax == 0 ? 0 : ucsaacMax !== 'NaN' ? ucsaacMax?.toFixed(9) : ''}</p>
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
                                <p>{ucsaaMean == 0 ? 0 : ucsaaMean !== 'NaN' ? ucsaaMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaaMin == 0 ? 0 : ucsaaMin !== 'NaN' ? ucsaaMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaaP50 == 0 ? 0 : ucsaaP50 !== 'NaN' ? ucsaaP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaaP75 == 0 ? 0 : ucsaaP75 !== 'NaN' ? ucsaaP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaaP95 == 0 ? 0 : ucsaaP95 !== 'NaN' ? ucsaaP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaaP99 == 0 ? 0 : ucsaaP99 !== 'NaN' ? ucsaaP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsaaMax == 0 ? 0 : ucsaaMax !== 'NaN' ? ucsaaMax?.toFixed(9) : ''}</p>
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
                                <p>{ucsdacMean == 0 ? 0 : ucsdacMean !== 'NaN' ? ucsdacMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdacMin == 0 ? 0 : ucsdacMin !== 'NaN' ? ucsdacMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdacP50 == 0 ? 0 : ucsdacP50 !== 'NaN' ? ucsdacP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdacP75 == 0 ? 0 : ucsdacP75 !== 'NaN' ? ucsdacP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdacP95 == 0 ? 0 : ucsdacP95 !== 'NaN' ? ucsdacP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdacP99 == 0 ? 0 : ucsdacP99 !== 'NaN' ? ucsdacP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdacMax == 0 ? 0 : ucsdacMax !== 'NaN' ? ucsdacMax?.toFixed(9) : ''}</p>
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
                                <p>{ucsdaMean == 0 ? 0 : ucsdaMean !== 'NaN' ? ucsdaMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdaMin == 0 ? 0 : ucsdaMin !== 'NaN' ? ucsdaMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdaP50 == 0 ? 0 : ucsdaP50 !== 'NaN' ? ucsdaP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdaP75 == 0 ? 0 : ucsdaP75 !== 'NaN' ? ucsdaP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdaP95 == 0 ? 0 : ucsdaP95 !== 'NaN' ? ucsdaP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdaP99 == 0 ? 0 : ucsdaP99 !== 'NaN' ? ucsdaP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucsdaMax == 0 ? 0 : ucsdaMax !== 'NaN' ? ucsdaMax?.toFixed(9) : ''}</p>
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
                                <p>{ucuuMean == 0 ? 0 : ucuuMean !== 'NaN' ? ucuuMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuuMin == 0 ? 0 : ucuuMin !== 'NaN' ? ucuuMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuuP50 == 0 ? 0 : ucuuP50 !== 'NaN' ? ucuuP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuuP75 == 0 ? 0 : ucuuP75 !== 'NaN' ? ucuuP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuuP95 == 0 ? 0 : ucuuP95 !== 'NaN' ? ucuuP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuuP99 == 0 ? 0 : ucuuP99 !== 'NaN' ? ucuuP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuuMax == 0 ? 0 : ucuuMax !== 'NaN' ? ucuuMax?.toFixed(9) : ''}</p>
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
                                <p>{ucuiMean == 0 ? 0 : ucuiMean !== 'NaN' ? ucuiMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuiMin == 0 ? 0 : ucuiMin !== 'NaN' ? ucuiMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuiP50 == 0 ? 0 : ucuiP50 !== 'NaN' ? ucuiP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuiP75 == 0 ? 0 : ucuiP75 !== 'NaN' ? ucuiP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuiP95 == 0 ? 0 : ucuiP95 !== 'NaN' ? ucuiP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuiP99 == 0 ? 0 : ucuiP99 !== 'NaN' ? ucuiP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ucuiMax == 0 ? 0 : ucuiMax !== 'NaN' ? ucuiMax?.toFixed(9) : ''}</p>
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
                                <p>{ueccMean == 0 ? 0 : ueccMean !== 'NaN' ? ueccMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ueccMin == 0 ? 0 : ueccMin !== 'NaN' ? ueccMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ueccP50 == 0 ? 0 : ueccP50 !== 'NaN' ? ueccP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ueccP75 == 0 ? 0 : ueccP75 !== 'NaN' ? ueccP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ueccP95 == 0 ? 0 : ueccP95 !== 'NaN' ? ueccP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ueccP99 == 0 ? 0 : ueccP99 !== 'NaN' ? ueccP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ueccMax == 0 ? 0 : ueccMax !== 'NaN' ? ueccMax?.toFixed(9) : ''}</p>
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
                                <p>{uecsMean == 0 ? 0 : uecsMean !== 'NaN' ? uecsMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uecsMin == 0 ? 0 : uecsMin !== 'NaN' ? uecsMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uecsP50 == 0 ? 0 : uecsP50 !== 'NaN' ? uecsP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uecsP75 == 0 ? 0 : uecsP75 !== 'NaN' ? uecsP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uecsP95 == 0 ? 0 : uecsP95 !== 'NaN' ? uecsP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uecsP99 == 0 ? 0 : uecsP99 !== 'NaN' ? uecsP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{uecsMax == 0 ? 0 : uecsMax !== 'NaN' ? uecsMax?.toFixed(9) : ''}</p>
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
                                <p>{vcgvMean == 0 ? 0 : vcgvMean !== 'NaN' ? vcgvMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{vcgvMin == 0 ? 0 : vcgvMin !== 'NaN' ? vcgvMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{vcgvP50 == 0 ? 0 : vcgvP50 !== 'NaN' ? vcgvP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{vcgvP75 == 0 ? 0 : vcgvP75 !== 'NaN' ? vcgvP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{vcgvP95 == 0 ? 0 : vcgvP95 !== 'NaN' ? vcgvP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{vcgvP99 == 0 ? 0 : vcgvP99 !== 'NaN' ? vcgvP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{vcgvMax == 0 ? 0 : vcgvMax !== 'NaN' ? vcgvMax?.toFixed(9) : ''}</p>
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
                                <p>{ifrMean == 0 ? 0 : ifrMean !== 'NaN' ? ifrMean?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ifrMin == 0 ? 0 : ifrMin !== 'NaN' ? ifrMin?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ifrP50 == 0 ? 0 : ifrP50 !== 'NaN' ? ifrP50?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ifrP75 == 0 ? 0 : ifrP75 !== 'NaN' ? ifrP75?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ifrP95 == 0 ? 0 : ifrP95 !== 'NaN' ? ifrP95?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ifrP99 == 0 ? 0 : ifrP99 !== 'NaN' ? ifrP99?.toFixed(9) : ''}</p>
                            </td>
                            <td className="px-6">
                                <p>{ifrMax == 0 ? 0 : ifrMax !== 'NaN' ? ifrMax?.toFixed(9) : ''}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Metrics