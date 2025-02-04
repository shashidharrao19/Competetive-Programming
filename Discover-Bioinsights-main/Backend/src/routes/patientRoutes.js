// backend/routes/patientRoutes.js
import express from 'express';
import * as patientController from '../controllers/patientController.js';
import { searchPatient } from '../tables/patientTable.js';

const router = express.Router();

// Get all patients
router.get('/', patientController.getPatients);

// Register a new patient
router.post('/register', patientController.registerPatient);

router.get('/search', async (req, res) => {
    const { searchType, searchValue } = req.query;
    try {
      const results = await searchPatient(searchType, searchValue);
      res.json(results);
    } catch (error) {
      console.error('Error in patient search:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


router.put('/update', patientController.updatePatientDetails);

export default router;
