import { useState, useEffect } from 'react'

const AccountRequest = () => {

    const [accountRequest, setAccountRequest] = useState([])
    console.log('accountRequest', accountRequest)
    const [update, setUpdate] = useState(0)
    console.log('update', update)
    const [loading, setLoading] = useState(false)
    console.log('loading', loading)

    useEffect(() => {
        AccountRequestApi()
    }, [update])

    const AccountRequestApi = async () => {
            setLoading(true)
        try {
            const res = await fetch('/api/user/admin/accountrequest?start=0&size=999')
            const data = await res.json()
            const stringifyObject = JSON.stringify(data)
            const convertedStr = stringifyObject.replace(/_/g,' ').toLowerCase()
            const newData = JSON.parse(convertedStr)
            setAccountRequest(newData)
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                type="button"
                className={`bg-gray-900 text-white hover:bg-gray-500 flex items-center justify-center w-28 transition-all ease-in-out duration-300 uppercase shadow-sm mr-3 py-2 rounded-md text-sm font-medium focus:outline-none`}
                onClick={() => setUpdate(update + 1)}
            >
                {   !loading ?
                        <>
                            <img alt="plus" className="w-3 mr-1" src="/reload.svg" />
                            <span>Refresh</span>
                        </>
                        :
                        <>
                            <img alt="plus" className="w-3 animate-spin mr-1" src="/reload.svg" />
                            <span>Loading</span>
                        </>
                    }
            </button>
            <div className="h-screen max-w-full overflow-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-sm mt-8">
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
                                <td className="px-6 py-1 w-80 break-all capitalize">
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