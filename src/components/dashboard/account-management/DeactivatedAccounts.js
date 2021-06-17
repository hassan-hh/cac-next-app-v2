import { useState, useEffect } from 'react'
import AMLoadingSkeleton from '../loading-skeletons/AMLoadingSkeleton'
import ItemLoadingSkeleton from '../loading-skeletons/ItemLoadingSkeleton'
import Error from '../../../pages/_error'

const DeactivatedAccounts = () => {

    const [deactivatedAccounts, setDeactivatedAccounts] = useState([])
    const [update, setUpdate] = useState(0)
    const [reactivating, setReactivating] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        DeactivatedAccountsApi()
        const x = setTimeout(() => {
            if (deactivatedAccounts) {
                setLoading(false)
            }
        }, 1000)
        return () => clearTimeout(x)
    }, [update])

    const DeactivatedAccountsApi = async () => {
            setLoading(true)
        try {
            const res = await fetch('/api/user/admin/account/deactivated?start=0&size=999')
            const data = await res.json()
            const stringifyObject = JSON.stringify(data)
            const convertedStr = stringifyObject.replace(/_/g,' ').toLowerCase()
            const newData = JSON.parse(convertedStr)
            setDeactivatedAccounts(newData)
        }
        catch (err) {
            setLoading(false)
        }
    }

    const ReactivateAccountsApi = async (username, idx) => {
            setReactivating(idx)
        try {
            const url = `/api/user/admin/account/reactivate/${username}`
            const encodedUrl = encodeURI(url);
            const res = await fetch(encodedUrl)
            setReactivating(null)
            setUpdate(update + 1)
        }
        catch (err) {
            setReactivating(null)
        }
    }

    // const handleRemoveItem = idx => {
    //     const newAccount = [...deactivatedAccounts]
    //     newAccount.splice(idx, 1)
    //     setDeactivatedAccounts(newAccount)
    // }
    
    const handleReactivate = (account, idx) => {
        ReactivateAccountsApi(account.username, idx)
        //handleRemoveItem(idx) //causes a bug at the bottom of the list, reactivating an item 
    }

    return (
        <>
            {   !deactivatedAccounts ?
                <Error />
                :
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
                            {deactivatedAccounts.map((account, idx) => (
                                <>
                                    {loading && update === 0 ?
                                        <AMLoadingSkeleton />
                                        :
                                        <tr key={account.username} className={`hover:bg-gray-100 text-sm text-left`}>
                                            {reactivating !== idx ?
                                                <>
                                                    <td className="px-6 py-1">
                                                        <p className="w-48 break-all">
                                                            {account.username}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-1">
                                                        <p className="w-48 break-all">
                                                            {account.email}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-1">
                                                        <p className="w-48 break-all">
                                                            {account.name}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-1">
                                                        <p className="w-48 break-all capitalize">
                                                            {account.type}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-1">
                                                        <p className="w-48 break-all">
                                                            {account.phoneNumber}
                                                        </p>
                                                    </td>
                                                </>
                                                :
                                                <ItemLoadingSkeleton />
                                            }
                                            <td className="px-6 py-1">
                                                <button
                                                    type="submit"
                                                    className={`${reactivating !== idx ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500'} w-32 ml-auto block focus:outline-none text-white transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-xs font-medium`}
                                                    onClick={() => handleReactivate(account, idx)}
                                                >
                                                    {reactivating !== idx ?
                                                        <span>Reactivate</span>
                                                        :
                                                        <div className="flex justify-center items-center">
                                                            <img alt="loading" className="w-4 animate-spin text-white mr-1 -ml-4" src="/loading-w.svg" />
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
            }
        </>
    )
}
export default DeactivatedAccounts