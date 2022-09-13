import React, {useEffect} from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function Contacts() {

    const { contacts, getContacts } = useContacts()
    // console.log(contacts)

    const loadContactsConst = () => {
        useEffect(() => {
            async function loadContacts() {
                const response = await getContacts()
                // console.log(response.data.data)
            }

            loadContacts()
        }, [])
    }

    loadContactsConst()

    return (
        <div>
             <h1>Contacts</h1>
            {/* <ListGroup variant="flush">
                {contacts.map(contact => (
                    <ListGroup.Item key={contact._id}>
                        {contact.username}
                    </ListGroup.Item>
                ))}
            </ListGroup> */}
         </div> 
    )
}