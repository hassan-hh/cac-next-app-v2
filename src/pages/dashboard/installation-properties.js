import { useState, useEffect } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Error from '../_error'
import ClientConfig from '../../ClientConfig'
import Modal from '../../Components/dashboard/Modal'
import axios from 'axios'
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
    const CatsUrl = ClientConfig.apiUrl
    const res = await fetch(`${CatsUrl}/installation/properties`)
    const data = await res.json()
 
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
    const [update, setUpdate] = useState(0)
    const [modal, setModal] = useState(false)
    const [itemDetail, setItemDetail] = useState({
        osName: '',
        filter: '',
        key: '',
        value: '',
        success: null
    })
    console.log('itemDetail', itemDetail)

    useEffect(() => {
        const x = setTimeout(() => {
            if (itemDetail.success) {
                setModal(false)
            }
        }, 1500)
        return () => clearTimeout(x)
    }, [itemDetail.success])

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
                                <tr
                                    key={idx}
                                    onClick={() => handleModal(item)}
                                    className="hover:bg-gray-100 cursor-pointer"
                                >
                                    <td className="px-6 py-1">
                                        <p>{item.osName}</p>
                                    </td>
                                    <td className="px-6 py-1">
                                        <p>{item.filter}</p>
                                    </td>
                                    <td className="px-6 py-1">
                                        <p className="w-96 md:w-40 lg:w-44 xl:w-72 break-all">{item.key}</p>
                                    </td>
                                    <td className="px-6 py-1">
                                        <p className="w-96 md:w-40 lg:w-44 xl:w-72 break-all">{item.value}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {   !itemDetail ?
                            null
                            :
                            <Modal
                                itemDataProp={itemDetail}
                                showModalProp={modal}
                                closeModalProp={closeModal}
                                handleOnChangeProp={handleOnChange}
                                handleFormSubmitProp={handleFormSubmit}
                                success={itemDetail.success}
                            />
                        }
                    </table>
                </div>
            }
        </>
    )
}
export default InstallationProperties