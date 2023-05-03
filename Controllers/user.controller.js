const User = require('../Models/user.model');

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

module.exports = { getAllUsers, getUserById, postUser, putUser, deleteUser };