import { useContext, useState } from 'react'
import { DrawerContext } from '../../providers/DrawerContext'
import { useEffect } from 'react'
import ErrorLoadingData from '../ErrorLoadingData'
import LoadingScreen from './LoadingScreen'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Drawer = ({props, open}) => {
    //let newIdUrl;
    // const router = useRouter()
    // const { eid, id } = router.query
    const { systemDate, accountEntity, regions, bookmarks, savedSearches, loading } = useContext(DrawerContext)
    const [idUrls, setIdUrls] = useState([])
    const [openBookmarks, setOpenBookmarks] = useState(false)
    const [openSavedSearch, setOpenSavedSearch] = useState(false)
    const displayText = 'System Date:' 
    const zeroPad = (number) => number.toString().length === 1 ? `0${number}` : number
    const date = new Date(systemDate)
    const day = zeroPad(date.getDate())
    const month = date.toLocaleString('default', { month: 'short' });
    const formatedDate = `${displayText} ${day} ${month} ${date.getFullYear()}`

    // if (bookmarks.bookmark && bookmarks.bookmark.length !== 0) {
    //         const url = bookmarks.bookmark.map(itemUrl => {
    //         const stringifyObject = JSON.stringify(itemUrl.name)
    //         const convertedStr = stringifyObject.replace(/:/g, '/')
    //         const newIdUrl = JSON.parse(convertedStr)
    //         setIdUrls(newIdUrl)
    //     })
    // }
    
    useEffect(() => {
        if (bookmarks.bookmark) {
            bookmarks.bookmark.map(itemUrl => {
                const stringifyObject = JSON.stringify(itemUrl.name)
                const convertedStr = stringifyObject.replace(/:/g, '/')
                const newIdUrl = JSON.parse(convertedStr)
                setIdUrls(newIdUrl)
            })
        }
    }, [bookmarks.bookmark])

    // const test = () => {

    //     const url = idUrls.map((idUrl) =>
    //         <a>{idUrl}</a>
    //     )
    //     console.log('url', url)
    //     // return (

    //     // )
    // }

     console.log('ID', idUrls)
    

    // console.log('drawer-date', systemDate)
    // console.log('drawer-regions', regions)
    // console.log('drawer-account', accountEntity)
    // console.log('drawer-loading', loading)

    console.log('bookmarks here', bookmarks.bookmark)
    console.log('savedSearches', savedSearches)

    return (
        <>
            {/* {   loading ?
                <LoadingScreen />
                : */}
            {// opacity-0 //left-0 right-0 mx-auto //left-auto right-0 mx-10 sm:mx-auto
            }
            <div className={`${open ? '' : ''} right-0 mx-auto lg:right-auto w-80 sm:w-96 absolute lg:relative overflow-hidden sm:px-5`}>
                    <p className="text-center py-5" key="date">{systemDate && formatedDate}</p>
                    {/* <div className="flex justify-center items-center"> */}
                        <div className="bg-white p-6 w-full shadow-sm rounded-md">
                        <img alt="Cats Logo" className="w-80 mb-5" src="/cats_logo_large.png" />
                        <div className="relative flex items-center flex-row mb-5">
                            <p className="mr-2">Region</p>
                            <svg className="w-3 h-3 absolute top-0 right-0 my-4 mr-3 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                            <select disabled className="w-full border border-gray-300 rounded-full text-gray-700 h-10 pl-3 bg-gray-100 focus:outline-none appearance-none opacity-70 cursor-not-allowed">
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
                    <div onClick={() => setOpenBookmarks(!openBookmarks)} className={`bg-white hover:bg-gray-200 transition-all ease-in-out duration-300 p-6 w-full h-full shadow-sm rounded-md my-2`} aria-controls="bookmarks" aria-expanded={openBookmarks}>
                        <div className={`flex items-center justify-between flex-row`}>
                            <p>{bookmarks.name || 'My Bookmarks'}</p>
                            <img alt="Bookmarks" className="w-3" src="/plus.svg" />
                        </div>
                        <div className={`${ openBookmarks ? `h-60 opacity-100 pointer-events-auto pt-32` : `h-0`} opacity-0 pointer-events-none flex items-center justify-centers transition-all ease-in-out duration-300 overflow-auto`} id="bookmarks">
                            <ul>
                                { bookmarks.bookmark && bookmarks.bookmark.length !== 0 ? 
                                    <>
                                    {bookmarks.bookmark.map((item, idx) => ( /// href="dashboard/event/view/1" //${item.url}
                                            <li className="text-green-500 py-1" key={idx}>
                                                {/* {idUrls.map(idUrl => (
                                                    <p>
                                                        {idUrl.name}
                                                    </p>
                                                ))} */}
                                                <Link
                                                    //it is required to keep [eid] folder and [id] file, even when combine both in one object. because of the folder url structure has to match teh href structure
                                                    //folder structure has two options: 
                                                    //1 dynamic [eid] folder and dynamic [id].js file. [id].js file will be the endpoint for every single page.
                                                    //2 dynamic [eid] folder, dynamic [id] folder and index.js file. index.js will be the endpoint for every single page under the [id] folder
                                                    //href="/dashboard/event/view/SGP/2224"
                                                    //as={`/dashboard/event/view/${id}`}
                                                    //as={`/dashboard/event/view/${item.eid}/${item.id}`} //eid is a dynamic route folder [eid], id is dynamic route file "single page" [id].js

                                                    //below is a working example, we just need to map through the idUrls and return each item url.
                                                href="/dashboard/event/view/[idE]/[id]" //this must match below and folder structure
                                                //as={`/dashboard/event/view/${props.idUrls.map(idUrl => {idUrl} )}`} //this contains both routes e.g /PHL/2095
                                                as={`/dashboard/event/view/${idUrls}`}
                                                >
                                                    <a>
                                                    <p>{item.name}</p>
                                                    {/* <p>{idUrl}</p> */}
                                                        {/* <p>{item.url}</p>
                                                        <p>{idUrls}</p> */}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                    </>
                                :
                                    <>
                                        <p>No bookmarks avilable</p>
                                    </>
                                }
                                {/* { bookmarks.folder && bookmarks.folder.length !== 0 ? 
                                    <>
                                        {bookmarks.folder.map((item, idx) => (
                                            <li className="text-blue-400 py-1" key={idx}>
                                                <Link href={item.url}>
                                                    <a>
                                                        <p>{item.name}</p>
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                    </>
                                :
                                    <>
                                        <p>No folders avilable</p>
                                    </>
                                }  */}
                            </ul>
                        </div>
                    </div>
                    <div onClick={() => setOpenSavedSearch(!openSavedSearch)} className={`bg-white hover:bg-gray-200 transition-all ease-in-out duration-300 p-6 w-full h-full shadow-sm rounded-md my-2`} aria-controls="saved-search" aria-expanded={openSavedSearch}>
                        <div className={`flex items-center justify-between flex-row`}>
                            <p>Saved Search</p>
                            <img alt="Saved Search" className="w-3" src="/plus.svg" />  
                        </div>
                        <div className={`${ openSavedSearch ? `h-60 opacity-100 pointer-events-auto` : `h-0`} opacity-0 pointer-events-none flex items-center justify-centers transition-all ease-in-out duration-300`} id="saved-search">
                            <ul>
                                {savedSearches.length !== 0 ?
                                    <>
                                        {savedSearches.map(search => (
                                            <li className="text-green-500 py-1" key={search.idSearch}>
                                                <p>{search.txSearchName}</p>
                                            </li>
                                        ))}
                                    </>
                                :
                                    <>
                                        <p>No saved searches avilable</p>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            {/* } */}
        </>
    )
}
export default Drawer