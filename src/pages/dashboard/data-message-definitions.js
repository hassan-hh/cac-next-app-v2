import { useState, useEffect } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Error from '../_error'
import DataMessageModal from '../../Components/dashboard/DataMessageModal'
import axios from 'axios'
import { useRouter } from 'next/router';
import DMLoadingSkeleton from '../../components/dashboard/loading-skeletons/DMLoadingSkeleton'

export const getStaticProps = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dataMessageDefinition`)
<<<<<<< HEAD
        //const errorCode = res.ok ? 200 : res.statusCode
        const data = await res.json()
        
        return {
            props: {
                data, errorCode
            },
            revalidate: 30,
=======
        const errorCode = res.ok ? 200 : res.statusCode
        const data = await res.json()

        return {
            props: {
                data, errorCode,
            },
            revalidate: 30, //only works when the app is deployed to production - npm run start can run the app in prod mode instead of npm run dev
>>>>>>> ec7975f00a75d8fc79aab06685164445a22b7386
        }
    }
    catch (err) {
        const errorCode = err ? 500 : null
        //const errMessage = err.message //it will display error message after passed as props
        return {
            props: {
                errorCode
            },
        }
    }
}

const DataMessageDefinitions = ({ data, errorCode }) => {

    const router = useRouter()
    const [itemDetail, setItemDetail] = useState(null)
    const [modal, setModal] = useState(false)
    const [enableField, setEnableField] = useState(false)
    const [loading, setLoading] = useState(true)
    const [updateText, setUpdateText] = useState(false)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        const x = setTimeout(() => {
            if (success) {
                setModal(false)
                setSuccess(null)
            }
            if (data) {
                setLoading(false)
                setUpdateText(false)
            }
        }, 1000)
        return () => clearTimeout(x)
    }, [success, data])

    const clearInputs = () => {
        setItemDetail({
            definitionKey: '',
            idDataSource: '',
            objectClass: '',
            versionNumber: '',
            idClient: '',
            messageTypes: '',
            instrumentDummySource: '',
            idRegion: '',
            messageToEventClass: '',
            messageFromEventClass: '',
            validationClass: '',
            matchingClass: '',
            comparingClass: '',
            dataSourceMessageClass: '',
            mergeClass: '',
            insertValidation: false,
            updateValidation: false,
            deleteValidation: false,
            mergeValidation: false
        })
    }

    const refreshData = () => {// each time this function is fired, the api get revalidated/fetched and data prop is updated once again.
        router.replace(router.asPath)
        setUpdateText(true)
    }

    const handleModal = item => {
        setModal(true)
        setItemDetail(item)
        setEnableField(false)
    }

    const closeModal = () => { //callBack function
        setModal(false)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        const payLoad = {
            definitionKey: itemDetail.definitionKey,
            idDataSource: itemDetail.idDataSource,
            objectClass: itemDetail.objectClass,
            versionNumber: itemDetail.versionNumber,
            idClient: itemDetail.idClient,
            messageTypes: itemDetail.messageTypes,
            instrumentDummySource: itemDetail.instrumentDummySource,
            idRegion: itemDetail.idRegion,
            messageToEventClass: itemDetail.messageToEventClass,
            messageFromEventClass: itemDetail.messageFromEventClass,
            validationClass: itemDetail.validationClass,
            matchingClass: itemDetail.matchingClass,
            comparingClass: itemDetail.comparingClass,
            dataSourceMessageClass: itemDetail.dataSourceMessageClass,
            mergeClass: itemDetail.mergeClas,
            insertValidation: itemDetail.insertValidation,
            updateValidation: itemDetail.updateValidation,
            deleteValidation: itemDetail.deleteValidation,
            mergeValidation: itemDetail.mergeValidation
        }
        axios.post(`/api/dataMessageDefinition`, payLoad)
        .then(res => {
            if (res.status < 300) {
                setItemDetail({...itemDetail})
                setSuccess(true)
                refreshData()
            }
        })
        .catch(err => {
            if (err.response.status > 300) {
                setItemDetail({...itemDetail})
                setSuccess(false)
                refreshData()
            }
        })
    }

    const newForm = () => {
        setModal(true)
        setEnableField(true)
        clearInputs()
    }

    const handleOnChange = e => {
        setItemDetail({ ...itemDetail, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Meta title="Data Message Definition Administation" />
            <Header title="Data Message Definition Administation" subTitle="" />
            {   errorCode > 300 ?
                <Error statusCode={errorCode} />
                :
                <>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={refreshData}
                            className="bg-gray-900 text-white hover:bg-gray-500 flex items-center justify-center w-24 transition-all ease-in-out duration-300 uppercase shadow-sm mr-3 py-2 rounded-md text-sm font-medium focus:outline-none">
                            {   !updateText ?
                                <>
                                    <img alt="plus" className="w-3 h-3 mr-1" src="/reload.svg" />
                                    <span>Refresh</span>
                                </>
                                :
                                <>
                                    <img alt="plus" className="w-3 h-3 animate-spin mr-1" src="/reload.svg" />
                                    <span>Loading</span>
                                </>
                            }
                        </button>
                        <button
                            type="button"
                            onClick={newForm}
                            className="bg-gray-900 text-white hover:bg-gray-500 flex items-center justify-center w-24 transition-all ease-in-out duration-300 uppercase shadow-sm py-2 rounded-md text-sm font-medium focus:outline-none">
                                <img alt="plus" className="w-3 h-3 mr-1" src="/plus-heavy-white.svg" /> 
                                Add
                        </button>
                    </div>
                    <div className="h-screen max-w-full mt-8 overflow-auto">
                        <table className="min-w-full divide-y divide-gray-200 shadow-sm">
                            <thead className="bg-white">
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
                            <tbody className="relative bg-white divide-y divide-gray-200">
                                {data && data.length === 0 && errorCode < 300 ?
                                    <tr className="h-full absolute top-40 inset-0 flex items-center justify-center">
                                        <td>no data available yet</td>
                                    </tr>
                                :
                                <>
                                    {data.map((item, idx ) => ( //item.filter(x => x !== null) =>
                                        <tr
                                            key={idx}
                                            onClick={() => handleModal(item)}
                                            className="hover:bg-gray-100 text-sm cursor-pointer"
                                        >
                                            {   loading ?
                                                <DMLoadingSkeleton/>
                                                :
                                                <>
                                                    {   idx !== 0 ?
                                                        <>
                                                            <td className="px-6 py-1">
                                                                <p className="w-52">
                                                                    {item.definitionKey}
                                                                </p>
                                                            </td>
                                                            <td className="px-6 py-1">
                                                                <p className="w-52">
                                                                    {item.idDataSource}
                                                                </p>
                                                            </td>
                                                            <td className="px-6 py-1">
                                                                <p className="w-52">
                                                                    {item.objectClass}
                                                                </p>
                                                            </td>
                                                            <td className="px-6 py-1">
                                                                <p className="w-52">
                                                                    {item.versionNumber}
                                                                </p>
                                                            </td>
                                                        </>
                                                        :
                                                        ''
                                                    }
                                                </>
                                            }
                                        </tr>
                                    ))}
                                </>
                                }
                            </tbody>
                        </table>
                        {   !itemDetail ?
                            null
                            :
                            <DataMessageModal
                                itemDataProp={itemDetail}
                                showModalProp={modal}
                                closeModalProp={closeModal}
                                handleOnChangeProp={handleOnChange}
                                handleFormSubmitProp={handleFormSubmit}
                                clearFormField={enableField}
                                success={success}
                            />
                        }
                    </div>
                </>
            }
        </>
    )
}
export default DataMessageDefinitions