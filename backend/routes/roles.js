const pool = require('../config/db');
const { Router } = require('express');
const authorize = require('../middleware/authorize');
require('dotenv').config();

const router = Router();

router.get('/mods', authorize, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, displayname AS name , email FROM members NATURAL INNER JOIN roles WHERE id = member_id AND member_role = 1`
        )
        const mods = result.rows;
        res.json({
            mods: mods
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
})

router.post('/setmod', authorize, async (req, res) => {
    try {
        const id = req.userid;
        const reqrole = await getRole(id);
        if (reqrole !== 2) return res.status(403).json({ message: "Forbidden" })
        const email = req.body.email;
        const result = await pool.query(
            `SELECT id FROM members WHERE email=$1`,
            [email]
        )
        if (result.rowCount === 0) return res.status(400).json({ message: "User Not Found"});
        const user_id = result.rows[0].id
        const userRole = await getRole(user_id);
        if (userRole === 1 || userRole === 2) return res.status(400).json({ message: "User is already Mod/Admin" });
        await pool.query(
            `INSERT INTO roles VALUES ($1, 1)`,
            [user_id]
        )
        return res.status(200).json({message: "Mod Set"})
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
})  

router.delete('/mods/:id', authorize, async (req, res) =>{
    try{
        const id = req.params.id;
        await pool.query(
            `DELETE FROM roles WHERE member_id = $1`,
            [id]
        ) 
        return res.status(200)
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
})


const getRole = async (userid) => {
    const result = await pool.query(
        `SELECT member_role FROM roles WHERE member_id = $1`,
        [userid]
    );
    if (result.rowCount === 0) return 0;
    return result.rows[0].member_role;
}

module.exports = router;