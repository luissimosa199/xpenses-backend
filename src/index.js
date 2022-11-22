const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const v1BillRouter = require("./v1/routes/billRoutes");

// cors
app.use(cors());
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());
// base url
app.use("/api/v1/bills", v1BillRouter);
// connect to db
mongoose
  .connect(MONGO_URI)
  .then(() => {

      app.listen(PORT, () => {
        console.log(`API is listening on port ${PORT}`);
      });


  })
  .catch((error) => {
    console.log(error);
  });

