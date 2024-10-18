const AuctionItems = require('../models/auctionitems.model');

async function getAllAuctionItems() {
    return await AuctionItems.findAll();
}

async function getAuctionItemById(itemId) {
    return await AuctionItems.findOne({ where: { id: itemId } });
}

async function createAuctionItem(itemData) {
    const newItem = await AuctionItems.create(itemData);
    return newItem.id;
}

async function updateAuctionItemById(itemData) {
    itemData.updated_date = new Date();
    const [updatedRows] = await AuctionItems.update(itemData, { where: { id: itemData.id } });
    return updatedRows;
}

async function deleteAuctionItemById(itemId) {
    const deletedRows = await AuctionItems.destroy({ where: { id: itemId } });
    return deletedRows;
}

module.exports = {
    getAllAuctionItems, getAuctionItemById, createAuctionItem, updateAuctionItemById, deleteAuctionItemById
};