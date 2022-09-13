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
// import '../css/style.css'

export default function Home() {
    const [message, setMessage] = useLocalStorage('message')
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

    async function userLogout(event) {
        event.preventDefault()
        const response = await axiosJWT({
            method: 'POST',
            url: 'http://localhost:4000/user/logout',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: {
                token: localStorage.getItem('refreshToken')
            }
        })
        console.log(response)
        if (response.data.status === 'OK') {
            localStorage.removeItem('accessToken')
            navigate('/login')
        }
    }

    async function sendMessage(event) {
        event.preventDefault()
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:4000/chat/',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: {
                message: localStorage.getItem('DM-Chat-message'),
                sender: localStorage.getItem('DM-Chat-username')
            }
        })
        console.log(response.data.message)
    }

    return (
        <div className='d-flex' style={{ height: '100vh' }}>
            <ContactsProvider> 
                <Sidebar username={localStorage.getItem('DM-Chat-username').replaceAll('"', '')} />
            </ContactsProvider>

            <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    {message}
                </div>
                {message}
                <Form className='w-100' onSubmit={sendMessage}>
                    <Form.Group className="mb-3" controlId="formBasicMessage">
                        <Form.Label>Enter Message</Form.Label>
                        <Form.Control
                            value={message}
                            type="text"
                            placeholder="Message"
                            onChange={(event) => setMessage(event.target.value)}
                            autoComplete="off"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={sendMessage} className="me-2">
                        Send
                    </Button>
                    <Button variant="secondary" type="submit" onClick={userLogout}>
                        Logout
                    </Button>
                </Form>
            </Container>

        </div>
    )
}