const fs = require("fs")
express = require('express'),
path = require("path"),
bodyParser = require("body-parser"),
config = require(path.join(__dirname,"config")),
app = express(),
port = 3000;

app.use(bodyParser.json());

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, "/front/views"))

app.get('/', (req, res) => {
    res.render('index')
})

app.post("/login", require(path.join(__dirname, "/routes/login")));

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))