import Nav from './Nav'
import Footer from './Footer'
import Meta from './seo/Meta'

const Layout = ({children}) => {

    return (
        <>
            <Meta />
            <Nav/>
                {children} 
            <Footer/>
        </>
    )
}
export default Layout