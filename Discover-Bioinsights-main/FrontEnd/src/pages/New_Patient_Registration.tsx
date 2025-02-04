import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { usePatient } from "../context/PatientContext";
import { useAuth } from "../context/AuthContext";
import { getAccessLevel } from "../utils/roleCheck";
import { registerPatient, createPatientEncounter } from "../api/PatientService";

export default function NewPatientRegistration() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { patientDetails, setPatientDetails, resetPatientDetails } =
    usePatient();

  useEffect(() => {
    resetPatientDetails();
  }, []);


  const [errors, setErrors] = useState({});

  const isAccsessible = (screen) => {
    if (getAccessLevel(screen, auth?.role) == "ReadOnly") return false;
    return true;
  };
  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // Adjust age if the current month and day are before the birth month and day
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input field is for date of birth
    if (name === "dob") {
      const age = calculateAge(value);
      setPatientDetails((prev) => ({
        ...prev,
        dob: value,
        age: age, // Set the calculated age in the state
      }));
    } else {
      setPatientDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name, value) => {
    setPatientDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Validation function
  const validateFields = () => {
    let errors = {};

    // Check if mandatory fields are filled
    if (!patientDetails.gender) {
      errors.gender = "Gender is required";
    }
    if (!patientDetails.age || patientDetails.age <= 0) {
      errors.age = "Valid age is required";
    }

    // Check if the email is in the correct format
    if (
      patientDetails.emailId &&
      !/\S+@\S+\.\S+/.test(patientDetails.emailId)
    ) {
      errors.emailId = "Email is not valid";
    }

    // Check if the mobile number is in the correct format
    if (
      patientDetails.phoneNumber &&
      !/^\d{10}$/.test(patientDetails.phoneNumber)
    ) {
      errors.phoneNumber = "Phone number must be a valid 10-digit number";
    }

    // Check for other fields here as necessary, like phone number format, etc.

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      // Check if the patient name is missing, and generate one if needed
      let updatedPatientDetails = { ...patientDetails };

      if (!patientDetails.firstName) {
        const generatedName = `NoName${new Date().toISOString()}`;
        updatedPatientDetails = {
          ...updatedPatientDetails,
          firstName: generatedName,
        };
      }

      // Prepare the patient registration details
      const registrationStatus =
        updatedPatientDetails.firstName &&
        updatedPatientDetails.dob &&
        updatedPatientDetails.address &&
        updatedPatientDetails.phoneNumber &&
        updatedPatientDetails.emailId &&
        updatedPatientDetails.emergencyContactName &&
        updatedPatientDetails.insuranceName
          ? "Completed"
          : "Pending";

      const newPatient = {
        ...updatedPatientDetails,
        registrationStatus,
        registrationDate: new Date().toISOString().split("T")[0],
        registrationTime: new Date().toISOString().split("T")[1].split(".")[0],
      };

      try {
        // Call the API function
        const result = await registerPatient(newPatient);
        setPatientDetails(result.patient);
        console.log("Patient registered successfully:", result);

        // Navigate to the next page based on user access level
        if (isAccsessible("PatientAdmissionTriage")) {
          navigate("/PatientAdmissionTriage", {
            state: { patientDetails: result.patient },
          });
        } else {
          navigate("/eddashboard");
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };


  // Function to determine if a field has an error and apply styles accordingly
  const getFieldStyle = (fieldName) => {
    return errors[fieldName] ? "border-red-400" : "border-gray-300";
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            New Patient Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={patientDetails.firstName}
                  onChange={handleInputChange}
                  className={getFieldStyle("firstName")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sur Name / Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={patientDetails.lastName}
                  onChange={handleInputChange}
                  className={getFieldStyle("lastName")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">DOB</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={patientDetails.dob}
                  onChange={handleInputChange}
                  className={getFieldStyle("dob")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age<span className="text-red-600">*</span></Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={patientDetails.age}
                  onChange={handleInputChange}
                  className={getFieldStyle("age")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender <span className="text-red-600">*</span>
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  value={patientDetails.gender}
                  className={
                    errors["gender"] ? "border-red-400" : "border-gray-300"
                  }
                >
                  <SelectTrigger
                    id="gender"
                    className={
                      errors["gender"] ? "border-red-400" : "border-gray-300"
                    }
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={patientDetails.address}
                  onChange={handleInputChange}
                  className={getFieldStyle("address")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={patientDetails.pincode}
                  onChange={handleInputChange}
                  className={getFieldStyle("pincode")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={patientDetails.phoneNumber}
                  onChange={handleInputChange}
                  className={getFieldStyle("phoneNumber")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={patientDetails.height}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={patientDetails.weight}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailId">Email</Label>
              <Input
                id="emailId"
                name="emailId"
                value={patientDetails.emailId}
                onChange={handleInputChange}
                className={getFieldStyle("emailId")}
                type="email"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">
                  Emergency contact name
                </Label>
                <Input
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={patientDetails.emergencyContactName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactNumber">
                  Emergency contact number
                </Label>
                <Input
                  id="emergencyContactNumber"
                  name="emergencyContactNumber"
                  type="tel"
                  value={patientDetails.emergencyContactNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup
                defaultValue="insurance"
                onValueChange={(value) =>
                  handleSelectChange("paymentMethod", value)
                }
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="insurance" id="insurance" />
                  <Label htmlFor="insurance">Insurance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Cash</Label>
                </div>
              </RadioGroup>
            </div>

            {patientDetails.paymentMethod === "insurance" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insuranceName">Insurance name</Label>
                  <Input
                    id="insuranceName"
                    name="insuranceName"
                    value={patientDetails.insuranceName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceId">Insurance ID</Label>
                  <Input
                    id="insuranceId"
                    name="insuranceId"
                    value={patientDetails.insuranceId}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}


            <div className="flex justify-end mt-6">
              <Button type="submit">Next</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
