import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    try {

        
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        

        const { html, css, js } = req.body;

        const projectData = await prisma.projectData.create({
            data: {
                html,
                css,
                js,
                userId: verified.userId,  
            },
        });

        res.status(201).json({ project: projectData });
    } catch (err) {
        console.error("Error saving project:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
