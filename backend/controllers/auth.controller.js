import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'Account created' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating account', error });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({ email, password });
        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials or User not registered' });
        }
        res.status(200).json({ message: 'Login successful', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}
