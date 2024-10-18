//Purpose: This model will be used to interact with the auction_items table in the database. 
//This model will be used by the application to perform CRUD operations on the auction_items table and update the current_highest_bid whenever a higher bid is placed
//The model will define the structure of the table and the data types of the columns. 
//The model will also define any relationships between this table and other tables in the database. 
//The model will be exported and used in other files to interact with the database.
const { sq } = require('../config/db');
const { DataTypes } = require('sequelize');

/**
 * Model representing auction items.
 * 
 * @typedef {Object} AuctionItems
 * @property {number} id - The unique identifier for the auction item.
 * @property {string} title - The title of the auction item. Must be unique and cannot be null.
 * @property {string} description - The description of the auction item.
 * @property {DECIMAL} starting_bid - The starting bid amount for the auction item. Cannot be null.
 * @property {Date} bid_end_date - The date when the bidding starts.
 * @property {Date} created_date - The date when the auction item was created. Defaults to the current date and time.
 * @property {Date} updated_date - The date when the auction item was last updated. Defaults to the current date and time.
 * @property {DECIMAL} current_highest_bid - The date when the bidding ends.
 * @property {DECIMAL} previous_bidder_id - The unique identifier of the previous bidder/user.
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
    starting_bid: {
        type: DataTypes.DECIMAL(10, 2),
       
    },
    bid_end_date: {
        type: DataTypes.DATE,
       
    },
    current_highest_bid: {
        type: DataTypes.DECIMAL(10, 2),
       
    },
    created_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_date: {
        type: DataTypes.DATE,
        
    },   
    previous_bidder_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    freezeTableName: true,
    tableName: 'auction_items',
    timestamps: false,
    schema: 'public'
});

module.exports = AuctionItems;


