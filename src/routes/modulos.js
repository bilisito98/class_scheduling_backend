import express from 'express';
import { prisma } from '../prisma.js';
import { ensureAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(ensureAuth);

router.get('/', async (req, res) => {
  try {
    const list = await prisma.modulo.findMany({ orderBy: { id: 'asc' } });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newItem = await prisma.modulo.create({ data: req.body });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const updated = await prisma.modulo.update({
      where: { id },
      data: req.body
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.modulo.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
