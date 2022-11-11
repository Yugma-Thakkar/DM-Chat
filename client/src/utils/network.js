import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom'

const refreshTokens = async () => {
    // const navigate = useNavigate()
    try {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:4000/user/refresh',
            data: {
                token: localStorage.getItem('refreshToken')
            }
        })
        if (response.data.accessToken === undefined) {
            // redirect to login page
            return location.href = "/login";
        }
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
window.axiosJWT = axiosJWT;

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
            console.log("Error", error);
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

export default {axiosJWT};
// exports.axiosJWT = axiosJWT;