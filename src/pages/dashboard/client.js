import { useState } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import ClientConfig from '../../ClientConfig'
import Error from '../_error'
import Link from 'next/link'

export const getStaticProps = async () => {
    
    const CatsUrl = ClientConfig.apiUrl
    const res = await fetch(`${CatsUrl}/installations/current`)
    const data = await res.json()
    const stringifyObject = JSON.stringify(data)
    const convertedStr = stringifyObject.replace(/_/g,' ').toLowerCase()
    const newData = JSON.parse(convertedStr)

    return {
        props: {
            newData
        }
    }
}

const Client = ({ newData }) => {
    
    const [loading, setLoading] = useState(false)

    return (
        <>
            <Meta title="Client download" />
            <Header title={`Client Download For ${newData.description}`} subTitle="" />
            {   !newData ?
                <Error />
                :
            <>
                <div className="min-h-screen">
                    <h1 className="mb-10 text-black text-lg text-left capitalize">This will download the installer for {newData.description}</h1>
                    <a
                        type="button"
                        className={` ${!loading ? `w-32` : `w-36`} bg-gray-900 text-white hover:bg-gray-500 flex items-center justify-center transition-all ease-in-out duration-300 uppercase shadow-sm mr-3 py-2 rounded-md text-sm font-medium focus:outline-none`}
                        onClick={() => setLoading(true)}
                        href="https://cats-db-cust-ap-dev.corpaction.net/client/CATSInstaller.exe"
                        download
                    >
                        {   !loading ?
                            <>
                                <img alt="download" className="w-5 mr-1" src="/cloud-download.svg" />
                                <span>Download</span>
                            </>
                            :
                            <>
                                <img alt="download" className="w-5 animate-bounce mr-1" src="/cloud-download.svg" />
                                <span>Downloading</span>
                            </>
                        }
                    </a>
                </div>
            </>
            }
        </>
    )
}
export default Client