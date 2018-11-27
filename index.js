const fs = require("fs");
const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("Hallo wereld!"));
app.get('/api/getGrades', require(path.join(__dirname, "./routes/api/getGrades")));
app.get('/api/calculate', require(path.join(__dirname, "./routes/api/calculate")));

app.listen(port, () => console.log(`Listening on port ${port}!`));