import React, { useState } from "react"

export default function Test() {

    const [name, setName] = useState('')

    function display(event) {
        event.preventDefault()
        console.log(name)
    }

    return (
        <form onSubmit={display}>
            <input type="text" name="firstName" onChange={(e) => setName(e.target.value)} placeholder='First Name' />
            <input type="submit" value="Send" />
        </form>
    )
}