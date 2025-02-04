import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { Link } from 'react-router-dom'

export default function GenericMedicationOrderSet() {

  const [patientInfo, setPatientInfo] = useState({
    name: '',
    patientId: ''
  })

  const [prescriptions, setPrescriptions] = useState([
    { drugName: '', dose: '', frequency: '', route: '', numberOfDays: '', givenTime: '', deliveredBy: '' }
  ])

  const [investigations, setInvestigations] = useState([])

  const [procedures, setProcedures] = useState([
    { name: 'Intubation', status: 'Completed on XX/XX/XX, time', doneBy: '' },
    { name: 'Fibrillation', status: '', doneBy: '' },
  ])

  const handlePrescriptionChange = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions]
    updatedPrescriptions[index][field] = value
    setPrescriptions(updatedPrescriptions)
  }

  const handleAddPrescription = () => {
    setPrescriptions([...prescriptions, { drugName: '', dose: '', frequency: '', route: '', numberOfDays: '', givenTime: '', deliveredBy: '' }])
  }

  const handleDeletePrescription = (index) => {
    setPrescriptions(prev => prev.filter((_, i) => i !== index))
  }

  const handleAddInvestigation = () => {
    setInvestigations(prev => [...prev, { name: '', status: '', prescribedBy: '' }])
  }

  const handleDeleteInvestigation = (index) => {
    setInvestigations(prev => prev.filter((_, i) => i !== index))
  }

  const handleProcedureChange = (index, field, value) => {
    const updatedProcedures = [...procedures]
    updatedProcedures[index][field] = value
    setProcedures(updatedProcedures)
  }

  const handleAddProcedure = () => {
    setProcedures(prev => [...prev, { name: '', status: '', doneBy: '' }])
  }

  const handleDeleteProcedure = (index) => {
    setProcedures(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting Generic Medication Order Set:', { patientInfo, prescriptions, investigations, procedures })
    // Here you would typically send the data to your backend
  }

  return (
    
        <>
          <Card className="w-full mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Generic Medication Order Set</CardTitle>
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
                  <h3 className="text-lg font-semibold">Prescription Details</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Drug</TableHead>
                        <TableHead>Dose</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Number of Days</TableHead>
                        <TableHead>Given time</TableHead>
                        <TableHead>Delivered by</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prescriptions.map((prescription, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              value={prescription.drugName}
                              onChange={(e) => handlePrescriptionChange(index, 'drugName', e.target.value)}
                              placeholder="Enter drug name"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={prescription.dose}
                              onChange={(e) => handlePrescriptionChange(index, 'dose', e.target.value)}
                              placeholder="Enter dose"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={prescription.frequency}
                              onChange={(e) => handlePrescriptionChange(index, 'frequency', e.target.value)}
                              placeholder="Enter frequency"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={prescription.route}
                              onChange={(e) => handlePrescriptionChange(index, 'route', e.target.value)}
                              placeholder="Enter route"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={prescription.numberOfDays}
                              onChange={(e) => handlePrescriptionChange(index, 'numberOfDays', e.target.value)}
                              placeholder="Enter number of days"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="time"
                              value={prescription.givenTime}
                              onChange={(e) => handlePrescriptionChange(index, 'givenTime', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={prescription.deliveredBy}
                              onChange={(e) => handlePrescriptionChange(index, 'deliveredBy', e.target.value)}
                              placeholder="Enter name"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePrescription(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button type="button" onClick={handleAddPrescription}>Add more drugs</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Investigation Details</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Investigation prescribed</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Prescribed by</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {investigations.map((investigation, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              value={investigation.name}
                              onChange={(e) => {
                                const updatedInvestigations = [...investigations]
                                updatedInvestigations[index].name = e.target.value
                                setInvestigations(updatedInvestigations)
                              }}
                              placeholder="Enter investigation name"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={investigation.status}
                              onChange={(e) => {
                                const updatedInvestigations = [...investigations]
                                updatedInvestigations[index].status = e.target.value
                                setInvestigations(updatedInvestigations)
                              }}
                              placeholder="Enter status"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={investigation.prescribedBy}
                              onChange={(e) => {
                                const updatedInvestigations = [...investigations]
                                updatedInvestigations[index].prescribedBy = e.target.value
                                setInvestigations(updatedInvestigations)
                              }}
                              placeholder="Enter name"
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
                  <h3 className="text-lg font-semibold">Procedure Details</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Procedure name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Procedure done by</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {procedures.map((procedure, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              value={procedure.name}
                              onChange={(e) => handleProcedureChange(index, 'name', e.target.value)}
                              placeholder="Enter procedure name"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={procedure.status}
                              onChange={(e) => handleProcedureChange(index, 'status', e.target.value)}
                              placeholder="Enter status"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={procedure.doneBy}
                              onChange={(e) => handleProcedureChange(index, 'doneBy', e.target.value)}
                              placeholder="Enter name"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => 
                              handleDeleteProcedure(index)}
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
                <div className="flex justify-center mt-6">
                    <Link to='/er-outcomes'><Button type="submit" className="w-full">Submit/Next</Button></Link>
                </div>
               
                
              </form>
            </CardContent>
          </Card>
        </>
    
  )
}