import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContextInstance.jsx'
import { useNavigate } from 'react-router-dom'

const CaptainProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
            return
        }

        const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:4000'

        axios.get(`${baseUrl}/api/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setCaptain(response.data)
            }
        }).catch((err) => {
            console.log(err)
            navigate('/captain-login')
        }).finally(() => {
            setIsLoading(false)
        })
    }, [token, navigate, setCaptain])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper
