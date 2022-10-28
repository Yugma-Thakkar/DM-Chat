import React from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Chatbar() {

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
                message: localStorage.getItem('DM-Chat-message').replaceAll('"', ''),
                username: localStorage.getItem('DM-Chat-username').replaceAll('"', '')
            }
        })
        console.log(response.data.message)
    }

  return (
    <div> 
        <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
                {/* <div className="w-100" style={{ maxWidth: '400px' }}>
                    {message}
                </div> */}
                {/* {message} */}
                <Form className='w-100' onSubmit={sendMessage}>
                    <Form.Group className="mb-3" controlId="formBasicMessage">
                        <Form.Label>Enter Message</Form.Label>
                        <Form.Control
                            value={message}
                            type="textarea"
                            placeholder="Message"
                            onChange={(event) => setMessage(event.target.value)}
                            autoComplete="off"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={sendMessage} className="me-2">
                        Send
                    </Button>
                </Form>
            </Container>
    </div>
  )
}
