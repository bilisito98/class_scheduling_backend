// backend/src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './prisma.js';
import authRouter from './routes/auth.js';
import tutoresRouter from './routes/tutores.js';
import estudiantesRouter from './routes/estudiantes.js';
import clasesExtraRouter from './routes/clasesExtra.js';
import modulosRouter from './routes/modulos.js';
import notificacionesRouter from './routes/notificaciones.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Montar rutas explícitas con .js
app.use('/api/auth', authRouter);
app.use('/api/tutores', tutoresRouter);
app.use('/api/estudiantes', estudiantesRouter);
app.use('/api/clases-extra', clasesExtraRouter);
app.use('/api/modulos', modulosRouter);
app.use('/api/notificaciones', notificacionesRouter);

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Health check error:', err);
    res.status(500).json({ status: 'error' });
  }
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => console.log(`🚀 Backend corriendo en puerto ${PORT}`));
