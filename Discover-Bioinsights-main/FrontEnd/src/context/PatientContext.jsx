// src/context/PatientContext.js
import React, { createContext, useContext, useState } from "react";

const PatientContext = createContext();

const initialPatientDetails = {
  firstName: '',
  lastName: '',
  dob: '',
  age: '',
  gender: '',
  height: '',
  weight: '',
  address: '',
  pincode: '',
  phoneNumber: '',
  emailId: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  paymentMethod: 'insurance',
  insuranceName: '',
  insuranceId: ''
};





export const PatientProvider = ({ children }) => {
  const [patientDetails, setPatientDetails] = useState(initialPatientDetails);
  
  const initialTriageDetails ={
    modeOfArrival: "privateVehicle",
    returnWithin72Hours: "no",
    lastDischargeDate: "",
    informedBy: "",
    chiefComplaint: "",
    patientCondition: "",
    systolicBP: "normal",
    respiratoryRate: "normal",
    heartRate: "normal",
    temperature: "normal",
    grbs: "normal",
    glasgowComaScale: "",
    painScore: "",
    airway: "",
    breathing: "",
    circulation: "",
    management: "",
    triageCategory: "",
    knownAllergies: "",
    mewsScore: "",
    bedNumber: "",
  }

  const [triageData, setTriageData] = useState(initialTriageDetails);
  
  // Function to reset patient details to the initial state
  const resetPatientDetails = () => {
    setPatientDetails(initialPatientDetails);
    setTriageData(initialTriageDetails)
  };



  return (
    <PatientContext.Provider
      value={{ patientDetails,triageData, setTriageData, setPatientDetails, resetPatientDetails }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => useContext(PatientContext);
