const express = require('express');
const app =express()
const itemrouter = require("./api.js")
const bodyParser = require('body-parser');
const cors = require("cors")

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/interface",itemrouter);

app.get("/",(req,res)=>{
    res.json("hitman")
})

app.listen(8181);