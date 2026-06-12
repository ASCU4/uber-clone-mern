import { useMemo, useState } from 'react'
import { CaptainDataContext } from './CaptainContextInstance.jsx'

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const value = useMemo(() => ({
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain: setCaptain,
    }), [captain, isLoading, error])

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContext
