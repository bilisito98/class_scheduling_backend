// backend/routes/estudiantes.js
import express from 'express';
import { prisma } from '../prisma.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación JWT
router.use(ensureAuth);

// GET /api/estudiantes/
router.get('/', async (req, res) => {
  try {
    const items = await prisma.estudiante.findMany({
      orderBy: { id: 'asc' }
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/estudiantes/
router.post('/', async (req, res) => {
  try {
    const newItem = await prisma.estudiante.create({
      data: req.body
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/estudiantes/:id
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const updated = await prisma.estudiante.update({
      where: { id },
      data: req.body
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/estudiantes/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.estudiante.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
