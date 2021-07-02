import { useState, useEffect, createContext } from 'react'
import Cookies from 'js-cookie'
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
        DateApi()
        RegionsApi()
        AccountApi()
        BookmarksApi()
        SavedSearchesApi()
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
            console.log('res', res)
        })
        .catch(err => {
            if (err.response.status > 300) {
                setSuccess({
                    ...success,
                    errorCode: err.response.status, 
                    data: false
                })
            }
            console.log('err', err.response)
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
            console.log('res', res)
        })
        .catch(err => {
            if (err.response.status > 300) {
                setSuccess({
                    ...success,
                    errorCode: err.response.status, 
                    data: false
                })
            }
            console.log('err', err.response)
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
            console.log('res', res)
        })
        .catch(err => {
            if (err.response.status > 300) {
                setSuccess({
                    ...success,
                    errorCode: err.response.status, 
                    data: false
                })
            }
            console.log('err', err.response)
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
            console.log('res', res)
        })
        .catch(err => {
            if (err.response.status > 300) {
                setSuccess({
                    ...success,
                    errorCode: err.response.status, 
                    data: false
                })
            }
            console.log('err', err.response)
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
            console.log('res', res)
        })
        .catch(err => {
            if (err.response.status > 300) {
                setSuccess({
                    ...success,
                    errorCode: err.response.status, 
                    data: false
                })
            }
            console.log('err', err.response)
        })
    }

    return ( 
        <DrawerContext.Provider value={{systemDate, accountEntity, regions, bookmarks, savedSearches, loading, success, setLoading, setSuccess}}>
            {children}  
        </DrawerContext.Provider>
    )
}