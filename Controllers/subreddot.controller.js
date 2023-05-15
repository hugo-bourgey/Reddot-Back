const subreddot = require('../Models/subreddot.model.js');
const StorageService = require('../Services/storage.service');


function getAllSubreddots(req, res) {
    subreddot.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => res.status(400).json(err));
}

function getSubreddotById(req, res) {
    subreddot.findById(req.params.id)
        .then((result) => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('Subreddot not found');
            }
        })
        .catch((err) => res.status(400).json(err));
}

function getFeaturedSubreddots(req, res) {
    console.log("test");
    subreddot.find().sort({subscribers: -1}).limit(10)
        .then((result) => {
            if (result) {
                console.log(result);
                res.send(result);
            } else {
                res.status(404).send('Subreddot not found');
            }
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
}

function getSubreddotByName(req, res) {
    subreddot.findOne({name: req.params.name})
        .then((result) => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('Subreddot not found');
            }
        })
        .catch((err) => res.status(400).json(err));
}

async function postSubreddot(req, res) {
    if (!req.body.name) {
        return res.status(400).send('Name is required');
    }

    const newSubreddot = new subreddot({
        name: req.body.name,
        description: req.body.description,
    });

    const img = req.body.icon;
    StorageTmp = new StorageService();

    const waitUrl = async () => {
        const imgUrl = await StorageTmp.uploadImageToFirebase(img);
        newSubreddot.icon = imgUrl;
    }

    await waitUrl();

    return saveSubreddot(req,res,newSubreddot);
}

function saveSubreddot(req, res, newSub) {
    newSub.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => res.status(500).json(err));
}

function putSubreddot(req, res) {
    if (!req.body.name) {
        return res.status(400).send('Name is required');
    }
    subreddot.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        description: req.body.description,
        icon: req.body.icon
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).json(err);
        });
}

function deleteSubreddot(req, res) {
    subreddot.findOneAndDelete({ _id: req.params.id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {res.status(500).json(err)});
}

function checkName(req, res) {
    subreddot.findOne({name: req.body.name})
        .then((result) => {
            if (result) {
                res.send(true);
            } else {
                res.send(false);
            }
        })
        .catch((err) => res.status(400).json(err));
}

module.exports = { getAllSubreddots, getSubreddotById, getSubreddotByName, postSubreddot, putSubreddot, deleteSubreddot, checkName, getFeaturedSubreddots };