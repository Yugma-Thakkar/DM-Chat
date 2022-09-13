import axios from 'axios'
import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider( {children} ) {

    const [contacts, setContacts] = useState([])
    
    async function getContacts() {
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

    async function createContact(name) {
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

            setContacts(prevContacts => {
                return [...prevContacts, response.data]
            })

            // return response
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <ContactsContext.Provider value={{ contacts, createContact, getContacts }}> 
            {children}
        </ContactsContext.Provider>
    )
}