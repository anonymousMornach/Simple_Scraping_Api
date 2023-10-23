const express = require("express");
const crawler = require("./middleware/crawler");
require("dotenv").config();
//require("./database/mongodb");
//require("./database/redis");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/", crawler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
