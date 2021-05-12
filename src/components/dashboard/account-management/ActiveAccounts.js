import { useState, useEffect } from 'react'

const ActiveAccounts = () => {

    const [activeAccounts, setActiveAccounts] = useState([])
    console.log('activeAccounts', activeAccounts)
    const [update, setUpdate] = useState(0)
    console.log('update', update)
    const [loading, setLoading] = useState(false)
    console.log('loading', loading)
    const [deactivating, setDeactivating] = useState(null)

    useEffect(() => {
        ActiveAccountsApi()
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
            setLoading(false)
            console.log('res', res)
        }
        catch (err) {
            setLoading(false)
            console.warn('New error', err)
        }
    }

    // const handleRemoveItem = idx => {
    //     const newAccount = [...activeAccounts]
    //     newAccount.splice(idx, 1)
    //     setActiveAccounts(newAccount)
    // }

    const DeactivateAccountsApi = async (username, idx) => {
            setDeactivating(idx)
        try {
            const url = `/api/user/admin/account/deactivate/${username}`
            const encodedUrl = encodeURI(url);
            const res = await fetch(encodedUrl)
            setDeactivating(null)
            setUpdate(update + 1)
            console.log('res deactivate', res)
        }
        catch (err) {
            setDeactivating(null)
            console.warn('New error', err)
        }
    }
    
    const handleDeactivate = (account, idx) => {
        //handleRemoveItem(idx)
        DeactivateAccountsApi(account.username, idx)
    }

    return (
        <div className="h-screen max-w-full overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">

                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {activeAccounts.map((account, idx) => (
                        <tr key={idx} className="hover:bg-gray-100 text-sm">
                            <td className="px-6 py-1 w-80 break-all">
                                <p>{account.username}</p>
                            </td>
                            <td className="px-6 py-1 w-80 break-all">
                                <p>{account.email}</p>
                            </td>
                            <td className="px-6 py-1 w-80 break-all">
                                <p>{account.name}</p>
                            </td>
                            <td className="px-6 py-1 w-80 break-all">
                                <p>{account.type}</p>
                            </td>
                            <td className="px-6 py-1 w-80 break-all">
                                <p>{account.phoneNumber}</p>
                            </td>
                            <td className="px-6 py-1">
                                <button
                                    type="submit"
                                    className={`${ deactivating !== idx ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 px-4'} focus:outline-none text-white transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-xs font-medium`}
                                    onClick={() => handleDeactivate(account, idx)}
                                    >
                                    {   deactivating !== idx ? 
                                        <span className="">Deactivate</span>
                                        :
                                        <div className="flex justify-center items-center">
                                            <img alt="loading" className="w-4 animate-spin text-white" src="/loading-w.svg" />
                                            <span className="pl-1">Processing</span>
                                        </div>
                                    }
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ActiveAccounts