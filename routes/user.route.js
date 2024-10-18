const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/jwtAuth');


const { getAllUsers, getUserById, validateUser, createUser, updateUserById  } = require('../controllers/user.controller');

// Define user-related routes
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user table
 *           example: "1"
 *         first_name:
 *           type: string
 *           description: First name of the user
 *           example: "John"
 *         last_name:
 *           type: string
 *           description: Last name of the user
 *           example: "Jacob"
 *         email:
 *           type: string
 *           description: EMail of the user
 *           example: "Jacob@test.com"
 *         password:
 *           type: string
 *           description: Password of the user
 *           example: "********"
 *         receive_outbid_email:
 *           type: boolean
 *           description: Receive outbid email  of the user
 *           example: "true"
 *         created_date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the auction item was created
 *           example: "2024-10-12T07:20:50.52Z"
 *         updated_date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the auction item was last updated
 *           example: "2024-10-13T10:15:30.00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateToken, getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenticateToken, getUserById);

/**
 * @swagger
 * /users/loginAuth:
 *   post:
 *     summary: Authenticate user and get token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/loginAuth', validateUser);

/**
 * @swagger
 * /users/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/createUser', createUser);

/**
 * @swagger
 * /users/{id}:
 *   post:
 *     summary: Update an User Info by ID
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: user not found
 *       500:
 *         description: Internal server error
 */
router.post('/updateUser', updateUserById);

module.exports = router;
