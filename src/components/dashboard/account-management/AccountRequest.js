import { useState, useEffect } from 'react'

const AccountRequest = () => {

    const [accountRequest, setAccountRequest] = useState([])
    const [update, setUpdate] = useState(0)
    console.log('update', update)
    const [loading, setLoading] = useState(false)
    console.log('loading', loading)

    useEffect(() => {
        AccountRequestApi()
    }, [update])

    const AccountRequestApi = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/user/admin/accountrequest?start=0&size=999')
            const data = await res.json()
            const stringifyObject = JSON.stringify(data)
            const convertedStr = stringifyObject.replace(/_/g,' ').toLowerCase()
            const newData = JSON.parse(convertedStr)
            setAccountRequest(newData)
            setLoading(false)
            console.log('res', res)
        }
        catch (err) {
            console.warn('New error', err)
        }
    }

    return (
        <>
            <button
                type="submit"
                className={`bg-gray-900 text-white focus:outline-none transition-all ease-in-out duration-300 uppercase shadow-sm px-3 py-2 rounded-md text-xs font-medium`}
                onClick={() => setUpdate(update + 1)}
            >
                Refresh
            </button>
            <div className="h-screen max-w-full overflow-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-sm mt-8">
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {accountRequest.map((account, idx) => (
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
                                {/* <td className="px-6 py-2">
                                    <button
                                        type="submit"
                                        className={`${ !loading ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500'} focus:outline-none text-white transition-all ease-in-out duration-300 uppercase px-3 py-2 rounded-md text-xs font-medium`}
                                        onClick={() => handleDeactivate(account, idx)}
                                        >
                                        {   !loading ? 
                                            'Deactivate'
                                            :
                                            'Processing'
                                        }
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default AccountRequest