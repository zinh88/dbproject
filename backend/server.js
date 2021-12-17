const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const rolesRoute = require('./routes/roles');
const path = require('path');

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/roles', rolesRoute);

//app.use(express.static(path.join(__dirname, '../frontend/public/build')));

const publicPath = path.join(__dirname, '../frontend/public/build');
app.use(express.static(publicPath));
app.use('*', express.static(publicPath));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is Running')
});
