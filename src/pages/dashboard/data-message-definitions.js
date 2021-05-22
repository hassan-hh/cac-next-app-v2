import { useState, useEffect } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Link from 'next/link'
import ClientConfig from '../../ClientConfig'
import DataMessageModal from '../../Components/dashboard/DataMessageModal'
import axios from 'axios'
import { useRouter } from 'next/router';

 export const getStaticProps = async () => {
    const CatsUrl = ClientConfig.apiUrl
    const res = await fetch(`${CatsUrl}/dataMessageDefinition`)
    const data = await res.json()
        
        return {
            props: {
                data
            },
            revalidate: 1,
        }
    }

const DataMessageDefinitions = ({ data }) => {

    const router = useRouter()
    const [modal, setModal] = useState(false)
    const [enableField, setEnableField] = useState(false)
    const [success, setSuccess] = useState(null)
    const [itemDetail, setItemDetail] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const x = setTimeout(() => {
            if (success) {
                setModal(false)
                setSuccess(null)
            }
            if (loading) {
                setLoading(false)
            }
        }, 1500)
        return () => clearTimeout(x)
    }, [success, loading])

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

    const refreshData = () => {
        router.replace(router.asPath)
        setLoading(true)
    }

    const handleModal = item => {
        setModal(true)
        setItemDetail(item)
        setEnableField(false)
    }

    const closeModal = () => { //callBack function
        setModal(false)
        clearInputs()
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
            console.log('res', res)
        })
        .catch(err => {
            if (err.response.status > 300) {
                setItemDetail({...itemDetail})
                setSuccess(false)
                refreshData()
            }
            console.warn('error', err)
        })
    }

    const handleOnChange = e => {
        setItemDetail({ ...itemDetail, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Meta title="Data Message Definition Administation" />
            <Header title="Data Message Definition Administation" subTitle="" />
            <div className="flex">
                <button
                    type="button"
                    onClick={() => refreshData()}
                    className="bg-gray-900 text-white hover:bg-gray-500 flex items-center justify-center w-28 transition-all ease-in-out duration-300 uppercase shadow-sm mr-3 py-2 rounded-md text-sm font-medium focus:outline-none">
                    {   !loading ?
                        <>
                            <img alt="plus" className="w-3 mr-1" src="/reload.svg" />
                            <span>Refresh</span>
                        </>
                        :
                        <>
                            <img alt="plus" className="w-3 animate-spin mr-1" src="/reload.svg" />
                            <span>Loading</span>
                        </>
                    }
                </button>
                <button
                    type="button"
                    onClick={() => { setModal(true); setEnableField(true); clearInputs();}}
                    className="bg-gray-900 text-white hover:bg-gray-500 flex items-center justify-center w-24 transition-all ease-in-out duration-300 uppercase shadow-sm py-2 rounded-md text-sm font-medium focus:outline-none">
                        <img alt="plus" className="w-3 mr-1" src="/plus-heavy-white.svg" /> 
                        Add
                </button>
            </div>
            <div className="h-screen max-w-full mt-8 overflow-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-sm">
                    <thead className="bg-gray-50">
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
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, idx) => (
                            <>
                                {   idx === 0 ?
                                    null
                                    :
                                    <tr 
                                        key={idx}
                                        onClick={() => handleModal(item)} 
                                        className="hover:bg-gray-100 text-sm cursor-pointer"
                                        >
                                            <td className="px-6 py-1">
                                                <p>
                                                    {item.definitionKey}
                                                </p>
                                            </td>
                                            <td className="px-6 py-1">
                                                <p>
                                                    {item.idDataSource}
                                                </p>
                                            </td>
                                            <td className="px-6 py-1">
                                                <p>
                                                    {item.objectClass}
                                                </p>
                                            </td>
                                            <td className="px-6 py-1">
                                                <p>
                                                    {item.versionNumber}
                                                </p>
                                            </td>
                                    </tr>
                                }
                            </>
                        ))}
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
                        newForm={enableField}
                        success={success}
                    />
                }
            </div>
        </>
    )
}
export default DataMessageDefinitions