const express = require('express');
const path = require("path");
const axios = require('axios');
const apicache = require("apicache");

const app = express();

let cache = apicache.middleware
const onlyStatus200 = (req, res) => res.statusCode === 200


//Set static folder
app.use(cache('2 minutes', onlyStatus200))
app.use(express.static("client/dist"));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.get("/covid_report", (req, res) => {
    axios.get("https://www.mohfw.gov.in/data/datanew.json").then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
    }
    )
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = { app };


// future feature: server-side rendering and caching