const express = require('express');
const router = express.Router();
const { getAllBidsList, submitBid } = require('../controllers/bids.controller');

// Define bids-related routes
/**
 * @swagger
 * components:
 *   schemas:
 *     Bids:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the Bid
 *           example: "12345"
 *         auction_item_id:
 *           type: string
 *           description: The unique identifier for the auction item
 *           example: "12345"
 *         user_id:
 *           type: string
 *           description: The unique identifier for the user
 *           example: "12345"
 *         bid_amount:
 *           type: number
 *           description: The bid for the auction item
 *           example: 150.00
 *         bid_time:
 *           type: string
 *           format: date-time
 *           description: The date and time when the bid created
 *           example: "2024-10-12T07:20:50.52Z"

 */

/**
 * @swagger
 * tags:
 *   name: Bids
 *   description: API for managing Bids
 */

/**
 * @swagger
 *  /bids/list:
 *   get:
 *     summary: Get all bids
 *     tags: [Bids]
 *     responses:
 *       200:
 *         description: List of all bids
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bids'
 *       404:
 *         description: No bids found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No Bids present"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/list', getAllBidsList);

/**
 * @swagger
 * /bids/submitBid:
 *   post:
 *     summary: Submit a bid for an auction item
 *     tags: [Bids]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - auctionItemId
 *               - bidAmount
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user submitting the bid
 *               auctionItemId:
 *                 type: string
 *                 description: ID of the auction item being bid on
 *               bidAmount:
 *                 type: number
 *                 description: Amount of the bid
 *             example:
 *               userId: "12345"
 *               auctionItemId: "67890"
 *               bidAmount: 1000
 *     responses:
 *       200:
 *         description: Bid submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bid submitted successfully!"
 *                 auctionItemId:
 *                   type: string
 *                   description: ID of the auction item
 *                   example: "67890"
 *                 newBidAmount:
 *                   type: number
 *                   description: The amount of the new highest bid
 *                   example: 1000
 *       400:
 *         description: Bad request, bid amount is lower than the current highest bid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Your bid must be higher than the current highest bid."
 *       404:
 *         description: Auction item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Auction item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while submitting the bid."
 */
router.post('/submitBid', submitBid);

module.exports = router;