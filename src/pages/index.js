import Header from '../components/dashboard/Header'
import Meta from '../components/seo/Meta'


const Home = () => {
    
    return (
        <>
            <Meta title="Home Page" />
            <Header title="Home Page"/>
            <div className="flex items-center flex-col mt-0">
                <h1 className="mb-10">Home page not in use and it will redirect to login page instead</h1>
            </div>
        </>
    )
}
export default Home