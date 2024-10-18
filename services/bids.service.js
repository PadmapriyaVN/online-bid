const Bids = require('../models/bids.model');

async function getAllBids() {
    return await Bids.findAll();
}

module.exports = {
    getAllBids
};