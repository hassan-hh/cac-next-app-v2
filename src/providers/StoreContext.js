import { useState, useEffect, createContext } from 'react'
import Cookies from 'js-cookie'
export const StoreContext = createContext()

export const StoreProvider = ({ children }) => {

    //const [loggedIn, setLoggedIn] = useState(false)
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
        //console.warn('storeContext', store)
    }, [])

    return (
        <StoreContext.Provider value={{ loadingSpinner, setLoadingSpinner, store, setStore }}>
            {children}
        </StoreContext.Provider>
    )
}