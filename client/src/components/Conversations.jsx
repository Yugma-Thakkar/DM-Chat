import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Conversations() {
    const { conversations, getConversations } = useConversations()
    console.log(conversations)

    const loadConversationsConst = () => {
        useEffect(() => {
            getConversations()
        }, [])
    }
    loadConversationsConst()

    return (
        <div>
             {/* <h1>Your Groups</h1> */}
            <ListGroup variant="flush">
                {conversations.map(conversation => (
                    <ListGroup.Item key={conversation._id}>
                        {conversation.username}
                    </ListGroup.Item>
                ))}
            </ListGroup>
         </div>
    )
}