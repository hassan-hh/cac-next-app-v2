import { useState, useEffect } from 'react'

const NotAuthScreen = () => {

    const [counter, setCounter] = useState(3)

    useEffect(() => {
        const x = setTimeout(() => { 
            setCounter(counter - 1)
            if (counter === 0) {
                setCounter(0)
            }
        }, 1000)
        return () => { clearTimeout(x); }
    }, [counter])

    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <h1 className="text-white text-3xl font-semibold">CATS</h1>
            <p className="text-white text-md font-semibold">You will be redirecred to login page in {counter}</p>
        </div>
    )
}
export default NotAuthScreen