import { useState } from "react";
// import Image from 'next/image'
// import a from 'next/a'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAccessLevel } from "../utils/roleCheck";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateEncounterAndVitals } from '../api/vitalsService';
import { usePatient } from '../context/PatientContext';

export default function PatientAdmissionAndTriage({ userRole }) {
  
  const location =   useLocation();
  const { patientDetails } = location.state;
  
  const { triageData, setTriageData } = usePatient();
  const navigate = useNavigate();
  const isEditable = getAccessLevel("triage", userRole);
  const [formData, setFormData] = useState({...triageData, name: patientDetails?.firstName + " " + patientDetails?.lastName,
    patientID: patientDetails.patientID} );

  const [errors, setErrors] = useState({
    name: false,
    patientId: false,
    modeOfArrival: false,
    returnWithin72Hours: false,
    lastDischargeDate: false,
    informedBy: false,
    chiefComplaint: false,
    patientCondition: false,
    systolicBP: false,
    respiratoryRate: false,
    heartRate: false,
    temperature: false,
    grbs: false,
    glasgowComaScale: false,
    painScore: false,
    airway: false,
    breathing: false,
    circulation: false,
    management: false,
    triageCategory: false,
    knownAllergies: false,
    mewsScore: false,
    bedNumber: false,
  });

  const [chiefComplaints, setChiefComplaints] = useState([]);
  const [availableBeds, setAvailableBeds] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const complaints = await getChiefComplaints();
  //     const beds = await getAvailableBeds();
  //     setChiefComplaints(complaints);
  //     setAvailableBeds(beds);
  //   };
  //   fetchData();
  // }, []);

  function calculateReturnPatientDuration(dob) {
    const inputDate = new Date(dob);
    const currentDate = new Date();
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate - inputDate;
  
    // Convert milliseconds to hours
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  
    // Check if the difference is more than 72 hours
    if (differenceInHours < 72) {
      return "yes";
    } else {
      return "no";
    }
  }


  const handleInputChange = (e) => {
    
    if (!isEditable) return;
    const { name, value } = e.target;
    // Check if the input field is for date of birth
    console.log(name)
    if (name === "lastDischargeDate") {
      const result = calculateReturnPatientDuration(value);
      console.log(result);
      setFormData((prev) => ({ ...prev,   lastDischargeDate: value ,returnWithin72Hours: result }) );
    } 
    else{
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    

  };

  const handleRadioChange = (name, value) => {
    if (!isEditable) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const mandatoryFields = [
      "modeOfArrival",
      "returnWithin72Hours",
      "lastDischargeDate",
      "informedBy",
      "chiefComplaint",
      "patientCondition",
      "systolicBP",
      "respiratoryRate",
      "heartRate",
      "temperature",
      "grbs",
      "glasgowComaScale",
      "painScore",
      "airway",
      "breathing",
      "circulation",
      "management",
      "triageCategory",
      "bedNumber",
    ];

    mandatoryFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
// Need to check the MEWS Score Algorithm
  const handleGenerateMEWS = () => {
    const { temperature, heartRate, respiratoryRate, systolicBP } = formData;
    let score = 0;

    // MEWS Algorithm
    if (systolicBP <= 70) score += 3;
    else if (systolicBP <= 80) score += 2;
    else if (systolicBP <= 100) score += 1;
    console.log(systolicBP);


    if (heartRate < 40) score += 3;
    else if (heartRate <= 50) score += 2;
    else if (heartRate >= 130) score += 3;

    if (respiratoryRate < 9) score += 3;
    else if (respiratoryRate >= 30) score += 3;

    if (temperature < 35 || temperature > 38.4) score += 3;
    
    setFormData(prev => ({ ...prev, mewsScore: score.toString() }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    

    if(validateForm()){
      
      try {
  
        await updateEncounterAndVitals(formData);
        setFormData(formData);
        setTriageData(formData);
        if (formData.triageCategory === "I") {
          navigate("/cprform", { state:{ patientDetails}});
        } else if (formData.chiefComplaint === "chest-pain") {
          navigate("/screen4a");
        } else {
          navigate("/screen4b");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Failed to submit data.");
      }
    }
  };


  const getFieldStyle = (fieldName) => {
    
    return errors[fieldName] ? "border-red-400" : "border-gray-300";
  };

  return (
    <>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Patient Admission and Triage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="From screen #1"
                  className={getFieldStyle("name")}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientID"
                  name="patientID"
                  value={formData.patientID}
                  onChange={handleInputChange}
                  placeholder="From screen #2"
                  readOnly
                  className={getFieldStyle("patientID")}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">ER Admission</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mode of arrival to ER</Label>
                  <RadioGroup
                    name="modeOfArrival"
                    value={formData.modeOfArrival}
                    onValueChange={(value) =>
                      handleRadioChange("modeOfArrival", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="ambulance"
                        id="ambulance"
                        className={getFieldStyle("modeOfArrival")}
                      />
                      <Label htmlFor="ambulance">Ambulance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="privateVehicle"
                        id="privateVehicle"
                        className={getFieldStyle("modeOfArrival")}
                      />
                      <Label htmlFor="privateVehicle">Private vehicle</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Return to ER within 72 hours</Label>
                  <RadioGroup
                    name="returnWithin72Hours"
                    value={formData.returnWithin72Hours}
                    onValueChange={(value) =>
                      handleRadioChange("returnWithin72Hours", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="yes"
                        id="return-yes"
                        className={getFieldStyle("returnWithin72Hours")}
                      />
                      <Label htmlFor="return-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="no"
                        id="return-no"
                        className={getFieldStyle("returnWithin72Hours")}
                      />
                      <Label htmlFor="return-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="lastDischargeDate">Last Discharge date</Label>
                  <Input
                    id="lastDischargeDate"
                    name="lastDischargeDate"
                    type="date"
                    value={formData.lastDischargeDate}
                    onChange={handleInputChange}
                    className={getFieldStyle("lastDischargeDate")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Informed by</Label>
                  <RadioGroup
                    name="informedBy"
                    value={formData.informedBy}
                    onValueChange={(value) =>
                      handleRadioChange("informedBy", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="self"
                        id="self"
                        className={getFieldStyle("informedBy")}
                      />
                      <Label htmlFor="self">Self</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="attendant"
                        id="attendant"
                        className={getFieldStyle("informedBy")}
                      />
                      <Label htmlFor="attendant">Attendant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="police"
                        id="police"
                        className={getFieldStyle("informedBy")}
                      />
                      <Label htmlFor="police">Police</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="paramedic"
                        id="paramedic"
                        className={getFieldStyle("informedBy")}
                      />
                      <Label htmlFor="paramedic">Paramedic</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Triage Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Patient condition at arrival</Label>
                  <RadioGroup
                    name="patientCondition"
                    value={formData.patientCondition}
                    onValueChange={(value) =>
                      handleRadioChange("patientCondition", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="alert"
                        id="alert"
                        className={getFieldStyle("patientCondition")}
                      />
                      <Label htmlFor="alert">Alert</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="verbal"
                        id="verbal"
                        className={getFieldStyle("patientCondition")}
                      />
                      <Label htmlFor="verbal">Verbal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="pain"
                        id="pain"
                        className={getFieldStyle("patientCondition")}
                      />
                      <Label htmlFor="pain">Pain</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="unconsciousness"
                        id="unconsciousness"
                        className={getFieldStyle("patientCondition")}
                      />
                      <Label htmlFor="unconsciousness">Unconsciousness</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="systolicBP">Systolic BP</Label>
                  <Select
                    name="systolicBP"
                    value={formData.systolicBP}
                    onValueChange={(value) =>
                      handleRadioChange("systolicBP", value)
                    }
                    
                  >
                    <SelectTrigger className={getFieldStyle("systolicBP")}>
                      <SelectValue
                        placeholder="BP Range"
                        className={getFieldStyle("systolicBP")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal (90-140)</SelectItem>
                      <SelectItem value="low">Low (&lt;90)</SelectItem>
                      <SelectItem value="high">High (&gt;140)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
                  <Select
                    name="respiratoryRate"
                    value={formData.respiratoryRate}
                    onValueChange={(value) =>
                      handleRadioChange("respiratoryRate", value)
                    }
                   
                  >
                    <SelectTrigger className={getFieldStyle("respiratoryRate")}>
                      <SelectValue placeholder="RR Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal (12-20)</SelectItem>
                      <SelectItem value="low">Low (&lt;12)</SelectItem>
                      <SelectItem value="high">High (&gt;20)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate</Label>
                  <Select
                    name="heartRate"
                    value={formData.heartRate}
                    onValueChange={(value) =>
                      handleRadioChange("heartRate", value)
                    }
                  >
                    <SelectTrigger className={getFieldStyle("heartRate")}>
                      <SelectValue placeholder="HR Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal (60-100)</SelectItem>
                      <SelectItem value="low">Low (&lt;60)</SelectItem>
                      <SelectItem value="high">High (&gt;100)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Select
                    name="temperature"
                    value={formData.temperature}
                    onValueChange={(value) =>
                      handleRadioChange("temperature", value)
                    }
                  >
                    <SelectTrigger className={getFieldStyle("temperature")}>
                      <SelectValue placeholder="Temp Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">
                        Normal (36.5-37.5°C)
                      </SelectItem>
                      <SelectItem value="low">Low (&lt;36.5°C)</SelectItem>
                      <SelectItem value="high">High (&gt;37.5°C)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="grbs">GRBS (mg/dL)</Label>
                  <Select
                    name="grbs"
                    value={formData.grbs}
                    onValueChange={(value) => handleRadioChange("grbs", value)}
                  >
                    <SelectTrigger className={getFieldStyle("grbs")}>
                      <SelectValue placeholder="GRBS Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal (70-140)</SelectItem>
                      <SelectItem value="low">Low (&lt;70)</SelectItem>
                      <SelectItem value="high">High (&gt;140)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="glasgowComaScale">Glasgow Coma Scale</Label>
                  <Select
                    name="glasgowComaScale"
                    value={formData.glasgowComaScale}
                    onValueChange={(value) =>
                      handleRadioChange("glasgowComaScale", value)
                    }
                  >
                    <SelectTrigger className={getFieldStyle("glasgowComaScale")}>
                      <SelectValue placeholder="3-15" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(13)].map((_, i) => (
                        <SelectItem key={i} value={`${i + 3}`}>
                          {i + 3}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="painScore">Pain score</Label>
                  <Select
                    name="painScore"
                    value={formData.painScore}
                    onValueChange={(value) =>
                      handleRadioChange("painScore", value)
                    }
                  >
                    <SelectTrigger className={getFieldStyle("painScore")}>
                      <SelectValue placeholder="1-10" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => (
                        <SelectItem key={i} value={`${i + 1}`}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Clinical Assessment of Behavior
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Airway</Label>
                  <RadioGroup
                    name="airway"
                    value={formData.airway}
                    onValueChange={(value) =>
                      handleRadioChange("airway", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="patentProtected"
                        id="patentProtected"
                        className={getFieldStyle("airway")}
                      />
                      <Label htmlFor="patentProtected">
                        Patent & Protected
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compromised" id="compromised" className={getFieldStyle("airway")}/>
                      <Label htmlFor="compromised">Compromised</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Breathing</Label>
                  <RadioGroup
                    name="breathing"
                    value={formData.breathing}
                    onValueChange={(value) =>
                      handleRadioChange("breathing", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="spontaneous" id="spontaneous" className={getFieldStyle("breathing")}/>
                      <Label htmlFor="spontaneous">Spontaneous</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="abnormal" id="abnormal" className={getFieldStyle("breathing")} />
                      <Label htmlFor="abnormal">Abnormal</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label>Circulation</Label>
                  <RadioGroup
                    name="circulation"
                    value={formData.circulation}
                    onValueChange={(value) =>
                      handleRadioChange("circulation", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="adequate" id="adequate" className={getFieldStyle("circulation")}/>
                      <Label htmlFor="adequate">Adequate</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Management</Label>
                  <RadioGroup
                    name="management"
                    value={formData.management}
                    onValueChange={(value) =>
                      handleRadioChange("management", value)
                    }
                  >
                    <div className="flex items-center space-x-2">

                      <RadioGroupItem value="inadequate" id="inadequate" className={getFieldStyle("circulation")}/>
                      <Label htmlFor="inadequate">Inadequate</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Management</Label>
                  <RadioGroup
                    name="management"
                    value={formData.management}
                    onValueChange={(value) =>
                      handleRadioChange("management", value)
                    }
                  >
                    <div className="flex items-center space-x-2">

                      <RadioGroupItem value="ivAccess" id="ivAccess" className={getFieldStyle("management")}/>
                      <Label htmlFor="ivAccess">IV Access</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cpr" id="cpr" className={getFieldStyle("management")}/>
                      <Label htmlFor="cpr">CPR</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Triage category</Label>
              <RadioGroup
                name="triageCategory"
                value={formData.triageCategory}
                onValueChange={(value) =>
                  handleRadioChange("triageCategory", value)
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="I" id="triage-I" className={getFieldStyle("triageCategory")} />
                  <Label htmlFor="triage-I">I</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="II" id="triage-II" className={getFieldStyle("triageCategory")}/>
                  <Label htmlFor="triage-II">II</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="III" id="triage-III" className={getFieldStyle("triageCategory")}/>
                  <Label htmlFor="triage-III">III</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="knownAllergies">Known allergies if any</Label>
              <Textarea
                id="knownAllergies"
                name="knownAllergies"
                value={formData.knownAllergies}
                onChange={handleInputChange}
                placeholder="Enter known allergies"
              />
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateMEWS}
              >
                Generate MEWS Score
              </Button>
              <div>Score: {formData.mewsScore || "1"}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chiefComplaint">Chief Complaint</Label>
                <Select
                  name="chiefComplaint"
                  value={formData.chiefComplaint}
                  onValueChange={(value) =>
                    handleRadioChange("chiefComplaint", value)
                  }
                >
                  <SelectTrigger className={getFieldStyle("chiefComplaint")}>
                    <SelectValue placeholder="Select chief complaint" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chest-pain">Chest Pain</SelectItem>
                    <SelectItem value="shortness-of-breath">
                      Shortness of Breath
                    </SelectItem>
                    <SelectItem value="abdominal-pain">
                      Abdominal Pain
                    </SelectItem>
                    {/* Add more options as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedNumber">Bed Number</Label>
                <Select
                  name="bedNumber"
                  value={formData.bedNumber}
                  onValueChange={(value) =>
                    handleRadioChange("bedNumber", value)
                  }
                >
                  <SelectTrigger className={getFieldStyle("bedNumber")}>
                    <SelectValue placeholder="Select bed number" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(15)].map((_, i) => (
                      <SelectItem key={i} value={`${i + 1}`}>
                        Bed {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit">Submit/Next</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
