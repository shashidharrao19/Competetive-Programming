import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePatientDetails } from "../api/PatientService";

export default function PatientDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { patient } = location.state;

  const [patientDetails, setPatientDetails] = useState(patient);
  const [editable, setEditable] = useState(false);
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    dob: false,
    gender: false,
    address: false,
    phoneNumber: false,
    emailId: false,
    emergencyContactName: false,
    emergencyContactNumber: false,
    insuranceName: false,
    insuranceId: false,
    paymentMethod: false,
    pincode: false,
    height: false,
    weight: false,
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select change
  const handleSelectChange = (name, value) => {
    setPatientDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setEditable(true);
  };

  // Exit edit mode
  const exitEditMode = () => {
    setEditable(false);
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    let validationErrors = { ...errors };

    if (!patientDetails.firstName) {
      validationErrors.firstName = true;
      isValid = false;
    }

    if (!patientDetails.lastName) {
      validationErrors.lastName = true;
      isValid = false;
    }

    if (!patientDetails.dob) {
      validationErrors.dob = true;
      isValid = false;
    }

    if (!patientDetails.gender) {
      validationErrors.gender = true;
      isValid = false;
    }

    if (
      !patientDetails.phoneNumber ||
      !patientDetails.phoneNumber.match(/^\d{10}$/)
    ) {
      validationErrors.phoneNumber = true;
      isValid = false;
    }

    if (
      !patientDetails.emailId ||
      !patientDetails.emailId.match(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      )
    ) {
      validationErrors.emailId = true;
      isValid = false;
    }

    if (!patientDetails.address) {
      validationErrors.address = true;
      isValid = false;
    }

    if (
      !patientDetails.emergencyContactNumber ||
      !patientDetails.emergencyContactNumber.match(/^\d{10}$/)
    ) {
      validationErrors.emergencyContactNumber = true;
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  // Save updated patient details
  const handleSave = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields correctly.");
      return;
    }
    try {
      await updatePatientDetails(patientDetails);
      console.log("Patient details updated successfully:", patientDetails);
      exitEditMode();
      alert("Details saved successfully!");
    } catch (error) {
      console.error("Error updating patient details:", error);
      alert("Failed to update patient details.");
    }
  };

  // Navigate to the next page
  const handleNext = () => {
    navigate("/PatientAdmissionTriage", { state: { patientDetails } });
  };

  // Get input field styles based on error state
  const getFieldStyle = (fieldName) => {
    return errors[fieldName] ? "border-red-400" : "border-gray-300";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Patient Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={patientDetails.firstName}
                onChange={handleInputChange}
                disabled={!editable}
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
                disabled={!editable}
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
                disabled={!editable}
                className={getFieldStyle("dob")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={patientDetails.age}
                onChange={handleInputChange}
                disabled={!editable}
                className={getFieldStyle("age")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) => handleSelectChange("gender", value)}
                value={patientDetails.gender}
                disabled={!editable}
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
                disabled={!editable}
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
                disabled={!editable}
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
                disabled={!editable}
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
                disabled={!editable}
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
                disabled={!editable}
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
              disabled={!editable}
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
                disabled={!editable}
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
                disabled={!editable}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("paymentMethod", value)
                }
                value={patientDetails.paymentMethod}
                disabled={!editable}
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {patientDetails.paymentMethod === "insurance" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="insuranceName">Insurance name</Label>
                  <Input
                    id="insuranceName"
                    name="insuranceName"
                    value={patientDetails.insuranceName}
                    onChange={handleInputChange}
                    disabled={!editable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceId">Insurance ID</Label>
                  <Input
                    id="insuranceId"
                    name="insuranceId"
                    value={patientDetails.insuranceId}
                    onChange={handleInputChange}
                    disabled={!editable}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={toggleEdit}>
              {editable ? "Cancel Edit" : "Edit the data"}
            </Button>
            {editable ? (
              <Button type="button" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
