import { useState, useEffect } from 'react'

const DeactivatedAccounts = () => {

    const [deactivatedAccounts, setDeactivatedAccounts] = useState([])
    console.log('deactivatedAccounts', deactivatedAccounts)
    const [update, setUpdate] = useState(0)
    console.log('update', update)
    const [loading, setLoading] = useState(false)
    console.log('loading', loading)
     const [reactivating, setReactivating] = useState(null)

    useEffect(() => {
        DeactivatedAccountsApi()
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
            setLoading(false)
            console.log('res', res)
        }
        catch (err) {
            setLoading(false)
            console.warn('New error', err)
        }
    }

    // const handleRemoveItem = idx => {
    //     const newAccount = [...deactivatedAccounts]
    //     newAccount.splice(idx, 1)
    //     setDeactivatedAccounts(newAccount)
    // }

    const ReactivateAccountsApi = async (username, idx) => {
            setReactivating(idx)
        try {
            const url = `/api/user/admin/account/reactivate/${username}`
            const encodedUrl = encodeURI(url);
            const res = await fetch(encodedUrl)
            setReactivating(null)
            setUpdate(update + 1)
            console.log('res reactivate', res)
        }
        catch (err) {
            setReactivating(null)
            console.warn('New error', err)
        }
    }
    
    const handleReactivate = (account, idx) => {
        //handleRemoveItem(idx)
        ReactivateAccountsApi(account.username, idx)
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
                    {deactivatedAccounts.map((account, idx) => (
                        <tr key={idx} className={`${deactivatedAccounts.length === 0 ? 'h-screen' : ''} text-sm hover:bg-gray-100`}>
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
                                    className={`${ reactivating !== idx ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 px-4'} focus:outline-none text-white transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-xs font-medium`}
                                    onClick={() => handleReactivate(account, idx)}
                                    >
                                    {   reactivating !== idx ? 
                                        <span>Reactivate</span>
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
export default DeactivatedAccounts