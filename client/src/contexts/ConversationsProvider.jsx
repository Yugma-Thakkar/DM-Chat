import axios from 'axios'
import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ConversationsContext = React.createContext()

export function useConversations() {
    return useContext(ConversationsContext)
}

export function ConversationsProvider( {children} ) {

    const [conversations, setConversations] = useState([])

    async function getConversations() {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:4000/room/getRooms',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            console.log(response)

            setConversations(response.data.data)
        } catch (error) {
            console.error(error.message)
        }
    }

    async function createConversation(name) {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:4000/room/createRoom',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                data: {
                    name: name
                }
            })

            console.log(response)

            // return response
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <ConversationsContext.Provider value={{ conversations, createConversation, getConversations }}>
            {children}
        </ConversationsContext.Provider>
    )
}