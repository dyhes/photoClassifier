const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://localhost:8000/");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
const sslOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    ciphers: [
        "ECDHE-RSA-AES128-SHA256",
        "DHE-RSA-AES128-SHA256",
        "AES128-GCM-SHA256",
        "RC4",
        "HIGH",
        "!MD5",
        "!aNULL"
    ].join(':'),
};

// Sample data
const users = [
    {
        username: 'Jay',
        password: '123456',
        email: 'jay@mail.com'
    }
];

// Login API endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.json({
            code: true,
            msg: 'success',
            data: null
        });
    } else {
        res.json({
            code: false,
            msg: 'invalid credentials',
            data: null
        });
    }
});

// Signup API endpoint
app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;

    // Simplified signup 
    users.push({
        username,
        password,
        email
    });

    res.json({
        code: true,
        msg: 'success',
        data: null
    });
});

const server = https.createServer(sslOptions, app);

server.listen(port, () => {
    console.log(`Server is running on port https://localhost:${port}`);
});
