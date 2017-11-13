const express = require("express");
const authRoutes = express.Router();

const authController = require("../controllers/authController");

/* GET Index page with posts if there exists any */
authRoutes.get("/", authController.list);

/* GET signup page. */
authRoutes.get("/signup", authController.signupGET);

/* POST save the user information in the database */
authRoutes.post("/signup", authController.signupPOST);

/* GET login page. */
authRoutes.get("/login", authController.loginGET);

/* POST check the user information in the database */
authRoutes.post("/login", authController.loginPOST);

/* GET logout user and render Login page. */
authRoutes.get("/logout", authController.logout);

module.exports = authRoutes;
