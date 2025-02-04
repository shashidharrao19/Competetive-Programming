// backend/routes/dashboardRoutes.js
import express from 'express';
import * as dashboardController from '../controllers/dashboardController.js';

const router = express.Router();

// Get Current ER status
router.get('/currentStatus', dashboardController.getCurrentStatus);

// Get Metrics
router.get('/metrics', dashboardController.getMetrics);

// Get Staff details
router.get('/staff', dashboardController.getStaff);

export default router;
