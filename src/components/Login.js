
import { useState, useEffect } from 'react'

const Login = () => {
    //let credentials = '';
   //const username = 'catsupp'
    let cred;
    const [login, setLogin] = useState({
        username: '',
        password: '',
        loading: false,
        error: '',
    })
    console.log(login)

    // const payload = e => {
        
    //     const cred =  {username: e.target.username.value}
    // }
    

    const LoginApi = async () => {
        const res = await fetch(`/api/user/match/${username}/account`)
        const data = await res.json()
        setLogin({...login, data})
        console.log('account', data)
    }

    useEffect(() => {
        LoginApi()
    }, [])

    const handleFormSubmit = e => {
        e.preventDefault()
        LoginApi()
        // const credentials = {
        //     username: e.target.username.value, 
        //     password: e.target.password.value,
        // }
        setLogin({ ...login, loading: true})
        console.log(login)
    }

    const handleOnChange = e => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const { username, password } = useState()

    return (

        <div className="w-96 p-12 bg-white rounded-md">
            <img alt="Cats Logo" className="w-40 mb-5 mx-auto block" src="/cats_PRD.png" />
            <form onSubmit={handleFormSubmit} className="mt-6" noValidate>
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
                    autocomplete="on"
                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    value={username}
                    onChange={handleOnChange}
                    required
                />
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
                    autocomplete="current-password"
                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
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
                <p className="flex justify-between mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">Forgot password?</p>
            </form>
        </div>
    )
}
export default Login