import { useState, useEffect } from 'react'
import LoadingSkeleton from '../LoadingSkeleton'
import ItemLoadingSkeleton from '../ItemLoadingSkeleton'

const ActiveAccounts = () => {

    const [activeAccounts, setActiveAccounts] = useState([])
    const [update, setUpdate] = useState(0)
    const [deactivating, setDeactivating] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ActiveAccountsApi()
        const x = setTimeout(() => {
            if (activeAccounts) {
                setLoading(false)
            }
        }, 1000)
        return () => clearTimeout(x)
    }, [update])

    const ActiveAccountsApi = async () => {
            setLoading(true)
        try {
            const res = await fetch('/api/user/admin/account/active?start=0&size=999')
            const data = await res.json()
            const stringifyObject = JSON.stringify(data)
            const convertedStr = stringifyObject.replace(/_/g,' ').toLowerCase()
            const newData = JSON.parse(convertedStr)
            setActiveAccounts(newData)
        }
        catch (err) {
            setLoading(false)
        }
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

    const handleRemoveItem = idx => {
        const newAccount = [...activeAccounts]
        newAccount.splice(idx, 1)
        setActiveAccounts(newAccount)
    }
    
    const handleDeactivate = (account, idx) => {
        DeactivateAccountsApi(account.username, idx)
        handleRemoveItem(idx)
    }

    return (
        <div className="h-screen max-w-full overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-sm">
                <thead className="bg-gray-50">
                    <tr className="text-left text-xs text-gray-500 tracking-wider">
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
                <tbody className="bg-white divide-y divide-gray-200">
                    {   activeAccounts.map((account, idx) => (
                        <>
                            {   loading && update === 0 ?
                                <LoadingSkeleton />
                                :
                                <tr key={idx} className={`hover:bg-gray-100 text-sm text-left`}>
                                    {   deactivating !== idx ? 
                                        <>
                                            <td className="px-6 py-1 w-80 break-all">
                                                <p>{account.username}</p>
                                            </td>
                                            <td className="px-6 py-1 w-80 break-all">
                                                <p>{account.email}</p>
                                            </td>
                                            <td className="px-6 py-1 w-80 break-all">
                                                <p>{account.name}</p>
                                            </td>
                                            <td className="px-6 py-1 w-80 break-all capitalize">
                                                <p>{account.type}</p>
                                            </td>
                                            <td className="px-6 py-1 w-80 break-all">
                                                <p>{account.phoneNumber}</p>
                                            </td>
                                        </>
                                        :
                                        <ItemLoadingSkeleton />
                                    }
                                    <td className="px-6 py-1 w-80">
                                        <button
                                            type="submit"
                                            className={`${ deactivating !== idx ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 px-4'} ml-auto block focus:outline-none text-white transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-xs font-medium`}
                                            onClick={() => handleDeactivate(account, idx)}
                                            >
                                            {   deactivating !== idx ? 
                                                <span>Deactivate</span>
                                                :
                                                <div className="flex justify-center items-center">
                                                    <img alt="loading" className="w-4 animate-spin text-white mr-1" src="/loading-w.svg" />
                                                    <span>Processing</span>
                                                </div>
                                            }
                                        </button>
                                    </td>
                                </tr>
                            }
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ActiveAccounts