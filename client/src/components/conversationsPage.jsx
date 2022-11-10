import React from 'react';
import Chatbar from './Chatbar';

export default function conversationsPage() {
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 flex-auto">
                <Chatbar />
            </div>
        </div>
    )
}