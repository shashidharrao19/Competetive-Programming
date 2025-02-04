import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EROutcomesPage() {

  const [formData, setFormData] = useState({
    erDiagnosis: '',
    clinicalNotes: '',
    treatmentPlan: '',
    patientStatus: '',
    medicoLegalCase: '',
    patientShiftedTo: '',
    specialistArrivalTime: '',
    erPhysician: '',
    erNurse: '',
    patientShiftDischargeTime: '',
    investigations: [
      { name: 'ECG', status: 'Completed on XX/XX/XX, time', results: '' },
      { name: 'Troponin I ( For NSTEMI or UA)', status: '', results: '' },
      { name: '2 D ECHO', status: '', results: '' },
      { name: 'Blood grouping', status: '', results: '' },
      { name: 'Creatinine', status: '', results: '' },
      { name: 'CBP', status: '', results: '' },
    ]
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleInvestigationChange = (index, field, value) => {
    const updatedInvestigations = [...formData.investigations]
    updatedInvestigations[index][field] = value
    setFormData(prev => ({ ...prev, investigations: updatedInvestigations }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting ER Outcomes:', formData)
  }


  return (

<>
  <Card className="w-full mx-auto">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">ER Outcomes</CardTitle>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="erDiagnosis">ER diagnosis</Label>
            <Input
              id="erDiagnosis"
              name="erDiagnosis"
              value={formData.erDiagnosis}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="clinicalNotes">Clinical notes</Label>
            <Textarea
              id="clinicalNotes"
              name="clinicalNotes"
              value={formData.clinicalNotes}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="treatmentPlan">Treatment plan given by consultant</Label>
            <Textarea
              id="treatmentPlan"
              name="treatmentPlan"
              value={formData.treatmentPlan}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Patient status</Label>
              <RadioGroup
                name="patientStatus"
                value={formData.patientStatus}
                onValueChange={(value) => handleRadioChange('patientStatus', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="alive" id="alive" />
                  <Label htmlFor="alive">Alive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dead" id="dead" />
                  <Label htmlFor="dead">Dead</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label>Is it a Medico Legal Case</Label>
              <RadioGroup
                name="medicoLegalCase"
                value={formData.medicoLegalCase}
                onValueChange={(value) => handleRadioChange('medicoLegalCase', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="mlc-yes" />
                  <Label htmlFor="mlc-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="mlc-no" />
                  <Label htmlFor="mlc-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div>
            <Label>Patient shifted to</Label>
            <RadioGroup
              name="patientShiftedTo"
              value={formData.patientShiftedTo}
              onValueChange={(value) => handleRadioChange('patientShiftedTo', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="icu" id="icu" />
                <Label htmlFor="icu">ICU</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cathlab" id="cathlab" />
                <Label htmlFor="cathlab">Cathlab</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ward" id="ward" />
                <Label htmlFor="ward">Ward</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="discharge" id="discharge" />
                <Label htmlFor="discharge">Discharge</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="specialistArrivalTime">Specialist arrival time</Label>
            <Input
              id="specialistArrivalTime"
              name="specialistArrivalTime"
              type="time"
              value={formData.specialistArrivalTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="erPhysician">ER Physician</Label>
            <Input
              id="erPhysician"
              name="erPhysician"
              value={formData.erPhysician}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="erNurse">ER Nurse</Label>
            <Input
              id="erNurse"
              name="erNurse"
              value={formData.erNurse}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="patientShiftDischargeTime">Patient shifted/discharge time</Label>
          <Input
            id="patientShiftDischargeTime"
            name="patientShiftDischargeTime"
            type="time"
            value={formData.patientShiftDischargeTime}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Investigations</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investigation prescribed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Results</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formData.investigations.map((investigation, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      id={`investigation-${index}`}
                      checked={investigation.status !== ''}
                      onCheckedChange={(checked) => handleInvestigationChange(index, 'status', checked ? 'Pending' : '')}
                    />
                    <Label htmlFor={`investigation-${index}`} className="ml-2">
                      {investigation.name}
                    </Label>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={investigation.status}
                      onChange={(e) => handleInvestigationChange(index, 'status', e.target.value)}
                      placeholder="Enter status"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={investigation.results}
                      onChange={(e) => handleInvestigationChange(index, 'results', e.target.value)}
                      placeholder="Enter results"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center">
          <Button type="button" variant="outline">
            Generate Discharge Summary Report
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </CardContent>
  </Card>
  
  </>   
  )
}

