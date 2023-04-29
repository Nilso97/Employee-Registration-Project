const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const server = app.listen(3000, () => {
    port = server.address().port;
    console.log(`server is running at http://localhost:${port}`);
});

const employees = [];

const SECRET_KEY = process.env.SECRET_KEY;

async function verifyJWT(req, res, next) {
    const token = await req.headers['x-access-token'];
    const index = loggedOutUsers.findIndex(item => item === token);
    if (index !== -1) return res.status(401).end();

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).end();

        req.userId = decoded.userId;
        next();
    });
}

// Página principal
app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo ao Sistema de Cadastro de Funcionários!'
    });
});

// Login do Admin
app.post('/login', (req, res) => {
    if (req.body.user === 'admin' && req.body.password === '1234') {
        const token = jwt.sign({
            userId: 1
        }, SECRET_KEY, {
            expiresIn: 300
        });
        return res.json({
            auth: true,
            token
        });
    }

    return res.status(401).end();
});

const loggedOutUsers = [];

// Logout
app.post('/logout', verifyJWT, (req, res) => {
    loggedOutUsers.push(req.headers['x-access-token']);
    return res.end(JSON.stringify({
        message: 'Desconectado com sucesso!'
    }));
});

// Cadastrar funcionários
app.post('/employees/', verifyJWT, (req, res) => {
    const {
        id,
        first_name,
        last_name,
        register,
        work_function,
        description
    } = req.body;
    const user = {
        id,
        first_name,
        last_name,
        register,
        work_function,
        description
    };

    employees.push(user);

    return res.json(employees);
});

// Listar somente um funcionário
app.get('/employees/:name', verifyJWT, (req, res) => {
    const {
        name
    } = req.params;

    const search = employees.find((search) => search.first_name === name);

    if (!search) return res.status(401).json('Funcionário não encontrado!');

    return res.json(search);
});

// Listar todos os funcionários
app.get('/employees', verifyJWT, (req, res) => {
    res.json(employees);
});

// Atualizar um funcionário
app.patch('/employees/:name', verifyJWT, (req, res) => {
    const {
        id,
        first_name,
        last_name,
        register,
        work_function,
        description
    } = req.body;
    const user = {
        id,
        first_name,
        last_name,
        register,
        work_function,
        description
    };

    const {
        name
    } = req.params;

    const update = employees.find((update) => update.first_name === name);

    if (!update) return res.status(401).json('Funcionário não encontrado!');

    update.id = id ? id : update.id;
    update.first_name = first_name ? first_name : update.first_name;
    update.last_name = last_name ? last_name : update.last_name;
    update.register = register ? register : update.register;
    update.work_function = work_function ? work_function : update.work_function;
    update.description = description ? description : update.description;

    return res.json(user);
});

// Deletar um funcionário
app.delete('/employees/:name', verifyJWT, (req, res) => {
    const {
        name
    } = req.params;

    const deleteEmployee = employees.find((deleteEmployee) => deleteEmployee.first_name === name);

    employees.splice(name, 1);

    if (!deleteEmployee) return res.status(404).json('Funcionário não encontrado!');

    return res.json('Successfully deleted!');
});