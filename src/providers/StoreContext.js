import { useState, useEffect, createContext } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import LoadingScreen from '../components/dashboard/LoadingScreen'

export const StoreContext = createContext()

export const StoreProvider = ({ children }) => {

    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState(true)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [profileImage, setProfileImage] = useState('')
    const [store, setStore] = useState({
        emailAddress: '',
        idLogon: '',
        idLogonType: '',
        name: '',
        idAccount: '',
        sessionId: '',
        phoneNumber: '', //phone number used only in profile component/page. Name and value not included in the api reponse from login page, we are going to store it in the local storage instead
        //loggedIn: false
    })
    useEffect(() => {
        const emailAddress = localStorage.getItem('emailAddress')
        const idLogon = localStorage.getItem('idLogon')
        const idLogonType = localStorage.getItem('idLogonType')
        const name = localStorage.getItem('name')
        const idAccount = localStorage.getItem('idAccount')
        //const loggedIn = localStorage.getItem('loggedIn')
        //const sessionId = localStorage.getItem('sessionId')
        const sessionId = Cookies.get('sessionId')
        const phoneNumber = localStorage.getItem('phoneNumber', phoneNumber) //here we set the phone number to be stored in the localStorage
        setStore({
            ...store,
            emailAddress,
            idLogon,
            idLogonType,
            name,
            idAccount,
            //loggedIn,
            sessionId,
            phoneNumber
        })
        // if (loggedIn) {
        //     router.push('/dashboard')
        //     //setLoadingSpinner(false)

        // } else {
        //     router.push('/login')
        //     //setLoadingSpinner(false)
        // }
        // if(dashboard) {
        //     setLoadingSpinner(false)
        // }
        // if (location.pathname == '/dashboard') {
        //     setLoadingSpinner(false)
        // }
        // if (!sessionId && window.location.pathname !== '/login'){
        //     setLoadingScreen(true)
        // }
    }, [loggedIn])


    return (
        <StoreContext.Provider
            value={{
                loggedIn,
                setLoggedIn,
                loadingScreen,
                setLoadingScreen,
                profileImage,
                setProfileImage,
                store,
                setStore
            }}>
                {children}
        </StoreContext.Provider>
    )
}