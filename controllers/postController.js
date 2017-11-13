const User = require("../models/user");
const Post = require("../models/post");

const postController = {};

postController.new = (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    res.render("posts/new", { user });
  });
};

postController.save = (req, res, next) => {
  const _creator = req.params.id;
  const content = req.body.content;
  const nameOfUser = req.session.currentUser.name;

  const newPost = new Post({
    _creator,
    content,
    nameOfUser,
  });
  newPost.save(err => {
    if (err) {
      console.log("Error: ", err);
    }
    res.redirect("/");
  });
};

module.exports = postController;
