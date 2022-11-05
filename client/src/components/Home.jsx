import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import useLocalStorage from '../hooks/useLocalStorage'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Sidebar from './Sidebar'
import Chatbar from './Chatbar'
// import '../css/style.css'

export default function Home() {
    // const [message, setMessage] = useLocalStorage('message')
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken || accessToken === 'undefined') {
            navigate('/login')
        }
    }, [])

    const refreshTokens = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:4000/user/refresh',
                data: {
                    token: localStorage.getItem('refreshToken')
                }
            })
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            // console.log(response)
            return response
        }
        catch (error) {
            console.error(error.message)
        }
    }

    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date()
            const decodedToken = jwt_decode(localStorage.getItem('accessToken'))
            // console.log(`${decodedToken.exp * 1000 - currentDate.getTime()}`)
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshTokens()
                // localStorage.setItem('accessToken', data.accessToken)
                // localStorage.setItem('refreshToken', data.refreshToken)
                config.headers['authorization'] = `Bearer ${data.data.accessToken}`
            }
            else config.headers['authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
            return config
        }, (error) => {
            console.error(error.message)
            return Promise.reject(error)
        }
    )

    axiosJWT.interceptors.response.use(
        async (response) => {
            return response
        },
        async (error) => {
            try {
                if (error.response.status === 401) {
                    const data = await refreshTokens()
                    error.config.headers['authorization'] = `Bearer ${data.data.accessToken}`
                    return axiosJWT(error.config)
                }
            } catch (error) {
                console.error(error.message)
                return Promise.reject(error)   
            }
        }
    )

    return (
        <div className='d-flex' style={{ height: '100vh' }}>
            <ContactsProvider> 
                <Sidebar username={localStorage.getItem('DM-Chat-username').replaceAll('"', '')} />
                {/* <Sidebar username={localStorage.getItem('DM-Chat-username')} /> */}
                <Chatbar />
            </ContactsProvider>
        </div>
    )
}