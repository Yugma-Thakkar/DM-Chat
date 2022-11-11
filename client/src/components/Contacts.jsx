import React, {useEffect} from 'react'
// import axios from 'axios'
import network from '../utils/network'
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

    async function handleRoomCreation(index) {
        console.log(axiosJWT);
        const response = await network.axiosJWT({
            method: 'POST',
            url: 'http://localhost:4000/room/createRoom',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: {
                roomName: `${localStorage.getItem('DM-Chat-username').replaceAll('"', '')}-${contacts[index].username}`,
                roomDescription: `DM-Chat room: ${localStorage.getItem('DM-Chat-username').replaceAll('"', '')} - ${contacts[index].username}`,
                isGroup: false,
                roomCreater: localStorage.getItem('DM-Chat-username').replaceAll('"', ''),
                users: [localStorage.getItem('DM-Chat-username').replaceAll('"', ''), contacts[index].username] 
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
                            handleRoomCreation(index)
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