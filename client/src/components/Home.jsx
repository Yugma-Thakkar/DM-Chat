import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import useLocalStorage from '../hooks/useLocalStorage'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import '../css/style.css'

export default function Home() {
    const [message, setMessage] = useLocalStorage('message')
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if(!token) {
            localStorage.removeItem('accessToken')
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
            return response.data
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
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshTokens()
                config.headers['authorization'] = `Bearer ${data.accessToken}`

            }
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
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: {
                message: message
            }
        })
        console.log(response.data.message)
    }

    return (
        <Container className="align-items-center d-flex flex-column" style= {{ height: '100vh' }}>
            {/* <div className="w-100" style={{ maxWidth: '400px' }}> 
                {message}
            </div> */}
            {localStorage.getItem('DM-Chat-username').replaceAll('"', '')}
            {message}
            <Form className='w-100' onSubmit={sendMessage}>
                <Form.Group className="mb-3" controlId="formBasicMessage"> 
                    <Form.Label>Enter Message</Form.Label>
                    <Form.Control 
                        value = {message}
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
    )
}