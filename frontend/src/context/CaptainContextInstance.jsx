import { createContext, useContext } from 'react'

export const CaptainDataContext = createContext(null)

export const useCaptain = () => {
    const context = useContext(CaptainDataContext);
    if (!context) {
        throw new Error('useCaptain must be used within a CaptainProvider');
    }
    return context;
};
