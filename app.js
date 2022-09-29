const express = require('express');
const cors = require('cors');
const app = express();
const bills = require('./routes/bills')
const port = 5000

// cors
app.use(cors())
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())
// base route
app.use('/api/v1/bills', bills)

app.listen(port, console.log(`Server Listening on port ${port}`))