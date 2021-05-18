import { useState, useEffect, createContext } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export const StoreContext = createContext()

export const StoreProvider = ({ children }) => {

    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [store, setStore] = useState({
        emailAddress: '',
        idLogon: '',
        idLogonType: '',
        name: '',
        idAccount: '',
        sessionId: '',
        //loggedIn: false
    })
    useEffect(() => {
        const emailAddress = localStorage.getItem('emailAddress')
        const idLogon = localStorage.getItem('idLogon')
        const idLogonType = localStorage.getItem('idLogonType')
        const name = localStorage.getItem('name')
        const idAccount = localStorage.getItem('idAccount')
        //const loggedIn = localStorage.getItem('loggedIn')
        const sessionId = Cookies.get('sessionId')
        setStore({
            ...store,
            emailAddress,
            idLogon,
            idLogonType,
            name,
            idAccount,
            //loggedIn,
            sessionId
        })
        if (loggedIn) {
            router.push('/dashboard')
            //setLoadingSpinner(false)

        } else {
            router.push('/login')
            //setLoadingSpinner(false)
        }
        // if(dashboard) {
        //     setLoadingSpinner(false)
        // }
        // if (location.pathname == '/dashboard') {
        //     setLoadingSpinner(false)
        // }
    }, [loggedIn])

    return (
        <StoreContext.Provider value={{ loggedIn, setLoggedIn, loadingSpinner, setLoadingSpinner, store, setStore }}>
            {children}
        </StoreContext.Provider>
    )
}