const User = require("../models/user");
const Post = require("../models/post");

const postController = {};

postController.new = (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      next(err);
    } else {
      const data = {
        user: user
      };
      res.render("posts/new", data);
    }
  });
};

postController.save = (req, res, next) => {
  const _creator = req.params.id;
  const content = req.body.content;
  const nameOfUser = req.session.currentUser.name;

  const newPost = new Post({
    _creator,
    content,
    nameOfUser
  });
  newPost.save(err => {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
};

module.exports = postController;
