// User Account Creation
// Route: POST /admin/create-user
// Controller: Handle the form submission to create a new user.
// User Information Viewing

// Route: GET /admin/user/:userId
// Controller: Show detailed information about a specific user.
// User Data Table

// Route: GET /admin/users
// Controller: Show a table with user ID, name, photo, and available actions (delete).

// Profile Update Review

// Route: GET /admin/approval-review/:userId
// Controller: Show the admin page to review and decide on the approval of a user's profile updates.
// Route: POST /admin/approval-review/:userId
// Controller: Handle the admin's decision on profile updates.

// Default Mode Reversion

// Route: POST /admin/default-mode-reversion/:userId
// Controller: Handle reverting the user's information to the default state.
// Deletion Functionality

// Route: POST /admin/delete-user/:userId
// Controller: Handle deleting the user's entire row of data, irrespective of approval status.

// routes/admin.js
const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");

router.post("/admin/create-user/", async (req, res) => {
  
//   Handle form submission to create a new user
  try {
    // Create new user and save to the database
    console.log(req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      newUser,
      success: true,
      status: "Registration Successful!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User Information Viewing
router.get("/admin/user/:userId", async (req, res) => {
  // Display detailed information about a specific user
  try {
    const user = await User.findById(req.params.userId);
    res.json({
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User Data Table
router.get("/admin/users", (req, res) => {
  // Fetch users and render the table
  User.find({}).limit(2)
    .then((users) => {
      if (!users) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json({
          users
        });
      }
    })
   
});

router.post("/admin/approval-review/:userId", async (req, res) => {
  // Handle the admin's decision on profile updates
  try {
    const user = await User.findById(req.params.userId);

    if (req.body.approval == true) {
      user.approvalStatus = "Accepted by Admin";
    } else {
      user.approvalStatus = "Not Accepted by Admin";
    }

    // Save the updated user
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/admin/default-mode-reversion/:userId", async (req, res) => {
  // Handle reverting the user's information to the default state
  try {
    const user = await User.findById(req.params.userId);

    // Revert user information to default state
    user.name = "";
    user.photo = "";
    user.approvalStatus = "";

    // Save the updated user
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/admin/delete-user/:userId", async (req, res) => {
  // Handle deleting the user's entire row of data, irrespective of approval status
  try {
    // Find and delete the user
    await User.findByIdAndDelete(req.params.userId);

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
