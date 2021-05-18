import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { StoreContext } from '../providers/StoreContext'
import Nav from './Nav'
import Drawer from './dashboard/Drawer'
import Footer from './Footer'
import { DrawerProvider } from '../providers/DrawerContext'
import LoadingSpinner from './dashboard/LoadingSpinner'

const Layout = ({ children }) => {

    const router = useRouter()
    const { loggedIn, setLoggedIn, loadingSpinner, setLoadingSpinner } = useContext(StoreContext)
    const [open, setOpen] = useState(true)
    //const [loggedIn, setLoggedIn] = useState(true)
    //const [loadingSpinner, setLoadingSpinner] = useState(false)
    //const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         if (loggedIn) {
//             router.push('/dashboard')
//             //setLoggedIn(true)
//             setLoadingSpinner(false)
//         }
//         else {
//             router.push('/login')
//             //setStore({loggedIn : ''})
//             //setLoggedIn(true)
//             //setLoadingSpinner(true)
//         }
//    }, [loggedIn])
    
    return (
        <div style={ !loggedIn ? {background: '#2bbc9c'} : {} }>
            {   loadingSpinner ?  
                <div className="h-screen flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            :
                <>
                    <Nav loggedIn={loggedIn}/>
                        <main className="flex flex-row">
                            { !loggedIn ?
                                null
                                :
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
                            } 
                            <section className={`${loggedIn ? 'bg-gray-200' : ''} w-full p-4 sm:py-10 sm:px-10 min-h-screen overflow-auto z-10`}>
                                {/* { !loadingSpinner ? 
                                    <>
                                        {children}
                                    </>
                                    :
                                    <div className="h-screen flex items-center justify-center">
                                        <LoadingSpinner />
                                    </div>
                                } */}
                                {children}
                            </section>
                        </main>
                    <Footer loggedIn={loggedIn}/>
                </>
            }
        </div>
    )
}
export default Layout