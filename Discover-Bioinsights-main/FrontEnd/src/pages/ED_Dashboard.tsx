import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  User,
  Users,
  Clock,
  BedDouble,
  Syringe,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import PatientList from '../components/PatientsList/PatientList'
import { fetchCurrentStatus, fetchMetrics, fetchStaffDetails } from '../api/dashboardService';

export default function EDDashboard({ accessLevel }) {

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  const [erStatus, setERstatus] = useState({
    patientsInER: '',
    avgWait: '',
    maxWait: '',
    bedsOccupied: '',
    bedsAvailable: '',
    bedsCleaning: '',
    staffOnDuty: { doctors: '', nurses: '' },
    triageDistribution: {
      critical: '',
      urgent: '',
      lessUrgent: '',
      totalTriage: '',
    },
  });

  useEffect(() =>{
    const loadCurrentStatus = async() =>{
      try{
        const data  = await fetchCurrentStatus();
        setERstatus(data);
      } catch(error){
        console.log("Failed to load Current Status",error);
      }
    }

    loadCurrentStatus();
  },[])

  
  

 

  const [erMetrics, setERmetrics] = useState({
    currentDate: new Date().toLocaleDateString(),
    avgDoorToDoorTime: "",
    totalPatientsSeen: "",
    totalPatientsSeenChange: "",
    admissionRate: "",
    leftWithoutSeen: "",
    leftWithoutSeenChange: "",
    patientSatisfaction: "",
    patientSatisfactionChange: "",
    avgTreatmentTime: "",
    avgTreatmentTimeChange: "",
    resourceUtilization: "",
    resourceUtilizationChange: "",
    readmissionRate: "",
    readmissionRateChange: ""
  })

  useEffect(() =>{
    const loadERmetrics = async() =>{
      try{
        const data  = await fetchMetrics();
        setERmetrics(data);
      } catch(error){
        console.log("Failed to load ER Metrics",error);
      }
    }

    loadERmetrics();
  },[])

  const [staffStatus, setStaffStatus] = useState({
    doctors : '',
    nurses: ''
  });

  useEffect(()=>{
    const loadStaffDetails = async() =>{
      try{
        const data = await fetchStaffDetails();
        setStaffStatus(data);
      }
      catch(error){
        console.log("Failed to load staff details",error);
      }
    }

    loadStaffDetails();
  },[])

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">ED Dashboard</h1>
        <div className="space-x-2">
          <Link to="/newpatientregistration">
            <Button variant="outline">New Patient Registration</Button>
          </Link>
          <Link to="/findpatient">
            <Button variant="outline">Return Patient Registration</Button>
          </Link>
        </div>
      </div>

      {/* Current Status of ER */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Status of ER</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Dynamic rendering based on mock data */}
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <Users className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold mb-2">Patient Overview</h3>
              <p className="text-2xl font-bold">{erStatus?.patientsInER}</p>
              <p className="text-sm text-gray-600">patients in ER</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <Clock className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold mb-2">Waiting Times</h3>
              <p className="text-2xl font-bold">{erStatus?.avgWait} min</p>
              <p className="text-sm text-gray-600">Avg. Wait</p>
              <p className="text-sm text-gray-600">
                Max Wait: {erStatus?.maxWait} min
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <BedDouble className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold mb-2">Bed Status</h3>
              <div className="w-full mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Occupied</span>
                  <span className="text-sm font-semibold">
                    {erStatus?.bedsOccupied}
                  </span>
                </div>
                <Progress
                  value={
                    (erStatus.bedsOccupied /
                      (erStatus.bedsOccupied +
                        erStatus.bedsAvailable +
                        erStatus.bedsCleaning)) *
                    100
                  }
                  className="h-2"
                />
              </div>
              <div className="w-full mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Available</span>
                  <span className="text-sm font-semibold">
                    {erStatus?.bedsAvailable}
                  </span>
                </div>
                <Progress
                  value={
                    (erStatus.bedsAvailable /
                      (erStatus.bedsOccupied +
                        erStatus.bedsAvailable +
                        erStatus.bedsCleaning)) *
                    100
                  }
                  className="h-2"
                />
              </div>
              <div className="w-full mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Cleaning</span>
                  <span className="text-sm font-semibold">
                    {erStatus?.bedsCleaning}
                  </span>
                </div>
                <Progress
                  value={
                    (erStatus.bedsCleaning /
                      (erStatus.bedsOccupied +
                        erStatus.bedsAvailable +
                        erStatus.bedsCleaning)) *
                    100
                  }
                  className="h-2"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <Syringe className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold mb-2">Triage Distribution</h3>

              {/* Critical (I) */}
              <div className="w-full mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">I (Critical)</span>
                  <span className="text-sm font-semibold">
                    {erStatus.triageDistribution?.critical}
                  </span>
                </div>
                <Progress
                  value={
                    (erStatus.triageDistribution?.critical /
                      erStatus.triageDistribution?.totalTriage) *
                    100
                  }
                  className="h-2 bg-red-200"
                >
                  <div className="h-full bg-red-500 rounded-full" />
                </Progress>
              </div>

              {/* Urgent (II) */}
              <div className="w-full mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">II (Urgent)</span>
                  <span className="text-sm font-semibold">
                    {erStatus.triageDistribution?.urgent}
                  </span>
                </div>
                <Progress
                  value={
                    (erStatus.triageDistribution?.urgent /
                      erStatus.triageDistribution?.totalTriage) *
                    100
                  }
                  className="h-2 bg-orange-200"
                >
                  <div className="h-full bg-orange-500 rounded-full" />
                </Progress>
              </div>

              {/* Less Urgent (III) */}
              <div className="w-full mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">III (Less Urgent)</span>
                  <span className="text-sm font-semibold">
                    {erStatus?.triageDistribution?.lessUrgent}
                  </span>
                </div>
                <Progress
                  value={
                    (erStatus?.triageDistribution.lessUrgent /
                      erStatus?.triageDistribution.totalTriage) *
                    100
                  }
                  className="h-2 bg-yellow-200"
                >
                  <div className="h-full bg-yellow-500 rounded-full" />
                </Progress>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Staff On Duty</h3>
            <div className="flex justify-around">
              <div className="flex items-center">
                <User className="w-6 h-6 text-primary mr-2" />
                <span>Doctors: {staffStatus?.doctors}</span>
              </div>
              <div className="flex items-center">
                <User className="w-6 h-6 text-primary mr-2" />
                <span>Nurses: {staffStatus?.nurses}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Performance Metrics ({currentDate}, since 12:00 AM)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Avg. Door-to-Door Time */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Avg. Door-to-Door Time</h3>
              <p className="text-2xl font-bold">
                {erMetrics?.avgDoorToDoorTime} min
              </p>
            </div>

            {/* Total Patients Seen */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Total Patients Seen</h3>
              <p className="text-2xl font-bold">
                {erMetrics?.totalPatientsSeen}{" "}
                <span className="text-green-500 text-sm">
                  {erMetrics?.totalPatientsSeenChange}% vs. Yesterday
                </span>
              </p>
            </div>

            {/* Admission Rate */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Admission Rate</h3>
              <p className="text-2xl font-bold">{erMetrics?.admissionRate}%</p>
            </div>

            {/* Left Without Being Seen */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Left Without Being Seen</h3>
              <p className="text-2xl font-bold">
                {erMetrics?.leftWithoutSeen}{" "}
                <span className="text-red-500 text-sm">
                  {erMetrics.leftWithoutSeenChange}% vs. Last Week
                </span>
              </p>
            </div>

            {/* Patient Satisfaction */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Patient Satisfaction</h3>
              <p className="text-2xl font-bold">
                {erMetrics.patientSatisfaction}%{" "}
                <span className="text-green-500 text-sm">
                  {erMetrics.patientSatisfactionChange}%
                </span>
              </p>
            </div>

            {/* Avg. Treatment Time */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Avg. Treatment Time</h3>
              <p className="text-2xl font-bold">
                {erMetrics.avgTreatmentTime} min{" "}
                <span className="text-green-500 text-sm">
                  {erMetrics.avgTreatmentTimeChange}%
                </span>
              </p>
            </div>

            {/* Resource Utilization */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Resource Utilization</h3>
              <p className="text-2xl font-bold">
                {erMetrics.resourceUtilization}%{" "}
                <span className="text-green-500 text-sm">
                  {erMetrics.resourceUtilizationChange}%
                </span>
              </p>
            </div>

            {/* Readmission Rate */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Readmission Rate</h3>
              <p className="text-2xl font-bold">
                {erMetrics.readmissionRate}%{" "}
                <span className="text-red-500 text-sm">
                  {erMetrics.readmissionRateChange}%
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <PatientList />
    </>
  );
}
