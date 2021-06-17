const DataMessageModal = ({ 
    itemDataProp, 
    showModalProp, 
    closeModalProp, 
    handleOnChangeProp, 
    handleFormSubmitProp,
    clearFormField,
    success 
}) => {

    const {
        definitionKey,
        idDataSource,
        objectClass,
        versionNumber,
        idClient,
        messageTypes,
        instrumentDummySource,
        idRegion,
        messageToEventClass,
        messageFromEventClass,
        validationClass,
        matchingClass,
        comparingClass,
        dataSourceMessageClass,
        mergeClass,
        insertValidation,
        updateValidation,
        deleteValidation,
        mergeValidation
    } = itemDataProp
    
    return (
        <div  className={`${showModalProp ? 'bg-gray-900 bg-opacity-75 pointer-events-auto' : 'opacity-0 pointer-events-none' } h-screen transition-all ease-in-out duration-300 fixed flex justify-center items-center z-10 inset-0`} aria-labelledby="modal-title" role="dialog" aria-modal="true" id="iModal">
            <form
                onSubmit={handleFormSubmitProp}
                className="relative bg-white z-20 rounded-lg overflow-hidden shadow-xl mx-4 sm:align-middle sm:max-w-2xl sm:w-full h-5/6 overflow-y-auto"
            >
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <img
                        alt="close"
                        className="w-4 absolute right-6 cursor-pointer"
                        src="/close.svg"
                        onClick={closeModalProp}
                    />
                    <h3 className="text-lg leading-6 font-medium text-gray-900 pb-3 border-b-2 border-fuchsia-600" id="modal-title">
                        Edit Data Message Definition
                    </h3>
                    <div className="mt-7">
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="definitionKey"
                                className="font-semibold text-gray-700 block"
                            >
                                Definition Key
                            </label>
                            <input
                                disabled={clearFormField ? false : true}
                                id="definitionKey"
                                name="definitionKey"
                                className={`${clearFormField ? 'bg-gray-200 opacity-100 cursor-auto' : 'bg-gray-100 opacity-70 cursor-not-allowed'} rounded-md block w-96 px-3 py-2 text-gray-700 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner`}
                                type="text"
                                placeholder="Definition Key"
                                value={definitionKey || ''}
                                onChange={handleOnChangeProp}
                                required
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="idDataSource"
                                className="font-semibold text-gray-700 block"
                            >
                                Data Source Identifier
                            </label>
                            <input
                                id="idDataSource"
                                name="idDataSource"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Definition Key"
                                value={idDataSource || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="objectClass"
                                className="font-semibold text-gray-700 block"
                            >
                                Object Class
                            </label>
                            <input
                                id="objectClass"
                                name="objectClass"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Object Class"
                                value={objectClass || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="versionNumber"
                                className="font-semibold text-gray-700 block"
                            >
                                Version Number
                            </label>
                            <input
                                id="versionNumber"
                                name="versionNumber"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Version Number"
                                value={versionNumber || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="idClient"
                                className="font-semibold text-gray-700 block"
                            >
                                Client Identifier
                            </label>
                            <input
                                id="idClient"
                                name="idClient"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Client Identifier"
                                value={idClient || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="messageTypes"
                                className="font-semibold text-gray-700 block"
                            >
                                Message Types
                            </label>
                            <input
                                id="messageTypes"
                                name="messageTypes"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Message Types"
                                value={messageTypes || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="instrumentDummySource"
                                className="font-semibold text-gray-700 block"
                            >
                                Instrument Dummy Source
                            </label>
                            <input
                                id="instrumentDummySource"
                                name="instrumentDummySource"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Instrument Dummy Source"
                                value={instrumentDummySource || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="idRegion"
                                className="font-semibold text-gray-700 block"
                            >
                                Region Identifier
                            </label>
                            <input
                                id="idRegion"
                                name="idRegion"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Region Identifier"
                                value={idRegion || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="messageToEventClass"
                                className="font-semibold text-gray-700 block"
                            >
                                Message To Event Class
                            </label>
                            <input
                                id="messageToEventClass"
                                name="messageToEventClass"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Message To Event Class"
                                value={messageToEventClass || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="messageFromEventClass"
                                className="font-semibold text-gray-700 block"
                            >
                                Message From Event Class
                            </label>
                            <input
                                id="messageFromEventClass"
                                name="messageFromEventClass"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Message From Event Class"
                                value={messageFromEventClass || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="validationClass"
                                className="font-semibold text-gray-700 block"
                            >
                                Validation Class
                            </label>
                            <input
                                id="validationClass"
                                name="validationClass"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Validation Class"
                                value={validationClass || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="matchingClass"
                                className="font-semibold text-gray-700 block"
                            >
                                Matching Class
                            </label>
                            <input
                                id="matchingClass"
                                name="matchingClass"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Matching Class"
                                value={matchingClass || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="comparingClass"
                                className="font-semibold text-gray-700 block"
                            >
                                Comparing Class
                            </label>
                            <input
                                id="comparingClass"
                                name="comparingClass"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Comparing Class"
                                value={comparingClass || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="dataSourceMessageClass"
                                className="font-semibold text-gray-700 block"
                            >
                                Data Source Message Class
                            </label>
                            <input
                                id="dataSourceMessageClass"
                                name="dataSourceMessageClass"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Data Source Message Class"
                                value={dataSourceMessageClass || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="mergeClass"
                                className="font-semibold text-gray-700 block"
                            >
                                Merge Class
                            </label>
                            <input
                                id="mergeClass"
                                name="mergeClass"
                                className="rounded-md block w-96 px-3 py-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                type="text"
                                placeholder="Merge Class"
                                value={mergeClass || ''}
                                onChange={handleOnChangeProp}
                            />
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="insertValidation"
                                className="font-semibold text-gray-700 block"
                            >
                                Insert Validation
                            </label>
                            <select
                                name="insertValidation"
                                className="w-96 border border-gray-200 rounded-md text-gray-700 h-10 px-3 py-2 bg-gray-200 hover:border-gray-400 focus:outline-none"
                                onChange={handleOnChangeProp}
                                value={insertValidation}
                            >
                                <option value={true}>
                                    Validation is required
                                </option>
                                <option 
                                value={false}
                                >
                                    Validation is not required
                                </option>
                            </select>
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="updateValidation"
                                className="font-semibold text-gray-700 block"
                            >
                                Update Validation
                            </label>
                            <select
                                name="updateValidation"
                                className="w-96 border border-gray-200 rounded-md text-gray-700 h-10 px-3 py-2 bg-gray-200 hover:border-gray-400 focus:outline-none"
                                onChange={handleOnChangeProp}
                                value={updateValidation}
                            >
                                <option value={true}>
                                    Validation is required
                                </option>
                                <option 
                                value={false}
                                >
                                    Validation is not required
                                </option>
                            </select>
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="deleteValidation"
                                className="font-semibold text-gray-700 block"
                            >
                                Delete Validation
                            </label>
                            <select
                                name="deleteValidation"
                                className="w-96 border border-gray-200 rounded-md text-gray-700 h-10 px-3 py-2 bg-gray-200 hover:border-gray-400 focus:outline-none"
                                onChange={handleOnChangeProp}
                                value={deleteValidation}
                            >
                                <option value={true}>
                                    Validation is required
                                </option>
                                <option 
                                value={false}
                                >
                                    Validation is not required
                                </option>
                            </select>
                        </div>
                        <div className="flex items-start flex-col sm:items-center sm:justify-between sm:flex-row mb-4">
                            <label
                                htmlFor="mergeValidation"
                                className="font-semibold text-gray-700 block"
                            >
                                Merge Validation
                            </label>
                            <select
                                name="mergeValidation"
                                className="w-96 border border-gray-200 rounded-md text-gray-700 h-10 px-3 py-2 bg-gray-200 hover:border-gray-400 focus:outline-none"
                                onChange={handleOnChangeProp}
                                value={mergeValidation}
                            >
                                <option value={true}>
                                    Validation is required
                                </option>
                                <option 
                                value={false}
                                >
                                    Validation is not required
                                </option>
                            </select>
                        </div>
                        <div className={`${ success ? 'bg-green-100 h-10 mb-2 mt-6 opacity-100' : success === false ? 'bg-red-100 h-10 mb-2 mt-6 opacity-100' : '' } ml-auto w-96 opacity-0 rounded-md h-0 py-0 my-0 px-2 transition-all duration-300 ease-in-out`}>
                            {   success ? 
                                <div className="h-full flex justify-evenly items-center">
                                    <img alt="check-mark" className="w-5" src="/check-mark.svg" />
                                    <span className="pl-2 w-96 text-sm leading-snug">Rules has been successfully updated.</span>
                                </div>
                                : success === false ?
                                <div className="h-full flex justify-evenly items-center">
                                    <img alt="x-mark" className="w-5" src="/x-mark.svg" />
                                    <span className="pl-2 w-96 text-sm leading-snug">Rules has not been updated due to an error.</span>
                                </div>
                                :
                                null
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
export default DataMessageModal