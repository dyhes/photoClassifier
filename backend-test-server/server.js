const fs = require('fs');
const http = require('http');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Sample data
const users = [
    {
        id: 1,
        username: 'Jay',
        password: '123456',
        email: 'jay@mail.com'
    }
];

// JWT secret key
const jwtSecret = 'your-secret-key';

// Generate a random verification code
function generateVerificationCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
const verificationCodes = {};

// Login API endpoint
app.post('/users/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        // Create a JWT token
        const token = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '1h' });
        res.json({
            code: true,
            msg: 'success',
            data: {
                token: token
            }
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
app.post('/users/signup', (req, res) => {
    const { username, password } = req.body;

    // Simplified signup 
    const newUser = {
        id: users.length + 1,
        username,
        password
    };
    users.push(newUser);

    res.json({
        code: true,
        msg: 'success',
        data: {
            user: newUser
        }
    });
});

// Send verification code API endpoint
app.post('/users/forgetPassword', (req, res) => {
    const { email, username } = req.body;

    // Find the user by username (you should use a database for this)
    const user = users.find(user => user.username === username && user.email === email);
    if (!user) {
        res.json({
            code: false,
            msg: 'user not found',
            data: null
        });
        return;
    }

    const verificationCode = generateVerificationCode();

    verificationCodes[user.id] = verificationCode;

    res.json({
        code: true,
        msg: 'verification code sent',
        data: verificationCode
    });
});

// Verify verification code and update password API endpoint
app.post('/users/updatePassword', (req, res) => {
    const { id, newPassword } = req.body;

    const storedVerificationCode = verificationCodes[id];
    if (!storedVerificationCode) {
        res.json({
            code: false,
            msg: 'invalid verification code',
            data: null
        });
        return;
    }
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
    }

    res.json({
        code: true,
        msg: 'password updated',
        data: null
    });
});

// Modify Password API endpoint
app.post('/users/modifyPassword', (req, res) => {
    const { id, password, newPassword } = req.body;

    // Find the user by ID (you should use a database for this)
    const user = users.find(user => user.password === password);

    if (!user) {
        res.json({
            code: false,
            msg: 'user not found',
            data: null
        });
        return;
    }

    // Check if the provided current password matches the stored password
    if (user.password !== password) {
        res.json({
            code: false,
            msg: 'invalid password',
            data: null
        });
        return;
    }

    // Update the user's password
    user.password = newPassword;

    res.json({
        code: true,
        msg: 'password updated',
        data: null
    });
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
