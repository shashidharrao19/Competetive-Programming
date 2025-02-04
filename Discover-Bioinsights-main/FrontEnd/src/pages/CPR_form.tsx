import { useState } from "react";
// import Image from 'next/image'
// import a from 'next/a'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import PatientDetails from './Patient_Registration';

export default function Component({ accessLevel }) {

  const isEditable = accessLevel !== "ReadOnly";

  const location = useLocation();
  const { patientDetails } = location.state;
  const navigate = useNavigate();

  const [cprData, setCprData] = useState({
    name: patientDetails?.firstName + " " + patientDetails?.lastName,
    patientId: patientDetails.patientID,
    primaryReason: [],
    cprInitiatedTime: "",
    intubationDone: "",
    defibrillatorConnected: "",
    ventilation: [],
    vitalSets: [],
    medicationOrders: [],
    interventionDone: "",
    otherDrugsUsed: "",
    resuscitationEndTime: "",
    reasonForEndingCPR: [],
    patientStatus: "",
    diagnosis: "",
    causeOfArrest: "",
    registrar: "",
    timeOfCapture: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCprData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name, value) => {
    setCprData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
  };

  const handleRadioChange = (name, value) => {
    setCprData((prev) => ({ ...prev, [name]: value }));
  };

  const addVitalSet = () => {
    setCprData((prev) => ({
      ...prev,
      vitalSets: [
        ...prev.vitalSets,
        {
          time: "",
          respiratoryRate: "",
          pulse: "",
          rhythm: "",
          defibrillationJoules: "",
          systolicBP: "",
          diastolicBP: "",
        },
      ],
    }));
  };

  const addMedicationOrder = () => {
    setCprData((prev) => ({
      ...prev,
      medicationOrders: [
        ...prev.medicationOrders,
        {
          time: "",
          epinephrineDose: "",
          atropineDose: "",
          amiodaroneDose: "",
          lidocaineDose: "",
        },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting CPR data:", cprData);
    // Here you would typically send the data to your backend
  };

  return (
  
      
        <>
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                CPR Form
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
                      value={cprData.name}
                      onChange={handleInputChange}
                      placeholder="This information comes from screen #2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientId">Patient ID</Label>
                    <Input
                      id="patientId"
                      name="patientId"
                      value={cprData.patientId}
                      onChange={handleInputChange}
                      placeholder="This information comes from screen #2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Primary reason for CPR</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "HR less than 40 or more than 140",
                      "GCS 9",
                      "SpO2 90%",
                      "Cardiac arrest",
                      "Respiratory arrest",
                      "Stroke",
                      "Vasovagal attack",
                      "Acute significant bleed",
                    ].map((reason) => (
                      <div key={reason} className="flex items-center space-x-2">
                        <Checkbox
                          id={reason}
                          checked={cprData.primaryReason.includes(reason)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("primaryReason", reason)
                          }
                        />
                        <Label htmlFor={reason}>{reason}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cprInitiatedTime">CPR initiated time</Label>
                  <Input
                    id="cprInitiatedTime"
                    name="cprInitiatedTime"
                    type="time"
                    value={cprData.cprInitiatedTime}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="space-y-2 flex-1">
                    <Label>Intubation done</Label>
                    <RadioGroup
                      value={cprData.intubationDone}
                      onValueChange={(value) =>
                        handleRadioChange("intubationDone", value)
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="intubation-yes" />
                        <Label htmlFor="intubation-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="intubation-no" />
                        <Label htmlFor="intubation-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="na" id="intubation-na" />
                        <Label htmlFor="intubation-na">NA</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label>Defibrillator connected</Label>
                    <RadioGroup
                      value={cprData.defibrillatorConnected}
                      onValueChange={(value) =>
                        handleRadioChange("defibrillatorConnected", value)
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="defibrillator-yes" />
                        <Label htmlFor="defibrillator-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="defibrillator-no" />
                        <Label htmlFor="defibrillator-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ventilation</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Bag valve mask",
                      "ET tube",
                      "Tracheostomy",
                      "Non invasive",
                      "On Oxygen",
                    ].map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox
                          id={method}
                          checked={cprData.ventilation.includes(method)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("ventilation", method)
                          }
                        />
                        <Label htmlFor={method}>{method}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Vital set used in CPR</Label>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="font-normal text-left">Time</th>
                        <th className="font-normal text-left">
                          Respiratory Rate
                        </th>
                        <th className="font-normal text-left">Pulse</th>
                        <th className="font-normal text-left">Rhythm</th>
                        <th className="font-normal text-left">
                          Defibrillation Joules
                        </th>
                        <th className="font-normal text-left">Systolic BP</th>
                        <th className="font-normal text-left">Diastolic BP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cprData.vitalSets.map((set, index) => (
                        <tr key={index}>
                          <td>
                            <Input
                              type="time"
                              value={set.time}
                              onChange={(e) =>
                                handleInputChange(e, "vitalSets", index, "time")
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="number"
                              value={set.respiratoryRate}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "vitalSets",
                                  index,
                                  "respiratoryRate"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="number"
                              value={set.pulse}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "vitalSets",
                                  index,
                                  "pulse"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              value={set.rhythm}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "vitalSets",
                                  index,
                                  "rhythm"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="number"
                              value={set.defibrillationJoules}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "vitalSets",
                                  index,
                                  "defibrillationJoules"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="number"
                              value={set.systolicBP}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "vitalSets",
                                  index,
                                  "systolicBP"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="number"
                              value={set.diastolicBP}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "vitalSets",
                                  index,
                                  "diastolicBP"
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button type="button" onClick={addVitalSet}>
                    Add Vital Set
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Medication order used in CPR</Label>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="font-normal text-left">Time</th>
                        <th className="font-normal text-left">
                          Epinephrine dose
                        </th>
                        <th className="font-normal text-left">Atropine dose</th>
                        <th className="font-normal text-left">
                          Amiodarone dose
                        </th>
                        <th className="font-normal text-left">
                          Lidocaine dose
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cprData.medicationOrders.map((order, index) => (
                        <tr key={index}>
                          <td>
                            <Input
                              type="time"
                              value={order.time}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "medicationOrders",
                                  index,
                                  "time"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              value={order.epinephrineDose}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "medicationOrders",
                                  index,
                                  "epinephrineDose"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              value={order.atropineDose}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "medicationOrders",
                                  index,
                                  "atropineDose"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              value={order.amiodaroneDose}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "medicationOrders",
                                  index,
                                  "amiodaroneDose"
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              value={order.lidocaineDose}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "medicationOrders",
                                  index,
                                  "lidocaineDose"
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button type="button" onClick={addMedicationOrder}>
                    Add Medication Order
                  </Button>
                </div>

                <div className="flex space-x-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="interventionDone">Intervention done</Label>
                    <Textarea
                      id="interventionDone"
                      name="interventionDone"
                      value={cprData.interventionDone}
                      onChange={handleInputChange}
                      className="h-20"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="otherDrugsUsed">Other drugs used</Label>
                    <Textarea
                      id="otherDrugsUsed"
                      name="otherDrugsUsed"
                      value={cprData.otherDrugsUsed}
                      onChange={handleInputChange}
                      className="h-20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>CPR Outcome</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resuscitationEndTime">
                        Resuscitation end time
                      </Label>
                      <Input
                        id="resuscitationEndTime"
                        name="resuscitationEndTime"
                        type="time"
                        value={cprData.resuscitationEndTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Reason for ending CPR</Label>
                      <div className="space-y-1">
                        {[
                          "Return to spontaneous circulation",
                          "Medical futility",
                          "Efforts terminated",
                        ].map((reason) => (
                          <div
                            key={reason}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={reason}
                              checked={cprData.reasonForEndingCPR.includes(
                                reason
                              )}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(
                                  "reasonForEndingCPR",
                                  reason
                                )
                              }
                            />
                            <Label htmlFor={reason}>{reason}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Patient status</Label>
                      <RadioGroup
                        value={cprData.patientStatus}
                        onValueChange={(value) =>
                          handleRadioChange("patientStatus", value)
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="alive" id="status-alive" />
                          <Label htmlFor="status-alive">Alive</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dead" id="status-dead" />
                          <Label htmlFor="status-dead">Dead</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Textarea
                      id="diagnosis"
                      name="diagnosis"
                      value={cprData.diagnosis}
                      onChange={handleInputChange}
                      className="h-20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="causeOfArrest">Cause of arrest</Label>
                    <Textarea
                      id="causeOfArrest"
                      name="causeOfArrest"
                      value={cprData.causeOfArrest}
                      onChange={handleInputChange}
                      className="h-20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="registrar">Captured by (Registrar)</Label>
                    <Input
                      id="registrar"
                      name="registrar"
                      value={cprData.registrar}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeOfCapture">Time of capture</Label>
                    <Input
                      id="timeOfCapture"
                      name="timeOfCapture"
                      type="time"
                      value={cprData.timeOfCapture}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Submit/Next
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
      
  );
}
