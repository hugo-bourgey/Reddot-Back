const User = require('../Models/user.model');
const Subreddot = require('../Models/subreddot.model');
//const SubreddotController = require('./subreddot.controller');

function getAllUsers(req, res) {
    User.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => res.status(400).json(err));
}

function getUserById(req, res) {
    User.findById(req.params.id)
        .then((result) => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch((err) => res.status(400).json(err));
}

function postUser(req, res) {
    if (!req.body.mail) {
        return res.status(400).send('Email is required');
    }
    const newUser = new User({
        mail: req.body.mail,
        pseudo: req.body.pseudo,
        password: req.body.password
    });
    newUser.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => res.status(500).json(err));
}

function putUser(req, res) {
    if (!req.body.mail) {
        return res.status(400).send('Email is required');
    }
    User.findOneAndUpdate({ _id: req.params.id }, {
        mail: req.body.mail,
        pseudo: req.body.pseudo,
        password: req.body.password
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).json(err);
        });
}

function deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {res.status(500).json(err)});
}

function subscribeToSubreddot(req, res) {
    User.findById(req.params.id)
        .then((result) => {
            if (result) {
                //userId = req.params.id;
                userId = result._id;
                userIdString = userId.toString();
                console.log(userIdString);
                Subreddot.findById(req.body.userSubscribes)
                    .then((result2) => {
                        if (result2) {
                            result.userSubscribes.push(req.body.userSubscribes);
                            result.save();
                            //res.send(result);
                            //res.write(result);
                            result2.subscribers.push(userIdString);
                            result2.save();
                            res.send(result + ' \n \n ' + result2);
                        } else {
                            res.status(404).send('Subreddot not found');
                        }
                    })
                    .catch((err) => res.status(400).json(err));
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch((err) => res.status(400).json(err));
}

function unsubscribeToSubreddot(req, res) {
    User.findById(req.params.id)
        .then((result) => {
            if (result) {
                //userId = req.params.id;
                userId = result._id;
                userIdString = userId.toString();
                Subreddot.findById(req.body.userSubscribes)
                    .then((result2) => {
                        if (result2) {
                            result.userSubscribes.pull(req.body.userSubscribes);
                            result.save();
                            //res.write(result);
                            result2.subscribers.pull(userIdString);
                            result2.save();
                            //res.send(result2);
                            res.send(result + ' \n \n ' + result2);
                        } else {
                            res.status(404).send('Subreddot not found');
                        }
                    })
                    .catch((err) => res.status(400).json(err));
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch((err) => res.status(400).json(err));
}

function isSubscribed(req, res) {
    console.log('isSubscribed');
    User.findById(req.params.id)
        .then((result) => {
            if (result) {
                subId = req.body.userSubscribes;
                subFound = result.userSubscribes.find(element => element == subId);
                if (subFound) {
                    res.send(true);
                    console.log('true');
                } else {
                    res.send(false);
                    console.log('false');
                }
            } else {
                res.status(404).send('User not found');
                console.log('User not found');
            }
        })
        .catch((err) => { res.status(400).json(err); console.log(err);})
        //res.status(400).json(err));
}


                

module.exports = { getAllUsers, getUserById, postUser, putUser, deleteUser, subscribeToSubreddot, unsubscribeToSubreddot, isSubscribed };