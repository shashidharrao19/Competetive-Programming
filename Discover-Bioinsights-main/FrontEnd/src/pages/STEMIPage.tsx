import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

export default function STEMIPage() {

  const [patientInfo, setPatientInfo] = useState({
    name: '',
    patientId: ''
  })

  const [medications, setMedications] = useState([
    { name: 'Aspirin Chewable', requirement: 'Essential', dosage: '300mg', route: 'oral', administered: false, time: '', givenBy: '' },
    { name: 'Sorbitrate', requirement: 'Essential', dosage: '5 mg/10 mg', route: 'SL', administered: false, time: '', givenBy: '' },
    { name: 'NTG*', requirement: 'Essential', dosage: '2.5 mcg/min', route: 'IV', administered: false, time: '', givenBy: '' },
    { name: 'Clopidogrel', requirement: 'Essential', dosage: '600mg/300 mg', route: 'PO', administered: false, time: '', givenBy: '' },
    { name: 'Heparin Bolus', requirement: 'Essential', dosage: '60 IU/kg', route: 'IV', administered: false, time: '', givenBy: '' },
    { name: 'Atorvastatin', requirement: 'Essential', dosage: '80 mg', route: 'p/o', administered: false, time: '', givenBy: '' },
    { name: 'Morphine ***', requirement: 'Essential', dosage: '2.5 mg', route: 'i/v', administered: false, time: '', givenBy: '' },
    { name: 'Pantoprazole', requirement: 'Essential', dosage: '40mg', route: '', administered: false, time: '', givenBy: '' },
    { name: 'Normal Saline', requirement: 'Essential', dosage: '500ml', route: '', administered: false, time: '', givenBy: '' },
    { name: 'Normal Saline', requirement: 'Essential', dosage: '100ml', route: '', administered: false, time: '', givenBy: '' },
    { name: 'GIII283A', requirement: 'Essential', dosage: '--- mcg/kg/min', route: '', administered: false, time: '', givenBy: '' },
  ])

  const [investigations, setInvestigations] = useState([
    { name: 'ECG', status: 'Completed on XX/XX/XX, tim', prescribedBy: '' },
    { name: 'Troponin I ( For NSTEMI or UA', status: '', prescribedBy: '' },
    { name: '2 D ECHO', status: '', prescribedBy: '' },
    { name: 'Blood grouping', status: '', prescribedBy: '' },
    { name: 'Creatinine', status: '', prescribedBy: '' },
    { name: 'CBP', status: '', prescribedBy: '' },
  ])

  const [procedures, setProcedures] = useState([
    { name: 'Intubation', status: 'Completed on XX/XX/XX, tim', doneBy: '' },
    { name: 'Fibrilation', status: '', doneBy: '' },
  ])

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medications]
    updatedMedications[index][field] = value
    setMedications(updatedMedications)
  }

  const handleInvestigationChange = (index, field, value) => {
    const updatedInvestigations = [...investigations]
    updatedInvestigations[index][field] = value
    setInvestigations(updatedInvestigations)
  }

  const handleProcedureChange = (index, field, value) => {
    const updatedProcedures = [...procedures]
    updatedProcedures[index][field] = value
    setProcedures(updatedProcedures)
  }

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', requirement: '', dosage: '', route: '', administered: false, time: '', givenBy: '' }])
  }

  const handleAddInvestigation = () => {
    setInvestigations([...investigations, { name: '', status: '', prescribedBy: '' }])
  }

  const handleAddProcedure = () => {
    setProcedures([...procedures, { name: '', status: '', doneBy: '' }])
  }

  const handleDeleteMedication = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index)
    setMedications(updatedMedications)
  }

  const handleDeleteInvestigation = (index) => {
    const updatedInvestigations = investigations.filter((_, i) => i !== index)
    setInvestigations(updatedInvestigations)
  }

  const handleDeleteProcedure = (index) => {
    const updatedProcedures = procedures.filter((_, i) => i !== index)
    setProcedures(updatedProcedures)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting STEMI data:', { patientInfo, medications, investigations, procedures })
    // Here you would typically send the data to your backend
  }

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...')
  }

  return (
    
        <>
          <Card className="w-full mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">STEMI</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      value={patientInfo.name}
                      onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                      placeholder="Pre-populated if available"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientId">Patient ID</Label>
                    <Input
                      id="patientId"
                      value={patientInfo.patientId}
                      onChange={(e) => setPatientInfo({ ...patientInfo, patientId: e.target.value })}
                      placeholder="Pre-populated if available"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Medication prescription (STEMI)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Administered</TableHead>
                        <TableHead>Medication name</TableHead>
                        <TableHead>Requirement</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Administered Time</TableHead>
                        <TableHead>Given by</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {medications.map((med, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Checkbox
                              checked={med.administered}
                              onCheckedChange={(checked) => handleMedicationChange(index, 'administered', checked)}
                            />
                          </TableCell>
                          <TableCell>{med.name}</TableCell>
                          <TableCell>{med.requirement}</TableCell>
                          <TableCell>{med.dosage}</TableCell>
                          <TableCell>{med.route}</TableCell>
                          <TableCell>
                            <Input
                              type="time"
                              value={med.time}
                              onChange={(e) => handleMedicationChange(index, 'time', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={med.givenBy}
                              onChange={(e) => handleMedicationChange(index, 'givenBy', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteMedication(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button type="button" onClick={handleAddMedication}>Add Medication</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Investigations</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Investigation prescribed</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Prescribed by</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {investigations.map((inv, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>{inv.name}</TableCell>
                          <TableCell>
                            <Input
                              value={inv.status}
                              onChange={(e) => handleInvestigationChange(index, 'status', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={inv.prescribedBy}
                              onChange={(e) => handleInvestigationChange(index, 'prescribedBy', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteInvestigation(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button type="button" onClick={handleAddInvestigation}>Add Investigation</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Procedures done</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead  className="w-[50px]"></TableHead>
                        <TableHead>Procedure name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Procedure done by</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {procedures.map((proc, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>{proc.name}</TableCell>
                          <TableCell>
                            <Input
                              value={proc.status}
                              onChange={(e) => handleProcedureChange(index, 'status', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={proc.doneBy}
                              onChange={(e) => handleProcedureChange(index, 'doneBy', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProcedure(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button type="button" onClick={handleAddProcedure}>Add Procedure</Button>
                </div>

                <Button type="submit" className="w-full">Submit/Next</Button>
              </form>
            </CardContent>
          </Card>
        </>
     
  )
}