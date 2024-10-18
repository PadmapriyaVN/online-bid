const bcrypt = require('bcrypt');

const  UserProfile  = require('../models/userprofile.model');


async function hashPassword(password) {
  const saltRounds = 10; // You can adjust the number of salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function createUser(first_name, last_name, email, plainTextPassword, receive_outbid_email) {
    const hashedPassword = await hashPassword(plainTextPassword);

    const newUser = await UserProfile.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
      lastupdated_date: new Date(),
      receive_outbid_email: receive_outbid_email??true,
    });

    return newUser.id;
   
}

async function getAllUsers() {
    return await UserProfile.findAll();
   
}

async function getUserById(userId) {
    return await UserProfile.findOne({ where: { id: userId } });   
}

async function getUserByEmail(email) {
    return await UserProfile.findOne({ where: { email } });   
}

async function updateUserById(userId, userData) {
  userData.updated_date = new Date();
  const [updatedRows] = await UserProfile.update(userData, { where: { id: userId } });
  return updatedRows;
}

module.exports = { hashPassword, createUser, getAllUsers, getUserById, getUserByEmail, updateUserById };