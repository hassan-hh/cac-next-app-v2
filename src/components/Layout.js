import { useState } from 'react'
import Nav from './Nav'
import Drawer from './Drawer'
import Footer from './Footer'
import { DrawerProvider } from '../providers/DrawerContext'

const Layout = ({ children }) => {

    const [open, setOpen] = useState(true)
    const [loggedIn, setLoggedIn] = useState(true)

    const handleDrawer = () => {
        setOpen(!open)
    }
    
    return (
        <>
            <Nav/>
                <main className="flex flex-row">
                {   loggedIn ?
                    <DrawerProvider>
                        <aside  className={`${open ? 'w-80' : 'w-0'} bg-gray-100 min-h-screen hidden sm:block shadow-md transition-all ease-in-out duration-500 z-0`}>
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
                    ''
                }
                    <section className="bg-gray-200 p-4 sm:px-10 w-full min-h-screen overflow-auto z-10">
                        {children}
                    </section>
                </main>
            <Footer/>
        </>
    )
}
export default Layout