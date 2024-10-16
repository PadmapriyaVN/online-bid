const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUserById, getUserByEmail, createUser, getAllUsers } = require('../services/user.service');


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

        if (user) {
            const hashedPassword = user.password;
            const isMatch = await bcrypt.compare(password, hashedPassword);

            if (isMatch) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
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
       
        const newUser = await createUser(first_name, last_name, email, password, receive_outbid_email);
        res.json({ id: newUser });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
  
