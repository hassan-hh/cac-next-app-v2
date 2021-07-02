const LoadingScreen = () => {

    return (
        <div className="w-96 h-96 flex items-center justify-center">
            <img alt="" className="w-20 h-20 animate-spin" src="/loading-g.svg" />
        </div>
        // <div className="animate-pulse w-80 sm:w-96 px-5">
        //     <div className="h-4 bg-gray-300 rounded-md w-52 mx-auto my-6"></div>
        //     <div className="h-80 bg-gray-300 rounded-md w-full mx-auto"></div>
        //     <div className="h-20 bg-gray-300 rounded-md w-full mx-auto my-2"></div>
        //     <div className="h-20 bg-gray-300 rounded-md w-full mx-auto my-2"></div>
        // </div>
    )
}
export default LoadingScreen