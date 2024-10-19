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

router.post('/submitBid', submitBid);

module.exports = router;