const { Router } = require('express');

const router = Router();

router.post('/signup', (req, res) => {    
    res.send(`user ${req.body.mail} already exists`)
})
router.post('/login', (req, res) => {
    
})




module.exports = router;