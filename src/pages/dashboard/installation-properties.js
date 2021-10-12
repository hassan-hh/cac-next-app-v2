import { useState, useEffect } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Error from '../_error'
import InstallationPropertiesModal from '../../Components/dashboard/InstallationPropertiesModal'
import axios from 'axios'
import { useRouter } from 'next/router';
import IPLoadingSkeleton from '../../components/dashboard/loading-skeletons/IPLoadingSkeleton'

export const getServerSideProps = async (context) => {
    const { req } = context || {}
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/installation/properties`, {
        headers: { 
            Cookie: req?.headers?.cookie || ''
        }
    })
    const data = await res.json()
    const errorCode = res.ok ? 200 : res.statusCode

    return {
        props: {
            data: data || [], 
            errorCode: errorCode || null
        },
    }
}

const InstallationProperties = ({ data, errorCode }) => {

    const router = useRouter()
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(true)
    //const [success, setSuccess] = useState(null)
    const [itemDetail, setItemDetail] = useState({
        osName: '',
        filter: '',
        key: '',
        value: '',
        success: null
    })

    useEffect(() => {
        const x = setTimeout(() => {
            if (itemDetail.success === true) {
                setModal(false)
            }
            if (data) { // our loading state is true by default, if data is not empty then display data and setLoading to false
                setLoading(false)
                //refreshData()
            }
        }, 1000)
        return () => clearTimeout(x)
    }, [itemDetail.success, data])
  
    const refreshData = () => { //similar to AJAX in this case we might not need revalidate. 
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
        })
        .catch(err => {
            if (err.response.status > 300) {
                setItemDetail({
                    ...itemDetail,
                    success: false
                })
                refreshData()
            }
        })
    }

    const handleOnChange = e => {
        setItemDetail({...itemDetail, [e.target.name] : e.target.value})
    }

    return (
        <>
            <Meta title="Installation Properties" />
            <Header title="Installation Properties" subTitle=""/>
            {   errorCode > 300 ?
                <Error statusCode={errorCode} />
                :
                <div className="h-screen max-w-full overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200 shadow-sm">
                        <thead className="bg-white">
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
                        <tbody className="relative bg-white divide-y divide-gray-200 text-sm">
                            {data?.length === 0 && errorCode < 300 ?
                                <tr className="h-screen absolute inset-0 flex items-center justify-center">
                                    <td>no data available yet</td>
                                </tr>
                                :
                                <>
                                    {data?.length && data.map((item, idx) => (
                                        <tr
                                            key={idx}
                                            onClick={() => handleModal(item)}
                                            className="hover:bg-gray-100 cursor-pointer"
                                        >
                                            {   loading ?
                                                <IPLoadingSkeleton />
                                                :
                                                <>
                                                    <td className="px-6 py-1">
                                                        <p className="w-48">
                                                            {item?.osName}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-1">
                                                        <p className="w-48 break-all">
                                                            {item?.filter}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-1">
                                                        <p className="w-96 md:w-40 lg:w-44 xl:w-72 break-all">
                                                            {item?.key}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-1">
                                                        <p className="w-96 md:w-40 lg:w-44 xl:w-72 break-all">
                                                            {item?.value}
                                                        </p>
                                                    </td>
                                                </>
                                            }
                                        </tr>
                                    ))}
                                </>
                            }
                        </tbody>
                    </table>
                    {   !itemDetail ?
                        ''
                        :
                        <InstallationPropertiesModal
                            itemDataProp={itemDetail}
                            showModalProp={modal}
                            closeModalProp={closeModal}
                            handleOnChangeProp={handleOnChange}
                            handleFormSubmitProp={handleFormSubmit}
                            success={itemDetail?.success}
                        />
                    }
                </div>
            } 
        </>
    )
}
export default InstallationProperties