import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Groups from './Conversations'
import Friends from './Contacts'
import NewConversationModal from '../modals/NewConversationModal'
import NewContactModal from '../modals/NewContactModal'
import Logout from './Logout'
import useLocalStorage from '../hooks/useLocalStorage'

const GROUPS_KEY = 'groups'
const FRIENDS_KEY = 'friends'

export default function Sidebar({username}) {

    const [activeKey, setActiveKey] = useState(FRIENDS_KEY)
    const [modalOpen, setModalOpen] = useState(false)
    const groupsOpen = activeKey === GROUPS_KEY


    function closeModal() {
        setModalOpen(false)
    }

    return (
        <div className="d-flex flex-column" style={{ width: '265px' }}>
            {/* {username} */}
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant='tabs' className='justify-content-center'>
                    <Nav.Item>
                        <Nav.Link eventKey={FRIENDS_KEY}>Friends</Nav.Link>
                    </Nav.Item>
                    <Nav.Item> 
                        <Nav.Link eventKey={GROUPS_KEY}>Groups</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className='border-end overflow-auto flex-grow-1'>
                    <Tab.Pane eventKey={GROUPS_KEY}> 
                        <Groups />
                    </Tab.Pane>
                    <Tab.Pane eventKey={FRIENDS_KEY}> 
                        <Friends />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-end small">
                    Username: <span className="text-muted">{username}</span>
                </div>
                <Button className='rounded-0' onClick={() => setModalOpen(true)}>
                    New {activeKey === GROUPS_KEY ? 'Group' : 'Friend'}
                </Button>
                <Logout />
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {groupsOpen ?
                    <NewConversationModal closeModal={closeModal} /> :
                    <NewContactModal closeModal={closeModal} />
                }   
            </Modal>
        </div>
    )
}