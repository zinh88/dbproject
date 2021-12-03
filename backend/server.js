const express = require('express')
const cors = require('cors')

const app = express()

const authRoute = require('./routes/auth');

app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use('/api/auth', authRoute);

app.listen(5000, () => {
    console.log('Server is Running')
});
