import { useState, useEffect } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Error from '../_error'
import ClientConfig from '../../ClientConfig'
import InstallationPropertiesModal from '../../Components/dashboard/InstallationPropertiesModal'
import axios from 'axios'
import { useRouter } from 'next/router';
import LoadingSkeleton from '../../components/dashboard/LoadingSkeleton'

export const getStaticProps = async () => {
        const CatsUrl = ClientConfig.apiUrl
        const res = await fetch(`${CatsUrl}/installation/properties`)
        const data = await res.json()
    
    // if(!data) {
    //     return {
    //         props: {
    //             noData
    //         },
    //     }
    // }

    return {
        props: {
            data
        },
        revalidate: 1,
    }
}

const InstallationProperties = ({ data }) => {

    console.log('fetched table data', data)
    const router = useRouter()
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [itemDetail, setItemDetail] = useState({
        osName: '',
        filter: '',
        key: '',
        value: '',
        success: null
    })
    console.log('itemDetail', itemDetail)

    useEffect(() => {
        if (!data) {
            setLoading(true)
        }
        const x = setTimeout(() => {
            if (itemDetail.success) {
                setModal(false)
            }
            if (data){
                setLoading(false)
            }
        }, 1500)
        return () => clearTimeout(x)
    }, [itemDetail.success, data])

    const refreshData = () => {
        router.replace(router.asPath)
    }

    const handleModal = item => {
        setModal(true)
        setItemDetail(item)
    }

    const closeModal = () => { //callBack function
        setModal(false)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        const payLoad = {
            osName: itemDetail.osName,
            idInstallation: itemDetail.idInstallation,
            filter: itemDetail.filter,
            key: itemDetail.key,
            value: itemDetail.value
        }
        axios.post(`/api/installation/properties/save`, payLoad)
        .then(res => {
            if (res.status < 300) {
                setItemDetail({
                    ...itemDetail,
                    success: true
                })
                refreshData()
            }
            console.log('res', res)
        })
        .catch(err => {
            if (err.response.status > 300) {
                setItemDetail({
                    ...itemDetail,
                    success: false
                })
                refreshData()
            }
            console.warn('error', err)
        })
    }

    const handleOnChange = e => {
        setItemDetail({...itemDetail, [e.target.name] : e.target.value})
    }

    return (
        <>
            <Meta title="Installation Properties" />
            <Header title="Installation Properties" subTitle=""/>
            {   !data ?
                <Error />
                :
                <div className="h-screen max-w-full overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200 shadow-sm">
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
                        <tbody  className="bg-white divide-y divide-gray-200 text-sm">
                            {data.map((item, idx) => (
                                <>
                                    {   loading ? 
                                        <LoadingSkeleton/>
                                        :  
                                        <tr
                                            key={idx}
                                            onClick={() => handleModal(item)}
                                            className="hover:bg-gray-100 cursor-pointer"
                                        >
                                            <td className="px-6 py-1">
                                                <p>
                                                    {item.osName}
                                                </p>
                                            </td>
                                            <td className="px-6 py-1">
                                                <p>
                                                    {item.filter}
                                                </p>
                                            </td>
                                            <td className="px-6 py-1">
                                                <p className="w-96 md:w-40 lg:w-44 xl:w-72 break-all">
                                                    {item.key}
                                                </p>
                                            </td>
                                            <td className="px-6 py-1">
                                                <p className="w-96 md:w-40 lg:w-44 xl:w-72 break-all">
                                                    {item.value}
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
                        <InstallationPropertiesModal
                            itemDataProp={itemDetail}
                            showModalProp={modal}
                            closeModalProp={closeModal}
                            handleOnChangeProp={handleOnChange}
                            handleFormSubmitProp={handleFormSubmit}
                            success={itemDetail.success}
                        />
                    }
                </div>
            }
        </>
    )
}
export default InstallationProperties