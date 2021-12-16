const pool = require('../config/db');
const { Router } = require('express');
const authorize = require('../middleware/authorize');
const { cloudinary } = require('../config/cloudinary')
require('dotenv').config();

const router = Router();

router.get('/info', authorize, async (req, res) => {
    try {
        const id = req.userid;
        let role = 0;
        const result = await pool.query(
            `SELECT * FROM members WHERE id= $1`,
            [id]
        );
        const rolesResult = await pool.query(
            `SELECT * FROM roles WHERE member_id =$1`,
            [id]
        );

        if (rolesResult.rowCount > 0) {
            role = rolesResult.rows[0].member_role;
        }

        if(result.rowCount === 0) throw { message: 'Fatal Error' };
        const user = result.rows[0];
        return res.json({
            name: user.displayname,
            picture: user.picture,
            bio: user.bio,
            email: user.email,
            role:role,
        });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/name', authorize, async (req, res) => {
    try {
        const id = req.userid;
        const newname = req.body.name;
        if (newname === '') return res.status(400).json({ message: "Name Cannot Be Empty" })
        await pool.query(
            `UPDATE members SET displayname = $1 WHERE id = $2 RETURNING id`,
            [newname, id]
        )
        res.status(200).json({ message: "Name Changed" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
});

router.put('/picture', authorize, async (req, res) => {
    try {
        const id = req.userid;
        const newpic = req.body.pic;
        if (newpic === '' || !newpic) return res.status(400).json({ message: "Invalid Image" })
        const uploadResponse = await cloudinary.uploader.upload(
            req.body.pic,
        )
        const pic = uploadResponse.url;
        
        await pool.query(
            `UPDATE members SET picture = $1 WHERE id = $2`,
            [pic, id]
        )
        res.status(200).json({ message: "Pic Changed" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
});

router.delete('/picture', authorize, async (req, res) => {
    try {
        const id = req.userid;
        const pic = 'NO IMAGE'
        await pool.query(
            `UPDATE members SET picture = $1 WHERE id = $2`,
            [pic, id]
        )
        res.status(200).json({ message: "Pic Changed" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
});





module.exports = router;