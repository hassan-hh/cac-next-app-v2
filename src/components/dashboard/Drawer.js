import { useContext, useState } from 'react'
import { DrawerContext } from '../../providers/DrawerContext'
import ErrorLoadingData from '../ErrorLoadingData'
import LoadingSpinner from './LoadingSpinner'

const Drawer = () => {

    const { systemDate, accountEntity, regions, loading } = useContext(DrawerContext)
    const [bookmarks, setBookmarks] = useState(false)
    const [savedSearch, setSavedSearch] = useState(false)
    const displayText = 'System Date:' 
    const zeroPad = (number) => number.toString().length === 1 ? `0${number}` : number
    const date = new Date(systemDate)
    const day = zeroPad(date.getDate())
    const month = date.toLocaleString('default', { month: 'short' });
    const formatedDate = `${displayText} ${day} ${month} ${date.getFullYear()}`

    console.log('drawer-date', systemDate)
    console.log('drawer-regions', regions)
    console.log('drawer-account', accountEntity)
    console.log('drawer-loading', loading)

    return (
        <>
            {   loading ?
                <LoadingSpinner />
                :
                <div style={{width: '340px'}} className="mx-5">
                    <p className="text-center py-5" key="date">{systemDate && formatedDate}</p>
                    {/* <div className="flex justify-center items-center"> */}
                        <div className="bg-white p-6 w-full shadow-sm rounded-md">
                        <img alt="Cats Logo" className="w-80 mb-5" src="/cats_logo_large.png" />
                        <div className="relative flex items-center flex-row mb-5">
                            <p className="mr-2">Region</p>
                            <svg className="w-3 h-3 absolute top-0 right-0 my-4 mr-3 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                            <select disabled={true} className="w-full border border-gray-300 rounded-full text-gray-700 h-10 pl-3 bg-gray-100 focus:outline-none appearance-none">
                               {regions.map(region => (
                                    <option
                                        key={region.idPartyType}
                                        //selected={entity.defaultIdEntity === entity.txEntity ? 'selected' : undefined}
                                        //selected={entity.txEntity}
                                        //selected="Poland"
                                    >
                                        {region.longName}
                                    </option> 
                                ))}
                            </select>
                        </div>
                        <div className="relative flex items-center">
                            <p className="mr-4">Entity</p>
                            <svg className="w-3 h-3 absolute top-0 right-0 my-4 mr-3 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                            <select className="w-full border border-gray-300 rounded-full text-gray-700 h-10 pl-3 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                                {accountEntity.map(entity => (
                                    <option
                                        key={entity.idAccount}
                                        //selected={entity.defaultIdEntity === entity.txEntity ? 'selected' : undefined}
                                        //selected={entity.txEntity}
                                        //selected="Poland"
                                    >
                                        {entity.txEntity}
                                    </option> 
                                ))}
                            </select>
                        </div>
                    </div>
                    <div onClick={() => setBookmarks(!bookmarks)} className={`bg-white hover:bg-gray-200 transition-all ease-in-out duration-300 p-6 w-full h-full shadow-sm rounded-md my-2`} aria-controls="bookmarks" aria-expanded={bookmarks}>
                        <div className={`flex items-center justify-between flex-row`}>
                            <p>Bookmarks</p>
                            <img alt="Bookmarks" className="w-3" src="/plus.svg" />
                        </div>
                        <div className={`${ bookmarks ? `h-60` : `h-0`} transition-all ease-in-out duration-300`} id="bookmarks">
                            
                        </div>
                    </div>
                    <div onClick={() => setSavedSearch(!savedSearch)} className={`bg-white hover:bg-gray-200 transition-all ease-in-out duration-300 p-6 w-full h-full shadow-sm rounded-md my-2`} aria-controls="saved-search" aria-expanded={savedSearch}>
                        <div className={`flex items-center justify-between flex-row`}>
                            <p>Saved Search</p>
                            <img alt="Saved Search" className="w-3" src="/plus.svg" />  
                        </div>
                        <div className={`${ savedSearch ? `h-60` : `h-0`} transition-all ease-in-out duration-300`} id="saved-search">
                            
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            }
        </>
    )
}
export default Drawer