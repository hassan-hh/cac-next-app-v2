import { useState, useEffect, createContext } from 'react'
export const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {

    const [systemDate, setSystemDate] = useState({})
    const [regions, setRegions] = useState([])
    const [accountEntity, setAccountEntity] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        DateApi()
        RegionsApi()
        //AccountApi()
    }, [])

    const DateApi = async () => {
        setLoading(true)
        const res = await fetch(`/api/user/systemdate`)
        const date = await res.json()
        setLoading(false)
        setSystemDate(date)
    }
    const RegionsApi = async () => {
        setLoading(true)
        const res = await fetch(`/api/account/regions`, {credentials: 'include'
            // method: "GET",
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json',
            //     'Cache': 'no-cache',
            // },
            // credentials: 'include'
        })
        const region = await res.json()
        setLoading(false)
        setRegions(region)
        console.log(res)
    }
    const AccountApi = async () => {
        setLoading(true)
        // const res = await fetch(`/api/user/match/catsupp/account`)
        const res = await fetch(`/api/account/entities`)
        const account = await res.json()
        setLoading(false)
        setAccountEntity(account)
    }

    return ( 
        <>
            <DrawerContext.Provider value={{systemDate, accountEntity, regions, loading}}>
                {children}  
            </DrawerContext.Provider>
        </>
    )
}