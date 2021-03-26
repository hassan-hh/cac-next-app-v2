
const ServicesCard = ({error, service}) => {

    return (  
            <div className="w-full shadow-lg rounded-lg overflow-hidden border-t-4 border-red-600">
                <div className="bg-white px-4 py-4">
                    <h2 className="text-gray-700 text-3xl pb-2">{error}</h2>
                    <p className="text-gray-500 text-sm">{service}</p>
                </div>
            </div>
        )
    }
export default ServicesCard