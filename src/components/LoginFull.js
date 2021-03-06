import { useState, useEffect, useContext } from 'react'
import Cookies, { set } from 'js-cookie'
import { StoreContext } from '../providers/StoreContext'
import axios from 'axios'
import styles from '../styles/Login.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import LoadingScreen from './dashboard/LoadingScreen'
// import { getRouteMatcher } from 'next/dist/next-server/lib/router/utils'

const LoginFull = () => {

    const router = useRouter()
    const { loggedIn, setLoggedIn, setLoadingScreen, store, setStore, loadingScreen } = useContext(StoreContext)
    const [login, setLogin] = useState({
        username: '', //any of these objects if mathed with object destructure below line 124 then it will update the same object or it will create another object from line 124
        password: '',
        error: null,
        status: null
    })
    console.log('LoginState', login)
    const [matchUserStatus, setMatchUserStatus] = useState({
        error: null,
        status: null,
    })
    console.warn('matchUserStatus', matchUserStatus)
    const [matchUser, setMatchUser] = useState([])
    console.log('MatchUser', matchUser)
    const [selected, setSelected] = useState(null)
    console.log('Selected', selected)
    const [loading, setLoading] = useState(false)
    console.log('is loading', loading)
    const [connectAccount, setConnectAccount] = useState(false)
    console.log('connectAccount', connectAccount)

    const matchUserApi = () => {
        setLoading(true)
        axios.get(`/api/user/match/${login.username}/account`)
            .then(res => {
                if (res.status < 300) {
                    setLoading(false)
                    setMatchUser(account)
                    setMatchUserStatus({
                        ...matchUserStatus,
                        error: false,
                        status: res.status,
                    })
                }
            })
            .catch(err => {
                if (err.response && err.response.status > 300) {
                    setLoading(false)
                    setMatchUserStatus({
                        ...matchUserStatus,
                        error: true,
                        status: err.response.status,
                    })
            }
        })
    }
    useEffect(() => {
        if (login.username !== '') {
            matchUserApi() //if username input is not empty run the api
        }
        if (matchUser.length !== 0) {
            setSelected(matchUser.[0].idLogon) //!== 0 if result displayed, select the first input/option avilable
        }
        // if (login.error === true || login.error === false) {//or just login.error for both - need this for both success or error, otherwise the connect account message will not get removed if error is occurred
        //     setConnectAccount(false)
        // }
        // if (matchUser.length !== 0 && login.password === '') {
        //     setLoading(false)
        // }
        if (matchUserStatus.error === true && login.password === '') {
            setMatchUserStatus({
                ...matchUserStatus,
                error: null,
                status: null
            })
        }
        if (matchUser.length === 0 || matchUser.length !== 0 && login.password !== '' && loading === true) { //&& login.error === true // to replace the login.status === 401 or added it 
        //reset error to empty string to remove error status 401 otherwise error message will always show 
        //we dont need matchUser.length === 0, because we need to find user first then submit the form so check user error will show instead and matchUser.length === 0 is used here to clear my 401 error to re-enter the password again without keeping the old error status 401
            setLogin({
                ...login,
                error: null,
                status: null
            })
        }
        return () => { setLoading(false); setConnectAccount(false);} //clenup function will immediatley set both to false after they are set to true - without the need to set it back manually
    }, [login.username, matchUser.length, login.password, login.error]) //, login.error

    const handleFormSubmit = e => {
        e.preventDefault()
        setConnectAccount(true)
        // HOW IT WORKS 
        //matched user account will be setSelected automatically the first account
        const userLogon = selected ? selected : login.username
        axios.post(`/api/user/login?username=${userLogon}&password=${login.password}`)
        .then(res => {
            if (res.status < 300) {
                setLogin({
                    ...login,
                    error: false,
                    status: res.status
                })
                const { emailAddress, idLogon, idLogonType, name, idAccount, sessionId } = res.data
                localStorage.setItem('emailAddress', emailAddress)
                localStorage.setItem('idLogon', idLogon)
                localStorage.setItem('idLogonType', idLogonType.toLowerCase())
                localStorage.setItem('name', name)
                localStorage.setItem('idAccount', idAccount)
                //localStorage.setItem('loggedIn', true)
                Cookies.set('sessionId', sessionId)

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
            }
        })
        .catch(err => {
            if (err.response.status > 300) {
                setLogin({
                    ...login,
                    error: true,
                    status: err.response.status
                })
            }
            console.warn('errData', err.response)
        })
    }

    useEffect(() => {
        if (store.sessionId) { //after authenticated redirect me to dashobard  //&& router.pathname === '/login'
            router.push('/dashboard')
            //setLoggedIn(true)
            setLoadingScreen(true)
        }
    })

    const handleOnChange = e => {
        setLogin({...login, [e.target.name]: e.target.value})
    }
    const handleSelected = e => {
        setSelected({ [e.target.name]: e.target.value })
    }
    const { username, password } = login

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
                    {matchUser.map(user => (
                        <div
                            className={`${styles.customRadio} rounded-md text-sm p-3 mt-2 text-gray-600 bg-white capitalize`}
                            key={user.idAccount}
                        >
                            <input //all of our objects are stringify then tolowercase, the objects wont work with camelCase it also has be to lowercase
                                type="radio"
                                name="idLogon"
                                id={user.idAccount}
                                value={user.idLogon}
                                onChange={handleSelected}
                                //required
                            />
                            <label
                                id={user.idAccount}
                                htmlFor={user.idAccount}
                            >
                                <h1 className="text-xl">{user.name} {user.idLogonType.toLowerCase()}</h1>
                                <p>Avilable entities:</p>
                                {   user.entities.map(entity => {
                                    return (
                                        <div key={entity.id}>
                                            <p>{entity.name}</p>
                                        </div>
                                    )
                                })}
                                <p>Last login: {user.lastSuccessfulLogin}</p>
                                <p>Failed login attempts: {user.failedLoginAttempts}</p>
                                <small ><b>Please contact your System Administrator if this is incorrect.</b></small>
                            </label>
                        </div>
                    ))}
                </div>
                {/* //if username and password incorrect, show this same message. because username must be found/avilable before the password is entered
                //this is loading state which happnes when we type in the login inpput and useEffect run the api as we type - true as we type false as we stop */}
                <div className={`${loading && login.password === '' ? 'bg-blue-100 h-16 mt-2 opacity-100' : matchUserStatus.error === true && matchUserStatus.status > 300 ? 'bg-red-100 h-24 mt-2 opacity-100' : login.username !== '' && matchUser.length === 0 ? 'bg-red-100 h-16 mt-2 opacity-100' : '' }  flex justify-evenly items-center opacity-0 rounded-md h-0 px-2 transition-all duration-300 ease-in-out`}>
                    {   loading && login.password === ''  ?
                            <>
                                <img alt="loading" className="w-5 animate-spin" src="/loading.svg" />
                                <span className="pl-2 w-96 text-sm leading-snug">Please wait while we check your username</span>
                            </>
                        :
                        matchUserStatus.status > 300 ? //server throwing error 500 before finding the user. i.e. server is down ...etc
                            <>
                                <img alt="x-mark" className="w-5" src="/x-mark.svg" />
                                <span className="pl-2 w-96 text-sm leading-snug">
                                    <p className="font-bold pr-1">
                                        {matchUserStatus.status}. <span className="font-normal">That's an error.</span>
                                    </p>
                                    The server encountered a temporary error and could not complete your request. Please try again in 30 seconds.
                                </span>
                            </>
                        :
                        matchUserStatus.status < 300 && matchUser.length === 0 ? //Please check your username as we are unable to find an account with the entered details.
                            <>
                                <img alt="x-mark" className="w-5" src="/x-mark.svg" />
                                <span className="pl-2 w-96 text-sm leading-snug">Sorry, we couldn't find an account with that username. Please check your username.</span>
                            </>
                        :
                        null
                    }
                </div>
                <div className={`${ connectAccount && login.password !== '' ? 'bg-blue-100 h-16 mt-2 opacity-100' : login.error === true ? 'bg-red-100 h-24 mt-2 opacity-100' : '' } flex justify-evenly items-center opacity-0 rounded-md px-2 h-0 transition-all duration-300 ease-in-out`}>
                    {   connectAccount && login.password !== ''  ? //login.password !== '' && matchUser.length !== 0
                            <>
                                <img alt="loading" className="w-5 animate-spin" src="/loading.svg" />
                                <span className="pl-2 w-96 text-sm leading-snug">Please wait while we connect you to your account.</span>
                            </>
                        : login.error === true && login.status === 401 ? //matchUser.length !== 0 && login.password !== '' && login.status === 401 the original code on top. I don't need the 401 because error code could be 500 server error.
                        <>
                            <img alt="x-mark" className="w-5" src="/x-mark.svg" />
                            <span className="pl-2 w-96 text-sm leading-snug">Sorry, that password isn't right. We can help you recover your password
                                <Link href="#">
                                    <a className="underline"> contact your system administrator </a>
                                </Link>
                                or
                                <Link href="/reset-password">
                                    <a className="underline"> reset your password.</a>
                                </Link>
                            </span>
                        </>
                        : login.error === true && login.status > 300 ? //empty pink box remain in the same place
                        <>
                            <img alt="x-mark" className="w-5" src="/x-mark.svg" />
                            <span className="pl-2 w-96 text-sm leading-snug">
                                <p className="font-bold pr-1">
                                    {login.status}. <span className="font-normal">That's an error.</span>
                                </p>
                                The server encountered a temporary error and could not complete your request. Please try again in 30 seconds.
                            </span>
                        </>
                        :
                        null
                    }
                </div>
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