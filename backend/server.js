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

const firstuser = async () => {
    const pass = '1234';
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(pass, salt);
    console.log(hashed);

}
firstuser()