const express = require('express');
const router = express.Router();

// Import route files
const userRoutes = require('./user.route');
const auctionRoutes = require('./auction.route');

// Use the routes
router.use('/users', userRoutes);        // All routes related to users will have '/users' prefix
router.use('/auction', auctionRoutes);   // All routes related to auctions will have '/auction' prefix

module.exports = router;
