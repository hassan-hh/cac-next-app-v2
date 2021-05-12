import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { StoreContext } from '../providers/StoreContext'
import Nav from './Nav'
import Drawer from './dashboard/Drawer'
import Footer from './Footer'
import { DrawerProvider } from '../providers/DrawerContext'
import LoadingSpinner from './dashboard/LoadingSpinner'

const Layout = ({ children }) => {

    const { loadingSpinner, setLoadingSpinner } = useContext(StoreContext)
    const router = useRouter()
    const [open, setOpen] = useState(true)
    const [loggedIn, setLoggedIn] = useState(true)
    //const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (loggedIn) {
            //router.push('/dashboard')
            setLoadingSpinner(false)
        }
        else {
            router.push('/login')
            //setStore({loggedIn : ''})
            setLoggedIn(false)
        }
   }, [loggedIn, loadingSpinner])
    
    return (
        <div style={!loggedIn ? {background: '#2bbc9c'} : {}}>
                <Nav loggedIn={loggedIn}/>
                    <main className="flex flex-row">
                        { loggedIn ?
                            <DrawerProvider>
                                <aside  style={open ? {width: '380px'} : {width: '0px'}} className="bg-gray-100 min-h-screen hidden sm:block transition-all ease-in-out duration-500 z-0">
                                    <img    
                                        src="/DrawerIconCircle.svg" 
                                        alt="toggler icon" 
                                        className="w-12 h-auto absolute top-0 left-0 m-2 cursor-pointer" 
                                        onClick={() => setOpen(!open)}
                                    />
                                    <Drawer/>
                                </aside>
                            </DrawerProvider>
                            :
                            null
                        } 
                        <section className={`${loggedIn ? 'bg-gray-200' : ''} w-full p-4 sm:py-10 sm:px-10 min-h-screen overflow-auto z-10`}>
                            { loadingSpinner ? 
                                <div className="h-screen flex items-center justify-center">
                                    <LoadingSpinner />
                                </div>
                                :
                                <>
                                    {children}
                                </>
                            }
                        </section>
                    </main>
                    
                <Footer loggedIn={loggedIn}/>
        </div>
    )
}
export default Layout