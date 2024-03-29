import  { React, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
// import {io} from 'socket.io'


export default function App() {

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    )
}