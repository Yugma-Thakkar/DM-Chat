import React, { useState } from 'react'
import { Tab, Nav } from 'react-bootstrap'

export default function Sidebar({username}) {
    const CONVERSATIONS_KEY = 'conversations'
    const CONTACTS_KEY = 'contacts'
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)

    return (
        <div className="d-flex flex-column" style={{ width: '250px' }}>
            {username}
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item> 
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Tab.Container>
        </div>
    )
}