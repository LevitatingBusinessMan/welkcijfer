const fs = require("fs")
const express = require('express')
const path = require("path")
const app = express()
const port = 3000;

app.use('/public',express.static(path.join(__dirname,"public")))

app.set('views', path.join(__dirname, "/views"))
app.set('view engine', 'jsx')

app.engine('jsx', require('express-react-views').createEngine())

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/api/getGrades', require(path.join(__dirname, "./routes/api/getGrades")));
app.get('/api/calculate', require(path.join(__dirname, "./routes/api/calculate")));

app.listen(port, () => console.log(`Listening on port ${port}!`))