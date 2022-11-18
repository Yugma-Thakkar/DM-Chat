import React, {useState} from 'react'
import axios from 'axios'
import { Form, Button, InputGroup, Container } from 'react-bootstrap'
import useLocalStorage from '../hooks/useLocalStorage'
import Logout from './Logout'
import { useContacts } from '../contexts/ContactsProvider'

export default function Chatbar() {

    const { contacts, selectedContactIndex } = useContacts()
    const [message, setMessage] = useState('')

    async function sendMessage(event) {
        event.preventDefault()
        // if (localStorage.getItem('DM-Chat-message').isEmpty()) {
        //     alert('Please enter a valid message')
        // }
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:4000/chat/',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: {
                message: message,
                username: contacts[selectedContactIndex].username
            }
        })
        console.log(response.data.message)
    }

    

  return (
    <div> 
        {/* <Container> */}
                {/* <div className="w-100" style={{ maxWidth: '400px' }}>
                    {message}
                </div> */}
                {/* {message} */}̦
                <Form onSubmit={sendMessage}>
                    <Form.Group className="m-2" controlId="formBasicMessage">
                        <InputGroup>
                            <Form.Control
                                as="textarea"
                                value={message}
                                type="text"
                                placeholder={contacts[selectedContactIndex] ? "Send Message to " + contacts[selectedContactIndex].username : ""}
                                onChange={(event) => setMessage(event.target.value)}
                                autoComplete="off"
                                style={{ height: '75px', resize: 'none', overflow: 'hidden', overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', hyphens: 'auto', whiteSpace: 'pre-wrap'}}
                                required
                            />
                            <Button variant="primary" type="submit" onClick={sendMessage} className="me-2">
                                Send
                            </Button>
                        </InputGroup>
                    </Form.Group>
                </Form> 
            {/* </Container> */}
    </div>
  )
}
