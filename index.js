//https://reddot-back.onrender.com/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./Routes/user.router');
const subreddotRouter = require('./Routes/subreddot.router');
const postRouter = require('./Routes/post.router');
const commentRouter = require('./Routes/comment.router');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const User = require('./Models/user.model');

const PORT = process.env.PORT || 3000;
const app = express();

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log('Connected to DB'))
.then((res) => app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}))
.catch((err) => console.log(err));

app.use(cors({
    origin: '*'
}))

app.use(express.json());

app.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({mail: req.body.email, password: req.body.password})
    .then((result) => {
        if (!result) {
            return res.status(404).send('User not found');
        }
        const userobj = {email: req.body.email};
        const token = jwt.sign(userobj, process.env.SECRET_TOKEN);
        res.json({
            accessToken: token,
            userId: result._id
        });
    })
    .catch((err) => {res.send(err)});
})
app.get('/', auth, (req, res) => { res.send('Welcome to my web server'); });
app.use('/users', userRouter);
app.use('/subreddots', subreddotRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

//coucou