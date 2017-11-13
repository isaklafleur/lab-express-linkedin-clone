const express = require("express");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

// The required user Controller
const userController = require("../controllers/userController");

// All routes to CRUD functions like below

// Get all user profiles
router.get("/", userController.list);

// Get single user profile by id
router.get("/:id", userController.show);

// Edit user profile
router.get(
  "/:id/edit",
  authMiddleware.checkProfileOwnership,
  userController.edit,
);
// Update user profile
router.post(
  "/:id/update",
  authMiddleware.checkProfileOwnership,
  userController.update,
);

// Delete user profile
router.post(
  "/:id/delete/",
  authMiddleware.checkProfileOwnership,
  userController.delete,
);

module.exports = router;
