import { useState } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Error from '../_error'

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/installations/current`)
    const errorCode = res.ok ? 200 : res.statusCode
    const data = await res.json()

    return {
        props: {
            data, errorCode
        }
    }
}

const Client = ({ data, errorCode }) => {
    
    const [loading, setLoading] = useState(false)

    console.log('data', data)

    return (
        <>
            <Meta title="Client download" />
            <Header title={`Client Download For ${data.description.replace(/_/g,' ').toLowerCase()}`} subTitle="" />
            {   data && errorCode > 300 ?
                <Error statusCode={errorCode}/>
            :
            <>
                <div className="min-h-screen">
                    <h1 className="mb-10 text-black text-lg text-left capitalize">This will download the installer for {data.description.replace(/_/g,' ').toLowerCase()}</h1>
                    <a
                        type="button"
                        className={` ${!loading ? `w-32` : `w-36`} bg-gray-900 text-white hover:bg-gray-500 flex items-center justify-center transition-all ease-in-out duration-300 uppercase shadow-sm mr-3 py-2 rounded-md text-sm font-medium focus:outline-none`}
                        onClick={() => setLoading(true)}
                        href="https://cats-db-cust-ap-dev.corpaction.net/client/CATSInstaller.exe" //this is -ap- or -eu- api will make a difference ?
                        target="_blank"
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