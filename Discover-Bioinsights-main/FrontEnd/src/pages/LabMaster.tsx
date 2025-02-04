import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'


export default function LabMaster({ accessLevel }) {

  const isEditable = accessLevel !== "ReadOnly";

  const navigate = useNavigate(); 

  const [labDetails, setLabDetails] = useState({
    testName: '',
    loincName: '',
    loincCode: '',
    isPartOfPanel: false,
    department: '',
    unitsOfMeasure: '',
    resultsSpecificToAge: false,
    resultsSpecificToGender: false,
    normalRange: '',
    anyPrerequisitesRequired: false,
    methodUsed: '',
    resultType: '',
    requiresIntermediateReport: false,
    isCriticalTest: false,
    associatedTAT: ''
  })

  const [ageRanges, setAgeRanges] = useState([
    { age: '0-5', rangeMale: '', rangeFemale: '' },
    { age: '5-10', rangeMale: '', rangeFemale: '' },
    { age: '10-60', rangeMale: '', rangeFemale: '' },
    { age: '60-100', rangeMale: '', rangeFemale: '' },
  ])


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setLabDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSelectChange = (name, value) => {
    setLabDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleAgeRangeChange = (index, field, value) => {
    const newAgeRanges = [...ageRanges]
    newAgeRanges[index][field] = value
    setAgeRanges(newAgeRanges)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting lab details:', labDetails)
    console.log('Age ranges:', ageRanges)
    // Here you would typically send the data to your backend

    // It should navigate only after successful submission
    navigate('/eddashboard');
  }

 
  return (
    
        
        <>
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Lab Master</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="testName">Test Name</Label>
                    <Input 
                      id="testName" 
                      name="testName"
                      value={labDetails.testName}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loincName">LOINC Name</Label>
                    <Input 
                      id="loincName" 
                      name="loincName"
                      value={labDetails.loincName}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="loincCode">LOINC Code</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('loincCode', value)}
                      value={labDetails.loincCode}
                      disabled={!isEditable}
                    >
                      <SelectTrigger id="loincCode">
                        <SelectValue placeholder="Select LOINC Code" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="code1">Code 1</SelectItem>
                        <SelectItem value="code2">Code 2</SelectItem>
                        {/* Add more LOINC codes as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isPartOfPanel" 
                      checked={labDetails.isPartOfPanel}
                      onCheckedChange={(checked) => handleInputChange({ target: { name: 'isPartOfPanel', type: 'checkbox', checked } })}
                      disabled={!isEditable}
                    />
                    <Label htmlFor="isPartOfPanel">Is this lab test part of a panel</Label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('department', value)}
                      value={labDetails.department}
                      disabled={!isEditable}
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="biochemistry">Biochemistry</SelectItem>
                        {/* Add more departments as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unitsOfMeasure">Units of measure</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('unitsOfMeasure', value)}
                      value={labDetails.unitsOfMeasure}
                      disabled={!isEditable}
                    >
                      <SelectTrigger id="unitsOfMeasure">
                        <SelectValue placeholder="Select units of measure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mg/dL">mg/dL</SelectItem>
                        <SelectItem value="mmol/L">mmol/L</SelectItem>
                        {/* Add more units as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="resultsSpecificToAge" 
                      checked={labDetails.resultsSpecificToAge}
                      onCheckedChange={(checked) => handleInputChange({ target: { name: 'resultsSpecificToAge', type: 'checkbox', checked } })}
                      disabled={!isEditable}
                    />
                    <Label htmlFor="resultsSpecificToAge">Results specific to age</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="resultsSpecificToGender" 
                      checked={labDetails.resultsSpecificToGender}
                      onCheckedChange={(checked) => handleInputChange({ target: { name: 'resultsSpecificToGender', type: 'checkbox', checked } })}
                      disabled={!isEditable}
                    />
                    <Label htmlFor="resultsSpecificToGender">Results specific to gender</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="normalRange">Normal range</Label>
                  <Input 
                    id="normalRange" 
                    name="normalRange"
                    value={labDetails.normalRange}
                    onChange={handleInputChange}
                    placeholder="80 - 100"
                    disabled={!isEditable}
                  />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Age</TableHead>
                      <TableHead>Range Male</TableHead>
                      <TableHead>Range Female</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ageRanges.map((range, index) => (
                      <TableRow key={range.age}>
                        <TableCell>{range.age}</TableCell>
                        <TableCell>
                          <Input 
                            value={range.rangeMale}
                            onChange={(e) => handleAgeRangeChange(index, 'rangeMale', e.target.value)}
                            disabled={!isEditable}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={range.rangeFemale}
                            onChange={(e) => handleAgeRangeChange(index, 'rangeFemale', e.target.value)}
                            disabled={!isEditable}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="anyPrerequisitesRequired" 
                    checked={labDetails.anyPrerequisitesRequired}
                    onCheckedChange={(checked) => handleInputChange({ target: { name: 'anyPrerequisitesRequired', type: 'checkbox', checked } })}
                    disabled={!isEditable}
                  />
                  <Label htmlFor="anyPrerequisitesRequired">Any prerequisites required</Label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="methodUsed">Method Used</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('methodUsed', value)}
                      value={labDetails.methodUsed}
                      disabled={!isEditable}
                    >
                      <SelectTrigger id="methodUsed">
                        <SelectValue placeholder="Select method used" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="method1">Method 1</SelectItem>
                        <SelectItem value="method2">Method 2</SelectItem>
                        {/* Add more methods as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resultType">Result Type</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('resultType', value)}
                      value={labDetails.resultType}
                      disabled={!isEditable}
                    >
                      <SelectTrigger id="resultType">
                        <SelectValue placeholder="Select result type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="numeric">Numeric</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        {/* Add more result types as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="requiresIntermediateReport" 
                    checked={labDetails.requiresIntermediateReport}
                    onCheckedChange={(checked) => handleInputChange({ target: { name: 'requiresIntermediateReport', type: 'checkbox', checked } })}
                    disabled={!isEditable}
                  />
                  <Label htmlFor="requiresIntermediateReport">Does it require intermediate report?</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isCriticalTest" 
                    checked={labDetails.isCriticalTest}
                    onCheckedChange={(checked) => handleInputChange({ target: { name: 'isCriticalTest', type: 'checkbox', checked } })}
                    disabled={!isEditable}
                  />
                  <Label htmlFor="isCriticalTest">Is it a critical test?</Label>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="space-y-2">
                    <Label htmlFor="associatedTAT">Associated TAT</Label>
                    <Input 
                      id="associatedTAT" 
                      name="associatedTAT"
                      value={labDetails.associatedTAT}
                      onChange={handleInputChange}
                      placeholder="80 - 100"
                      disabled={!isEditable}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground mt-8">min</span>
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