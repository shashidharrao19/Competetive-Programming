import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from 'react-router-dom'

export default function DefaultCarePathway() {

  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    chiefComplaint: '',
    historyOfPresentIllness: '',
    medicalHistory: {
      diabetesMellitus: false,
      htn: false,
      hyperlipidemia: false,
      other: false
    },
    medicalHistoryDetails: '',
    surgicalHistory: [],
    personalHistory: {
      smoking: false,
      tobacco: false,
      alcohol: false,
      gutka: false
    },
    personalHistoryOthers: '',
    examinationDetails: {
      general: {
        pallor: false,
        icterus: false,
        cyanosis: false,
        clubbing: false,
        koilonychia: false,
        lymphadenopathy: false,
        edema: false
      },
      heartSounds: {
        s1: false,
        s2: false,
        s3: false,
        s4: false,
        murmurs: false
      },
      pulseRate: {
        rhythm: '',
        volume: '',
        character: ''
      },
      vascularSystem: '',
      carotidBruit: '',
      lungs: {
        airEntry: '',
        ltLung: '',
        rtLung: '',
        wheeze: '',
        crepts: ''
      },
      abdomen: '',
      bowel: '',
      organomegaly: '',
      cns: '',
      neurocognitiveFunction: ''
    },
    investigations: [],
    gcsScore: '',
    specialityReferrals: [],
    provisionalDiagnosis: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNestedInputChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  const handleCheckboxChange = (category, field) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field]
      }
    }))
  }

  const addSurgicalHistory = () => {
    setFormData(prev => ({
      ...prev,
      surgicalHistory: [...prev.surgicalHistory, { procedure: '', doneBy: '', doneDate: '', keyFindings: '' }]
    }))
  }

  const addInvestigation = () => {
    setFormData(prev => ({
      ...prev,
      investigations: [...prev.investigations, { testName: '', keyFindings: '' }]
    }))
  }

  const addSpecialityReferral = () => {
    setFormData(prev => ({
      ...prev,
      specialityReferrals: [...prev.specialityReferrals, { speciality: '', doctorName: '', timeOfNotification: '' }]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting form data:', formData)
    // Here you would typically send the data to your backend
  }

  return (
    
        <>
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Default Care Pathway Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Patient Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Name</Label>
                      <Input
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        placeholder="Pre-populated if available"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient ID</Label>
                      <Input
                        id="patientId"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleInputChange}
                        placeholder="Pre-populated if available"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chiefComplaint">Chief Complaint</Label>
                  <Select
                    value={formData.chiefComplaint}
                    onValueChange={(value) => handleInputChange({ target: { name: 'chiefComplaint', value } })}
                  >
                    <SelectTrigger id="chiefComplaint">
                      <SelectValue placeholder="Choose chief complaint" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chest-pain">Chest Pain</SelectItem>
                      <SelectItem value="shortness-of-breath">Shortness of Breath</SelectItem>
                      <SelectItem value="abdominal-pain">Abdominal Pain</SelectItem>
                      <SelectItem value="fever">Fever</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="historyOfPresentIllness">History of Present Illness</Label>
                  <Textarea
                    id="historyOfPresentIllness"
                    name="historyOfPresentIllness"
                    value={formData.historyOfPresentIllness}
                    onChange={handleInputChange}
                    placeholder="Document patient's history of the current illness"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Medical History</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="diabetesMellitus"
                        checked={formData.medicalHistory.diabetesMellitus}
                        onCheckedChange={(checked) => handleCheckboxChange('medicalHistory', 'diabetesMellitus')}
                      />
                      <Label htmlFor="diabetesMellitus">Diabetes Mellitus</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="htn"
                        checked={formData.medicalHistory.htn}
                        onCheckedChange={(checked) => handleCheckboxChange('medicalHistory', 'htn')}
                      />
                      <Label htmlFor="htn">HTN (Hypertension)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hyperlipidemia"
                        checked={formData.medicalHistory.hyperlipidemia}
                        onCheckedChange={(checked) => handleCheckboxChange('medicalHistory', 'hyperlipidemia')}
                      />
                      <Label htmlFor="hyperlipidemia">Hyperlipidemia</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="other"
                        checked={formData.medicalHistory.other}
                        onCheckedChange={(checked) => handleCheckboxChange('medicalHistory', 'other')}
                      />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistoryDetails">Medical History Details</Label>
                    <Textarea
                      id="medicalHistoryDetails"
                      name="medicalHistoryDetails"
                      value={formData.medicalHistoryDetails}
                      onChange={handleInputChange}
                      placeholder="Enter additional medical history details"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Surgical History</h3>
                  {formData.surgicalHistory.map((surgery, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2">
                      <Input
                        placeholder="Procedure Name"
                        value={surgery.procedure}
                        onChange={(e) => handleNestedInputChange('surgicalHistory', index, { ...surgery, procedure: e.target.value })}
                      />
                      <Input
                        placeholder="Done By"
                        value={surgery.doneBy}
                        onChange={(e) => handleNestedInputChange('surgicalHistory', index, { ...surgery, doneBy: e.target.value })}
                      />
                      <Input
                        type="date"
                        value={surgery.doneDate}
                        onChange={(e) => handleNestedInputChange('surgicalHistory', index, { ...surgery, doneDate: e.target.value })}
                      />
                      <Input
                        placeholder="Key Findings"
                        value={surgery.keyFindings}
                        onChange={(e) => handleNestedInputChange('surgicalHistory', index, { ...surgery, keyFindings: e.target.value })}
                      />
                    </div>
                  ))}
                  <Button type="button" onClick={addSurgicalHistory}>Add Surgical History</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal History</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="smoking"
                        checked={formData.personalHistory.smoking}
                        onCheckedChange={(checked) => handleCheckboxChange('personalHistory', 'smoking')}
                      />
                      <Label htmlFor="smoking">Smoking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tobacco"
                        checked={formData.personalHistory.tobacco}
                        onCheckedChange={(checked) => handleCheckboxChange('personalHistory', 'tobacco')}
                      />
                      <Label htmlFor="tobacco">Tobacco</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="alcohol"
                        checked={formData.personalHistory.alcohol}
                        
                        onCheckedChange={(checked) => handleCheckboxChange('personalHistory', 'alcohol')}
                      />
                      <Label htmlFor="alcohol">Alcohol</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="gutka"
                        checked={formData.personalHistory.gutka}
                        onCheckedChange={(checked) => handleCheckboxChange('personalHistory', 'gutka')}
                      />
                      <Label htmlFor="gutka">Gutka</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="personalHistoryOthers">Others</Label>
                    <Input
                      id="personalHistoryOthers"
                      name="personalHistoryOthers"
                      value={formData.personalHistoryOthers}
                      onChange={handleInputChange}
                      placeholder="Enter other personal history details"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Examination Details</h3>
                  <div className="space-y-2">
                    <Label>General</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(formData.examinationDetails.general).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={key}
                            checked={value}
                            onCheckedChange={(checked) => handleCheckboxChange('examinationDetails.general', key)}
                          />
                          <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Heart Sounds</Label>
                    <div className="flex space-x-4">
                      {Object.entries(formData.examinationDetails.heartSounds).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={key}
                            checked={value}
                            onCheckedChange={(checked) => handleCheckboxChange('examinationDetails.heartSounds', key)}
                          />
                          <Label htmlFor={key}>{key.toUpperCase()}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pulseRateRhythm">Pulse Rate Rhythm</Label>
                      <Input
                        id="pulseRateRhythm"
                        value={formData.examinationDetails.pulseRate.rhythm}
                        onChange={(e) => handleNestedInputChange('examinationDetails.pulseRate', 'rhythm', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pulseRateVolume">Pulse Rate Volume</Label>
                      <Input
                        id="pulseRateVolume"
                        value={formData.examinationDetails.pulseRate.volume}
                        onChange={(e) => handleNestedInputChange('examinationDetails.pulseRate', 'volume', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pulseRateCharacter">Pulse Rate Character</Label>
                      <Input
                        id="pulseRateCharacter"
                        value={formData.examinationDetails.pulseRate.character}
                        onChange={(e) => handleNestedInputChange('examinationDetails.pulseRate', 'character', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Vascular System</Label>
                      <RadioGroup
                        value={formData.examinationDetails.vascularSystem}
                        onValueChange={(value) => handleNestedInputChange('examinationDetails', 'vascularSystem', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all-peripheral-pulses" id="all-peripheral-pulses" />
                          <Label htmlFor="all-peripheral-pulses">All peripheral pulses</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="normal" id="vascular-normal" />
                          <Label htmlFor="vascular-normal">Normal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="abnormal" id="vascular-abnormal" />
                          <Label htmlFor="vascular-abnormal">Abnormal</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label>Carotid Bruit</Label>
                      <RadioGroup
                        value={formData.examinationDetails.carotidBruit}
                        onValueChange={(value) => handleNestedInputChange('examinationDetails', 'carotidBruit', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="present" id="carotid-bruit-present" />
                          <Label htmlFor="carotid-bruit-present">Present</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nil" id="carotid-bruit-nil" />
                          <Label htmlFor="carotid-bruit-nil">Nil</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Lungs</Label>
                    <div className="grid grid-cols-5 gap-4">
                      {Object.entries(formData.examinationDetails.lungs).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                          <Input
                            id={key}
                            value={value}
                            onChange={(e) => handleNestedInputChange('examinationDetails.lungs', key, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Abdomen</Label>
                      <RadioGroup
                        value={formData.examinationDetails.abdomen}
                        onValueChange={(value) => handleNestedInputChange('examinationDetails', 'abdomen', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="soft" id="abdomen-soft" />
                          <Label htmlFor="abdomen-soft">Soft</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="tender" id="abdomen-tender" />
                          <Label htmlFor="abdomen-tender">Tender</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label>Bowel</Label>
                      <RadioGroup
                        value={formData.examinationDetails.bowel}
                        onValueChange={(value) => handleNestedInputChange('examinationDetails', 'bowel', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="present" id="bowel-present" />
                          <Label htmlFor="bowel-present">Present</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="absent" id="bowel-absent" />
                          <Label htmlFor="bowel-absent">Absent</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label>Organomegaly</Label>
                      <RadioGroup
                        value={formData.examinationDetails.organomegaly}
                        onValueChange={(value) => handleNestedInputChange('examinationDetails', 'organomegaly', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="organomegaly-yes" />
                          <Label htmlFor="organomegaly-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="organomegaly-no" />
                          <Label htmlFor="organomegaly-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cns">Central Nervous System (CNS)</Label>
                      <Textarea
                        id="cns"
                        value={formData.examinationDetails.cns}
                        onChange={(e) => handleNestedInputChange('examinationDetails', 'cns', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="neurocognitiveFunction">Neurocognitive function non-decline (NFND) or any other defects</Label>
                      <Textarea
                        id="neurocognitiveFunction"
                        value={formData.examinationDetails.neurocognitiveFunction}
                        onChange={(e) => handleNestedInputChange('examinationDetails', 'neurocognitiveFunction', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Investigations Done in ER (POC Results)</h3>
                  {formData.investigations.map((investigation, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Test Name"
                        value={investigation.testName}
                        onChange={(e) => handleNestedInputChange('investigations', index, { ...investigation, testName: e.target.value })}
                      />
                      <Input
                        placeholder="Key Findings"
                        value={investigation.keyFindings}
                        onChange={(e) => handleNestedInputChange('investigations', index, { ...investigation, keyFindings: e.target.value })}
                      />
                    </div>
                  ))}
                  <Button type="button" onClick={addInvestigation}>Add Investigation</Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gcsScore">GCS Score</Label>
                  <Select
                    value={formData.gcsScore}
                    onValueChange={(value) => handleInputChange({ target: { name: 'gcsScore', value } })}
                  >
                    <SelectTrigger id="gcsScore">
                      <SelectValue placeholder="Select GCS Score" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(16)].map((_, i) => (
                        <SelectItem key={i} value={`${i + 3}`}>{i + 3}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Speciality Referred To</h3>
                  {formData.specialityReferrals.map((referral, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2">
                      <Input
                        placeholder="Speciality"
                        value={referral.speciality}
                        onChange={(e) => handleNestedInputChange('specialityReferrals', index, { ...referral, speciality: e.target.value })}
                      />
                      <Input
                        placeholder="Doctor Name"
                        value={referral.doctorName}
                        onChange={(e) => handleNestedInputChange('specialityReferrals', index, { ...referral, doctorName: e.target.value })}
                      />
                      <Input
                        type="datetime-local"
                        value={referral.timeOfNotification}
                        onChange={(e) => handleNestedInputChange('specialityReferrals', index, { ...referral, timeOfNotification: e.target.value })}
                      />
                    </div>
                  ))}
                  <Button type="button" onClick={addSpecialityReferral}>Add Speciality Referral</Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provisionalDiagnosis">Provisional Diagnosis</Label>
                  <Select
                    value={formData.provisionalDiagnosis}
                    onValueChange={(value) => handleInputChange({ target: { name: 'provisionalDiagnosis', value } })}
                  >
                    <SelectTrigger id="provisionalDiagnosis">
                      <SelectValue placeholder="Select provisional diagnosis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acute-coronary-syndrome">Acute Coronary Syndrome</SelectItem>
                      <SelectItem value="myocardial-infarction">Myocardial Infarction</SelectItem>
                      <SelectItem value="unstable-angina">Unstable Angina</SelectItem>
                      <SelectItem value="pulmonary-embolism">Pulmonary Embolism</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center mt-6">
                  <Link to='/medication-orderset' ><Button type="submit">Submit</Button></Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </>
      
  )
}