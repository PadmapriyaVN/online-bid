// Purpose: This model will be used to interact with the user_profiles table in the database. The model will define the structure of the table and the data types of the columns. The model will also define any relationships between this table and other tables in the database. This model will be used by the application to perform CRUD operations on the user_profiles table. The model will be exported and used in other files to interact with the database.
const { sq } = require('../config/db');
const { DataTypes } = require('sequelize');

/**
 * UserProfile model definition.
 * Represents a user profile in the online bidding system.
 * 
 * @typedef {Object} UserProfile
 * @property {number} id - The unique identifier for the user profile.
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {string} email - The email address of the user, must be unique.
 * @property {string} password - The password for the user's account.
 * @property {Date} created_date - The date when the user profile was created.
 * @property {Date} lastupdated_date - The date when the user profile was last updated.
 * @property {boolean} receive_outbid_email - Indicates if the user wants to receive outbid emails.
 * 
 * @see {@link https://sequelize.org/master/manual/model-basics.html|Sequelize Model Basics}
 */
const UserProfile = sq.define('UserProfile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    lastupdated_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    receive_outbid_email: {
        type: DataTypes.BOOLEAN,
    }
}, {
    freezeTableName: true,
    tableName: 'user_profiles',
    timestamps: false,
    schema: 'public'
});

module.exports = UserProfile;


