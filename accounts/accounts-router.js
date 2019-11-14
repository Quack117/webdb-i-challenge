const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router()



router.get('/', (req, res) => {
    db('accounts').select('*')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            res.status(500).json({
                message: 'problem with the database'
            })
        })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    
    db('accounts').select('*').where({id})
        .then(account => {
            if (account[0]) {
                res.status(200).json(account)
            } else {
                res.status(404).json({
                    message: `Account with id: ${id} does not exist. Please try again`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'problem with the database'
            })
        })
})

router.post('/', (req, res) => {
    const newAccount = req.body
    db('accounts').insert(newAccount)
        .then(account => {
            res.status(201).json(account)
        })
        .catch(err => {
            res.status(500).json({
                message: 'problem with the database'
            })
        })
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req. body

    db('accounts').where({id}).update(changes)
        .then(count => {
            if (count) {
                res.status(200).json({updated: count})
            } else {
                res.status(404).json({
                    message: `Account with id: ${id} does not exist. Please try again`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'problem with the database'
            })
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params

    db('accounts').where({id}).del()
        .then(count => {
            if (count) {
                res.status(200).json({deleted: count})
            } else {
                res.status(404).json({
                    message: `Account with id: ${id} does not exist. Please try again`
                })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'problem with the database'})
        })
})

module.exports = router;