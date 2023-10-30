const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/authRoute");

const app = express();

dotenv.config();

mongoose
  .connect(process.env.DB_Connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to database"));

app.use(bodyParser.json());
app.use("/", router);

app.listen(3000, () => console.log("Server running on port 3000"));
