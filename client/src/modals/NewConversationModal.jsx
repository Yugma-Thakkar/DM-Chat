import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function NewConversationModal({ closeModal }) {

    const [roomName, setroomName] = useState('')
    const [roomDescription, setroomDescription] = useState('')
    const [isGroup, setisGroup] = useState(true)
    const [roomCreater, setroomCreater] = useState(localStorage.getItem('DM-Chat-username').replaceAll('"', ''))
    const [users, setusers] = useState([])
    const { createConversation, getConversations } = useConversations()

    async function handleSubmit(event) {
        event.preventDefault()
        
        try {
            
        } catch (error) {
            console.error(error.message)
            alert('Room creation unsuccessful')
        }
        // createConversation(recipient)
        closeModal()
    }

    return (

        <div className="">
            <Modal.Header closeButton>
                <Modal.Title>New Conversation</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Form onSubmit={handleSubmit}>
                    <Form.Group> 
                        <Form.Label>Room Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            value={roomName} 
                            onChange={e => setRecipient(e.target.value)}
                            required 
                        />
                        <Form.Label>Room Description</Form.Label>
                        <Form.Control
                            as = 'textarea'
                            value = {roomDescription}
                            onChange={e => setroomDescription(e.target.value)}
                        />
                        <Form.Label>Users</Form.Label>
                        
                    </Form.Group> <br />
                    <Button type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </div>
    )
}