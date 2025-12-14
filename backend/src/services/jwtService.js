import jwt from "jsonwebtoken";

export default class JwtService {
    signNewToken(userId) {
        return jwt.sign({_id: userId}, process.env.JWT_PRIVATE_KEY, {expiresIn: '1h'});
    }

    verifyToken(token){
        return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    }
}