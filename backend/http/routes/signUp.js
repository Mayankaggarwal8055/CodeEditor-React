import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.userRecord.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(password, salt);

        const userRecord = await prisma.userRecord.create({
            data: { name, email, password: hashed },
        });

        const token = jwt.sign(
            { userId: userRecord.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 86400000,
        });

        const user = await prisma.userRecord.findUnique({
            where: { id: userRecord.id },
            select: { id: true, name: true, email: true },
        });

        res.status(201).json({
            user,
            message: 'Signup successful',
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Signup failed' });
    }
});

export default router;
