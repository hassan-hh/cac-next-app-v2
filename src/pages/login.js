import Header from '../components/dashboard/Header'
import Meta from '../components/seo/Meta'
import Login from '../components/Login'
import styles from '../styles/Home.module.css'
import ClientConfig from '../ClientConfig'
import Error from './_error'

export const getStaticProps = async () => {
    const CatsUrl = ClientConfig.apiUrl
    const res = await fetch(`${CatsUrl}/installations/current`)
    const data = await res.json()

    return {
        props: {
            data
        }
    }
}


const LoginPage = ({ data }) => {
    // /console.log('index', data)
    return (
        <>
            <Meta title="Login Page" />
            <Header title="Login Page"/>
            {   !data ?
                <Error />
                :
            <>
                <div className="flex items-center flex-col mt-0">
                    <h1 className="mb-10">Login to {data.description}</h1>
                        <Login />
                </div>
            </>
            }
        </>
    )
}
export default LoginPage