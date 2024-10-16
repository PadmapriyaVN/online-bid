// index.js

const express = require('express');


const app = express();
const port = process.env.PORT || 3000;


// Middleware for JSON parsing
app.use(express.json());

// Import the combined routes
const routes = require('./routes');

// Middleware for JSON body parsing
app.use(express.json());

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});


// Use the routes
app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
