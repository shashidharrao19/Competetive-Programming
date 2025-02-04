import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ThrombolysisPage() {

  const [patientInfo, setPatientInfo] = useState({
    name: '',
    patientId: ''
  })

  const [riskOfBleeding, setRiskOfBleeding] = useState({
    activeBleeding: false,
    significantTrauma: false,
    suspectedAorticDissection: false
  })

  const [riskOfIntracranialHemorrhage, setRiskOfIntracranialHemorrhage] = useState({
    priorHemorrhage: false,
    ischemicStroke: false,
    cerebralVascularLesion: false,
    malignantNeoplasm: false
  })

  const [relativeContraindications, setRelativeContraindications] = useState({
    anticoagulants: false,
    vascularPunctures: false,
    recentSurgery: false,
    traumaticCPR: false,
    internalBleeding: false,
    activePepticUlcer: false,
    severeHypertension: false,
    presentationHypertension: false,
    priorStroke: false,
    other: false,
    pregnancy: false
  })

  const [thrombolysisDetails, setThrombolysisDetails] = useState({
    bodyWeight: '',
    nameOfDrug: '',
    dosage: '',
    startTime: '',
    endTime: '',
    givenBy: ''
  })


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting Thrombolysis data:', {
      patientInfo,
      riskOfBleeding,
      riskOfIntracranialHemorrhage,
      relativeContraindications,
      thrombolysisDetails
    })
  }

  return (
    
        <>
          <Card className="w-full mx-auto">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="thrombolysis" className="w-full">
                  <TabsList className="grid w-48 grid-cols-2 mb-6">
                    <TabsTrigger value="primary-ptca">Primary PTCA</TabsTrigger>
                    <TabsTrigger value="thrombolysis">Thrombolysis</TabsTrigger>
                  </TabsList>
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
                  <TabsContent value="thrombolysis" className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold">Thrombolysis</CardTitle>
                    </CardHeader>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Risk of Bleeding</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="activeBleeding"
                              checked={riskOfBleeding.activeBleeding}
                              onCheckedChange={(checked) => setRiskOfBleeding({ ...riskOfBleeding, activeBleeding: checked as boolean })}
                            />
                            <label htmlFor="activeBleeding">Active bleeding or bleeding disorder</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="significantTrauma"
                              checked={riskOfBleeding.significantTrauma}
                              onCheckedChange={(checked) => setRiskOfBleeding({ ...riskOfBleeding, significantTrauma: checked as boolean })}
                            />
                            <label htmlFor="significantTrauma">Significant closed head or facial trauma within 3 months</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="suspectedAorticDissection"
                              checked={riskOfBleeding.suspectedAorticDissection}
                              onCheckedChange={(checked) => setRiskOfBleeding({ ...riskOfBleeding, suspectedAorticDissection: checked as boolean })}
                            />
                            <label htmlFor="suspectedAorticDissection">Suspected aortic dissection</label>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold">Risk of Intracranial Hemorrhage</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="priorHemorrhage"
                              checked={riskOfIntracranialHemorrhage.priorHemorrhage}
                              onCheckedChange={(checked) => setRiskOfIntracranialHemorrhage({ ...riskOfIntracranialHemorrhage, priorHemorrhage: checked as boolean })}
                            />
                            <label htmlFor="priorHemorrhage">Any prior intracranial hemorrhage</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="ischemicStroke"
                              checked={riskOfIntracranialHemorrhage.ischemicStroke}
                              onCheckedChange={(checked) => setRiskOfIntracranialHemorrhage({ ...riskOfIntracranialHemorrhage, ischemicStroke: checked as boolean })}
                            />
                            <label htmlFor="ischemicStroke">Ischemic stroke within 3 months</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="cerebralVascularLesion"
                              checked={riskOfIntracranialHemorrhage.cerebralVascularLesion}
                              onCheckedChange={(checked) => setRiskOfIntracranialHemorrhage({ ...riskOfIntracranialHemorrhage, cerebralVascularLesion: checked as boolean })}
                            />
                            <label htmlFor="cerebralVascularLesion">Known structural cerebral vascular lesion</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="malignantNeoplasm"
                              checked={riskOfIntracranialHemorrhage.malignantNeoplasm}
                              onCheckedChange={(checked) => setRiskOfIntracranialHemorrhage({ ...riskOfIntracranialHemorrhage, malignantNeoplasm: checked as boolean })}
                            />
                            <label htmlFor="malignantNeoplasm">Known malignant intracranial neoplasm</label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Relative Contraindications</h3>
                        <p className="text-sm text-muted-foreground">(No risk of bleeding or intracranial hemorrhage)</p>
                        <div className="space-y-2">
                          {Object.entries(relativeContraindications).map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-2">
                              <Checkbox
                                id={key}
                                checked={value}
                                onCheckedChange={(checked) => setRelativeContraindications({ ...relativeContraindications, [key]: checked as boolean })}
                              />
                              <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      <h3 className="text-lg font-semibold">Thrombolysis Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bodyWeight">Patient Body weight</Label>
                          <Input
                            id="bodyWeight"
                            value={thrombolysisDetails.bodyWeight}
                            onChange={(e) => setThrombolysisDetails({ ...thrombolysisDetails, bodyWeight: e.target.value })}
                            placeholder="Enter body weight"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nameOfDrug">Name of drug</Label>
                          <Input
                            id="nameOfDrug"
                            value={thrombolysisDetails.nameOfDrug}
                            onChange={(e) => setThrombolysisDetails({ ...thrombolysisDetails, nameOfDrug: e.target.value })}
                            placeholder="Enter drug name"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input
                          id="dosage"
                          value={thrombolysisDetails.dosage}
                          onChange={(e) => setThrombolysisDetails({ ...thrombolysisDetails, dosage: e.target.value })}
                          placeholder="Enter dosage"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={thrombolysisDetails.startTime}
                            onChange={(e) => setThrombolysisDetails({ ...thrombolysisDetails, startTime: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endTime">End Time</Label>
                          <Input
                            id="endTime"
                            
                            type="time"
                            value={thrombolysisDetails.endTime}
                            onChange={(e) => setThrombolysisDetails({ ...thrombolysisDetails, endTime: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="givenBy">Given by</Label>
                        <Input
                          id="givenBy"
                          value={thrombolysisDetails.givenBy}
                          onChange={(e) => setThrombolysisDetails({ ...thrombolysisDetails, givenBy: e.target.value })}
                          placeholder="Enter name"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button type="submit" className="w-full">Submit/Next</Button>
              </form>
            </CardContent>
          </Card>
        </>
     
  )
}