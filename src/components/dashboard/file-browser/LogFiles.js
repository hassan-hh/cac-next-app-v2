import { useState, useEffect } from 'react'
import FBLoadingSkeleton from '../loading-skeletons/FBLoadingSkeleton'
import Error from '../../../pages/_error'
import axios from 'axios'

const LogFiles = () => {

    const [logFiles, setLogFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState({
        errorCode: null,
        data: null
    })

    useEffect(() => {
        logFilesApi()
        const x = setTimeout(() => {
            if (success.data === true || success.data === false) {
                setLoading(false)
            }
        }, 1000)
        return () => {clearTimeout(x); setLoading(false);}
    }, [success.data])

    const logFilesApi = () => {
        setLoading(true)
        axios.get('/api/filebrowser/1/file')
            .then(res => {
                if (res.status < 300) {
                    setLogFiles(res.data)
                    setSuccess({
                        ...success,
                        errorCode: res.status,
                        data: true
                    })
                }
                console.log('res', res)
            })
            .catch(err => {
                if (err.response.status > 300) {
                    setSuccess({
                        ...success,
                        errorCode: err.response.status, 
                        data: false
                    })
                }
                console.log('err', err.response)
            })
    }
    //console.log('logFiles', logFiles)

    return (
        <>
            {   success.data === false ?
                <Error statusCode={success.errorCode}/>
                :
                <div className="h-screen max-w-full overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200 shadow-sm">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-xs text-gray-500 tracking-wider">
                                <th scope="col" className="px-6 py-3 w-80 font-medium">
                                    Filename
                            </th>
                                <th scope="col" className="px-6 py-3 w-80 font-medium">
                                    Last Modified
                            </th>
                                <th scope="col" className="px-6 py-3 w-80 font-medium">
                                    Size
                            </th>
                            </tr>
                        </thead>
                        <tbody className="relative bg-white divide-y divide-gray-200">
                            {logFiles.length === 0 && success.data === true ?
                                <tr className="h-full absolute top-40 inset-0 flex items-center justify-center">
                                    <td>No data available yet</td>
                                </tr>
                                :
                                <>
                                    {logFiles.map((logFile, idx) => ( 
                                        <tr key={idx} className={`hover:bg-gray-100 text-sm text-left`}>
                                            {loading ?
                                                <FBLoadingSkeleton />
                                                :
                                                <>
                                                    <td className="px-6 py-1 w-80 break-all">
                                                        <p>logFiles</p>
                                                    </td>
                                                    <td className="px-6 py-1 w-80 break-all">
                                                        <p>Last Modified</p>
                                                    </td>
                                                    <td className="px-6 py-1 w-80 break-all">
                                                        <p>Size</p>
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
export default LogFiles