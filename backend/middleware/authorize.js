const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if(!token) return res.status(403).json({ message: 'Not Authorized' });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userid = payload.user;

        next();
    } catch(err) {
        console.error('error', err.message);
        return res.status(403).json({ message: 'Not Authorized' })
    }
};