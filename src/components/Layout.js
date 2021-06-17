import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { StoreContext } from '../providers/StoreContext'
import Nav from './Nav'
import Drawer from './dashboard/Drawer'
import Footer from './Footer'
import { DrawerProvider } from '../providers/DrawerContext'
import LoadingScreen from './dashboard/LoadingScreen'
import NotAuthScreen from './dashboard/NotAuthScreen'
import Cookies from 'js-cookie'
import { parseCookies } from './helpers/index'


// export async function getInitialProps({req}) {
//     const parsedCookies = parseCookies(req)
//   //
//   //Cookies.parse(context.req.headers.Cookies);
//     return {
//         props: {
//             parsedCookies
//         }
//     }
// }

const Layout = ({ children, parsedCookies }) => {

    // console.log('parsedCookies/sessionId', parsedCookies)

    const router = useRouter()
    const { store, setStore, loggedIn, setLoggedIn, loadingScreen, setLoadingScreen } = useContext(StoreContext)
    
    console.log('loadingScreen', loadingScreen)
    const [open, setOpen] = useState(true)
    console.log('loggedIn', loggedIn)
    //const [loggedIn, setLoggedIn] = useState(true)
    //const [loadingScreen, setLoadingScreen] = useState(false)
    //const [loading, setLoading] = useState(true)

    //const { sessionId } = store

    useEffect(() => { //this will redirect the user when page is refreshed, page could be refreshed by visiting wrong url or hard resfresh the browser
        // if (!store.sessionId && router.pathname !== '/login') {
        //     router.push('/login')
        // } 
        if (store.sessionId) {
            //router.push('/dashboard')
            setLoggedIn(true)
            setLoadingScreen(true)
        }
        // if (loggedIn === false) {
        //     router.push('/login')
        // }
        const x = setTimeout(() => {
            if (loggedIn === false && router.pathname !== '/login') { //after login out to login url then set loading screen false, not on dashboad as we don't know what page the user will sign out from 
                setLoadingScreen(false)
            }
            // if (store.sessionId) {
            //     router.push('/dashboard')
            // }
        }, 1000)
        return () => clearTimeout(x)
    }, [loggedIn, store.sessionId])



    // if (!loggedIn) {
    //     router.push('/login')
    // } else if (loggedIn) {
    //     router.push('/dasboard')
    

    if (loggedIn === false && loadingScreen === false && router.pathname !== '/login') { //&& router.pathname !== '/login' //protect all routes before login - this will display the LoadingScreen component and above will redirect user back to login.
        return (
            <div style={!loggedIn ? { background: '#2bbc9c' } : {}}>
                <NotAuthScreen />
            </div>
        )    
    }
    else if (loadingScreen === true && router.pathname === '/login') { //&& !loggedIn //&& router.pathname === '/login' //or keep pathname !== '/login' and with timer on singout 
        return (
            <div className="h-screen flex items-center justify-center">
                <LoadingScreen />
            </div>
        )
    }
    else {
        return (
            <div style={!loggedIn ? { background: '#2bbc9c', postion: 'relative' } : {}}>
                {/* {   loadingScreen ? //&& router.pathname === '/login' || router.pathname === '/dashboard/' //protect dashboard routes after login e.g loadingscreen spinner
                    <div className="h-screen flex items-center justify-center">
                        <LoadingScreen />
                    </div>
                    : */}
                    <>
                    <Nav loggedIn={loggedIn} />
                        <img
                            src="/drawerToggler.svg"
                            alt="toggler icon"
                            className="w-16 h-auto absolute top-0 left-0 cursor-pointer block"
                            onClick={() => setOpen(!open)}
                        />
                        <main className="flex flex-row relative">
                            {!loggedIn ?
                                null
                            :
                            <>
                                <DrawerProvider>
                                    <aside style={!open ? { width: '0px' } : {} } className="w-full sm:w-96 lg:w-96 top-0 left-0 absolute lg:relative min-h-full lg:min-h-screen bg-gray-100 block transition-all ease-in-out duration-500 z-20 lg:z-0">
                                        <Drawer open={open}/>
                                    </aside>
                                </DrawerProvider>
                            </>
                            }
                            <section className={`${loggedIn ? 'bg-gray-200' : ''} min-w-full lg:min-w-0 w-full overflow-auto p-4 sm:py-10 sm:px-10 min-h-screen z-10`}>
                                {children}
                            </section>
                        </main>
                        <Footer loggedIn={loggedIn} />
                    </>
                {/* } */}
            </div>
        )
    }
}
export default Layout


