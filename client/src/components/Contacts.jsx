import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function Contacts() {

    const { contacts, getContacts } = useContacts()

    const response = getContacts().then(response => {return response})
    console.log(response)

    return (
        // <div>
            // {/* <h1>Contacts</h1> */}
            <ListGroup variant="flush">
                {contacts.map(contact => (
                    <ListGroup.Item>
                        {contact.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        // {/* </div> */}
    )
}