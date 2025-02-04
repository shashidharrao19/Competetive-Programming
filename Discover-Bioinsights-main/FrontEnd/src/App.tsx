// App.tsx
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./App.css";

// Importing Pages
import LoginPage from "./pages/LoginPage";
import EDDashboard from "./pages/ED_Dashboard";
import ReturnPatientRegistration from "./pages/Return_Patient_Registration";
import PatientSearchResults from "./pages/Patient_Search_Results";
import ReturnPatientEditRegistration from "./pages/Patient_Registration";
import NewPatientRegistration from "./pages/New_Patient_Registration";
import PatientAdmissionAndTriage from "./pages/Patient_Admission_Triage";
import CPR_Form from "./pages/CPR_form";
import ChestPainCarePathway from "./pages/ChestPain_CarePathway";
import DefaultCarePathway from "./pages/Default_CarePathway";
import STEMIPage from "./pages/STEMIPage";
import ThrombolysisPage from "./pages/ThrombolysisPage";
import NSTEMIPage from "./pages/NSTEMIPage";
import GenericMedicationOrderSet from "./pages/GenericMedicationOrderset";
import VitalsPage from "./pages/VitalsPage";
import EROutcomesPage from "./pages/EROutcomes";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import { useContext, useEffect, useState } from "react";
import { useAuth } from './context/AuthContext';
import MedicationMaster from "./pages/Medication_Master";
import LabMaster from "./pages/LabMaster";

const App = () => {
  const { auth } = useAuth();

  useEffect(()=>{
    console.log(auth?.username);
  },[auth])
  return (
    <BrowserRouter>
     

      { !auth ? (<LoginPage  />) :
      (<div className="flex flex-col min-h-screen bg-background">
        {/* Header */}
        <Header />

        <div className="flex flex-1">
          {/* Navigation Sidebar */}
          <Sidebar userRole ={auth?.role} />
          <div className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route
                path="/eddashboard"
                element={<ProtectedRoute element={<EDDashboard />} />}
              />
              <Route
                path="/findpatient"
                element={
                  <ProtectedRoute element={<ReturnPatientRegistration />} />
                }
              />
              <Route
                path="/PatientSearchResults"
                element={<ProtectedRoute element={<PatientSearchResults />} />}
              />
              <Route
                path="/returnpatientdetailsupdate"
                element={
                  <ProtectedRoute element={<ReturnPatientEditRegistration />} />
                }
              />
              <Route
                path="/newpatientregistration"
                element={
                  <ProtectedRoute element={<NewPatientRegistration />} />
                }
              />
              <Route
                path="/PatientAdmissionTriage"
                element={
                  <ProtectedRoute element={<PatientAdmissionAndTriage userRole ={auth?.role} />} />
                }
              />
              <Route
                path="/cprform"
                element={<ProtectedRoute element={<CPR_Form />} />}
              />
              <Route
                path="/chestpaincarepathway"
                element={<ProtectedRoute element={<ChestPainCarePathway />} />}
              />
              <Route
                path="/defaultcarepathway"
                element={<ProtectedRoute element={<DefaultCarePathway />} />}
              />
              <Route
                path="/stemi"
                element={<ProtectedRoute element={<STEMIPage />} />}
              />
              <Route
                path="/thrombolysis"
                element={<ProtectedRoute element={<ThrombolysisPage />} />}
              />
              <Route
                path="/nstemi"
                element={<ProtectedRoute element={<NSTEMIPage />} />}
              />
              <Route
                path="/medicationorderset"
                element={
                  <ProtectedRoute element={<GenericMedicationOrderSet />} />
                }
              />
              <Route
                path="/vitals"
                element={<ProtectedRoute element={<VitalsPage />} />}
              />
              <Route
                path="/eroutcomes"
                element={<ProtectedRoute element={<EROutcomesPage />} />}
              />
              <Route
                path="/medicationmaster"
                element={<ProtectedRoute element={<MedicationMaster />} />}
              />
              <Route
                path="/labmaster"
                element={<ProtectedRoute element={<LabMaster /> } />}
              />
            </Routes>
          </div>
        </div>
      </div>) }
    </BrowserRouter>
  );
};

export default App;
