const post = require('../Models/post.model');
const StorageService = require('../Services/storage.service');
const Bson = require('bson');

function getAllPosts(req, res) {
    post.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => res.status(400).json(err));
}

function getAllPostsByDate(req, res) {
    post.find().sort({createdAt:1})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => res.status(400).json(err));
}

function getAllPostsByPopularity(req, res) {
    //post.find().sort({postUpvotes:-1, postDownvotes:1})
    post.find()
    .then((result) => {
        //sort result by number of upvotes
        result.sort((a,b) => {
            if (a.postUpvotes.length > b.postUpvotes.length) {
                return -1;
            } else if (a.postUpvotes.length < b.postUpvotes.length) {
                return 1;
            } else {
                return 0;
            }
        });
        //sort result descending by number of upvotes and descending by number of downvotes
        result.sort((a,b) => {
            if (a.postUpvotes.length === b.postUpvotes.length) {
                if (a.postDownvotes.length > b.postDownvotes.length) {
                    return 1;
                } else if (a.postDownvotes.length < b.postDownvotes.length) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
        res.send(result);
    })
    .catch((err) => res.status(400).json(err));
}

function getPostById(req, res) {
    post.findById(req.params.id)
    .then((result) => {
        if (result) {
            res.send(result);
        } else {
            res.send(null);
        }
    })
    .catch((err) => res.status(400).json(err));
}

function getPostsBySubId(req, res) {
    post.find({postSub: req.params.postSub})
    .then((result) => {
        if (result) {
            res.send(result);
        } else {
            res.status(404).send('No posts for this sub');
        }
    })
    .catch((err) => res.status(400).json(err));
}

async function postPost(req, res) {
    if (!req.body.title) {
        return res.status(400).send('Title is required');
    }
    const newPost = new post({
        title: req.body.title,
        content: req.body.content,
        media: req.body.media,
        postUser: req.body.postUser,
        postSub: req.body.postSub
    });
    if (req.body.media !== 'text') {
        // var encoder = new TextEncoder();
        // const img = encoder.encode(JSON.stringify(req.body.content));
        //console.log('image reconvertie' + img);
        const img = req.body.file;
        console.log(img);
        // const imgUint8Array = new Uint8Array(Bson.serialize(img).buffer);
        //console.log(img);

        StorageTmp = new StorageService();

        const waitUrl = async () => {
            console.log("test");
            const imgUrl = await StorageTmp.uploadImageToFirebase(img);
            console.log('image url : ' + imgUrl);
            newPost.content = imgUrl;
            console.log("j'ai fini mon async");
        }

        await waitUrl();

        console.log("FUCK THE ASYNC WE BALL");
        return savePost(req,res,newPost);
    } 


        //     StorageTmp.uploadImageToFirebase(img)
        //     .then((result) => {
        //         newPost.content = result;
        //         newPost.save()
        //         .then((result) => {
        //             res.send(result);
        //         })
        //         .catch((err) => res.status(500).json(err));
        //     })
        //     .catch((err) => res.status(500).json(err));
        // } else {
        //     newPost.save()
        //     .then((result) => {
        //         res.send(result);
        //     })
        //     .catch((err) => res.status(500).json(err));
        // }
}

function savePost(req,res, post) {
    post.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => res.status(500).json(err));
}
    
    function putPost(req, res) {
        if (!req.body.title) {
            return res.status(400).send('Title is required');
        }
        post.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            content: req.body.content,
            media: req.body.media,
            postUser: req.body.postUser,
            postSub: req.body.postSub
        }).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    
    function deletePost(req, res) {
        post.findOneAndDelete({ _id: req.params.id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {res.status(500).json(err)});
    }
    
    module.exports = { getAllPosts, getPostById, postPost, putPost, deletePost, getPostsBySubId, getAllPostsByDate, getAllPostsByPopularity };