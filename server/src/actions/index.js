import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import { connectToDB } from '../db/index.js';
import User from '../models/user.js'
const saltRounds = 10;

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function registerUser(req, res) {
    connectToDB()
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Error creating user' });
    }
}

export async function loginUser(req, res) {
    connectToDB()
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid email or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid email or password');

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '3600s' });

        res.json({ token, user: { username: user.username, email: user.email, id: user._id } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export function verifyJWT(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
    //console.log(token)
    if (!token) return res.status(401).json({ message: "Unauthorized" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch (err) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}
