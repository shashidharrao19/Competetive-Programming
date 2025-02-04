import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"

export default function VitalsPage() {

const [patientInfo, setPatientInfo] = useState({
name: '',
patientId: ''
})

const [readings, setReadings] = useState([
{
  time: '',
  temperature: '',
  pulseRate: '',
  respRate: '',
  bloodPressure: {
    systolic: '',
    diastolic: ''
  },
  oxygenSaturation: '',
  grbs: '',
  painScore: '',
  gcs: '',
  urineOutput: '',
  triageScore: '',
  doneBy: ''
}
])

const handleReadingChange = (index: number, field: string, value: string) => {
const updatedReadings = [...readings]
if (field === 'systolic' || field === 'diastolic') {
  updatedReadings[index].bloodPressure[field] = value
} else {
  updatedReadings[index][field] = value
}
setReadings(updatedReadings)
}

const addReading = () => {
setReadings([...readings, {
  time: '',
  temperature: '',
  pulseRate: '',
  respRate: '',
  bloodPressure: {
    systolic: '',
    diastolic: ''
  },
  oxygenSaturation: '',
  grbs: '',
  painScore: '',
  gcs: '',
  urineOutput: '',
  triageScore: '',
  doneBy: ''
}])
}

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault()
console.log('Submitting Vitals:', { patientInfo, readings })
}

return (

    <>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Vitals</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                  placeholder="Enter patient name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  value={patientInfo.patientId}
                  onChange={(e) => setPatientInfo({ ...patientInfo, patientId: e.target.value })}
                  placeholder="Enter patient ID"
                />
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <Button type="button" onClick={addReading}>
                <Plus className="mr-2 h-4 w-4" />
                Add more readings
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vital Sign</TableHead>
                  {readings.map((_, index) => (
                    <TableHead key={index}>
                      {index === 0 ? 'Reading at initial admission' : `Reading ${index + 1}`}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
  <TableRow>
    <TableCell>Time</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          type="time"
          value={reading.time}
          onChange={(e) => handleReadingChange(index, 'time', e.target.value)}
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>Temperature (°F)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.temperature}
          onChange={(e) => handleReadingChange(index, 'temperature', e.target.value)}
          placeholder="Enter temperature"
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>Pulse rate (/min)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.pulseRate}
          onChange={(e) => handleReadingChange(index, 'pulseRate', e.target.value)}
          placeholder="Enter pulse rate"
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>Resp Rate (/min)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.respRate}
          onChange={(e) => handleReadingChange(index, 'respRate', e.target.value)}
          placeholder="Enter respiratory rate"
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>Systolic BP (mm/Hg)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.bloodPressure.systolic}
          onChange={(e) => handleReadingChange(index, 'systolic', e.target.value)}
          placeholder="Enter systolic BP"
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>Diastolic BP (mm/Hg)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.bloodPressure.diastolic}
          onChange={(e) => handleReadingChange(index, 'diastolic', e.target.value)}
          placeholder="Enter diastolic BP"
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>Oxygen saturation (%)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.oxygenSaturation}
          onChange={(e) => handleReadingChange(index, 'oxygenSaturation', e.target.value)}
          placeholder="Enter oxygen saturation"
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>GRBS (mg/dL)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.grbs}
          onChange={(e) => handleReadingChange(index, 'grbs', e.target.value)}
          placeholder="Enter GRBS"
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>Pain score (0-10)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.painScore}
          onChange={(e) => handleReadingChange(index, 'painScore', e.target.value)}
          placeholder="Enter pain score"
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>GCS -EVM (3-15)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.gcs}
          onChange={(e) => handleReadingChange(index, 'gcs', e.target.value)}
          placeholder="Enter GCS"
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>Urine output (mL)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.urineOutput}
          onChange={(e) => handleReadingChange(index, 'urineOutput', e.target.value)}
          placeholder="Enter urine output"
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>Triage score (I-V)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.triageScore}
          onChange={(e) => handleReadingChange(index, 'triageScore', e.target.value)}
          placeholder="Enter triage score"
        />
      </TableCell>
    ))}
  </TableRow>
  <TableRow>
    <TableCell>Done by (sign)</TableCell>
    {readings.map((reading, index) => (
      <TableCell key={index}>
        <Input
          value={reading.doneBy}
          onChange={(e) => handleReadingChange(index, 'doneBy', e.target.value)}
          placeholder="Enter signature"
        />
      </TableCell>
    ))}
  </TableRow>
</TableBody>
            </Table>

            <Button type="submit" className="w-full">Submit Vitals</Button>
          </form>
        </CardContent>
      </Card>
    </>
 
)
}