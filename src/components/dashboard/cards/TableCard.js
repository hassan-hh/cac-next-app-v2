
const TableCard = ({title}) => {

    return (
        <div className="w-full">
            <div className='bg-white shadow-lg rounded-lg overflow-hidden mx-auto'>
                <div className="py-4 px-4 mt-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <h1 className="text-gray-500">{title}</h1>
                        <div className="box py-4 sm:pb-6 sm:py-0">
                            <div className="box-wrapper">
                                <div className="bg-white rounded flex items-center w-full p-1 shadow-sm border border-gray-200">
                                <button className="outline-none focus:outline-none"><svg className="w-5 text-gray-600 h-4 cursor-pointer" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                                <input type="search" name="" id="" placeholder="search table" x-model="q" className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">
                                        Date Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">
                                        Description
                                    </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            
                                    </td>
                                    </tr>
                                    <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            
                                    </td>
                                    </tr>
                                    <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            
                                    </td>
                                    </tr>
                                    <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            <div className="flex md:justify-between justify-center pt-5">
                                <div className="py-4 hidden md:block">
                                    <a href="#" className="tracking-widest text-center shadow bg-white hover:bg-gray-100 focus:shadow-outline focus:outline-none text-gray-600 text-xs py-3 px-10 rounded">Prev</a>
                                </div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    </a>
                                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    1
                                    </a>
                                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    2
                                    </a>
                                    <a href="#" className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    3
                                    </a>
                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    ...
                                    </span>
                                    <a href="#" className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    8
                                    </a>
                                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    9
                                    </a>
                                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    10
                                    </a>
                                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    </a>
                                </nav>
                                <div className="py-4 hidden md:block">
                                    <a href="#" className="tracking-widest text-center shadow bg-white hover:bg-gray-100 focus:shadow-outline focus:outline-none text-gray-600 text-xs py-3 px-10 rounded">Next</a>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TableCard