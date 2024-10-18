const express = require('express');
const router = express.Router();

// Import route files
const userRoutes = require('./user.route');
const auctionRoutes = require('./auction.route');
const bidsRoutes = require('./bids.route');

// Use the routes
router.use('/users', userRoutes);        // All routes related to users will have '/users' prefix
router.use('/auction', auctionRoutes);   // All routes related to auctions will have '/auction' prefix
router.use('/bids', bidsRoutes);   // All routes related to auctions will have '/auction' prefix

module.exports = router;
