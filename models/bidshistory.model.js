//Purpose: This model will be used to interact with the bids history table in the database. 
//This model will be used by the application to capture the bids history whenever a bid is placed.
//The model will define the structure of the table and the data types of the columns. 
//The model will also define any relationships between this table and other tables in the database.  
//The model will be exported and used in other files to interact with the database.
const { sq } = require('../config/db');
const { DataTypes } = require('sequelize');

/**
 * Model representing bids history.
 * 
 * @typedef {Object} BidsHistory
 * @property {number} id - The unique identifier for the bid.
 * @property {number} auction_item_id - unique identifier of the Auction item.
 * @property {number} user_id - unique identifier of the user.
 * @property {DECIMAL} previous_bid - The  previous bid amount for the auction item. Cannot be null.
 * @property {DECIMAL} new_bid - The new bid amount for the auction item. Cannot be null.
 * @property {Date} updated_date - The date when the bidding done.
 
 */
const BidsHistory = sq.define('BidsHistory', {
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
    previous_bid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, 
    },
    new_bid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, 
    },
    updated_date: {
        type: DataTypes.DATE,
       
    },
    
}, {
    freezeTableName: true,
    tableName: 'bids_history',
    timestamps: false,
    schema: 'public'
});

module.exports = BidsHistory;


