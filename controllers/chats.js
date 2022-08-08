const express = require('express')
const app = express()
const mongoose = require('mongoose')


app.use(express.json())
app.use(express.urlencoded({extended: true}))

exports.chat = async (req, res) => {
    res.render('chat')
}