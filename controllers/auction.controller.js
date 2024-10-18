const { getAllAuctionItems, getAuctionItemById, createAuctionItem, updateAuctionItemById, deleteAuctionItemById } = require('../services/auction.service');

exports.getAllAuctionItems = async (req, res) => {
    try {
        const list = await getAllAuctionItems();

        if (list) {
            res.json(list);
        } else {
            res.status(404).json({ message: 'No Auction Items present' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAuctionItemById = async (req, res) => {
    const itemId = req.params.id;

    try {
        const item = await getAuctionItemById(itemId);

        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createAuctionItem = async (req, res) => {
    const newItem = req.body;

    try {
        const createdItem = await createAuctionItem(newItem);

        res.status(201).json(createdItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateAuctionItemById = async (req, res) => {

    const updatedData = req.body;

    try {
        const item = await getAuctionItemById(updatedData.id);

        if (!item) {
            // If item not found, send 404 response
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update the item with the new data
        const updatedItem = await updateAuctionItemById(updatedData);

        if (updatedItem === 0) {
            return res.status(404).json({ error: 'Auction not found or no changes made' });
        }

        // Send updated item as JSON response
        res.json({ message: 'Auction data updated successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteAuctionItemById = async (req, res) => {
    const itemId = req.params.id;

    try {
        const item = await getAuctionItemById(itemId);

        if (!item) {
            // If item not found, send 404 response
            return res.status(404).json({ message: 'Item not found' });
        }

        // Delete the item
        await deleteAuctionItemById(itemId);

        // Send success response
        res.status(204).json({ message: 'Item deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
