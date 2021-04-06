import Loader from "react-loader-spinner";

const LoadingSpinner = () => {

    return (
        <div className="h-full flex items-center justify-center"> 
            {/* <h1>Loading Data ... </h1> */}
            {/* https://www.npmjs.com/package/react-loader-spinner */}
            <Loader
                type="Oval"
                color="#2bbc9c"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        </div>
    )
}
export default LoadingSpinner