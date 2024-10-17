// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');



// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0', // Specification version
    info: {
        title: 'Node.js API with Swagger', // Title
        version: '1.0.0', // API version
        description: 'A simple API using Swagger in Node.js', // Description
    },
    servers: [
        {
            url: 'http://localhost:3000/api', // API server URL
        },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', // Optional, can be "JWT" or any token format your API uses
          },
        }
    },    
};

// Options for Swagger docs
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/user.route.js', './routes/auction.route.js'], // Files containing annotations as above
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
