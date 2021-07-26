import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {

    const [systemDate, setSystemDate] = useState({})
    const [regions, setRegions] = useState([])
    const [accountEntity, setAccountEntity] = useState([])
    const [bookmarks, setBookmarks] = useState({})
    const [savedSearches, setSavedSearches] = useState([])
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState({
        errorCode: null,
        data: null
    })

    useEffect(() => {
        // DateApi()
        // RegionsApi()
        // AccountApi()
        // BookmarksApi()
        // SavedSearchesApi()
        return () => { setLoading(false); } //cause memory leak error after login sucess 
    }, [])
    
    const DateApi = () => {
        axios.get(`/api/user/systemdate`)
        .then(res => {
            if (res.status < 300) {
                setSystemDate(res.data)
                setSuccess({
                    ...success,
                    errorCode: res.status,
                    data: true
                })
            }
        })
        .catch(err => {
            if (err.response.status > 300) {
                setSuccess({
                    ...success,
                    errorCode: err.response.status, 
                    data: false
                })
            }
        })
    }
    const RegionsApi = () => {
        //setLoading(true)
        axios.get(`/api/account/regions`)
        .then(res => {
            if (res.status < 300) {
                setRegions(res.data)
                setSuccess({
                    ...success,
                    errorCode: res.status,
                    data: true
                })
            }
        })
        .catch(err => {
            if (err.response.status > 300) {
                setSuccess({
                    ...success,
                    errorCode: err.response.status, 
                    data: false
                })
            }
        })
    }
    const AccountApi = () => {
        //setLoading(true)
        axios.get(`/api/account/entities`)
        .then(res => {
            if (res.status < 300) {
                setAccountEntity(res.data)
                setSuccess({
                    ...success,
                    errorCode: res.status,
                    data: true
                })
            }
        })
        .catch(err => {
            if (err.response.status > 300) {
                setSuccess({
                    ...success,
                    errorCode: err.response.status, 
                    data: false
                })
            }
        })
    }
    const BookmarksApi = () => {
        //setLoading(true)
        axios.get(`/api/bookmark`)
        .then(res => {
            if (res.status < 300) {
                setBookmarks(res.data)
                setSuccess({
                    ...success,
                    errorCode: res.status,
                    data: true
                })
            }
        })
        .catch(err => {
            if (err.response.status > 300) {
                setSuccess({
                    ...success,
                    errorCode: err.response.status, 
                    data: false
                })
            }
        })
    }
    const SavedSearchesApi = () => {
        //setLoading(true)
        axios.get(`/api/events/saved`)
        .then(res => {
            if (res.status < 300) {
                setSavedSearches(res.data)
                setSuccess({
                    ...success,
                    errorCode: res.status,
                    data: true
                })
            }
        })
        .catch(err => {
            if (err.response.status > 300) {
                setSuccess({
                    ...success,
                    errorCode: err.response.status, 
                    data: false
                })
            }
        })
    }

    return ( 
        <DrawerContext.Provider value={{systemDate, accountEntity, regions, bookmarks, savedSearches, loading, success, setLoading, setSuccess}}>
            {children}  
        </DrawerContext.Provider>
    )
}