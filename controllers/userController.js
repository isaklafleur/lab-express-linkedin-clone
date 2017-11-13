const User = require("../models/user");
const Post = require("../models/post");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const userController = {};

// Show LIST of profiles function
userController.list = (req, res) => {
  User.find({}).exec({ new: true }, (err, users) => {
    if (err) {
      console.log("Error:", err);
    } else {
      const data = {
        users: users,
      };
      res.render("profiles/index", data);
    }
  });
};

// SHOW single profile by id function
userController.show = (req, res) => {
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      const data = {
        user: user,
      };
      res.render("profiles/show", data);
    }
  });
};

// CREATE profile function, it just redirects to create the page
userController.create = (req, res) => {
  res.render("profiles/create");
};

// SAVE new profile function
userController.save = (req, res) => {
  const user = new User(req.body);

  User.save(err => {
    if (err) {
      console.log(err);
      res.render("profiles/create");
    } else {
      res.redirect(`/profiles/show/${user._id}`);
    }
  });
};

// EDIT profile by id function, it just redirects to edit page
userController.edit = (req, res) => {
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      const data = {
        user: user,
      };
      res.render("profiles/edit", data);
    }
  });
};

// UPDATE user function for updating currently edited user
userController.update = (req, res) => {
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(req.body.password, salt);
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
        summary: req.body.summary,
        imageUrl: req.body.imageUrl,
        company: req.body.company,
        jobTitle: req.body.jobTitle,
      },
    },
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
        res.render("profiles/edit", { user: req.body });
      }
      res.redirect(`/profiles/${user._id}`);
    },
  );
};

// DELETE user by id function for remove single user data and delete all the users posts.
userController.delete = (req, res) => {
  Post.remove({ _creator: req.params.id }, err => {
    if (err) {
      console.log("Error", err);
    }
  });
  User.remove({ _id: req.params.id }, err => {
    if (err) {
      console.log("Error: ", err);
    } else {
      res.redirect("/profiles");
    }
  });
};
module.exports = userController;
