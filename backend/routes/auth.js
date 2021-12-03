const pool = require('../config/db');
const { Router } = require('express');
const controller = require('../controllers/auth');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
require('dotenv').config();


const router = Router();

router.post('/signup', async (req, res) => {    
    const email = req.body.mail;
    const pass = req.body.pass;
    const name = req.body.name;

    const salt = await bcrypt.genSalt();
    const hashedpass = await bcrypt.hash(pass, salt);
 
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
           user: `${process.env.NODEMAILER_MAIL}`,
           pass: `${process.env.NODEMAILER_PASS}`
        }
     });

    jwt.sign(
        {
            email: email,
            hashedpassword: hashedpass,
            name: name
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, emailToken) => {
            if (err) res.status(401).json({ message : "Registration Failed" })
            const url = `http://localhost:5000/api/auth/verify?token=${emailToken}`;
            transporter.sendMail({
                from: `"LDF" <${process.env.NODEMAILER_MAIL}>`,
                to: `${email}`,
                subject: "Confirm Registration", 
                html: `Click on this link to confirm email: <a href="${url}">${url}</a>`
              }).then(() => console.log('email sent'));
            res.json({ message: "Check Email "})
        }
    )
});



router.post('/login', async (req, res) => {
    const email = req.body.mail;
    const pass = req.body.pass;

    pool.query(`SELECT * FROM members WHERE email=\'${email}\'`, (err, result) => {
        if(err) console.log(err);
        if (result.rowCount === 1) 
            res.send('success')
        else res.send('no user')
    });    
    console.log(req.body.mail, req.body.pass)
});

router.get('/verify', async (req, res) => {
    const token = req.query.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) res.status(401).send(`Registration Failed`);
        else {
            const email = decoded.email;
            const hashedpassword = decoded.hashedpassword;
            const name = decoded.name;
            const loginurl = `http://localhost:3000/login`

            pool.query(`INSERT INTO members VALUES (DEFAULT, $1, $2, $3)`, 
            [email, hashedpassword, name],
            (error, _) => {
                if(error) res.status(401).send(`Registration Failed`);
                else res.send(`Registration Successful, go to <a href="${loginurl}">Login page</a> `)
            })
        }
    });
});



module.exports = router;