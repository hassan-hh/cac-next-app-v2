import { useState, useContext } from 'react'
import { StoreContext } from '../providers/StoreContext'
import Header from '../components/dashboard/Header'
import Meta from '../components/seo/Meta'
import Link from 'next/link'

const Profile = () => {

    const { store, setStore } = useContext(StoreContext)
    console.warn('profile', store)

    const [fields, setFields] = useState({
        emailAddress: '',
        idLogon: '',
        idLogonType: '',
        name: '',
        phoneNumber: '02012345678',
    })

    const handleOnChange = e => {
        setFields({ ...fields, [e.target.name]: e.target.value })
        setStore({...store, [e.target.name]: e.target.value })
    }

    const { userName, fullName, password, email, accountType, phoneNumber } = fields
    const { emailAddress, idLogon, idLogonType, name, idAccount } = store
    
    return (
        <>
            <Meta title="User Profile" />
            <Header title="User Profile" subTitle="" />
            <div className="h-full">
                <div className="border-b-2 block md:flex">
                    <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-sm rounded-md">
                        <div className="flex justify-between">
                            <span className="text-xl font-semibold block">David Bettley</span>
                            <a href="#" className="-mt-1 text-sm font-bold text-white bg-gray-700 rounded-full px-4 py-2 hover:bg-gray-800">Edit</a>
                        </div>
                        <div className="h-96 w-full mt-6 flex items-center justify-center">
                            <img id="showImage" className="w-80 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />                          
                        </div>
                    </div>
                    <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-sm rounded-md">
                        <span className="text-gray-900 pb-6 block">Personal information of your account</span>
                        <div className="rounded shadow-md p-8">
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
                                    name="userName"
                                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-100 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner opacity-70"
                                    type="text"
                                    // value={userName}
                                    value={idLogon}
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
                                    name="fullName"
                                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                    type="text"
                                    placeholder="Enter your name"
                                    //value={fullName}
                                    value={name}
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
                                    name="email"
                                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                    type="email"
                                    placeholder="Enter your email"
                                    //value={email}
                                    value={emailAddress !== undefined ? emailAddress : 'Please Add Email Address'   }
                                    onChange={handleOnChange}
                                    required
                                    //account.entities.filter(e => e.id !== null)
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
                                    name="accountType"
                                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-100 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner opacity-70"
                                    type="text"
                                    // value={accountType}
                                    value={idLogonType}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <div className="pb-6">
                                <label
                                    htmlFor="phoneNumber"
                                    className="font-semibold text-gray-700 block pb-1"
                                >
                                    Phone Number
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                    type="number"
                                    placeholder="020 5555 5555"
                                    value={phoneNumber}
                                    onChange={handleOnChange}
                                    required
                                />
                            </div>
                            <a href="#" className="bg-gray-900 text-white transition-all ease-in-out duration-300 uppercase shadow-sm px-4 py-2 rounded-md text-sm font-medium">Update</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile