import { useState, useEffect } from 'react'
import FBLoadingSkeleton from '../loading-skeletons/FBLoadingSkeleton'
import Error from '../../../pages/_error'
import axios from 'axios'
import { useRouter } from 'next/router';

const LogFiles = () => {

    const router = useRouter()
    const [logFiles, setLogFiles] = useState([])
    const [breadCrumbs, setBreadCrumbs] = useState(null)
    const [baseUrl, setBaseUrl] = useState({})
    const [directory, setDirectory] = useState(null)
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
        return () => { clearTimeout(x); setLoading(false); }
    }, [success.data])

    const refreshData = () => { //similar to AJAX in this case we might not need revalidate.
        router.replace(router.asPath)
        logFilesApi()
        setLoading(false)
        setBreadCrumbs(null)
    }

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
            })
            .catch(err => {
                if (err.response.status > 300) {
                    setSuccess({
                        ...success,
                        errorCode: err.response.status,
                        data: false
                    })
                }
            })
    }

    const baseUrlApi = (baseUrl) => {
        axios.get(`/api/filebrowser/1/file/${baseUrl}`)
            .then(res => {
                if (res.status < 300) {
                    setLogFiles(res.data)
                    setSuccess({
                        ...success,
                        errorCode: res.status,
                        data: true
                    })
                }
            })
            .catch(err => {
                if (err.response.status > 300) {
                    setSuccess({
                        ...success,
                        errorCode: err.response.status,
                        data: false
                    })
                }
            })
    }

    const handleFileBrowser = (logFile) => {
        setBreadCrumbs(logFile.pathFromRoot.replace(/\//g, ' > '))
        setBaseUrl(logFile.base64PathFromRoot) //.replace(/=/g, '%3D')
        setDirectory(logFile.directory)
        baseUrlApi(logFile.base64PathFromRoot)
    }

    const hrefBaseUrl = `/api/filebrowser/1/file/download/${baseUrl}`

    const lastModified = (timestamp) => {
        const date = new Date(timestamp)
        const [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
        const [hour, minutes] = [date.getHours(), date.getMinutes()]
        const formatedDate = `${day}-${month}-${year} ${hour}:${minutes}`
        return formatedDate
    }

    return (
        <>
            {success.data === false ?
                <Error statusCode={success.errorCode} />
                :
                <div className="h-screen max-w-full overflow-auto mt-5">
                    <span className="text-green-600 cursor-pointer" onClick={() => refreshData()}>Log Files</span>
                    {breadCrumbs && directory ? //directory required true, otherwise it will display file names in the breadCrumbs
                        <span className="text-green-600">
                            {breadCrumbs}
                        </span>
                        :
                        null
                    }
                    <table className="min-w-full divide-y divide-gray-200 shadow-sm mt-5">
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
                                        <tr key={idx} className={`hover:bg-gray-100 text-sm text-left cursor-pointer`}>
                                            {loading ?
                                                <FBLoadingSkeleton />
                                                :
                                                <>
                                                    <td className="px-6 py-1 w-80 break-all">
                                                        {logFile.directory === true ?
                                                            <div className="flex items-center" onClick={() => handleFileBrowser(logFile)}>
                                                                <img alt="folder" className="w-5 mr-5" src="/folder.svg" />
                                                                <p>{logFile.name}</p>
                                                            </div>
                                                            : logFile.name.includes('zip') ?
                                                                <a onClick={() => setBaseUrl(logFile.base64PathFromRoot)} target="_blank" href={hrefBaseUrl} className="flex items-center">
                                                                    <img alt="folder" className="w-5 mr-5" src="/zip.svg" />
                                                                    {logFile.name}
                                                                </a>
                                                                : logFile.name.includes('log') ?
                                                                    <a onClick={() => setBaseUrl(logFile.base64PathFromRoot)} target="_blank" href={hrefBaseUrl} className="flex items-center">
                                                                        <img alt="folder" className="w-5 mr-5" src="/log-format.svg" />
                                                                        {logFile.name}
                                                                    </a>
                                                                    :
                                                                    <a onClick={() => setBaseUrl(logFile.base64PathFromRoot)} target="_blank" href={hrefBaseUrl} className="flex items-center">
                                                                        <img alt="folder" className="w-5 mr-5" src="/file.svg" />
                                                                        {logFile.name}
                                                                    </a>
                                                        }
                                                    </td>
                                                    <td className="px-6 py-1 w-80 break-all">
                                                        <p>{lastModified(logFile.lastModified)}</p>
                                                    </td>
                                                    <td className="px-6 py-1 w-80 break-all">
                                                        <p>{logFile.size} B</p>
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