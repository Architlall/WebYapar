// User Login

// Route: POST /user/login
// Controller: Handle user login using credentials provided by the admin.
// Profile Update Page

// Route: GET /user/profile
// Controller: Show the form for users to update their personal details.
// Route: POST /user/profile
// Controller: Handle the form submission to update user details and upload an image.
// Update Approval Request

// Route: POST /user/approval-request
// Controller: Forward submitted details to the admin for approval.
// Conditional Data Viewing

// Route: GET /user/view-details
// Controller: Show user details only if the user has previously submitted their details.
// Approval Status Notification

// Route: GET /user/approval-status
// Controller: Display a popup with the admin's approval status.
// Approval Status Indication

// Route: GET /user/approval-indication
// Controller: Display the approval status (Not Accepted by Admin or Accepted by Admin).


// routes/user.js
const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");

// User Login
router.post('/user/login', async (req, res) => {
  // Handle user login using credentials provided by the admin
  
});


router.post('/user/profile', async (req, res) => {
  // Handle form submission to update user details and upload an image
  try {
    // Update user details and save to the database
    const userId = req.params.id;
    const user = await User.findById(userId);

    // Update user details based on form data
    user.name = req.body.name;
    user.image = req.body.image;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
      }
    
      const image = req.files.image;
      const processedImage = await sharp(image.data)
      .resize(300, 300)
      .toFormat('webp')
      .toBuffer();

    user.photo = {
      data: processedImage,
      contentType: 'image/webp',
    };
    user.detailsSubmitted=true;

    // Save the updated user
    await user.save();

   res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Approval Request
router.post('/user/approval-request', async (req, res) => {
    const userId = req.params.userId;

    try {
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Check if the user has already submitted details
      if (!user.detailsSubmitted) {
        return res.status(400).json({ error: 'User has not submitted details yet.' });
      }
      user.approvalStatus = 'Pending Approval';
      await user.save();
  
      res.json({ message: 'Approval request submitted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

// Conditional Data Viewing
router.get('/user/view-details', async (req, res) => {
  // Show user details only if the user has previously submitted their details
  try {
    // Check if user details are available
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user && user.image!=NULL && user.name!=NULL) {
      res.json(user)
    } else {
      res.json("incomplete")
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
