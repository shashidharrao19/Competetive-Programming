// backend/routes/encounterRoutes.js
import express from 'express';
import { createPatientEncounter, updateEncounter, getEncounterByPatientID, updateEncounterAndVitals } from '../controllers/encounterController.js';

const router = express.Router();

router.post('/create', createPatientEncounter);
router.put("/update", updateEncounter);
router.get("/:patientID", getEncounterByPatientID);

router.put('/vitals/update', updateEncounterAndVitals);

export default router;
