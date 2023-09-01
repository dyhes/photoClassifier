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
app.post('/users/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.json({
            code: true,
            msg: 'success',
            data: '111'
        });
    } else {
        res.json({
            code: false,
            msg: 'invalid credentials',
            data: '111'
        });
    }
});

// Signup API endpoint
app.post('/users/signup', (req, res) => {
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

app.post('/images/search', (req, res) => {
    console.log('search');
    console.log(req.body);
    res.json({
        code: true,
        msg: 'success',
        data: {
                "photos": [
                    {
                        "photoId": 1,
                        "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
                    },
                    {
                    "photoId": 2,
                    "url": "https://pic1.zhimg.com/v2-a26d7705ef9fd1560edbbf8f6bd4d3b4_r.jpg"
                  },
                ]
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
            "category": null,
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
