const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const contactRoute = require('./api/routes/contact')
const userRoute = require('./api/routes/user')

//Connect MongoDB with our project, main db connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/contacts-db');
const db = mongoose.connection;

//create express connection
const app = express()       

//Checks the status of a requests (only dev)
app.use(morgan('dev'))      

//Ability to post data from other URLs (production)
app.use(cors())             

//Make bodyParser availbale to the models, needs only once
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Get the port from server, or simply use 3000 for dev server
const PORT = process.env.PORT || 3000


//Create Route for Contacts on /api/contacts endpoint
app.use('/api/contacts', contactRoute)
app.use('/api/users', userRoute)

//Make connection with our port
app.listen(PORT)