const express = require('express');

const AccountRouter = require('./accounts/accounts-router.js')

const server = express();

server.use(express.json());

server.use('/api/account', AccountRouter);

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is working!'
    })
})



module.exports = server;