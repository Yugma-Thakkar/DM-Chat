import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import axios from 'axios'

export default function NewContactModal({ closeModal }) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const { createContact, getContacts } = useContacts()


    async function handleSubmit(event) {
        event.preventDefault()
        // console.log(name, description, localStorage.getItem('DM-Chat-username'), localStorage.getItem('DM-Chat-username').replaceAll('"', ''))

        try {

            const nam = await axios({
                method: 'post',
                url: 'http://localhost:4000/user/find',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: name
                }
            })
            // console.log(nam.data.data.username.replaceAll('"', ''))
            if (nam) {
                if (nam.data.data.username.replaceAll('"', '') === localStorage.getItem('DM-Chat-username').replaceAll('"', '')) {
                    alert('You cannot add yourself to a group')
                }
                else {
                    const response = await axios({
                        method: 'POST',
                        url: 'http://localhost:4000/room/createRoom',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        data: {
                            roomName: `${name}-${localStorage.getItem('DM-Chat-username').replaceAll('"', '')}`,
                            roomDescription: description,
                            isGroup: false,
                            roomCreater: localStorage.getItem('DM-Chat-username').replaceAll('"', ''),
                            users: [localStorage.getItem('DM-Chat-username').replaceAll('"', ''), name]
                        }
                    })
                    
                    console.log(response.data)
                }
            }
            // else if (!nam) {
            //     alert('User not found')
            // }
        }
        catch (error) {
            alert('User not found')
        }

        // createContact(name)
        closeModal()
    }

    return (
            <>
                <Modal.Header closeButton> 
                    <Modal.Title>New Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}> 
                        <Form.Group>
                            <Form.Label>Friend's Name</Form.Label>
                            <Form.Control 
                                type='text' 
                                value = {name} 
                                onChange={e => setName(e.target.value)} 
                                required 
                            />
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as = 'textarea'
                                value = {description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group> <br />
                        <Button type='submit'>Create</Button>
                    </Form>
                </Modal.Body>
            </>
    )
}