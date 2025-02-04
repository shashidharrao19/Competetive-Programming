import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom';

export default function MedicationMaster({ accessLevel }) {

const isEditable = accessLevel !== "ReadOnly";

const navigate = useNavigate();

const [medicationDetails, setMedicationDetails] = useState({
name: '',
strength: '',
associatedGeneric: '',
routeOfAdmin: '',
scheduleOfDrug: '',
medicationCode: '',
prerequisites: '',
drugCategory: ''
})



const handleInputChange = (e) => {
const { name, value } = e.target
setMedicationDetails(prev => ({ ...prev, [name]: value }))
}

const handleSelectChange = (name, value) => {
setMedicationDetails(prev => ({ ...prev, [name]: value }))
}

const handleSubmit = (e) => {
e.preventDefault()
console.log('Submitting medication details:', medicationDetails)


// Here you would typically send the data to your backend

// It should navigate only after successful submission
navigate('/eddashboard');
}



return (

    

    
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Medication Master</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4"  >
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name</Label>
              <Input 
                id="name" 
                name="name"
                value={medicationDetails.name}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="strength">Strength</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  id="strength" 
                  name="strength"
                  value={medicationDetails.strength}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
                <span>mg</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="associatedGeneric">Associated generic</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('associatedGeneric', value)}
                value={medicationDetails.associatedGeneric}
                disabled={!isEditable}
              >
                <SelectTrigger id="associatedGeneric">
                  <SelectValue placeholder="Select associated generic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bp-range">BP Range</SelectItem>
                  <SelectItem value="heart-rate">Heart Rate</SelectItem>
                  <SelectItem value="blood-sugar">Blood Sugar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="routeOfAdmin">Route of Admin</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('routeOfAdmin', value)}
                value={medicationDetails.routeOfAdmin}
                disabled={!isEditable}
              >
                <SelectTrigger id="routeOfAdmin">
                  <SelectValue placeholder="Select route of admin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iv">IV</SelectItem>
                  <SelectItem value="oral">Oral</SelectItem>
                  <SelectItem value="topical">Topical</SelectItem>
                  <SelectItem value="intramuscular">Intramuscular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduleOfDrug">Schedule of drug</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('scheduleOfDrug', value)}
                value={medicationDetails.scheduleOfDrug}
                disabled={!isEditable}
              >
                <SelectTrigger id="scheduleOfDrug">
                  <SelectValue placeholder="Select schedule of drug" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schedule-ii">Schedule II</SelectItem>
                  <SelectItem value="schedule-iii">Schedule III</SelectItem>
                  <SelectItem value="schedule-iv">Schedule IV</SelectItem>
                  <SelectItem value="schedule-v">Schedule V</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicationCode">Medication code</Label>
              <Input 
                id="medicationCode" 
                name="medicationCode"
                value={medicationDetails.medicationCode}
                onChange={handleInputChange}
                disabled={!isEditable}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prerequisites">Prerequisites</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('prerequisites', value)}
                value={medicationDetails.prerequisites}
                disabled={!isEditable}
              >
                <SelectTrigger id="prerequisites">
                  <SelectValue placeholder="Select prerequisites" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="before-food">Before food</SelectItem>
                  <SelectItem value="after-food">After food</SelectItem>
                  <SelectItem value="with-food">With food</SelectItem>
                  <SelectItem value="empty-stomach">On empty stomach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="drugCategory">Drug category</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('drugCategory', value)}
                value={medicationDetails.drugCategory}
                disabled={!isEditable}
              >
                <SelectTrigger id="drugCategory">
                  <SelectValue placeholder="Select drug category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="antibiotics">Antibiotics</SelectItem>
                  <SelectItem value="analgesics">Analgesics</SelectItem>
                  <SelectItem value="antihypertensives">Antihypertensives</SelectItem>
                  <SelectItem value="antidiabetics">Antidiabetics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={!isEditable}>Submit/Next</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
    

)
}