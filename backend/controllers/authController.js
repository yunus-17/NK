import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

export const signup = async (req, res) => {
    const { name, email, password, adminSecret } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Identity already exists in the corridor." });
        }

        // If adminSecret is provided, verify it and set isAdmin to true
        let isAdmin = false;
        if (adminSecret) {
            if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
                return res.status(401).json({ message: "Invalid clearance code. Unauthorized access detected." });
            }
            isAdmin = true;
        }

        const user = await User.create({
            name,
            email,
            password,
            isAdmin
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error during clearance protocol.", error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: "Invalid identity or cipher." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error during login protocol.", error: error.message });
    }
};
