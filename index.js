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
const firebase = require('firebase/app');
const FirebaseService = require('./Services/firebase.service');

const PORT = process.env.PORT || 3000;
const app = express();
// Import the functions you need from the SDKs you need


// Connect to DB
mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log('Connected to DB'))
.then((res) => app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}))
.catch((err) => console.log(err));


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2Bgf9j-r1mrAs-iE_tsFVJU5A51Uwzok",
    authDomain: "reddot-de363.firebaseapp.com",
    projectId: "reddot-de363",
    storageBucket: "reddot-de363.appspot.com",
    messagingSenderId: "237282562487",
    appId: "1:237282562487:web:9e2c1c40831df763511832"
  };
  
  // Initialize Firebase
var fbApp = firebase.initializeApp(firebaseConfig);

FirebaseService.firebaseApp = fbApp;

app.use(cors({
    origin: '*'
}))

app.use(express.json({ limit: '100000mb' }));

app.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({mail: req.body.mail, password: req.body.password})
    .then((result) => {
        if (!result) {
            return res.status(404).send('User not found');
        }
        const userobj = {mail: req.body.mail};
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

//export default firebaseApp;