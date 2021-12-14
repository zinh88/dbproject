const express = require('express')
const cors = require('cors')

const app = express()

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts');

app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);

app.listen(5000, () => {
    console.log('Server is Running')
});
