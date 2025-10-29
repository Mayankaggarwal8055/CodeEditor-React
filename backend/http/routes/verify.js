import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.userRecord.findUnique({
      where: { id: verified.userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        projects: {            
          select: {
            id: true,
            html: true,
            css: true,
            js: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },   
        },
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      projects: user.projects || [],
    });
  } catch (err) {
    console.error('JWT or DB error:', err);
    return res.status(401).json({ error: 'Invalid token or user not found' });
  }
});

export default router;
