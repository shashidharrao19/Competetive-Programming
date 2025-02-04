// src/routes/vitalsRoutes.js

import express from "express";
import { createVitalsEncounter, updateVitals, getVitalsByPatientID } from "../controllers/vitalsController.js";

const router = express.Router();

// Route to get all vitals records by PatientID
router.get("/:patientID", getVitalsByPatientID);

// Route to create a new vitals encounter
router.post("/create", createVitalsEncounter);

// Route to update an existing vitals record
router.put("/update", updateVitals);


export default router;
