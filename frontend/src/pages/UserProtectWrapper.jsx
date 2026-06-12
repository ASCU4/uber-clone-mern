import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContextInstance'

const UserProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()                            
    const { setUser } = useContext(UserContext) ?? {}
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:4000'

        axios.get(`${baseUrl}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200 && typeof setUser === 'function') {
                setUser(response.data)
            }
        }).catch(() => {
            localStorage.removeItem('token')
            navigate('/login')
        }).finally(() => {
            setIsLoading(false)
        })
    }, [token, navigate, setUser])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
        {children}
        </>
    )
}

export default UserProtectWrapper
