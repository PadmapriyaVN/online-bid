const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/jwtAuth');


const { getAllUsers, getUserById, validateUser, createUser } = require('../controllers/user.controller');

// Define user-related routes
router.get('/', getAllUsers);

router.get('/:id', getUserById);


router.post('/loginAuth', validateUser);
router.post('/createUser', createUser);


module.exports = router;
