const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/jwtAuth');


const { getAllAuctionItems, getAuctionById, createAuctionItem, updateAuctionItem, deleteAuctionItem } = require('../controllers/auction.controller');

// Define auction-related routes
router.get('/', getAllAuctionItems);

router.get('/:id', getAuctionById);

router.post('/items/create', createAuctionItem);
router.put('/items/:id', updateAuctionItem);
router.delete('/items/:id', deleteAuctionItem);

module.exports = router;


