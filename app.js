const express = require('express')
const app = express();
const bills = require('./routes/bills')
const port = 5000

// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())
// base route
app.use('/api/v1/bills', bills)

// routes zxx
app.get('/home', (req, res) => {
    res.send('Home')
})

app.listen(port, console.log(`Server Listening on port ${port}`))