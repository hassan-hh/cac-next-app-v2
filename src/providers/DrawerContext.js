import { useState, useEffect, createContext } from 'react'
import Cookies from 'js-cookie'
export const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {

    const [systemDate, setSystemDate] = useState({})
    const [regions, setRegions] = useState([])
    const [accountEntity, setAccountEntity] = useState([])
    const [loading, setLoading] = useState(false)

     useEffect(() => {
        DateApi()
        RegionsApi()
        AccountApi()
     }, [])
    
    const DateApi = async () => {
            setLoading(true)
        try {
            const res = await fetch(`/api/user/systemdate`)
            const date = await res.json()
            setLoading(false)
            setSystemDate(date)
        }
        catch (err) {
            setLoading(false)
        }
        
    }
    const RegionsApi = async () => {
            setLoading(true)
        try {
            const res = await fetch(`/api/account/regions`)
            const region = await res.json()
            setLoading(false)
            setRegions(region)
        }
        catch (err) {
            setLoading(false)
        }
    }
    const AccountApi = async () => {
            setLoading(true)
        try {
            const res = await fetch(`/api/account/entities`)
            const account = await res.json()
            setLoading(false)
            setAccountEntity(account)
        }
        catch (err) {
            setLoading(false)
        }
    }

    return ( 
        <DrawerContext.Provider value={{systemDate, accountEntity, regions, loading}}>
            {children}  
        </DrawerContext.Provider>

    )
}