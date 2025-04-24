import React from 'react'
import {Meteor} from "meteor/meteor"
import { Navigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { Button } from '@mui/material'

export const HomePage = () => {
    const user = useUser()

    if(!user) {
        return <Navigate to='/login'/>
    }

    const logout = () => {
        Meteor.logout()
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className='flex flex-col gap-4'>
                <h2 className='text-xl text-gray-700'>Hello {user.username}</h2>
                <Button onClick={logout}>Sair</Button>
            </div>
        </div>
    )
}