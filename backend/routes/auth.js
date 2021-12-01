const { Router } = require('express');
const controller = require('../controllers/auth');
const pool = require('../config/db');

const router = Router();

router.post('/signup', (req, res) => {    
    res.send(`user ${req.body.mail} already exists`)
})
router.post('/login', (req, res) => {
    const email = req.body.mail;
    const pass = req.body.pass;
    pool.query('SELECT * FROM members', (err, result) => {
        console.log(result);
    })
    
    console.log(req.body.mail, req.body.pass)
})

module.exports = router;