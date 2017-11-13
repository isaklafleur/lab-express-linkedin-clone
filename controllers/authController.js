const bcrypt = require("bcrypt");

const bcryptSalt = 10;
const User = require("../models/user");
const Post = require("../models/post");

const authController = {};

authController.list = (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) {
      next(err);
    } else {
      const data = {
        posts: posts
      };
      res.render("home", data);
    }
  });
};

authController.signupGET = (req, res) => {
  res.render("authentication/signup");
};

authController.signupPOST = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const summary = req.body.summary;
  const imageUrl = req.body.imageUrl;
  const company = req.body.company;
  const jobTitle = req.body.jobTitle;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.findOne({ email }, "email", (err, user) => {
    if (err) {
      next(err);
    } else {
      if (user !== null) {
        res.render("authentication/signup", {
          errorMessage: "This email is already registered. Want to"
        });
        return;
      }
      const newUser = new User({
        name,
        email,
        password: hashPass,
        summary,
        imageUrl,
        company,
        jobTitle
      });

      if (email === "" || password === "") {
        res.render("authentication/signup", {
          errorMessage: "Please indicate an email and a password to sign up"
        });
        return;
      }

      newUser.save(err => {
        if (err) {
          res.render("authentication/signup", { errors: newUser.errors });
        }
        req.session.currentUser = newUser;
        res.redirect(`profiles/${newUser._id}`);
      });
    }
  });
};

authController.loginGET = (req, res, next) => {
  res.render("authentication/login");
};

authController.loginPOST = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === "" || password === "") {
    res.render("authentication/login", {
      errorMessage: "Indicate an email and a password to login"
    });
    return;
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.render("authentication/login", {
        errorMessage: "The username doesn't exist"
      });
      return;
    }
    if (bcrypt.compareSync(password, user.password)) {
      // Save the login in the session!

      req.session.currentUser = user;
      // console.log("req.session", req.session);
      const userId = user._id;
      res.redirect(`profiles/${userId}`);
    } else {
      res.render("authentication/login", {
        errorMessage: "Incorrect password"
      });
    }
  });
};

authController.logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    }
    // cannot access session here
    res.redirect("login");
  });
};

module.exports = authController;
