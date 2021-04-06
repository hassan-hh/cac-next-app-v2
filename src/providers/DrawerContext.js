import { useState, useEffect, createContext } from 'react'
export const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {

    const [systemDate, setSystemDate] = useState('')
    const [accountEntity, setAccountEntity] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        DateApi()
        AccountApi()
    }, [])

    const DateApi = async () => {
        setLoading(true)
        const res = await fetch(`/api/user/systemdate`)
        const date = await res.json()
        setLoading(false)
        setSystemDate(date)
    }
    const AccountApi = async () => {
        setLoading(true)
        const res = await fetch(`/api/user/match/catsupp/account`)
        const account = await res.json()
        setLoading(false)
        setAccountEntity(account)
    }

    return ( 
        <>
            <DrawerContext.Provider value={{systemDate, accountEntity, loading}}>
                {children}  
            </DrawerContext.Provider>
        </>
    )
}