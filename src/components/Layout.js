import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Nav from './Nav'
import Drawer from './Drawer'
import Footer from './Footer'
import { DrawerProvider } from '../providers/DrawerContext'
// import LoadingSpinner from './LoadingSpinner'

import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
    
    const router = useRouter()
    const [open, setOpen] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    // const [loading, setLoading] = useState(false)

    useEffect(() => {
        {   !loggedIn ?
            router.push('/login')
            :
            router.push('/dashboard')
        }
   }, [loggedIn])

    const handleDrawer = () => {
        setOpen(!open)
    }
    
    return (
        <>
            <Nav/>
                <main className="flex flex-row">
                    {   loggedIn ?
                        <DrawerProvider>
                            <aside  className={`${open ? `${styles.drawerWidth}` : 'w-0'} bg-gray-100 min-h-screen hidden sm:block transition-all ease-in-out duration-500 z-0`}>
                                <img    
                                    src="/DrawerIconCircle.svg" 
                                    alt="toggler icon" 
                                    className="w-12 h-auto absolute top-0 left-0 m-2 cursor-pointer" 
                                    onClick={handleDrawer}
                                />
                                <Drawer/>
                            </aside>
                        </DrawerProvider>
                        :
                        ''//we can use percentage for both drawer and scetion and change size depending on screen size or fixed width in pixels 
                    }
                    <section className={`bg-gray-200 w-full p-4 sm:px-10 min-h-screen overflow-auto z-10`}>
                    {/* {   loading && [{children} === undefined] ?
                        <LoadingSpinner />
                        : */}
                        {children}
                    {/* } */}
                    </section>
                </main>
            <Footer/>
        </>
    )
}
export default Layout