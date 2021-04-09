import { useState, useEffect, createContext } from 'react'
export const StoreContext = createContext()

export const StoreProvider = ({ children }) => {

        const [store, setStore] = useState('')

    return (
        <>
            <StoreContext.Provider value={{ }}>
                {children}
            </StoreContext.Provider>
        </>
    )
}