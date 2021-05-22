import { useState, useEffect, createContext } from 'react'
import Cookies from 'js-cookie'
export const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {

    const [systemDate, setSystemDate] = useState({})
    const [regions, setRegions] = useState([])
    const [accountEntity, setAccountEntity] = useState([])
    const [bookmarks, setBookmarks] = useState([])
    const [savedSearches, setSavedSearches] = useState([])
    const [loading, setLoading] = useState(false)

     useEffect(() => {
        DateApi()
        RegionsApi()
        AccountApi()
        BookmarksApi()
        SavedSearchesApi()
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
    const BookmarksApi = async () => {
            setLoading(true)
        try {
            const res = await fetch(`/api/bookmark`)
            const bookmark = await res.json()
            setLoading(false)
            setBookmarks(bookmark)
        }
        catch (err) {
            setLoading(false)
        }
    }
    const SavedSearchesApi = async () => {
            setLoading(true)
        try {
            const res = await fetch(`/api/events/saved`)
            const search = await res.json()
            setLoading(false)
            setSavedSearches(search)
        }
        catch (err) {
            setLoading(false)
        }
    }

    return ( 
        <DrawerContext.Provider value={{systemDate, accountEntity, regions, bookmarks, savedSearches, loading}}>
            {children}  
        </DrawerContext.Provider>

    )
}