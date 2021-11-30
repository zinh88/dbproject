const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')

const app = express()

const authRoute = require('./routes/auth');

app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use('/api/user', authRoute);

app.listen(5000, () => {
    console.log('Server is Running')
});

const pass = '124698987'
const getHashed = async (psswd) => {
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(psswd, salt)
    console.log(hashed)
}
getHashed(pass);
