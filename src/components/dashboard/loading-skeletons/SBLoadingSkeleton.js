const SBLoadingSkeleton = () => {

    return (
         <div className="animate-pulse w-96 px-5">
            <div className="h-4 bg-gray-300 rounded-md w-52 mx-auto my-6"></div>
            <div className="h-80 bg-gray-300 rounded-md w-full mx-auto"></div>
            <div className="h-20 bg-gray-300 rounded-md w-full mx-auto my-2"></div>
            <div className="h-20 bg-gray-300 rounded-md w-full mx-auto my-2"></div>
        </div>
    )
}
export default SBLoadingSkeleton