const { getAllBids } = require('../services/bids.service');

exports.getAllBids = async (req, res) => {
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