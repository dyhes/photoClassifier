const fs = require('fs');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:5173');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
// const sslOptions = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem'),
//     ciphers: [
//         "ECDHE-RSA-AES128-SHA256",
//         "DHE-RSA-AES128-SHA256",
//         "AES128-GCM-SHA256",
//         "RC4",
//         "HIGH",
//         "!MD5",
//         "!aNULL"
//     ].join(':'),
// };

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


app.post('/images/delete', (req, res) => {
    const {photoId} = req.body;
    console.log('deleting photo');
    console.log(photoId);
    res.json({
        code: true,
        msg: 'photo successfully deleted! (msg from backend)',
        data: null
    })
})

app.post('/images/detail', (req, res) => {
    const {photoId} = req.body;
    console.log('querying photo detail');
    console.log(photoId);
    res.json({
        code: true,
        msg: 'sucess',
        data: null
    })
})

app.post('/images/upload', (req, res) => {
    res.json({
        code: true,
        msg: 'success',
        data: null
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
            "name": "202307",
            "images": [
              {
                "id": 1,
                "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
            },
            {
            "id": 2,
            "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
          },
            {
            "id": 3,
            "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
          },
            {
            "id": 2,
            "url": "https://tse4-mm.cn.bing.net/th/id/OIP-C.BAYWkiNM-gPq7MIHKZj8NQHaJ4?pid=ImgDet&rs=1"
          },
            {
            "id": 2,
            "url": "https://tse4-mm.cn.bing.net/th/id/OIP-C.BAYWkiNM-gPq7MIHKZj8NQHaJ4?pid=ImgDet&rs=1"
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
