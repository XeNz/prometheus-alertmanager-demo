'use strict';

const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/health', (req, res) => {
    const date = new Date();
    const moduloSix = date.getSeconds() % 6 === 0;
    if (moduloSix) {
        throw new Error('BROKEN');
    }
    else {
        res.send(date);
    }
});

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);