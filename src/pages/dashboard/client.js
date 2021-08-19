import { useState } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Error from '../_error'

export const getStaticProps = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/installations/current`)
        const errorCode = res.ok ? 200 : res.statusCode
        const data = await res.json()

        return {
            props: {
                data, errorCode,
            }
        }
    }
    catch (err) {
        const errorCode = err ? 500 : null
        //const errMessage = err.message //it will display error message after passed as props
        return {
            props: {
                errorCode
            },
        }
    }
}

const Client = ({ data, errorCode }) => {
    
    const [loading, setLoading] = useState(false)

    if (errorCode > 300) {
        return (
            <>
                <Meta title="Client download" />
                <Header title="Client download" subTitle="" />
                <Error statusCode={errorCode} />
            </>
        )
    }

    return (
        <>
            <Meta title="Client download" />
            <Header title={`Client Download For ${data.description.replace(/_/g,' ').toLowerCase()}`} subTitle="" />
            <div className="min-h-screen">
                <h1 className="mb-10 text-black text-lg text-left capitalize">This will download the installer for {data.description.replace(/_/g,' ').toLowerCase()}</h1>
                    <button
                        type="button"
                        onClick={() => setLoading(true)}
                        className={` ${!loading ? `w-32` : `w-36`} bg-gray-900 text-white hover:bg-gray-500 transition-all ease-in-out duration-300 uppercase shadow-sm py-2 rounded-md text-sm font-medium focus:outline-none`}
                    >
                        <a
                            className="flex items-center justify-center"
                            href="https://cats-db-cust-ap-dev.corpaction.net/client/CATSInstaller.exe"
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
                    </button>
            </div>
        </>
    )
}
export default Client