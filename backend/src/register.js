import bcrypt from 'bcrypt';
import User from './models/User.js';

const rounds = 10;

export async function registerUser(mail, password) {
    try {
        const hash = await bcrypt.hash(password, rounds);
        const newUser = new User({
            email: mail,
            password_hash: hash
        });
        await newUser.save();
        console.log('user registered');
    } catch (err) {
        console.error('error registering user: ', err);
    }
}
