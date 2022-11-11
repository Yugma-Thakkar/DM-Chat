import React from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'

export default function logout() {
    const navigate = useNavigate()

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

    return (
        <div className="">
            <Button className='rounded-2' variant="secondary" type="submit" onClick={userLogout}>
                Logout
            </Button>
        </div>   
    )
}