const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUserById, getUserByEmail, createUser, getAllUsers, updateUserById } = require('../services/user.service');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();

exports.getAllUsers = async (req, res) => {
    try {
        const user = await getAllUsers();

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'No Users present' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await getUserById(userId);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.validateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        // Decrypt the password
        const decryptedBytes = CryptoJS.AES.decrypt(password, process.env.ENCRYPT_SECRETKEY);
        const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
        console.log('decryptedPassword', decryptedPassword);
        if (user) {
            const hashedPassword = user.password;
            const isMatch = await bcrypt.compare(decryptedPassword, hashedPassword);

            if (isMatch) {
                const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token: token, first_name: user.first_name, last_name: user.last_name, email: user.email, receive_outbid_email: user.receive_outbid_email });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email' });
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createUser = async (req, res) => {
    const { first_name, last_name, email, password, receive_outbid_email } = req.body;

    try {
        // Decrypt the password
        const decryptedBytes = CryptoJS.AES.decrypt(password, process.env.ENCRYPT_SECRETKEY);
        const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

        const newUser = await createUser(first_name, last_name, email, decryptedPassword, receive_outbid_email);
        res.json({ id: newUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateUserById = async (req, res) => {
    
    const { userId, first_name, last_name, password } = req.body;

    try {
        const user = await getUserById(userId);
        if (!user) {
            // If item not found, send 404 response
            return res.status(404).json({ message: 'User not found' });
        }

        // Prepare an object with the fields to be updated
        let updateData = {};
        
            updateData.first_name = first_name ?? user.first_name;      
       
            updateData.last_name = last_name ?? user.last_name;
        

        // If password is provided, hash it and include it in the update data
        if (password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            updateData.password = hashedPassword;
        }

        // Update the item with the new data
        const updatedItem = await updateUserById(userId, updateData);

        if (updatedItem === 0) {
            return res.status(404).json({ error: 'User not found or no changes made' });
          }
      
        
        // Send updated item as JSON response
        res.json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

