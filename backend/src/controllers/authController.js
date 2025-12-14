import {authService, jwtService} from "../services.js"

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await authService.checkCredentials(email, password);

        const token = jwtService.signNewToken(user._id);

        const data = {
            user: {
                name: user.name,
                surname: user.surname,
                email: user.email,
            },
            token
        }

        res.json(data);
    } catch (error) {
        const message = error.message || "Internal server error";
        const status = error.status || 500;
        res.status(status).json({message: message});
    }
};

const registerUser = async (req, res) => {
    try {
        const { email, password, name, surname } = req.body;

        await authService.register({ email, password, name, surname });

        res.status(201).json({message: "Successfully register user"});
    } catch (error) {
        const message = error.message || "Internal server error";
        const status = error.status || 500;
        res.status(status).json({message: message});
    }
};

export default {
    loginUser,
    registerUser,
}