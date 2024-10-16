
const { sq } = require('../config/db');
const { DataTypes } = require('sequelize');

/**
 * Model representing auction items.
 * 
 * @typedef {Object} AuctionItems
 * @property {number} id - The unique identifier for the auction item.
 * @property {string} title - The title of the auction item. Must be unique and cannot be null.
 * @property {string} description - The description of the auction item.
 * @property {number} starting_bid_amount - The starting bid amount for the auction item. Cannot be null.
 * @property {Date} bid_start_date - The date when the bidding starts.
 * @property {Date} created_date - The date when the auction item was created. Defaults to the current date and time.
 * @property {Date} lastupdated_date - The date when the auction item was last updated. Defaults to the current date and time.
 */
const AuctionItems = sq.define('AuctionItems', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
       
    },
    starting_bid_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,       
    },
    bid_start_date: {
        type: DataTypes.DATE,
       
    },
    created_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    lastupdated_date: {
        type: DataTypes.DATE,
        
    },   
}, {
    freezeTableName: true,
    tableName: 'auction_items',
    timestamps: false,
    schema: 'public'
});

module.exports = AuctionItems;


