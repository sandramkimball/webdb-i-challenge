const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

//GET
server.get('/', (req, res) => {
    db
    .select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(error=> {
        res.status(500).json({error: 'Failed to get accounts.', error})
    });
});

server.get('/:id', (req, res) => {
    db
    .select('*')
    .from('accounts')
    .where('id', '=', req.params.id)
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error=> {
        res.status(500).json({error: 'Failed to get account.', error})
    });
});

//POST
server.post('/', (req, res) => {
    db
    .insert(req.body, 'id')
    .into('accounts')
    .then(ids=> {
        res.status(200).json(ids)
    })
    .catch(error=> {
        res.status(500).json({error: 'Failed to add account.', error})
    });
})

//PUT
server.put('/:id', (req, res)=> {
    const changes = req.body;
    db('accounts')
    .where({id: req.params.id})
    .update(changes)
    .then(count => {
        res.status(200).json(count);
    })
    .catch(error=> {
        res.status(500).json({error: 'Failed to update account.', error})
    });
});

//DELETE
server.delete('/:id', (res, req)=> {
    const changes = req.body;
    db('accounts')
    .where({id: req.params.id})
    .delete(changes)
    .then(count => {
        res.status(200).json(count);
    })
    .catch(error=> {
        res.status(500).json({error: 'Failed to delete account.', error})
    });
});


module.exports = server;