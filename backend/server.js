const express = require('express')
const cors = require('cors')

const app = express()

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const rolesRoute = require('./routes/roles')

app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/roles', rolesRoute);

app.use(express.static(path.join(__dirname, '../client/public')));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is Running')
});
