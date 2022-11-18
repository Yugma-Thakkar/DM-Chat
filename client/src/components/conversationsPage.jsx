import React, { useEffect } from 'react'
import Chatbar from './Chatbar'
import axios from 'axios'

export default function conversationsPage() {

    //GET CONVERSATION
    async function getConversation() {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:4000/chat/display',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data)
        } catch (error) {
            console.error(error.message)
        }
    }

    // useEffect(() => {
    //     getConversation()
    // }, [])
    getConversation()

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 flex-auto overflow-auto">

            </div>
            <Chatbar />
        </div>
    )
}