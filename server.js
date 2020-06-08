const express = require("express");
const app = express();
const db = require('./models');
const userHandler = require('./handlers/users')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get("/api/test", (req, res) => {
    const testObject = [
        {id: 1, name: "test1"},
        {id: 2, name: "test2"}
    ];
    res.json(testObject);
});

app.post("/form", userHandler);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));