import { useState, useEffect, createContext } from 'react'
export const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {

    const [systemDate, setSystemDate] = useState('')
    const [accountEntity, setAccountEntity] = useState([])

    useEffect(() => {
        DateApi()
        AccountApi()
    }, [])

    const DateApi = async () => {
        const res = await fetch(`/api/user/systemdate`)
        const date = await res.json()
        setSystemDate(date)
    }
    const AccountApi = async () => {
        const res = await fetch(`/api/user/match/catsupp/account`)
        const account = await res.json()
        setAccountEntity(account)
    }

    return ( 
        <>
            <DrawerContext.Provider value={{systemDate, accountEntity}}>
                {children}  
            </DrawerContext.Provider>
        </>
    )
}