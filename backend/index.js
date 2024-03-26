// Connect to mongodb
const connectToMongo=require('./db');
connectToMongo();


// below copied from expressjs to initialize express
const express = require('express');
const fetchUser = require('./middleware/fetchUser');
const port = 5000

var cors = require('cors')
var app = express()

app.use(cors())


// middleware setup 
app.use(express.json())
app.use(fetchUser)


// Defining Routes
app.use('/api/auth/',require("./routes/auth"));
app.use('/api/notes',require("./routes/notes"));


// Starts express server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})