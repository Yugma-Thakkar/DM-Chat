import React, {useEffect} from 'react'
import axios from 'axios'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Contacts() {

    //TODO: Make API on backend to search for user in whole database
    const { contacts, selectedContactIndex, getContacts, selectContact } = useContacts()
    // console.log(contacts)

    //TODO: Make API on backend to search our contacts. Create new mongoDB collection for contacts
    const loadContactsConst = () => {
        useEffect(() => {
            getContacts()
        }, [])
    }
    //TODO: Display contacts on sidebar
    loadContactsConst()

    async function handleRoomCreation() {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:4000/room/createRoom',
            data: {
                roomName: `${localStorage.getItem('DM-Chat-username').replaceAll('"', '')}-${contacts[selectedContactIndex].username}`,
                roomDescription: `DM-Chat room: ${localStorage.getItem('DM-Chat-username').replaceAll('"', '')} - ${contacts[selectedContactIndex].username}`,
                isGroup: false,
                roomCreater: localStorage.getItem('DM-Chat-username').replaceAll('"', ''),
                users: [localStorage.getItem('DM-Chat-username').replaceAll('"', ''), contacts[selectedContactIndex].username] 
            }
        })
    }

    return (
        <div>
             {/* <h1>Your Friends</h1> */}
            <ListGroup variant="flush">
                {contacts.map((contact, index) => (
                    <ListGroup.Item 
                        key={index}
                        action
                        onClick = {() => {
                            selectContact(index)
                            handleRoomCreation()
                        }}
                        active={index === selectedContactIndex}
                    >
                        {contact.username}
                    </ListGroup.Item>
                ))}
            </ListGroup>
         </div> 
    )
}