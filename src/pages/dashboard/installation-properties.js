import { useState, useEffect } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Error from '../_error'
import InstallationPropertiesModal from '../../Components/dashboard/InstallationPropertiesModal'
import axios from 'axios'
import { useRouter } from 'next/router';
import IPLoadingSkeleton from '../../components/dashboard/loading-skeletons/IPLoadingSkeleton'

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/installation/properties`)
    const data = await res.json()

    return {
        props: {
            data
        },
        revalidate: 1, //only works when the app is deployed to production - npm run start can run the app in prod mode instead of npm run dev
    }
}

const InstallationProperties = ({ data }) => {

    const router = useRouter()
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [itemDetail, setItemDetail] = useState({
        osName: '',
        filter: '',
        key: '',
        value: '',
        success: null
    })

    useEffect(() => {
        const x = setTimeout(() => {
            if (itemDetail.success) {
                setModal(false)
            }
            if (data) { // our loading state is true by default, if data is not empty then display data and setLoading to false
                setLoading(false)
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
                                    {   loading ?
                                        <IPLoadingSkeleton />
                                        :
                                        <>
                                            <td className="px-6 py-1">
                                                <p className="w-48">
                                                    {item.osName}
                                                </p>
                                            </td>
                                            <td className="px-6 py-1">
                                                <p className="w-48 break-all">
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
                                        </>
                                    }
                                </tr>
                            ))}
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
                            success={itemDetail.success}
                        />
                    }
                </div>
            }
        </>
    )
}
export default InstallationProperties