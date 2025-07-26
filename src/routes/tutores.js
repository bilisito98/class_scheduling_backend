import express from 'express';
import { prisma } from '../prisma.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(ensureAuth);

router.get('/', async (req, res) => {
  const items = await prisma.tutor.findMany();
  res.json(items);
});

router.post('/', async (req, res) => {
  const tutor = await prisma.tutor.create({ data: req.body });
  res.status(201).json(tutor);
});

router.put('/:id', async (req, res) => {
  const tutor = await prisma.tutor.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(tutor);
});

router.delete('/:id', async (req, res) => {
  await prisma.tutor.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
});

export default router;
