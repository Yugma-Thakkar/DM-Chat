import React, {useEffect} from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Contacts() {

    //TODO: Make API on backend to search for user in whole database
    const { contacts, getContacts, selectContact } = useContacts()
    // console.log(contacts)

    //TODO: Make API on backend to search our contacts. Create new mongoDB collection for contacts
    const loadContactsConst = () => {
        useEffect(() => {
            getContacts()
        }, [])
    }
    
    //TODO: Display contacts on sidebar
    loadContactsConst()

    return (
        <div>
             {/* <h1>Your Friends</h1> */}
            <ListGroup variant="flush">
                {contacts.map((contact, index) => (
                    <ListGroup.Item 
                        key={index}
                        action
                        onClick = {() => selectContact(index)}
                        active={contact.selected}
                    >
                        {contact.username}
                    </ListGroup.Item>
                ))}
            </ListGroup>
         </div> 
    )
}