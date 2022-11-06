import axios from 'axios'
import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ConversationsContext = React.createContext()

export function useConversations() {
    return useContext(ConversationsContext)
}

export function ConversationsProvider( {children} ) {

    const [conversations, setConversations] = useState([])
    const [selectedConversationIndex, setSelectedConversationIndex] = useLocalStorage('selectedConversationIndex', 0)

    async function getConversations() {
        try {
            const response = axios({
                method: 'POST',
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

    async function createConversation( roomName, roomDescription, isGroup, roomCreater, users ) {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:4000/room/createRoom',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                data: {
                    roomName: roomName,
                    roomDescription: roomDescription,
                    isGroup: isGroup,
                    roomCreater: roomCreater,
                    users: users
                }
            })
            console.log(response)
        } catch (error) {
            console.error(error.message)
        }
    }

    async function selectConversationIndex(id) {
        setSelectedConversationIndex(id)
    }

    return (
        <ConversationsContext.Provider value={{ conversations, createConversation, getConversations, selectConversationIndex }}>
            {children}
        </ConversationsContext.Provider>
    )
}