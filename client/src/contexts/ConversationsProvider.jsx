import axios from 'axios'
import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ConversationsContext = React.createContext()

export function useContacts() {
    return useContext(ConversationsContext)
}

export function ConversationsProvider( {children} ) {

    const [conversations, setConversations] = useState([])
    
    async function getConversations() {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:4000/user/users',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            // console.log(response)
            
            setContacts(response.data.data)
        } catch (error) {
            console.error(error.message)
        }
    }

    async function createConversation(name) {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:4000/user/find',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: name
                }
            })

            console.log(response)

            // setContacts(prevContacts => {
            //     return [...prevContacts, response.data]
            // })

            // return response
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <ConversationsContext.Provider value={{ coversations, createConversation, getConversations }}> 
            {children}
        </ConversationsContext.Provider>
    )
}