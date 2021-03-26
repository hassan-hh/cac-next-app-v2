
const StatusCard = ({title, btnName}) => {

    return (  
            <div className="w-full shadow-lg rounded-lg overflow-hidden border-t-4 border-green-400">
                <div className="bg-white px-4 py-4">
                    <h1 className="text-gray-700 text-lg tracking-wide">{title}</h1>
                </div>
                <div className="bg-white px-4 py-6 border-t border-b border-gray-200">
                    <p className="text-gray-500 text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </p>
                </div>
                <div className="px-4 pt-4 pb-6 bg-gray-50">
                    <a href="#" className="tracking-widest text-center shadow bg-white hover:bg-gray-100 focus:shadow-outline focus:outline-none text-gray-600 text-xs py-3 px-4 rounded">{btnName}</a>
                </div>
            </div>
        )
    }
export default StatusCard