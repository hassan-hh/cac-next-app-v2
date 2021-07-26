import Header from '../components/dashboard/Header'
import Meta from '../components/seo/Meta'
import Login from '../components/Login'
import LoginFull from '../components/LoginFull'
// import ClientConfig from '../ClientConfig'
import Error from './_error'
import { useEffect, useContext } from 'react'
import { StoreContext } from '../providers/StoreContext'
import { useRouter } from 'next/router'

export const getStaticProps = async () => {
    
    //const CatsUrl = ClientConfig.apiUrl //env.local might not work in production so we keep clientconfig.js
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/installations/current`)
    const errorCode = res.ok ? 200 : res.statusCode
    const data = await res.json()

    return {
        props: {
            data, errorCode
        }
    }
}

const LoginPage = ({ data, errorCode }) => {

    console.log('login-page', data)
    
    // const router = useRouter()
    // const { store, loggedIn, setLoggedIn, loadingScreen, setLoadingScreen } = useContext(StoreContext)

    // useEffect(() => {
    //     // if (!store.sessionId && router.pathname === '/dashboard') {
    //     //     router.push('/login')
    //     //     setLoggedIn(false)
    //     //     setLoadingScreen(true)
    //     // }
    //     if (!loggedIn && router.pathname === '/login') { //if no sessionId and i am leaving the dahsboard page or i am in login page
    //         //         setLoggedIn(false)
    //         setLoadingScreen(false)
    //     }
    // }, [])

    return (
        <>
            <Meta title="Login Page" />
            {/* <Header title="CATS"/> */}
            {   data && errorCode > 300 ?
                <Error statusCode={errorCode} />
                :
            <>
                <div className="h-screen flex items-center justify-center flex-col">
                    <h1 style={{width: '25rem'}} className="mb-10 text-white text-3xl text-left capitalize">Login to {data.description.replace(/_/g,' ').toLowerCase()}</h1>
                    {/* <h1 className="mb-10">Login to {data.description}</h1> */}
                    {/* <Login /> */}
                    <LoginFull />
                </div>
            </>
            }
        </>
    )
}
export default LoginPage