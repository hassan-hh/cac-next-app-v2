import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { StoreContext } from '../providers/StoreContext'
import Nav from './Nav'
import Drawer from './dashboard/Drawer'
import Footer from './Footer'
import { DrawerProvider } from '../providers/DrawerContext'
import LoadingScreen from './dashboard/LoadingScreen'
import NotAuthScreen from './dashboard/NotAuthScreen'


const Layout = ({ children }) => {

    const router = useRouter()
    const { store, setStore, loggedIn, setLoggedIn, loadingScreen, setLoadingScreen } = useContext(StoreContext)
    console.log('loadingScreen', loadingScreen)
    const [open, setOpen] = useState(true)
    console.log('loggedIn', loggedIn)

    const refreshData = () => { //similar to AJAX in this case we might not need revalidate. 
        router.replace(router.asPath)
    }
    

    useEffect(() => { //this will redirect the user when page is refreshed, page could be refreshed by visiting wrong url or hard resfresh the browser
        if (store.sessionId) {
            setLoggedIn(true)
            setLoadingScreen(true)
        }
        if (router.pathname === '/login' && loggedIn === false) { //on log out
            setLoadingScreen(false)
        }
        if (router.pathname !== '/login' && loggedIn === true) { //on logged in
            setLoadingScreen(false);
        }
        
        const x = setTimeout(() => {
            // if (!store.sessionId) { //after logout/before auth, if user goes to another url 
            //     router.push('/login')
            // }
            if (router.pathname === router.asPath) {
                refreshData()
            }
        }, 2000)
        return () => { clearTimeout(x); }
    }, [loggedIn, store.sessionId, router.pathname])
    
    //NotAuthScreen for non logged in users - before a user login and goes to another url then we protect it here
    
    // if (loadingScreen === false && !store.sessionId && router.pathname !== '/login') { //&& router.pathname !== '/login' //protect all routes before login - this will display the LoadingScreen component and above will redirect user back to login.
    //     return (
    //         <div style={!loggedIn ? { background: '#2bbc9c' } : {}}>
    //             <NotAuthScreen />
    //         </div>
    //     )
    // }
    // else if (loadingScreen === true) { //we cant use loggedIn true or router.pathname, because on login loggedIn is true and on logout loggedIn is false. route if still login page then loadingScreen and if route not login means on logout
    //     return (
    //         <div className="h-screen flex items-center justify-center">
    //             <LoadingScreen />
    //         </div>
    //     )
    // }
    // else {
        return (
            <div className={!store.sessionId ? 'relative h-screen flex flex-col justify-between' : ''} style={!store.sessionId? { background: '#2bbc9c' } : {}}>
            {/* <div style={!loggedIn ? { background: '#2bbc9c', postion: 'relative' } : {}}> */}
                <Nav loggedIn={loggedIn} />
                <img
                    src="/drawerToggler.svg"
                    alt="toggler icon"
                    //className={`${store.sessionId ? 'block' : 'hidden' } w-16 h-auto absolute top-0 left-0 cursor-pointer`}
                    className={`${ loggedIn? 'block' : 'hidden' } w-16 h-auto absolute top-0 left-0 cursor-pointer`}
                    onClick={() => setOpen(!open)}
                />
                {/* <main className={`${store.sessionId ? 'flex' : 'hidden' } flex-row relative`}> */}
                <main className="flex flex-row relative">
                    {   !loggedIn ?
                        null
                    :
                        <DrawerProvider>
                            <aside className={`${!open ? 'w-0' : ''} flex flex-col items-center lg:block custom-w-full sm:custom-w-24 lg:custom-w-318 top-0 left-0 absolute lg:relative min-h-full lg:min-h-screen bg-gray-100 transition-all ease-in-out duration-500 z-20 lg:z-0`}>
                                <Drawer open={open} />
                            </aside>
                        </DrawerProvider>
                        // <>
                        // </>
                    }
                    <section className={`${loggedIn ? 'bg-gray-200' : ''} min-w-full lg:min-w-0 w-full overflow-auto p-4 sm:py-10 sm:px-10 min-h-screen z-10`}>
                        {children}
                    </section>
                </main>
                <Footer loggedIn={loggedIn} />
            </div>
        )
   // }
}
export default Layout