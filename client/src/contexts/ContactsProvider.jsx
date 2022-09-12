import axios from 'axios'
import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider( {children} ) {

    const [contacts, setContacts] = useLocalStorage('contacts', [])

    const response = axios({
        method: 'GET',
        url: 'http://localhost:4000/user/users',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    console.log(response.data)

    function createContact(name) {
        setContacts(prevContacts => {
            return [...prevContacts, {name}]
        })
    }

    return (
        <ContactsContext.Provider value={{ contacts, createContact }}> 
            {children}
        </ContactsContext.Provider>
    )
}