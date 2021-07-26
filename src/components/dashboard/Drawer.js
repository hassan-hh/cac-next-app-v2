import { useContext, useState, useEffect } from 'react'
import { DrawerContext } from '../../providers/DrawerContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SBLoadingSkeleton from './loading-skeletons/SBLoadingSkeleton'

const Drawer = ({open}) => {

    const router = useRouter()
    const { idE, id } = router.query
    const { systemDate, accountEntity, regions, bookmarks, savedSearches, loading, success, setSuccess, setLoading } = useContext(DrawerContext)
    const [openBookmarks, setOpenBookmarks] = useState(false)
    const [openSavedSearch, setOpenSavedSearch] = useState(false)
    const displayText = 'System Date:' 
    const zeroPad = (number) => number.toString().length === 1 ? `0${number}` : number
    const date = new Date(systemDate)
    const day = zeroPad(date.getDate())
    const month = date.toLocaleString('default', { month: 'short' });
    const formatedDate = `${displayText} ${day} ${month} ${date.getFullYear()}`
    
    useEffect(() => {
        const x = setTimeout(() => {
            if (success.data === true || success.data === false) {
                setLoading(false)
            }
        }, 1000)
        return () => { clearTimeout(x); }
    }, [success.data])

    if (!bookmarks.bookmark) { //nested array within an object bookmarks { bookmark[] }
        return null
        //we need to check our state/object 'bookmarks' that has an array bookmark. 
        //If statement must be on the component before the return if we have an array within our object such bookmarks is an object and bookmark is array.
    }

    // console.log('drawer-date', systemDate)
    // console.log('drawer-regions', regions)
    //console.log('drawer-account', accountEntity)
    // console.log('drawer-loading', loading)
    console.log('bookmarks here', bookmarks)
    console.log('savedSearches', savedSearches)

    const customError = success.errorCode === 404 ?
        `Error ${success.errorCode} data source not found.`
        : success.errorCode >= 500 ? 
        `An error ${success.errorCode} occurred on server.`
        : `An error occurred on client.`

    return (
        <>
            {   loading === true ? //correct loading skeleton for all responses. then display data or each res error separatley 
                <SBLoadingSkeleton />
                :
                <div style={{width: '24rem'}} className={`${open ? 'opacity-100' : 'right-0'} opacity-0 lg:opacity-100 lg:right-auto w-80 sm:w-96 absolute lg:relative overflow-hidden mx-10 sm:mx-auto px-0 sm:px-5 transition-all ease-linear delay-200 duration-300`}>
                    <p className="text-center py-5" key="date">
                        {systemDate.length === 0 && success.data === true ?
                            'System Date: No data available yet'
                            : systemDate.length !== 0 && success.data === true ?
                            <>
                                {systemDate && formatedDate}
                            </>
                            :
                            <>
                                <p>{customError}</p>
                            </>
                        }
                    </p>
                    <div className="bg-white p-6 w-full shadow-sm rounded-md">
                        <img alt="Cats Logo" className="h-50" src="/cats_logo_large.png" />
                        <div className="relative flex items-center flex-row mb-5">
                            <p className="mr-2 mt-5">Region</p>
                            { regions.length === 0 && success.data === true ?
                                'No data available yet'
                                : regions.length !== 0 && success.data === true ?
                                <>
                                    <svg className="w-3 h-3 absolute top-0 right-0 my-4 mr-3 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                                    <select disabled className="w-full border border-gray-300 rounded-full text-gray-700 h-10 pl-3 bg-gray-100 focus:outline-none appearance-none opacity-70 cursor-not-allowed">
                                        {regions.map(region => (
                                            <option
                                                key={region.idPartyType}
                                            //selected={region.longName}
                                            >
                                                {region.longName}
                                            </option>
                                        ))}
                                    </select>
                                </>
                                :
                                <p>{customError}</p>
                            }
                        </div>
                        <div className="relative flex items-center">
                            <p className="mr-4">Entity</p>
                            {  accountEntity.length === 0 && success.data === true ?
                                'No data available yet'
                                : accountEntity.length !== 0 && success.data === true ?
                                <>
                                    <svg className="w-3 h-3 absolute top-0 right-0 my-4 mr-3 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                                    <select className="w-full cursor-pointer border border-gray-300 rounded-full text-gray-700 h-10 pl-3 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                                        {accountEntity.map(entity => (
                                            <option
                                                key={entity.idAccount}
                                            //selected={entity.txEntity}
                                            >
                                                {entity.txEntity}
                                            </option>
                                        ))}
                                    </select>
                                </>
                                :
                                <p>{customError}</p>
                            }
                        </div>
                    </div>
                    <div onClick={() => setOpenBookmarks(!openBookmarks)} className={`bg-white hover:bg-gray-200 cursor-pointer transition-all ease-in-out duration-300 w-full h-auto shadow-sm rounded-md my-2`} aria-controls="bookmarks" aria-expanded={openBookmarks}>
                        <div className={`flex items-center justify-between flex-row p-6`}>
                            <p>{bookmarks.name || 'My Bookmarks'}</p>
                            <img alt="Bookmarks" className="w-3" src="/plus.svg" />
                        </div>
                        <div className={`${openBookmarks ? `h-48 opacity-100 pointer-events-auto pb-6` : `h-0`} px-6 opacity-0 pointer-events-none flex items-start justify-start transition-all ease-in-out duration-300 overflow-y-auto`} id="bookmarks">
                            {bookmarks.bookmark && bookmarks.bookmark.length === 0 && success.data === true ?
                                'No data available yet'
                                : bookmarks.bookmark && bookmarks.bookmark.length !== 0 && success.data === true ?
                                <ul>
                                    {bookmarks.bookmark.map(event => (
                                        // {event.name && event.name === `${idE}:${id}` ? // if url is not in this format idEntity:id
                                        <li className="text-green-500 py-1" key={event.name}>
                                            <Link
                                                href="/dashboard/event/view/[idE]/[id]" //route must match below and folder structure
                                                as={`/dashboard/event/view/${event.name.replace(/:/g, '/')}`}
                                            >
                                                <a>
                                                    {event.name}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <p>{customError}</p>
                            }
                        </div>
                    </div>
                    <div onClick={() => setOpenSavedSearch(!openSavedSearch)} className={`bg-white hover:bg-gray-200 cursor-pointer transition-all ease-in-out duration-300 w-full h-auto shadow-sm rounded-md my-2`} aria-controls="saved-search" aria-expanded={openSavedSearch}>
                        <div className={`flex items-center justify-between flex-row p-6`}>
                            <p>Saved Search</p>
                            <img alt="Saved Search" className="w-3" src="/plus.svg" />
                        </div>
                        <div className={`${openSavedSearch ? `h-48 opacity-100 pointer-events-auto pb-6` : `h-0`} px-6 opacity-0 pointer-events-none flex items-start justify-start transition-all ease-in-out duration-300 overflow-y-auto`} id="saved-search">
                            {savedSearches.length === 0 && success.data === true ?
                                'No data available yet'
                                : savedSearches.length !== 0 && success.data === true ?
                                <ul>
                                    {savedSearches.map(search => (
                                        <li className="text-green-500 py-1" key={search.idSearch}>
                                            <p>{search.txSearchName}</p>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <p>{customError}</p>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Drawer