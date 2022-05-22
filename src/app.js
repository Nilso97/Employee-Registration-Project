const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

// Password
const SECRET = 'Nilso97'

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.json({
        message: 'Permission: RELEASED'
    });
});

async function verifyJWT(req, res, next) {
    const token = await req.headers['x-access-token'];
    const index = blackList.findIndex(item => item === token);
    if (index !== -1) return res.status(401).end();

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).end();

        req.userId = decoded.userId;
        next();
    });
}

app.get('/clients', verifyJWT, (req, res) => {
    console.log(`user ${req.userId} made this call...`);
    return res.json([{
        id: 1,
        name: 'Nilso'
    }]);
});

app.post('/login', (req, res) => {
    if (req.body.user === 'admin' && req.body.password === '1234') {
        const token = jwt.sign({
            userId: 1
        }, SECRET, {
            expiresIn: 300
        });
        return res.json({
            auth: true,
            token
        });
    }

    return res.status(401).end();
});

const blackList = [];

app.post('/logout', (req, res) => {
    blackList.push(req.headers['x-access-token']);
    return res.end(JSON.stringify({
        message: 'disconnected user! back to login to login again...'
    }));
});

// Server connection
const server = app.listen(3000, () => {
    port = server.address().port;
    console.log(`server is running at http://localhost:${port}`);
});