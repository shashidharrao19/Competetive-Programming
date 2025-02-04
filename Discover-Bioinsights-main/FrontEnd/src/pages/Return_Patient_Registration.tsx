import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { searchPatient } from "../api/PatientService.js";

export default function ReturnPatientRegistration() {
  const [patientDetails, setPatientDetails] = useState({
    searchType: "name",
    patientName: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setPatientDetails((prev) => ({ ...prev, searchType: value }));
    setError("");
  };

  const validateInputs = () => {
    const { searchType, patientName, email, phoneNumber } = patientDetails;

    if (searchType === "name" && !patientName.trim()) {
      return "Patient Name is required.";
    }

    if (searchType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) return "Email is required.";
      if (!emailRegex.test(email))
        return "Invalid email format (e.g., x@y.com).";
    }

    if (searchType === "phone") {
      const phoneRegex = /^\d{10}$/;
      if (!phoneNumber.trim()) return "Phone number is required.";
      if (!phoneRegex.test(phoneNumber))
        return "Phone number must be exactly 10 digits.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateInputs();

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const { searchType, patientName, email, phoneNumber } = patientDetails;
    let searchValue = "";

    if (searchType === "name") searchValue = patientName;
    if (searchType === "email") searchValue = email;
    if (searchType === "phone") searchValue = phoneNumber;

    try {
      const results = await searchPatient(searchType, searchValue);
      if (results.length > 0) {
        navigate("/patientsearchresults", { state: { results } });
      } else {
        setError("No patient found with the provided details.");
      }
    } catch (error) {
      setError("Error fetching search results.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Find the Patient
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <RadioGroup
            defaultValue="name"
            onValueChange={handleRadioChange}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="name" id="name" />
              <Label htmlFor="name">Search by Name</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Search by Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone" />
              <Label htmlFor="phone">Search by Phone Number</Label>
            </div>
          </RadioGroup>

          {error && <p className="text-red-500">{error}</p>}

          {patientDetails.searchType === "name" && (
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                name="patientName"
                value={patientDetails.patientName}
                onChange={handleInputChange}
              />
            </div>
          )}

          {patientDetails.searchType === "email" && (
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                value={patientDetails.email}
                onChange={handleInputChange}
              />
            </div>
          )}

          {patientDetails.searchType === "phone" && (
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={patientDetails.phoneNumber}
                onChange={(e) => {
                  // Allow only numeric input
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                  setPatientDetails((prev) => ({
                    ...prev,
                    phoneNumber: value,
                  }));
                }}
                inputMode="numeric" // Suggests a numeric keyboard on mobile devices
                maxLength={10} // Limit input length to 10 digits
              />
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button type="submit">Find/Search</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
