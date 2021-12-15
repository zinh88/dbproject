const pool = require('../config/db');
const { Router } = require('express');
const authorize = require('../middleware/authorize');
require('dotenv').config();

const router = Router();

router.get('/info', authorize, async (req, res) => {
    // roles to be added later
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

module.exports = router;