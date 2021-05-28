import { useState, useContext, useEffect } from 'react'
import { StoreContext } from '../.././providers/StoreContext'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import { useRouter } from 'next/router'
import axios from 'axios'

const Profile = () => {

    const router = useRouter()
    const { store, setStore } = useContext(StoreContext)
    const [selectedFile, setSelectedFile] = useState()
    console.log('image', selectedFile)
    const [isFilePicked, setIsFilePicked] = useState(false)
    const [success, setSuccess] = useState(null)
    
    console.warn('profile', store)

    const refreshData = () => {
        router.replace(router.asPath)
    }

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
                    setSuccess(true)
                }
                console.log('res', res)
            })
            .catch(err => {
                if (err.response.status > 300) {
                    //setStore({ ...store }) //not sure about this why need to have copy of our state if error
                    setSuccess(false)
                }
                console.warn('error', err.response)
            })
    }

    const handleSubmission = () => {
        const formData = new FormData();
        formData.append('File', selectedFile);
        let blob = new Blob({data: 'image/jpeg;base64'})
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        const url = `/api/user/image/${store.idLogon}`
        //const encodedUrl = encodeURI(url);
		// fetch(
		// 	encodedUrl,
		// 	{
        //         method: 'POST',
        //         headers: {
        //         'Content-Type': 'application/json'
        //         },
		// 		body: formData,
		// 	}
        // )
        // .then((res) => res.json())
		// 	.then((result) => {
		// 		console.log('Success:', result);
		// 	})
		// 	.catch((err) => {
		// 		console.error('Error:', err);
		// 	});
        //
        const headers = {
            'Content-Type': 'application/json',
        }
        axios.post(url, formData, {
            headers: headers,
        })
            .then(res => {
                //res.json()
                console.log('res', res)
            })
			.then((result) => {
				console.log('Success:', result);
			})
			.catch(err => {
				console.error('Error:', err);
			})

        refreshData()
	}
    const handleOnChange = e => {
        setStore({...store, [e.target.name]: e.target.value }) //we need to change the data on the store then pass it to our paylaod simple !
    }
    const imgHandler = e => {
        setSelectedFile({
            reader: [e.target.files[0]]
        })
        //setSelectedFile(e.target.files[0])
        setIsFilePicked(true)
    }
    console.log('fields/store', store)
    const { emailAddress, idLogon, idLogonType, name, idAccount, phoneNumber } = store
    //const { name } = selectedFile
    
    return (
        <>
            <Meta title="User Profile" />
            <Header title="User Profile" subTitle="" />
                <div className="block md:flex">
                    <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-sm rounded-md">
                        <div className="h-full flex flex-col justify-between">
                            <span className="text-xl font-semibold block">David Bettley</span>
                            <div className="rounded shadow-md py-28 mt-4">
                            {/* <label class="cursor-pointer mt-1"> */}
                                {/* <span class="text-sm font-bold text-white bg-gray-700 rounded-full px-4 py-2 hover:bg-gray-800" >Edit</span> */}
                                {/* <input
                                    type="file"
                                    name="file"
                                    onChange={imgHandler}
                                    className="hidden"
                                    //:multiple="multiple" :accept="accept"
                                /> */}
                            {/* </label> */}
                                <div className="h-80 relative flex flex-col items-center justify-center">
                                    <input
                                        type="file"
                                        name="file"
                                        className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
                                        onChange={imgHandler}
                                    />
                                    <div className="text-center absolute">
                                        {   isFilePicked ?
                                            <div className="flex flex-col items-center justify-center">
                                                <p>"{selectedFile.name}"</p>
                                                <h4>Drop file anywhere to upload<br/>or</h4>
                                                <p>Select File</p>
                                            </div>
                                            :
                                            <div className="flex flex-col items-center justify-center">
                                                <h4>Drop file anywhere to upload<br/>or</h4>
                                                <p>Select File</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                onClick={handleSubmission}
                                className="w-24 bg-gray-900 text-white transition-all ease-in-out duration-300 uppercase shadow-sm px-4 py-2 mt-5 rounded-md text-sm font-medium"
                            >
                                Submit
                            </button>
                            {/* <input type="file" name="file" onChange={imgHandler} /> */}
                            {/* {   isFilePicked ? (
                                    <>
                                        <p>Filename: {selectedFile.name}</p>
                                        <p>Filetype: {selectedFile.type}</p>
                                        <p>Size in bytes: {selectedFile.size}</p>
                                        <p>
                                            lastModifiedDate:{' '}
                                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                                        </p>
                                    </>
                                )
                                :
                                (
                                    <p>Select a file to show details</p>
                                )
                            } */}
                            {/* <img id="showImage" className="w-80 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />                           */}
                        </div>
                    </div>
                <form
                    onSubmit={handleFormSubmit}
                    className="w-full flex flex-col justify-center md:w-3/5 p-8 bg-white lg:ml-4 shadow-sm rounded-md"
                >
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
                                name="idLogon"
                                className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-10 focus:outline-none focus:bg-gray-300 focus:shadow-inner opacity-70 cursor-not-allowed"
                                type="text"
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
                                name="name"
                                className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Enter your name"
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
                                name="emailAddress"
                                className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-200 focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="email"
                                placeholder="Enter your email"
                                value={emailAddress !== undefined ? emailAddress : 'Please Enter Email Address'}
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
                                className="rounded-md block w-full p-3 mt-2 text-gray-700 bg-gray-100 focus:outline-none focus:bg-gray-300 focus:shadow-inner opacity-70 cursor-not-allowed"
                                type="text"
                                value={idLogonType}
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
                                value={phoneNumber}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                        <div className={`${ success ? 'bg-green-100 h-10 w-full ml-auto mb-2 mt-6 opacity-100' : success === false ? 'bg-red-100 h-10 w-full ml-auto mb-2 mt-6 py-6 sm:py-2 opacity-100' : '' } opacity-0 rounded-md h-0 py-0 my-0 px-2 transition-all duration-300 ease-in-out`}>
                            { success ? 
                                <div className="h-full flex justify-start items-center">
                                    <img alt="check-mark" className="w-5" src="/check-mark.svg" />
                                    <span className="pl-2 text-sm leading-snug">Your personal information has been successfully updated.</span>
                                </div>
                                :
                                <div className="h-full flex justify-start items-center">
                                    <img alt="x-mark" className="w-5" src="/x-mark.svg" />
                                    <span className="pl-2 text-sm leading-snug">Your personal information has not been saved due to an error. Please contact support.</span>
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
        </>
    )
}
export default Profile