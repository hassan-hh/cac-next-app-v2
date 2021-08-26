import { useState, useEffect, useContext } from 'react'
import { StoreContext } from '../../../providers/StoreContext'
import AMLoadingSkeleton from '../loading-skeletons/AMLoadingSkeleton'
import Error from '../../../pages/_error'
import axios from 'axios'
import Cookies, { set } from 'js-cookie'

const AccountRequest = () => {

    const {store, setStore} = useContext(StoreContext)
    const [accountRequest, setAccountRequest] = useState([])
    const [update, setUpdate] = useState(0)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState({
        errorCode: null,
        data: null
    })
    console.log('accountRequest', accountRequest)

    useEffect(() => {
        AccountRequestApi()
        const x = setTimeout(() => {
            if (success.data === true || success.data === false) {
                setLoading(false)
            }
        }, 1000)
        return () => {clearTimeout(x); setLoading(false); setUpdate(0);}
    }, [update, success.data])

    const AccountRequestApi = async () => {
        setLoading(true)
        axios.get('/api/user/admin/accountrequest?start=0&size=999')
            .then(res => {
                if (res.status < 300) {
                    setAccountRequest(res.data)
                    setSuccess({
                        ...success,
                        errorCode: res.status,
                        data: true
                    })
                    console.log('res ar', res)
                    const { sessionId } = res.headers
                    Cookies.set('sessionId', res.headers.sessionid)
                    setStore({
                        ...store,
                        sessionId: sessionId, // JSESSIONID already stored in the cookie and cookie usually comes from the rest route itself we don't need to store it manually. Not like auth token JWT must be passed to the headers and stored in the local storage.
                    })
                }
                console.log('res', res)
            })
            .catch(err => {
                if (err.response && err.response.status > 300) {
                    setSuccess({
                        ...success,
                        errorCode: err.response.status, 
                        data: false
                    })
                }
                console.log('err', err.response)
            })
    }

    return (
        <>
            {   success.data === false ?
                <Error statusCode={success.errorCode}/>
                :
                <>
                    <button
                        type="button"
                        className={`absolute top-11 bg-gray-900 text-white hover:bg-gray-500 flex items-center justify-center w-24 transition-all ease-in-out duration-300 uppercase shadow-sm mr-3 py-2 rounded-md text-sm font-medium focus:outline-none`}
                        onClick={() => setUpdate(update + 1)}
                    >
                        {   !loading ?
                            <>
                                <img alt="plus" className="w-3 h-3 mr-1" src="/reload.svg" />
                                <span>Refresh</span>
                            </>
                            :
                            <>
                                <img alt="plus" className="w-3 h-3 animate-spin mr-1" src="/reload.svg" />
                                <span>Loading</span>
                            </>
                        }
                    </button>
                    <div className="h-screen max-w-full overflow-auto">
                        <table className="min-w-full divide-y divide-gray-200 shadow-sm mt-16">
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
                                {accountRequest.length === 0 && success.data === true ?
                                    <tr className="absolute top-80 inset-0 flex items-center justify-center h-10">
                                        <td>No data available yet</td>
                                    </tr>
                                    :
                                    <>
                                        {accountRequest.map((account, idx) => (
                                            <tr key={idx} className="hover:bg-gray-100 text-sm">
                                                {   loading === true ?
                                                    <AMLoadingSkeleton />
                                                    :
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
                                                            <p>{account.type.replace(/_/g,' ').toLowerCase()}</p>
                                                        </td>
                                                        <td className="px-6 py-1 w-80 break-all">
                                                            <p>{account.phoneNumber}</p>
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
                </>
            }
        </>
    )
}
export default AccountRequest