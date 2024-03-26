// Checking importation from terminal 
const jwt = require('jsonwebtoken');

// Defining constant
const JWT_SECRET = 'Harryisagoodb$y';

const fetchUser = (req, res, next) => {

    // Extract JWT token from request header
    const token = req.header('auth-token');
    
    if (!token) {//Checking presence of token
        return res.status(401).send({ error: "Please authenticate with a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);// Verifying token

        req.user = data.user;// Extracting user data
        next(); // Make sure to call next to pass control to the next middleware or route handler

    // Error handling
    } catch (error) {
        res.status(401).send({ error: "Please authenticate with a valid token" });
    }
};

module.exports = fetchUser;//Exporting middleware