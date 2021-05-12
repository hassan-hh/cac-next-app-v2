import { useState, useEffect, useContext } from 'react'
import Cookies, { set } from 'js-cookie'
import { StoreContext } from '../providers/StoreContext'
import axios from 'axios'
import styles from '../styles/Login.module.css'
import { useRouter } from 'next/router'

const LoginFull = () => {

    const router = useRouter()
    const { setLoadingSpinner, store, setStore } = useContext(StoreContext)
    //const [openModal, setOpenModal] = useState(false)
    const [login, setLogin] = useState({
        username: '', //any of these objects if mathed with object destructure below line 124 then it will update the same object or it will create another object from line 124
        password: '',
        loading: false,
        error: '',
    })
    console.log('LoginState', login)
    const [matchUser, setMatchUser] = useState([])
    console.log('MatchUser', matchUser)
    const [selected, setSelected] = useState({})
    console.log('Selected', selected)
    const [loading, setLoading] = useState(false)
    console.log('is loading', loading)

    const matchUserApi = async () => {
            setLoading(true)
        try {
            //setLogin({ ...login, loading: true })
            const res = await fetch(`/api/user/match/${login.username}/account`) //this api used for fetching user account before login
            const account = await res.json()
            setLoading(false)
            //setLogin({ ...login, loading: false })
            setMatchUser(account)
        }
        catch (err) {
            setLoading(false)
            console.warn('New error', err)
        }
        
    }
    useEffect(() => {
        if (login.username !== '') {
            matchUserApi() //if username input is not empty run the api
        }
        // if (matchUser.length !== 0) {
        //     setSelected(matchUser.[0].idLogon) //!== 0 if result displayed, select the first input/option avilable
        // }
        // else {
        //     setSelected(undefined)
        // }
        if (matchUser.length === 0 || matchUser.length !== 0 && login.password !== '' && login.error === 401) {
        //reset error to empty string to remove error status 401 otherwise error message will always show 
        //we dont need matchUser.length === 0, because we need to find user first then submit the form so check user error will show instead.and matchUser.length === 0 is used here to clear my 401 error to re-enter the password again without keeping the old error status 401
            setLogin({ ...login, error: '' })
        }
        // const id = setTimeout(() => {
        //     if (login.username !== '' ) {
        //         matchUserApi()
        //     }
        //  }, 2000)
        // return () => clearTimeout(id)
    }, [login.username, matchUser.length, login.password])

    const handleFormSubmit = e => {
        e.preventDefault()
        // setSelected(selected)
        // console.log('Submitted', selected)
        setLogin({ ...login, loading: true })
        // HOW IT WORKS 
        //if username with single accountType like catsupp can login with or without selecting the account, username with mutliple accounts need to select an account type to login with or error
        //const userLogon = selected ? selected.idLogon : login.username //this goes with if i have users, select the first option
        const userLogon = selected.idLogon ? selected.idLogon : login.username
    
        {   selected.idLogon && login.password !== '' ?
            axios.post(`/api/user/login?username=${userLogon}&password=${login.password}`)
            .then(res => {
                // if (login !== '') {
                //     setLogin({
                //         ...login,
                //         loading: false,
                //         error: res.response.data,
                //     })
                // }

                //console.warn('res', res)
                //console.warn('resData', res.response.data)

                const {emailAddress, idLogon, idLogonType, name, idAccount, sessionId} = res.data
                localStorage.setItem('emailAddress', emailAddress)
                localStorage.setItem('idLogon', idLogon)
                localStorage.setItem('idLogonType', idLogonType)
                localStorage.setItem('name', name)
                localStorage.setItem('idAccount', idAccount)
                //localStorage.setItem('loggedIn', true)
                Cookies.set('sessionId', sessionId, { expires: 60 });

                setStore({
                    ...store,
                    emailAddress: emailAddress,
                    idLogon: idLogon,
                    idLogonType: idLogonType,
                    name: name,
                    idAccount: idAccount,
                    //loggedIn: true,
                    sessionId: sessionId, // JSESSIONID already stored in the cookie and cookie usually comes from the rest route itself we don't need to store it manually. Not like auth token JWT must be passed to the headers and stored in the local storage.
                })
                console.log('LoginStore', store)
                setLogin({
                    ...login,
                    loading: false,
                })
            })
            .catch(err => {
                setLogin({
                    ...login,
                    loading: false,// loaded
                    error: err.response.status,
                })
                console.warn('errData', err.response)
            })
            :
            null
        }
    }

    const handleOnChange = e => {
        setLogin({...login, [e.target.name]: e.target.value})
    }
    const handleSelected = e => {
        setSelected({ [e.target.name]: e.target.value })
    }

    const { username, password } = login
    
    if (store.sessionId) {
        router.push('/dashboard')
        //setLoggedIn(true)
        setLoadingSpinner(true)
    }

    return (
        <div className="w-96">
            <form onSubmit={handleFormSubmit} className="mt-6 z-30" autoComplete="on">
                <label
                    htmlFor="text"
                    className="block text-sm font-semibold text-white uppercase"
                >
                    Username
                </label>
                <input
                    id="text"
                    type="text"
                    name="username"
                    placeholder="username"
                    autoComplete="on"
                    className="rounded-md block w-full p-3 mt-2 mb-3 text-gray-700 bg-white appearance-none focus:outline-none focus:bg-gray-200 focus:shadow-inner"
                    value={username}
                    onChange={handleOnChange}
                    required
                />
                <div className={`${ matchUser.length > 1 ? 'h-96 overflow-auto' : '' || matchUser.length === 1 ? 'h-44 overflow-auto' : '' } relative rounded-md w-full h-0 transition-all duration-300 ease-in-out`}>
                    {matchUser.map(user => {
                        return (
                            <div className={`${styles.customRadio} rounded-md text-sm p-3 mt-2 text-gray-600 bg-white`} key={user.idAccount}>
                                <input
                                    type="radio"
                                    name="idLogon"
                                    id={user.idAccount}
                                    value={user.idLogon}
                                    onChange={handleSelected}
                                    required
                                />
                                <label
                                    id={user.idAccount}
                                    htmlFor={user.idAccount}
                                >
                                    <h1 className="text-xl capitalize">{user.name} {user.idLogonType}</h1>
                                    <p>Avilable entities:</p>
                                    {/* user.entities.filter(e => e.id !== null) */}
                                    {user.entities.map(entity => {
                                        return (
                                            <div key={entity.id}>
                                                <p>{entity.name}</p>
                                            </div>
                                        )
                                    })}
                                    <p>Last login: {user.lastSuccessfulLogin}</p>
                                    {/* <p>{account.name}</p> */}
                                    <p>Failed login attempts: {user.failedLoginAttempts}</p>
                                    <small ><b>Please contact your System Administrator if this is incorrect.</b></small>
                                </label>
                            </div>
                        )
                    })}
                </div>
                {/* //if username and password incorrect, show this same message. because username must be found/avilable before the password is entered
                //this is loading state which happnes when we type in the login inpput and useEffect run the api as we type - true as we type false as we stop */}
            
                {/* {   loading  ? 
                    <p className={`bg-blue-100 rounded-md flex items-center mt-2 p-2 h-16 transition-all duration-300 ease-in-out`}>
                        Checking username
                    </p>
                    : 
                    <p className={`${ login.username !== '' && matchUser.length === 0 ? 'bg-red-100 h-16 rounded-md mt-2 flex items-center opacity-100' : '' } h-0 opacity-0 px-2 transition-all duration-300 ease-in-out`}>
                        Please check your username as we are unable to find an account with the entered details.
                    </p>
                } */}
                <p className={`${ loading && login.password === '' ? 'bg-blue-100 h-16 mt-2 opacity-100' : login.username !== '' && matchUser.length === 0 ? 'bg-red-100 h-16 mt-2 opacity-100' : null } opacity-0 rounded-md h-0 px-2 transition-all duration-300 ease-in-out`}>
                    {   loading && login.password === '' ?
                        <div className="h-full flex justify-evenly items-center">
                            <img alt="loading" className="w-5 animate-spin" src="/loading.svg" />
                            <span className="pl-2 w-96 text-sm leading-snug">Checking username</span>
                        </div>
                        :
                        login.username !== '' && matchUser.length === 0 ?
                        <div className="h-full flex justify-evenly items-center">
                            <img alt="x-mark" className="w-5" src="/x-mark.svg" />
                            <span className="pl-2 w-96 text-sm leading-snug">Please check your username as we are unable to find an account with the entered details.</span>
                        </div>
                        :
                        null
                    }
                </p>
                <p className={`${ matchUser.length !== 0 && login.password !== '' && login.error === 401 ? 'bg-red-100 h-20 mt-2 opacity-100' : null } opacity-0 rounded-md px-2 h-0 transition-all duration-300 ease-in-out`}>
                    {   matchUser.length !== 0 && login.password !== '' && login.error === 401 ?
                        <div className="h-full flex justify-evenly items-center">
                            <img alt="x-mark" className="w-5" src="/x-mark.svg" />
                            <p className="pl-2 w-96 text-sm leading-snug">You have entered an incorrect password. Please contact your system administrator or click on forgot password link to reset your password.</p>
                        </div>
                        :
                        null
                    }
                </p>
                <label
                    htmlFor="password"
                    className="block mt-3 text-sm font-semibold text-white uppercase"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="********"
                    autoComplete="current-password"
                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-white appearance-none focus:outline-none focus:bg-gray-200 focus:shadow-inner"
                    value={password}
                    onChange={handleOnChange}
                    required
                />
                <button
                    //onClick={() => setOpenModal(true)}
                    //onClick={() => setLoading(true)}
                    type="submit"
                    className="rounded-md w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gray-900 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                >
                Sign in
                </button>
                <p className="flex justify-between mt-6 text-md text-white cursor-pointer hover:text-black">Forgot password?</p>
            </form>
        </div>
    )
}
export default LoginFull