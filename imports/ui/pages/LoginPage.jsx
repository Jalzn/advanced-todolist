import React from 'react'
import { LoginForm } from '../components/LoginForm'
import { useUser } from '../hooks/useUser'
import { Navigate } from 'react-router-dom'

export const LoginPage = () => {
    const user = useUser() 

    if(user) {
        return <Navigate to='/'/>
    }

    return (
        <LoginForm/>
    )
}