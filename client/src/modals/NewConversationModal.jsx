import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default function NewConversationModal({ closeModal }) {

    const [recipient, setRecipient] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        
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
                        <Form.Label>Recipient</Form.Label>
                        <Form.Control 
                            type='text' 
                            value={recipient} 
                            onChange={e => setRecipient(e.target.value)}
                            required 
                        />
                    </Form.Group> <br />
                    <Button type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </div>
    )
}