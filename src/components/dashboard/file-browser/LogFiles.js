import { useState, useEffect } from 'react'
import FBLoadingSkeleton from '../loading-skeletons/FBLoadingSkeleton'
import Error from '../../../pages/_error'

const LogFiles = () => {

    const [logFiles, setLogFiles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        logFilesApi()
        return () => {setLoading(false)}
    }, [])

    const logFilesApi = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/filebrowser/1/file')
            const data = await res.json()
            //setLoading(false)
            setLogFiles(data)
        }
        catch (err) {
            setLoading(false)
        }
    }
    //console.log('logFiles', logFiles)

    return (
        <>
            {   !logFiles ?
                <Error />
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
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logFiles.map(logFile => (
                                <>
                                    {loading ?
                                        <FBLoadingSkeleton />
                                        :
                                        <tr key={idx} className={`hover:bg-gray-100 text-sm text-left`}>
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
export default LogFiles