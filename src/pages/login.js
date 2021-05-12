import Header from '../components/dashboard/Header'
import Meta from '../components/seo/Meta'
import Login from '../components/Login'
import LoginFull from '../components/LoginFull'
import ClientConfig from '../ClientConfig'
import Error from './_error'
// import LoadingSpinner from '../components/LoadingSpinner'

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

const LoginPage = ({ newData }) => {
    // /console.log('index', data)
    return (
        <>
            <Meta title="Login Page" />
            {/* <Header title="CATS"/> */}
            {   !newData ?
                <Error />
                :
            <>
                <div className="min-h-screen flex items-center justify-center flex-col">
                        <h1 style={{width: '25rem'}} className="mb-10 text-white text-3xl text-left">Login to {newData.description}</h1>
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