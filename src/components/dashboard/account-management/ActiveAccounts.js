import { useState, useEffect } from 'react'
import AMLoadingSkeleton from '../loading-skeletons/AMLoadingSkeleton'
import ItemLoadingSkeleton from '../loading-skeletons/ItemLoadingSkeleton'
import Error from '../../../pages/_error'
import axios from 'axios'

const ActiveAccounts = () => {

    const [activeAccounts, setActiveAccounts] = useState([])
    const [update, setUpdate] = useState(0)
    const [deactivating, setDeactivating] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState({
        errorCode: null,
        data: null
    })

    console.log('activeAccounts', activeAccounts)

    useEffect(() => {
        ActiveAccountsApi()
        const x = setTimeout(() => {
            if (success?.data === true || success?.data === false) {
                setLoading(false)
            }
        }, 1000)
        return () => {clearTimeout(x); setLoading(false);}
    }, [update, success?.data])

    const ActiveAccountsApi = () => {
        setLoading(true)
        axios.get('/api/user/admin/account/active?start=0&size=999')
            .then(res => {
                if (res?.status < 300) {
                    setActiveAccounts(res?.data)
                    setSuccess({
                        ...success,
                        errorCode: res?.status,
                        data: true
                    })
                }
                console.log('res', res)
            })
            .catch(err => {
                if (err?.response?.status > 300) {
                    setSuccess({
                        ...success,
                        errorCode: err?.response?.status, 
                        data: false
                    })
                }
                console.log('err', err.response)
            })
    }

    const DeactivateAccountsApi = async (username, idx) => {
            setDeactivating(idx)
        try {
            const url = `/api/user/admin/account/deactivate/${username}`
            const encodedUrl = encodeURI(url);
            const res = await fetch(encodedUrl)
            setDeactivating(null)
            setUpdate(update + 1)
        }
        catch (err) {
            setDeactivating(null)
        }
    }
    
    const handleDeactivate = (account, idx) => {
        DeactivateAccountsApi(account?.username, idx)
    }

    return (
        <>
            {   success?.data === false ?
                <Error statusCode={success?.errorCode}/>
                :
                <div className="h-screen max-w-full overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200 shadow-sm">
                        <thead className="bg-white">
                            <tr className="text-left text-xs text-gray-600 tracking-wider">
                                <th scope="col" className="px-6 py-3 w-80 font-medium">
                                    Username
                                    </th>
                                <th scope="col" className="px-6 py-3 w-80 font-medium">
                                    Email
                                    </th>
                                <th scope="col" className="px-6 py-3 w-80 font-medium">
                                    Name
                                    </th>
                                <th scope="col" className="px-6 py-3 w-80 font-medium">
                                    Type
                                    </th>
                                <th scope="col" className="px-6 py-3 w-80 font-medium">
                                    Phone
                                    </th>
                                <th scope="col" className="px-6 py-3 w-80 font-medium">
                                </th>
                            </tr>
                        </thead>
                        <tbody className="relative bg-white divide-y divide-gray-200">
                            {activeAccounts.length === 0 && success?.data === true ?
                                <tr className="h-screen absolute top-40 inset-0 flex items-center justify-center">
                                    <td>No data available yet</td>
                                </tr>
                                :
                                <>
                                    {activeAccounts.map((account, idx) => (
                                        <tr key={account?.username} className={`hover:bg-gray-100 text-sm text-left`}>
                                            {loading && update === 0 ?
                                                <AMLoadingSkeleton />
                                                :
                                                <>
                                                    {deactivating !== idx ?
                                                        <>
                                                            <td className="px-6 py-1">
                                                                <p className="w-48 break-all">
                                                                    {account?.username}
                                                                </p>
                                                            </td>
                                                            <td className="px-6 py-1">
                                                                <p className="w-48 break-all">
                                                                    {account?.email}
                                                                </p>
                                                            </td>
                                                            <td className="px-6 py-1">
                                                                <p className="w-48 break-all">
                                                                    {account?.name}
                                                                </p>
                                                            </td>
                                                            <td className="px-6 py-1">
                                                                <p className="w-48 break-all capitalize">
                                                                    {account?.type.replace(/_/g,' ').toLowerCase()}
                                                                </p>
                                                            </td>
                                                            <td className="px-6 py-1">
                                                                <p className="w-48 break-all">
                                                                    {account?.phoneNumber}
                                                                </p>
                                                            </td>
                                                        </>
                                                        :
                                                        <ItemLoadingSkeleton />
                                                    }
                                                    <td className="px-6 py-1">
                                                        <button
                                                            type="submit"
                                                            className={`${deactivating !== idx ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500'} w-32 ml-auto block focus:outline-none text-white transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-xs font-medium`}
                                                            onClick={() => handleDeactivate(account, idx)}
                                                        >
                                                            {deactivating !== idx ?
                                                                <span>Deactivate</span>
                                                                :
                                                                <div className="flex justify-start">
                                                                    <img alt="loading" className="w-4 animate-spin text-white mr-1 -ml-1" src="/loading-w.svg" />
                                                                    <span>Processing</span>
                                                                </div>
                                                            }
                                                        </button>
                                                    </td>
                                                </>
                                            }
                                        </tr>
                                    ))}
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}
export default ActiveAccounts