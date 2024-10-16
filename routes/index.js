const express = require('express');
const router = express.Router();

// Import route files
const userRoutes = require('./user.route');


// Use the routes
router.use('/users', userRoutes);        // All routes related to users will have '/users' prefix

module.exports = router;
