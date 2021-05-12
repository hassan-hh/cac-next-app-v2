// import Loader from "react-loader-spinner";

const LoadingSpinner = () => {

    return (
        <div className="w-96 h-96 flex items-center justify-center"> 
            {/* <h1>Loading Data ... </h1> */}
            {/* https://www.npmjs.com/package/react-loader-spinner */}
            {/* <Loader
                type="Oval"
                color="#2bbc9c"
                height={100}
                width={100}
                timeout={90000} //3 secs
            /> */}
            <img alt="" className="w-30 h-30 animate-spin" src="/loading.svg"/>
            {/* <span class="flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span> */}
        </div>
    )
}
export default LoadingSpinner