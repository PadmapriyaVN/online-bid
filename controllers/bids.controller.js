const { getAuctionItemById } = require('../services/auction.service');
const Bids = require('../models/bids.model');
const AuctionItems = require('../models/auctionitems.model');
const BidsHistory = require('../models/bidshistory.model');

const { getAllBids } = require('../services/bids.service');
const { getUserById } = require('../services/user.service');


// Notification function (can be an email, SMS, etc.)
async function sendNotification(userId, message) {
    const user = await getUserById(userId);
    if (user) {
        // Simulate sending a notification (e.g., Email or SMS)
        console.log(`Notification sent to ${user.email}: ${message}`);
    }
}

exports.getAllBidsList = async (req, res) => {
    try {
        const list = await getAllBids();

        if (list) {
            res.json(list);
        } else {
            res.status(404).json({ message: 'No Bids present' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.submitBid = async (req, res) => {
    const { userId, auctionItemId, bidAmount } = req.body;

    try {
        // Find the auction item by ID
        const auctionItem = await getAuctionItemById(auctionItemId);

        if (!auctionItem) {
            return res.status(404).json({ error: 'Auction item not found' });
        }

        // Check if the new bid is higher than the current highest bid
        if (bidAmount <= auctionItem.current_highest_bid) {
            return res.status(400).json({ error: 'Your bid must be higher than the current highest bid.' });
        }

        // Store the previous highest bid and the previous bidder ID
        const previousBidAmount = auctionItem.current_highest_bid;
        const previousBidderId = auctionItem.previous_bidder_id;

        // Update the auction item with the new highest bid
        auctionItem.current_highest_bid = bidAmount;
        auctionItem.previous_bidder_id = userId; // Update with the new user ID
        // Update the auction item with the new highest bid using the Sequelize `update` method
        await AuctionItems.update(
            {
                current_highest_bid: bidAmount,
                previous_bidder_id: userId,
            },
            { where: { id: auctionItemId } }
        );

        // Insert a new record into the bids table for the user
        await Bids.create({
            auction_item_id: auctionItemId,
            user_id: userId,
            bid_amount: bidAmount,
        });

        // Insert a new record into the bid history table
        await BidsHistory.create({
            auction_item_id: auctionItemId,
            previous_bid: previousBidAmount,
            new_bid: bidAmount,
            user_id: userId,
        });

        // Notify the previous bidder, if there was one
        if (previousBidderId) {
            const message = `You have been outbid on auction item ${auctionItemId}. New highest bid is $${bidAmount}.`;
            await sendNotification(previousBidderId, message);
        }

        // Respond with success
        res.status(200).json({
            message: 'Bid submitted successfully!',
            auctionItemId: auctionItemId,
            newBidAmount: bidAmount,
        });
    } catch (error) {
        console.error('Error submitting bid:', error);
        res.status(500).json({ error: 'An error occurred while submitting the bid.' });
    }
};