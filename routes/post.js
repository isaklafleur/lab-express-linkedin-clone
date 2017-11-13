const express = require("express");
const postRoutes = express.Router();

const authMiddleware = require("../middleware/auth");

// The required post Controller
const postController = require("../controllers/postController");

/* GET the user's Blog Post page. */
postRoutes.get("/:id/posts/new", postController.new);

postRoutes.post(
  "/:id/posts/",
  authMiddleware.checkProfileOwnership,
  postController.save,
);

module.exports = postRoutes;
