import { useState, useEffect } from 'react'
import FBLoadingSkeleton from '../loading-skeletons/FBLoadingSkeleton'
import Error from '../../../pages/_error'

const UserFiles = () => {

    const [userFiles, setUserFiles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        userFilesApi()
        const x = setTimeout(() => { //to stop loading sekelton after 1 sec
            if (userFiles) {
                setLoading(false)
            }
        }, 1000)
        return () => {clearTimeout(x), setLoading(false)} //cleanup function error //Can't perform a React state update on an unmounted component...etc
    }, [])

    const userFilesApi = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/filebrowser/0/file')
            const data = await res.json()
            //setLoading(false)
            setUserFiles(data)
        }
        catch (err) {
            setLoading(false)
        }
    }
    //console.log('userFiles', userFiles)

    return (
        <>
            {   !userFiles ?
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
                            {userFiles.map(userFile => (
                                <>
                                    {loading ?
                                        <FBLoadingSkeleton />
                                        :
                                        <tr key={idx} className={`hover:bg-gray-100 text-sm text-left`}>
                                            <>
                                                <td className="px-6 py-1 w-80 break-all">
                                                    <p>UserFiles</p>
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
export default UserFiles