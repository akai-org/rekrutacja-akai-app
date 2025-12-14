import {jwtService} from "../services.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        req.user = jwtService.verifyToken(token);

        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};