const fs = require('fs');
const http = require('http');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
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

app.post('/images/delete', (req, res) => {
    const {imageId} = req.body;
    console.log('deleting photo');
    console.log(imageId);
    res.json({
        code: true,
        msg: 'photo successfully deleted! (msg from backend)',
        data: null
    })
})

app.post('/images/detail', (req, res) => {
    const {imageId} = req.body;
    console.log('querying photo detail');
    console.log(imageId);
    res.json({
        code: true,
        msg: 'sucess',
        data: {
            "imageId": 15,
            "imageName": "北理桥.jpg",
            "imageType": "jpeg",
            "imageSize": 3821734,
            "imagePath": "https://photoclassifierbucket.obs.cn-north-4.myhuaweicloud.com/1bdbc51e-9bb5-4350-8bfe-ae1f82c60e2b.jpg",
            "imageTag": null,
            "cameraName": "Xiaomi Redmi K30 Pro",
            "locationId": null,
            "address": null,
            "shootingTime": "2022-10-09T17:32:52",
            "uploadTime": "2023-08-31T23:08:55",
            "modifiedTime": "2023-08-31T23:08:54"
        }
    })
})

app.post('/images/upload', (req, res) => {
    res.json({
        code: true,
        msg: 'success',
        data: null
    })
})

app.post('/images/tag', (req, res) => {
    console.log('tag')
    res.json({
        code: true,
        msg: 'success',
        data: {
            'tagList':  ['a',   'bbbbbbbbbbbbbbb',  'cccccc',   'human',    'animal',   'food', 'shark']
        }
    })
})

app.post('/images/classification', (req, res) => {
    const {classificationType} = req.body;
    console.log('querying classification');
    console.log(classificationType);
    res.json({
        code: true,
        msg: 'success',
        data: [{
            "category": 'a',
            "photos": [
              {
                "photoId": 1,
                "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
            },
            {
            "photoId": 2,
            "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
          },
            {
            "photoId": 3,
            "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
          },
          {
            "photoId": 1,
            "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
        },
        {
        "photoId": 2,
        "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
      },
        {
        "photoId": 3,
        "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
      },
      {
        "photoId": 1,
        "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
    },
    {
    "photoId": 2,
    "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
  },
    {
    "photoId": 3,
    "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
  }
        ]
          }, 
          {
            "category": 'b',
            "photos": [
              {
                "photoId": 1,
                "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
            },
            {
            "photoId": 2,
            "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
          },
            {
            "photoId": 3,
            "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
          },
          {
            "photoId": 1,
            "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
        },
        {
        "photoId": 2,
        "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
      },
        {
        "photoId": 3,
        "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
      },
      {
        "photoId": 1,
        "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
    },
    {
    "photoId": 2,
    "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
  },
    {
    "photoId": 3,
    "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
  }
        ]
          }
          ]
    })
})

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
