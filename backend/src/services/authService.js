import User from "../models/User.js";
import bcrypt from "bcrypt";

export default class AuthService {
    async checkCredentials(email, password) {
        const user = await User.findOne({email});

        if (!user) {
            const error = new Error("Invalid e-mail");
            error.status = 400;
            throw error;
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            const error = new Error("Invalid password");
            error.status = 400;
            throw error;
        }

        return user;
    }

    async register(userData) {
        const {password, ...data} = userData;
        const salt = parseInt(process.env.SALT) || 10;

        const hash = await bcrypt.hash(userData.password, salt);
        const newUser = new User({
            ...data,
            password_hash: hash
        });

        await newUser.save();
    }
}