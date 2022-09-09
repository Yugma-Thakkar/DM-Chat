import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import {io} from 'socket.io-client'
import './css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'


// const socket = io('http://localhost:4000')
// socket.on('connect', () => {
//     console.log('Connected to server')
// })

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)