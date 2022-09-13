import React, {useEffect} from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function Contacts() {

    //TODO: Make API on backend to search for user in whole database
    const { contacts, getContacts } = useContacts()
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
             <h1>Contacts</h1>
            <ListGroup variant="flush">
                {contacts.map(contact => (
                    <ListGroup.Item key={contact._id}>
                        {contact.username}
                    </ListGroup.Item>
                ))}
            </ListGroup>
         </div> 
    )
}