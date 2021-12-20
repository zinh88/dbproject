const pool = require('../config/db');
const { Router } = require('express');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const validInfo = require('../middleware/validateinfo')
require('dotenv').config();

const router = Router();

const hostAddress = process.env.URL;

router.post('/signup', validInfo ,async (req, res) => {    
    try {
        const email = req.body.mail;
        const pass = req.body.pass;
        const name = req.body.name;
    
        const salt = await bcrypt.genSalt();
        const hashedpass = await bcrypt.hash(pass, salt);

        const user = await pool.query(
            `SELECT * FROM members WHERE email= $1`,
            [email]
        );
        if (user.rowCount !== 0) {
            return res.status(400).json({ message: "Account Already Exists"});
        } 
     
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
            (err, emailToken) => {
                if (err) return res.status(401).json({ message : "Registration Failed" })
                const url = `${hostAddress}/api/auth/confirm?token=${emailToken}`;
                transporter.sendMail({
                    from: `"LDF" <${process.env.NODEMAILER_MAIL}>`,
                    to: `${email}`,
                    subject: "Confirm Registration", 
                    html: `Click on this link to confirm email: <a href="${url}">${url}</a>`
                  }).then(() => console.log('email sent'));
                res.json({ message: "Check Email "})
            }
        )
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message:'Server Error'});
    }
});



router.post('/login', validInfo, async (req, res) => {
    try {
        const email = req.body.mail;
        const pass = req.body.pass;

        const user = await pool.query(
            `SELECT * FROM members WHERE email= $1`,
            [email]
        );
        if (user.rowCount === 0) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const correctPassword = await bcrypt.compare(pass, user.rows[0].hashedpassword);
        if(!correctPassword) {
            return res.status(400).json({ message: 'Incorrect Password'});
        }
        const token = jwt.sign({ user: user.rows[0].id }, process.env.JWT_SECRET);
        res.json({ token: token });
        
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

router.get('/confirm', async (req, res) => {
    try {
        const token = req.query.token;
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).send(`Registration Failed`);
            }
            else {
                const email = decoded.email;
                const hashedpassword = decoded.hashedpassword;
                const name = decoded.name;
                const loginurl = `${hostAddress}`
    
                pool.query(
                    `INSERT INTO members VALUES (DEFAULT, $1, $2, $3, 'NO IMAGE', 'EMPTY')`, 
                    [email, hashedpassword, name]
                )
                .then(()=> {
                    return res.send(`Registration Successful, go to <a href="${loginurl}">Login page</a> `)
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(401).send(`Registration Failed!`);
                })
            }
        });
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});



module.exports = router;