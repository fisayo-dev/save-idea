import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Check if token was decoded by that secret key
        req.user = decoded; // Attach decoded user info to the request object
        next();
    } catch (err) {
        console.error('Token verification error:', err);

        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token has expired, please log in again' });
        }

        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token, authentication failed' });
        }

        res.status(500).json({ message: 'An error occurred while processing the token' });
    }
};

export default authMiddleware;
