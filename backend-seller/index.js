const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors  = require('cors');
require("dotenv").config();

const port = process.env.PORT || 8080
const mongo_url = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(mongo_url, {});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database Connection Successful");
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})