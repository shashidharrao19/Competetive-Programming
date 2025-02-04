// index.js or app.js
import express from 'express';
import cors from 'cors';

import authRoute from './routes/authRoute.js';
import patientRoutes from './routes/patientRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import encounterRoutes from './routes/encounterRoutes.js';
import vitalsRoutes from './routes/vitalsRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/patients', patientRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/encounter', encounterRoutes);
app.use('/api/vitals', vitalsRoutes)

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

export default app;
