import { useState } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
// import ErrorLoadingData from '../../components/ErrorLoadingData'
import Error from '../_error'
import ClientConfig from '../../ClientConfig'

   
export const getStaticProps = async () => {
    const CatsUrl = ClientConfig.apiUrl
    const res = await fetch(`${CatsUrl}/installation/properties`)
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

const InstallationProperties = ({ data }) => {

    const [openModal, setOpenModal] = useState(false)

    // const handleClick = () => {
    //     setOpenModal(!openModal)
    // }

    console.log(data)
    return (
        <>
            <Meta title="Installation Properties" />
            <Header title="Installation Properties" subTitle="EXTRA TEXT GOES HERE"/>
            {/* <DashboardNav/> */}
            {   !data ?
                <Error />
                :
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
                            <>
                                <tbody key={item.value} className="bg-white divide-y divide-gray-200">
                                    <tr onClick={() => setOpenModal(true)} className="hover:bg-gray-100 transition-all ease-in-out duration-300">
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
                                <div className={`${openModal ? 'opacity-100 block' : 'opacity-0 hidden' } transition-all ease-in-out duration-300 fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true" id="iModal">
                                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                        <div className="fixed inset-0 bg-gray-300 bg-opacity-5 transition-opacity" aria-hidden="true">
                                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                    <div className="sm:flex sm:items-start">
                                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                            <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                            </svg>
                                                        </div>
                                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                            Edit Property
                                                            </h3>
                                                            <div className="mt-2">
                                                            {/* <p className="text-sm text-gray-500">
                                                                Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                                                            </p> */}
                                                                <div className="px-6 py-4">
                                                                    <p>{item.osName}</p>
                                                                </div>
                                                                <div className="px-6 py-4">
                                                                    <p>{item.filter}</p>
                                                                </div>
                                                                <div className="px-6 py-4">
                                                                    <p className="w-96 md:w-40 lg:w-44 xl:w-72 break-all">{item.key}</p>
                                                                </div>
                                                                <div className="px-6 py-4">
                                                                    {/* <p className="w-96 md:w-40 lg:w-44 xl:w-72 break-all">{item.value}</p> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                    <button onClick={() => setOpenModal(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                                    Close
                                                    </button>
                                                    <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                                    Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </table>
                    
                </div>
            }
        </>
    )
}
export default InstallationProperties