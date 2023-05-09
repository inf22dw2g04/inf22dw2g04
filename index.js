const express = require("express");
const app = express();
const cors = require("cors");
const db = require ("./models");

app.use(express.json());


app.listen(8080, ()=> {
    console.log(`app running on localhost:${8080}`);
    });