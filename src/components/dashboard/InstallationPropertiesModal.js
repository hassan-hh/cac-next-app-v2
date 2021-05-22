const InstallaionPropertiesModal = ({ 
    itemDataProp, 
    showModalProp, 
    closeModalProp, 
    handleOnChangeProp, 
    handleFormSubmitProp, 
    success 
}) => {

    const { osName, filter, key, value } = itemDataProp

    return (
        <div className={`${showModalProp ? 'bg-gray-900 bg-opacity-75 pointer-events-auto' : 'opacity-0 pointer-events-none' } h-screen transition-all ease-in-out duration-300 fixed flex justify-center items-center z-10 inset-0`} aria-labelledby="modal-title" role="dialog" aria-modal="true" id="iModal">
            <form
                onSubmit={handleFormSubmitProp}
                className="relative bg-white z-20 rounded-lg overflow-hidden shadow-xl mx-4 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <img
                        alt="close"
                        className="w-4 absolute right-6 cursor-pointer"
                        src="/close.svg"
                        onClick={closeModalProp}
                    />
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Edit Property
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-5">
                            Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                        </p>
                        <div className="relative flex items-center justify-between mb-4">
                            <label
                                htmlFor="filter"
                                className="font-semibold text-gray-700 block"
                            >
                                OS
                            </label>
                            <select
                                name="osName"
                                className="w-96 border border-gray-200 rounded-md text-gray-700 h-10 px-3 py-2 bg-gray-200 hover:border-gray-400 focus:outline-none"
                                onChange={handleOnChangeProp}
                            >
                                <option value={osName}>
                                    {osName}
                                </option>
                                <option value="Windows">
                                    Windows
                                </option>
                                <option value="Linux">
                                    Linux
                                </option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <label
                                htmlFor="filter"
                                className="font-semibold text-gray-700 block"
                            >
                                Filter
                            </label>
                            <input
                                id="filter"
                                name="filter"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="*"
                                value={filter}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <label
                                htmlFor="key"
                                className="font-semibold text-gray-700 block"
                            >
                                Key
                            </label>
                            <input
                                id="key"
                                name="key"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="property-key"
                                value={key}
                                onChange={handleOnChangeProp}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <label
                                htmlFor="value"
                                className="font-semibold text-gray-700 block"
                            >
                                Value
                            </label>
                            <input
                                id="value"
                                name="value"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="property-value"
                                value={value}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className={`${ success ? 'bg-green-100 h-10 w-96 ml-auto mb-2 mt-6 opacity-100' : success === false ? 'bg-red-100 h-10 w-96 ml-auto mb-2 mt-6 opacity-100' : '' } opacity-0 rounded-md h-0 py-0 my-0 px-2 transition-all duration-300 ease-in-out`}>
                            { success ? 
                                <div className="h-full flex justify-evenly items-center">
                                    <img alt="check-mark" className="w-5" src="/check-mark.svg" />
                                    <span className="pl-2 w-96 text-sm leading-snug">Installation property has been successfully saved.</span>
                                </div>
                                :
                                <div className="h-full flex justify-evenly items-center">
                                    <img alt="x-mark" className="w-5" src="/x-mark.svg" />
                                    <span className="pl-2 w-96 text-sm leading-snug">Installation property has not been saved du to an error.</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        onClick={() => closeModalProp()}
                        className="transition-all ease-in-out duration-300 w-full inline-flex justify-center uppercase rounded-md shadow-sm px-4 py-2 bg-red-600 text-sm font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="mt-3 w-full inline-flex justify-center uppercase rounded-md shadow-sm px-4 py-2 bg-gray-900 text-sm font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
export default InstallaionPropertiesModal