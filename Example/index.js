const express = require('express');
const app = express();
const path = require('path');
const port = 7070;

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});