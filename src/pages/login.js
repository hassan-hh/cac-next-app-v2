import Header from '../components/dashboard/Header'
import Meta from '../components/seo/Meta'
import LoginFull from '../components/LoginFull'
import Error from './_error'

export const getServerSideProps = async ({req}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/installations/current`, {
        headers: { 
            Cookie: req.headers?.cookie || ''
        }
    })
    const data = await res.json()
    const errorCode = res.ok ? 200 : res.statusCode

    return {
        props: {
            data: data || {}, 
            errorCode: errorCode || null
        },
    }
}

const LoginPage = ({ data, errorCode }) => {

    return (
        <>
            <Meta title="Login Page" />
            {/* <Header title="CATS"/> */}
            {   errorCode > 300 ?
                <Error statusCode={errorCode} />
                :
            <>
                    <div className="min-h-screen flex items-center justify-center flex-col">
                    <h1 style={{width: '25rem'}} className="mb-10 text-white text-3xl text-left capitalize">Login to {data?.description?.replace(/_/g,' ') || ''}</h1>
                    {/* <LoginFull /> */}
                </div>
            </>
            }
        </>
    )
}
export default LoginPage