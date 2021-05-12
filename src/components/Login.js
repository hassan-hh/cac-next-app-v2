import { useState, useEffect, useContext } from 'react'
import Cookies, { set } from 'js-cookie'
import { StoreContext } from '../providers/StoreContext'
import axios from 'axios'
import styles from '../styles/Login.module.css'

const Login = () => {
    
    const { store, setStore } = useContext(StoreContext)
    const [openModal, setOpenModal] = useState(false)
    const [login, setLogin] = useState({
        username: '', //any of these objects if mathed with object destructure below line 124 then it will update the same object or it will create another object from line 124
        password: '',
        loading: false,
        error: '',
    })
    console.log('LoginState', login)
    const [findUser, setFindUser] = useState([])
    console.log('FindUser', findUser)
    const [selected, setSelected] = useState({})
    console.log('Selected', selected)

    const matchUserApi = async () => {
        const res = await fetch(`/api/user/match/${login.username}/account`) //this api used for fetching user account before login
        const account = await res.json()
        setFindUser(account)
    }
    useEffect(() => {
        if (login.username) {
            matchUserApi()
        }
        if (findUser.length !== 0) { //temproary untill login endpoint is fixed
            findUser.map(user => {
                localStorage.setItem('emailAddress', user.emailAddress)
                localStorage.setItem('idLogon', user.idLogon)
                localStorage.setItem('idLogonType', user.idLogonType)
                localStorage.setItem('name', user.name)
                localStorage.setItem('idAccount', user.idAccount)
                setStore({
                    ...store,
                    emailAddress: user.emailAddress,
                    idLogon: user.idLogon,
                    idLogonType: user.idLogonType,
                    name: user.name,
                    idAccount: user.idAccount,
                })
                console.log('StoreContext', store)
            })
        }
    }, [login.username, findUser.length])

    const handleFormSubmit = e => {
        e.preventDefault()
        setSelected(selected)
        console.log('Submitted', selected)
        setLogin({ ...login, loading: true })

        // HOW IT WORKS 
        //if username with single accountType like catsupp can login with or without selecting the account, username with mutliple accounts need to select an account type to login with or error
        const userLogon =  selected.idLogon ? selected.idLogon : login.username
        const user = {
            idLogon: userLogon,
            password: login.password
            //username: login.username, //userInfo, //e.target.username.value || e.target.account.value, //we require account type to login with instead of the username - username could have multiple accounts to login with use the radio input
            //idLogon: selected.idLogon
        }
        //setLogin({...login, loading: true})
        axios.post(`/api/user/login`, user)
        .then(res => {
            if (login === '') {
                setLogin({
                    ...login,
                    loading: false,
                    // error: res.message,
                    error: res.response.data,
                })
            }
            //console.warn('thenRes', response)
            // console.log(response.data);
            // console.log(response.status);
            // console.log(res.statusText);
            // console.log(res.headers);
            // console.log(res.config);
            const { emailAddress, idLogon, idLogonType, name, idAccount, sessionId  } = res.data
            //const { sessionId } = Cookies.set('sessionId', 'anyValue... from any auth provider like JWT, GWT, Google, FB, GitHub', { expires: 60 });
            localStorage.setItem('idAccount', idAccount)
            localStorage.setItem('idLogon', idLogon)
            localStorage.setItem('idLogonType', idLogonType)
            Cookies.set('sessionId', sessionId, { expires: 60 });
            setStore({
                ...store,
                idAccount: idAccount,
                idLogon: idLogon,
                idLogonType: idLogonType,
                sessionId: sessionId,
            })
            //console.log('LoginStore', store)
            setLogin({
                ...login,
                loading: false,
            })
            //console.warn('resData', res.response.data)
        })
        .catch(err => {
            setLogin({
                ...login,
                loading: false,// loaded
                error: err.response.data,
            })
            console.warn('errData', err.response.data)
            // console.warn('errStatus', err.response.status)
            // console.warn('errHeaders', err.response.headers)
            // console.warn('errConfig', err.config);
            // console.warn('errRequest', err.request);
            // console.log('errJson', err.toJSON());
        })
    }

    // const handleFormSubmit = e => {
    //     e.preventDefault()
    //     matchAccountApi()
    //     loginApi()
    //     setLogin({ ...login, loading: true})
    // }

    const handleOnChange = e => {
        setLogin({...login, [e.target.name]: e.target.value})
    }
    const handleSelected = e => {
        setSelected({ [e.target.name]: e.target.value })
    }

    const {username, password} = login

    return (
        <div className="w-96 p-12 bg-white rounded-md">
            <img alt="Cats Logo" className="w-full mb-5 mx-auto block" src="/cats_logo_large.png" />
            <form onSubmit={handleFormSubmit} className="mt-6 z-30" noValidate>
                <label
                    htmlFor="text"
                    className="block text-xs font-semibold text-gray-600 uppercase"
                >
                    Username
                </label>
                <input
                    id="text"
                    type="text"
                    name="username"
                    placeholder="username"
                    autoComplete="on"
                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    value={username}
                    onChange={handleOnChange}
                    required
                />
                <div className={`${ findUser.length > 1 ? 'h-96 overflow-auto' : '' || findUser.length === 1 ? 'h-44 overflow-auto' : '' } relative rounded-md w-full h-0 transition-all duration-300 ease-in-out`}>
                    {findUser.map(user => {
                        return (
                            <div className={`${styles.customRadio} rounded-md text-sm p-3 mt-2 text-gray-600 bg-gray-200`} key={user.idAccount}>
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
                <label
                    htmlFor="password"
                    className="block mt-2 
                    text-xs font-semibold text-gray-600 uppercase"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="********"
                    autoComplete="current-password"
                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    value={password}
                    onChange={handleOnChange}
                    required
                />
                <button
                    onClick={() => setOpenModal(true)}
                    type="submit"
                    className="rounded-md w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gray-900 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                >
                Sign in
                </button>
                <p className="flex justify-between mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">Forgot password?</p>
            </form>
        </div>
    )
}
export default Login