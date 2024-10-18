//Purpose: This model will be used to interact with the bids table in the database. 
//This model will be used by the application to store the bids performed on a specific Auction item by a user. 
//The model will define the structure of the table and the data types of the columns. 
//The model will also define any relationships between this table and other tables in the database. 
//The model will be exported and used in other files to interact with the database.
const { sq } = require('../config/db');
const { DataTypes } = require('sequelize');

/**
 * Model representing bids.
 * 
 * @typedef {Object} Bids
 * @property {number} id - The unique identifier for the bid.
 * @property {number} auction_item_id - unique identifier of the Auction item.
 * @property {number} user_id - unique identifier of the user.
 * @property {DECIMAL} bid_amount - The  bid amount for the auction item. Cannot be null.
 * @property {Date} bid_time - The date when the bidding done.
 
 */
const Bids = sq.define('Bids', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    auction_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
    },
    user_id: {
        type: DataTypes.INTEGER,   
        allowNull: false,    
    },    
    bid_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, 
    },
    bid_time: {
        type: DataTypes.DATE,
       
    },
    
}, {
    freezeTableName: true,
    tableName: 'bids',
    timestamps: false,
    schema: 'public'
});

module.exports = Bids;


