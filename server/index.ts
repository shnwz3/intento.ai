import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { getAllowedOrigins, PORT } from './config.js';
import healthRoutes from './routes/health.js';
import accountRoutes from './routes/account.js';

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || getAllowedOrigins().includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed.`));
    },
  }),
);
app.use(express.json());

app.use(healthRoutes);
app.use(accountRoutes);

app.listen(PORT, () => {
  console.log(`Intento API listening on http://localhost:${PORT}`);
});
