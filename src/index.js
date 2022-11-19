const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const v1BillRouter = require("./v1/routes/billRoutes");

// cors
app.use(cors())
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())
// base url
app.use("/api/v1/bills", v1BillRouter);

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
})