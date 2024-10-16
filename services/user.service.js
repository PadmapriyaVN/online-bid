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
      receive_outbid_email: receive_outbid_email||true,
    });

    return newUser.id;
   
}

async function getAllUsers() {
    const users = await UserProfile.findAll();
    return users;
}

async function getUserById(userId) {
    const user = await UserProfile.findOne({ where: { id: userId } });
    return user;
}

async function getUserByEmail(email) {
    const user = await UserProfile.findOne({ where: { email } });
    return user;
}

module.exports = { hashPassword, createUser, getAllUsers, getUserById, getUserByEmail };