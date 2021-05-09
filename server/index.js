const express = require('express');
const app = express();

// GET
app.get("/", (req, res) => {
    res.send('Hello World!!!');
})

// POST

// PUT

// DELETE

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})