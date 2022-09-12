import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function NewContactModal({ closeModal }) {

    const [name, setName] = useState('')
    const { createContact } = useContacts()

    async function handleSubmit(event) {
        event.preventDefault()
        
        createContact(name)
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
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type='text' 
                                value = {name} 
                                onChange={e => setName(e.target.value)} 
                                required 
                            />
                        </Form.Group> <br />
                        <Button type='submit'>Create</Button>
                    </Form>
                </Modal.Body>
            </>
    )
}