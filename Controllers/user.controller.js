const User = require("../Models/user.model");
const Subreddot = require("../Models/subreddot.model");
const Post = require("../Models/post.model");
const Comment = require("../Models/comment.model");
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
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(400).json(err));
}

function postUser(req, res) {
  if (!req.body.mail) {
    return res.status(400).send("Email is required");
  }
  if (!req.body.pseudo) {
    return res.status(400).send("Pseudo is required");
  }
  const newUser = new User({
    mail: req.body.mail,
    pseudo: req.body.pseudo,
    password: req.body.password,
  });
  newUser
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(500).json(err));
}

function putUser(req, res) {
  if (!req.body.mail) {
    return res.status(400).send("Email is required");
  }
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      mail: req.body.mail,
      pseudo: req.body.pseudo,
      password: req.body.password,
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
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
              res.send(result + " \n \n " + result2);
            } else {
              res.status(404).send("Subreddot not found");
            }
          })
          .catch((err) => res.status(400).json(err));
      } else {
        res.status(404).send("User not found");
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
              res.send(result + " \n \n " + result2);
            } else {
              res.status(404).send("Subreddot not found");
            }
          })
          .catch((err) => res.status(400).json(err));
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(400).json(err));
}

function isSubscribed(req, res) {
  console.log("isSubscribed");
  User.findById(req.params.id)
    .then((result) => {
      if (result) {
        subId = req.body.userSubscribes;
        subFound = result.userSubscribes.find((element) => element == subId);
        if (subFound) {
          res.send(true);
          console.log("true");
        } else {
          res.send(false);
          console.log("false");
        }
      } else {
        res.status(404).send("User not found");
        console.log("User not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
  //res.status(400).json(err));
}

function getUserUpvotes(req, res) {
  User.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.send(result.userUpvotes);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(400).json(err));
}

function getUserDownvotes(req, res) {
  User.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.send(result.userDownvotes);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(400).json(err));
}

function getUserCommentUpvotes(req, res) {
  Comment.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.send(result.commentUpvotes);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(400).json(err));
}

function getUserCommentDownvotes(req, res) {
  Comment.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.send(result.commentDownvotes);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(400).json(err));
}


function addUserUpvote(req, res) {
  User.findById(req.params.id)
    .then((result) => {
      if (result) {
        userId = result._id;
        userIdString = userId.toString();
        Post.findById(req.body.userUpvotes).then((result2) => {
          if (result2) {
            result.userUpvotes.push(req.body.userUpvotes);
            result.save();
            result2.postUpvotes.push(userIdString);
            result2.save();
            res.send(result + " \n \n " + result2);
          } else {
            res.status(404).send("Subreddot not found");
          }
        });
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(400).json(err));
}

function addUserDownvote(req, res) {
  User.findById(req.params.id)
    .then((result) => {
      if (result) {
        userId = result._id;
        userIdString = userId.toString();
        Post.findById(req.body.userDownvotes).then((result2) => {
          if (result2) {
            result.userDownvotes.push(req.body.userDownvotes);
            result.save();
            result2.postDownvotes.push(userIdString);
            result2.save();
            res.send(result + " \n \n " + result2);
          } else {
            res.status(404).send("Subreddot not found");
          }
        });
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(400).json(err));
}

function addUserCommentUpvote(req, res) {
  User.findById(req.params.id)
    .then((result) => {
      if (result) {
        userId = result._id;
        userIdString = userId.toString();
        Comment.findById(req.body.userUpvotes).then((result2) => {
          if (result2) {
            result.userCommentUpvotes.push(req.body.userUpvotes);
            result.save();
            result2.commentUpvotes.push(userIdString);
            result2.save();
            res.send(result + " \n \n " + result2);
          } else {
            res.status(404).send("Subreddot not found");
          }
        });
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {res.status(400).json(err); console.log(err)});
}

function addUserCommentDownvote(req, res) {
  User.findById(req.params.id)
    .then((result) => {
      if (result) {
        userId = result._id;
        userIdString = userId.toString();
        Comment.findById(req.body.userDownvotes).then((result2) => {
          if (result2) {
            result.userCommentDownvotes.push(req.body.userDownvotes);
            result.save();
            result2.commentDownvotes.push(userIdString);
            result2.save();
            res.send(result + " \n \n " + result2);
          } else {
            res.status(404).send("Subreddot not found");
          }
        });
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => res.status(400).json(err));
}

//TODO
function removeUserUpvote(req,res) {
    User.findById(req.params.id)
        .then(result => {
            if(result) {
                userId = result._id;
                userIdString = userId.toString();
                Post.findById(req.body.userUpvotes).then(result2 => {
                    if(result2) {
                        userIndexToRemove = result.userUpvotes.indexOf(req.body.userUpvotes);
                        result.userUpvotes.splice(userIndexToRemove, 1);
                        result.save();
                        postIndexToRemove = result2.postUpvotes.indexOf(req.params.id);
                        result2.postUpvotes.splice(postIndexToRemove);
                        result2.save();
                        res.send(result + " \n \n " + result2);
                    } else {
                        res.status(404).send("Post not found");
                    }
                });
            } else {
                res.status(404).send("User not found");
            }
        })
        .catch((err) => res.status(400).json(err));
}

function removeUserDownvote(req,res) {
    User.findById(req.params.id)
        .then(result => {
            if(result) {
                userId = result._id;
                userIdString = userId.toString();
                Post.findById(req.body.userDownvotes).then(result2 => {
                    if(result2) {
                        userIndexToRemove = result.userDownvotes.indexOf(req.body.userDownvotes);
                        result.userDownvotes.splice(userIndexToRemove, 1);
                        result.save();
                        postIndexToRemove = result2.postDownvotes.indexOf(req.params.id);
                        result2.postDownvotes.splice(postIndexToRemove);
                        result2.save();
                        res.send(result + " \n \n " + result2);
                    } else {
                        res.status(404).send("Post not found");
                    }
                });
            } else {
                res.status(404).send("User not found");
            }
        })
        .catch((err) => res.status(400).json(err));
}

function removeUserCommentUpvote(req,res) {
    User.findById(req.params.id)
        .then(result => {
            if(result) {
                userId = result._id;
                userIdString = userId.toString();
                Comment.findById(req.body.userUpvotes).then(result2 => {
                    if(result2) {
                        userIndexToRemove = result.userCommentUpvotes.indexOf(req.body.userUpvotes);
                        result.userCommentUpvotes.splice(userIndexToRemove, 1);
                        result.save();
                        commentIndexToRemove = result2.commentUpvotes.indexOf(req.params.id);
                        result2.commentUpvotes.splice(commentIndexToRemove);
                        result2.save();
                        res.send(result + " \n \n " + result2);
                    } else {
                        res.status(404).send("Post not found");
                    }
                });
            } else {
                res.status(404).send("User not found");
            }
        })
        .catch((err) => res.status(400).json(err));}

function removeUserCommentDownvote(req,res) {
    User.findById(req.params.id)
        .then(result => {
            if(result) {
                userId = result._id;
                userIdString = userId.toString();
                Comment.findById(req.body.userDownvotes).then(result2 => {
                    if(result2) {
                        userIndexToRemove = result.userCommentDownvotes.indexOf(req.body.userDownvotes);
                        result.userCommentDownvotes.splice(userIndexToRemove, 1);
                        result.save();
                        commentIndexToRemove = result2.commentDownvotes.indexOf(req.params.id);
                        result2.commentDownvotes.splice(commentIndexToRemove);
                        result2.save();
                        res.send(result + " \n \n " + result2);
                    } else {
                        res.status(404).send("Comment not found");
                    }
                });
            } else {
                res.status(404).send("User not found");
            }
        })
        .catch((err) => res.status(400).json(err));}

//Returns true if pseudo already exists in DB
function checkPseudo(req, res) {
  User.findOne({ pseudo: req.body.pseudo })
    .then((result) => {
      console.log(result);
      if (result) {
        console.log("pseudo does not exists");
        res.send(false);
      } else {
        console.log("pseudo exist");
        res.send(true);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
}

//Returns true if mail already exists in DB
function checkMail(req, res) {
  console.log(req.body.mail);
  User.findOne({ mail: req.body.mail })
    .then((result) => {
      console.log(result);
      if (result) {
        console.log("mail does not exists");
        res.send(false);
      } else {
        console.log("mail exist");
        res.send(true);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
}

module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  subscribeToSubreddot,
  unsubscribeToSubreddot,
  isSubscribed,
  getUserUpvotes,
  getUserDownvotes,
  getUserCommentUpvotes,
  getUserCommentDownvotes,
  addUserUpvote,
  addUserDownvote,
  checkPseudo,
  checkMail,
  addUserCommentUpvote,
  addUserCommentDownvote,
  removeUserUpvote,
  removeUserDownvote,
  removeUserCommentUpvote,
  removeUserCommentDownvote,
};
