const FBLoadingSkeleton = () => {

    return (
        <>
            <td className="px-6 py-2">
                <div className="animate-pulse">
                    <div className="h-3 bg-gray-300 rounded-sm w-48"></div>
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="animate-pulse">
                    <div className="h-3 bg-gray-300 rounded-sm w-48"></div>
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="animate-pulse">
                    <div className="h-3 bg-gray-300 rounded-sm w-96 md:w-40 lg:w-44 xl:w-72"></div>
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="animate-pulse">
                    <div className="h-3 bg-gray-300 rounded-sm w-96 md:w-40 lg:w-44 xl:w-72"></div>
                </div>
            </td>
        </>
    )
}
export default FBLoadingSkeleton