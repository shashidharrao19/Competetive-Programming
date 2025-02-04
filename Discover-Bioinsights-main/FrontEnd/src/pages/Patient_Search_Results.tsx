import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function PatientSearchResults() {
  
  const location = useLocation();
  const {results} = location.state;
  const [searchResults, setSearchResults] = useState(results);

  const navigate = useNavigate();

  const handleSelectPatient = (patient) => {
    console.log(patient);
      navigate('/returnpatientdetailsupdate',{ state: { patient } })
  }

  return (
    
        <>
          <Card className="w-full mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Patient Search Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date of Birth</TableHead>
                    <TableHead>Sex</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((patient) => (
                    <TableRow key={patient.patientID}>
                      <TableCell>{patient.patientID}</TableCell>
                      <TableCell>{patient.firstName + ' '+ patient.lastName}</TableCell>
                      <TableCell>{patient.dob}</TableCell>
                      <TableCell>{patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}</TableCell>
                      <TableCell>{patient.phoneNumber}</TableCell>
                      <TableCell>{patient.address}</TableCell>
                      <TableCell>
                       
                        <Button onClick={() => handleSelectPatient(patient)}>
                          Select
                        </Button>
                       
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      
  )
}