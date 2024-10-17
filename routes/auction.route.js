const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/jwtAuth');


const { getAllAuctionItems, getAuctionItemById, createAuctionItem, updateAuctionItemById, deleteAuctionItemById } = require('../controllers/auction.controller');

// Define auction-related routes
/**
 * @swagger
 * components:
 *   schemas:
 *     AuctionItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the auction item
 *           example: "12345"
 *         name:
 *           type: string
 *           description: The name of the auction item
 *           example: "Antique Vase"
 *         description:
 *           type: string
 *           description: A detailed description of the auction item
 *           example: "A rare antique vase from the 18th century"
 *         starting_bid:
 *           type: number
 *           description: The starting bid for the auction item
 *           example: 100.00
 *         current_bid:
 *           type: number
 *           description: The current highest bid for the auction item
 *           example: 150.00
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the auction item was created
 *           example: "2024-10-12T07:20:50.52Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the auction item was last updated
 *           example: "2024-10-13T10:15:30.00Z"
 *       required:
 *         - id
 *         - name
 *         - starting_bid
 *         - createdAt
 */

/**
 * @swagger
 * tags:
 *   name: Auctions
 *   description: API for managing auction items
 */

/**
 * @swagger
 * /auction/items:
 *   get:
 *     summary: Get all auction items
 *     tags: [Auctions]
 *     responses:
 *       200:
 *         description: List of auction items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AuctionItem'
 *       500:
 *         description: Internal server error
 */
router.get('/items', getAllAuctionItems);

/**
 * @swagger
 * /auction/items/{id}:
 *   get:
 *     summary: Get auction item by ID
 *     tags: [Auctions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the auction item
 *     responses:
 *       200:
 *         description: Auction item data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuctionItem'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.get('/items/:id', getAuctionItemById);

/**
 * @swagger
 * /auction/items/create:
 *   post:
 *     summary: Create a new auction item
 *     tags: [Auctions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuctionItem'
 *     responses:
 *       201:
 *         description: Auction item created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/items/create', createAuctionItem);

/**
 * @swagger
 * /auction/items/{id}:
 *   put:
 *     summary: Update an auction item by ID
 *     tags: [Auctions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the auction item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuctionItem'
 *     responses:
 *       200:
 *         description: Auction item updated successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.put('/items/:id', updateAuctionItemById);

/**
 * @swagger
 * /auction/items/{id}:
 *   delete:
 *     summary: Delete an auction item by ID
 *     tags: [Auctions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the auction item to delete
 *     responses:
 *       204:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.delete('/items/:id', deleteAuctionItemById);

module.exports = router;


