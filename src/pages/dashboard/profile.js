import { useState, useContext, useEffect } from 'react'
import { StoreContext } from '../.././providers/StoreContext'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import { useRouter } from 'next/router'
import axios from 'axios'
import Error from '../_error'

const Profile = () => {

    const router = useRouter()
    const { setProfileImage, store, setStore } = useContext(StoreContext)
    const [selectedFile, setSelectedFile] = useState([])
    const [base64String, setBase64String] = useState('')
    const [isFilePicked, setIsFilePicked] = useState(false)
    const [success, setSuccess] = useState({
        data: null,
        image: null
    })

    const refreshData = () => {
        router.replace(router.asPath)
    }

    useEffect(() => {
        if (base64String) {
            setProfileImage(base64String)
        }
    })

    const handleFormSubmit = e => {
        e.preventDefault()
        const payLoad = {
            username: idLogon,
            name: name,
            email: emailAddress,
            type: idLogonType,
            phoneNumber: phoneNumber, //this is only passed from the profile form. Because our login response doesn't have phone number object/data
        }
        axios.post(`/api/user`, payLoad)
            .then(res => {
                if (res.status < 300) {
                    localStorage.setItem('name', name)
                    localStorage.setItem('emailAddress', emailAddress)
                    localStorage.setItem('phoneNumber', phoneNumber)
                    setStore({
                        ...store,
                        name: name,
                        emailAddress: emailAddress,
                        phoneNumber: phoneNumber
                    })
                    setSuccess({
                        ...success,
                        data: true
                    })
                }
            })
            .catch(err => {
                if (err.response?.status > 300) {
                    setStore({ ...store })
                    setSuccess({
                        ...success,
                        data: false
                    })
                }
            })
        refreshData()
    }

    const imgHandler = e => {
        setSelectedFile(e.target.files[0])
        encodeFileBase64(e.target.files[0])
        setIsFilePicked(true)
    }
    
    const encodeFileBase64 = file => {
        let reader = new FileReader()
        if (file) {
            reader.readAsDataURL(file)
            reader.onload = () => {
                let Base64 = reader.result
                setBase64String(Base64)
            }
            reader.onerror = () => {
            }
        }
    }

    const handleSubmission = () => {
        if (base64String === ''){
            return
        }
        const payLoad = {
            height: 178,
            imageData: base64String,
            width: 178,
            x: 0,
            y: 0,
        }
        const url = `/api/user/image/${store.idLogon}`
            axios.post(url, payLoad, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                } 
            })
            .then(res => {
                if (res.status < 300) {
                    setSuccess({
                        ...success,
                        image: true
                    })
                }
            })
            .catch(err => {
                if (err.response.status > 300) {
                    setSuccess({
                        ...success,
                        image: false
                    })
                }
			})

        refreshData()
	}

    const handleOnChange = e => {
        setStore({...store, [e.target.name]: e.target.value }) //we need to change the data on the store then pass it to our paylaod simple !
    }

    const { emailAddress, idLogon, idLogonType, name, phoneNumber } = store

    return (
        <>
            <Meta title="User Profile" />
            <Header title="User Profile" subTitle="" />
            {   !store ?
                <Error />
                :
                <div className="block space-y-5 lg:space-y-0 lg:space-x-5 lg:flex">
                    <div className="w-full lg:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-sm rounded-md">
                        <div className="h-full flex flex-col justify-between">
                            <span className="text-xl font-semibold block pb-5 md:pb-0">{name}</span>
                            <div className="rounded w-96 h-auto max-w-full shadow-md mx-auto">
                                <div style={{height: '24rem'}} className="w-full max-w-full relative flex items-center justify-center">
                                    <input
                                        type="file"
                                        name="file"
                                        className="cursor-pointer block opacity-0 w-full h-full max-w-full z-50"
                                        onChange={imgHandler}
                                    />
                                    <div className="flex items-center justify-center text-center absolute inset-0">
                                        {isFilePicked ?
                                            <img src={base64String || ''} style={{height: '24rem', width: '24rem'}} className="max-w-full object-cover"/>
                                            :
                                            <div>
                                                <h4>Drop file anywhere to upload<br />or</h4>
                                                <p>Select File</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div style={{width: '24rem'}} className={`${success.image === true ? 'bg-green-100 h-10 mt-6 lg:mt-0 opacity-100 py-10 md:py-6' : success.image === false ? 'bg-red-100 h-10 mt-6 lg:mt-0 py-10 md:py-6 opacity-100' : ''} opacity-0 rounded-md mx-auto max-w-full h-0 py-0 my-0 px-2 transition-all duration-300 ease-in-out`}>
                                {success.image === true ?
                                    <div className="h-full flex justify-start items-center">
                                        <img alt="check-mark" className="w-5 h-5" src="/check-mark.svg" />
                                        <span className="pl-2 text-sm leading-snug">Your profile photo has been successfully submitted.</span>
                                    </div>
                                    :
                                    <div className="h-full flex justify-start items-center">
                                        <img alt="x-mark" className="w-5 h-5" src="/x-mark.svg" />
                                        <span className="pl-2 text-sm leading-snug">Your profile photo has not been submitted due to an error. Please contact support.</span>
                                    </div>
                                }
                            </div>
                            <button
                                type="submit"
                                onClick={handleSubmission}
                                className="w-24 bg-gray-900 text-white transition-all ease-in-out duration-300 uppercase shadow-sm px-4 py-2 mt-5 rounded-md text-sm font-medium"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <form
                        onSubmit={handleFormSubmit}
                        className="w-full flex flex-col justify-center lg:w-3/5 p-4 sm:p-8 bg-white lg:ml-4"
                    >
                        <span className="text-gray-900 pb-6 block">Personal information of your account</span>
                        <div className="rounded shadow-md p-4 sm:p-8">
                            <div className="pb-4">
                                <label
                                    htmlFor="userName"
                                    className="font-semibold text-gray-700 block pb-1"
                                >
                                    Username
                                </label>
                                <input
                                    disabled
                                    id="userName"
                                    name="idLogon"
                                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-10 focus:outline-none focus:bg-gray-300 focus:shadow-inner opacity-70 cursor-not-allowed"
                                    type="text"
                                    value={idLogon || ''}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="pb-4">
                                <label
                                    htmlFor="fullName"
                                    className="font-semibold text-gray-700 block pb-1"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="name"
                                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name || ''}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="pb-4">
                                <label
                                    htmlFor="email"
                                    className="font-semibold text-gray-700 block pb-1"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="emailAddress"
                                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={emailAddress || ''}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="pb-4">
                                <label
                                    htmlFor="accountType"
                                    className="font-semibold text-gray-700 block pb-1"
                                >
                                    Account Type
                                </label>
                                <input
                                    disabled
                                    id="accountType"
                                    name="idLogonType"
                                    className="capitalize rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-100 focus:outline-none focus:bg-gray-300 focus:shadow-inner opacity-70 cursor-not-allowed"
                                    type="text"
                                    value={idLogonType || ''}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="">
                                <label
                                    htmlFor="phoneNumber"
                                    className="font-semibold text-gray-700 block pb-1"
                                >
                                    Phone Number
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                    type="number"
                                    placeholder="020 5555 5555"
                                    value={phoneNumber || ''}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className={`${success.data === true ? 'bg-green-100 h-10 py-8 sm:py-6 mb-2 mt-6 opacity-100' : success.data === false ? 'bg-red-100 h-10 mb-2 mt-6 py-10 sm:py-6 opacity-100' : ''} w-full opacity-0 rounded-md h-0 py-0 my-0 px-2 transition-all duration-300 ease-in-out`}>
                                {success.data === true ?
                                    <div className="h-full flex justify-start items-center">
                                        <img alt="check-mark" className="w-5 h-5" src="/check-mark.svg" />
                                        <span className="pl-2 text-sm leading-snug">Your personal information has been successfully updated.</span>
                                    </div>
                                    :
                                    <div className="h-full flex justify-start items-center">
                                        <img alt="x-mark" className="w-5 h-5" src="/x-mark.svg" />
                                        <span className="pl-2 text-sm leading-snug">Your personal information has not been updated due to an error. Please contact support.</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-24 bg-gray-900 text-white transition-all ease-in-out duration-300 uppercase shadow-sm px-4 py-2 mt-5 rounded-md text-sm font-medium">
                            Update
                        </button>
                    </form>
                </div>
            }
        </>
    )
}
export default Profile