import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Container, FloatingLabel } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function Register() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const navigate = useNavigate()
    
    async function reRouteLogin(event) {
        event.preventDefault()
        navigate("/login")
    }

    async function userRegister(event) {
        event.preventDefault()
        const response = await axios({
            method: "post",
            url: `http://localhost:4000/register`,
            data: {
                email: email,
                username: username,
                password: password,
                repassword: repassword
            }
        })
        console.log(response.data)
        if (response.data.status === "OK") {
            reRouteLogin(event)
        }
        else {
            alert("User registration failed! Please try again.")
        }
    }

    return(
        <Container className="align-items-center d-flex" style= {{ height: '85vh' }}>
             <h1>
                Register
            </h1> <br />
            <Form className="w-100" onSubmit={userRegister}> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <FloatingLabel
                        controlId="floatingInputEmail"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            value={email}
                            type="email"
                            placeholder="Enter Email ID"
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete = "off"
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername"> 
                    {/* <Form.Label>Username</Form.Label> */}
                    <FloatingLabel
                        controlId="floatingInputUsername"
                        label="Username"
                        className="mb-3"
                    >
                        <Form.Control
                            value={username}
                            type="text"
                            placeholder="Enter Username"
                            onChange={(event) => setUsername(event.target.value)}
                            autoComplete = "off"
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <FloatingLabel
                        controlId="floatingInputPassword"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control
                            value={password}
                            type="password"
                            placeholder="Enter Password"
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete = "off"
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    {/* <Form.Label>Re-Enter Password</Form.Label> */}
                    <FloatingLabel
                        controlId="floatingInputRePassword"
                        label="Re-Enter Password"
                        className="mb-3"
                    >
                        <Form.Control
                            value={repassword}
                            type="password"
                            placeholder="Re-Enter Password"
                            onChange={(event) => setRepassword(event.target.value)}
                            autoComplete = "off"
                            required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button> <br /> <br /> <br />
                <Button variant="secondary" onClick={reRouteLogin}>
                    Login
                </Button>
            </Form>
        </Container>
    )
}