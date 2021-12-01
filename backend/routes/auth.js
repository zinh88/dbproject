const pool = require('../config/db');
const { Router } = require('express');
const controller = require('../controllers/auth');

const router = Router();

router.post('/signup', (req, res) => {    
    res.send(`user ${req.body.mail} already exists`)
});



router.post('/login', (req, res) => {
    const email = req.body.mail;
    const pass = req.body.pass;

    pool.query(`SELECT * FROM members WHERE email=\'${email}\'`, (err, result) => {
        if(err) console.log(err);
        if (result.rowCount === 1) 
            console.log('success')
        else console.log('no user')
    });


    
    console.log(req.body.mail, req.body.pass)
});



module.exports = router;