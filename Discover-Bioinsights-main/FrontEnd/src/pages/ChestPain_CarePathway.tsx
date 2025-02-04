import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChestPainCarePathway() {

  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    ecgFindings: {
      raisedSTElevation: false,
      newTWaveInversion: false,
      presenceOfQWaves: false,
      presenceOfLeftBundleBranchBlock: false,
      stElevationHigh: '',
      stDepressionLow: '',
      tInversionNonDiagnostic: '',
      arrhythmiasHeartFailure: '',
      otherEcgFindings: ''
    },
    seenBy: '',
    dateAndTime: '',
    chiefComplaint: {
      onsetTime: '',
      duration: '',
      location: '',
      type: '',
      radiation: '',
      factorsAffecting: '',
      associatedSymptoms: []
    },
    historyOfPresentIllness: '',
    examinationDetails: {
      general: [],
      heartSounds: [],
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
    killipClass: '',
    referral: {
      registrar: '',
      registrarTime: '',
      cardiologist: '',
      cardiologistTime: '',
      otherConsultants: '',
      otherConsultantsTime: ''
    },
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

  const handleArrayCheckboxChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: prev[category][field].includes(value)
          ? prev[category][field].filter(item => item !== value)
          : [...prev[category][field], value]
      }
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
              <CardTitle className="text-2xl font-bold text-center">Chest Pain Care Pathway</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Name</Label>
                    <Input
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      placeholder="Patient Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientId">Patient ID</Label>
                    <Input
                      id="patientId"
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleInputChange}
                      placeholder="Patient ID"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Chest Pain Protocol</h3>
                  <Button>Evaluate STEMI</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">ECG Findings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="raisedSTElevation"
                        checked={formData.ecgFindings.raisedSTElevation}
                        onCheckedChange={(checked) => handleCheckboxChange('ecgFindings', 'raisedSTElevation')}
                      />
                      <Label htmlFor="raisedSTElevation">Raised ST elevation present</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newTWaveInversion"
                        checked={formData.ecgFindings.newTWaveInversion}
                        onCheckedChange={(checked) => handleCheckboxChange('ecgFindings', 'newTWaveInversion')}
                      />
                      <Label htmlFor="newTWaveInversion">New T wave inversion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="presenceOfQWaves"
                        checked={formData.ecgFindings.presenceOfQWaves}
                        onCheckedChange={(checked) => handleCheckboxChange('ecgFindings', 'presenceOfQWaves')}
                      />
                      <Label htmlFor="presenceOfQWaves">Presence of Q waves</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="presenceOfLeftBundleBranchBlock"
                        checked={formData.ecgFindings.presenceOfLeftBundleBranchBlock}
                        onCheckedChange={(checked) => handleCheckboxChange('ecgFindings', 'presenceOfLeftBundleBranchBlock')}
                      />
                      <Label htmlFor="presenceOfLeftBundleBranchBlock">Presence of left bundle branch block</Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="font-bold">ST Elevation high</Label>
                      <RadioGroup
                        value={formData.ecgFindings.stElevationHigh}
                        onValueChange={(value) => handleNestedInputChange('ecgFindings', 'stElevationHigh', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="I" id="st-elevation-I" />
                          <Label htmlFor="st-elevation-I">I</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="II" id="st-elevation-II" />
                          <Label htmlFor="st-elevation-II">II</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="III" id="st-elevation-III" />
                          <Label htmlFor="st-elevation-III">III</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold">ST Depression low</Label>
                      <RadioGroup
                        value={formData.ecgFindings.stDepressionLow}
                        onValueChange={(value) => handleNestedInputChange('ecgFindings', 'stDepressionLow', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="aVR" id="st-depression-aVR" />
                          <Label htmlFor="st-depression-aVR">aVR</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="aVL" id="st-depression-aVL" />
                          <Label htmlFor="st-depression-aVL">aVL</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="aVF" id="st-depression-aVF" />
                          <Label htmlFor="st-depression-aVF">aVF</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold">T inversion/Non Diagnostic</Label>
                      <RadioGroup
                        value={formData.ecgFindings.tInversionNonDiagnostic}
                        onValueChange={(value) => handleNestedInputChange('ecgFindings', 'tInversionNonDiagnostic', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="V4" id="t-inversion-V4" />
                          <Label htmlFor="t-inversion-V4">V4</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="V5" id="t-inversion-V5" />
                          <Label htmlFor="t-inversion-V5">V5</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="V6" id="t-inversion-V6" />
                          <Label htmlFor="t-inversion-V6">V6</Label>
                        </div>
                      </RadioGroup>
                    
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold">Arrhythmias/ Heart Failure</Label>
                    <RadioGroup
                      value={formData.ecgFindings.arrhythmiasHeartFailure}
                      onValueChange={(value) => handleNestedInputChange('ecgFindings', 'arrhythmiasHeartFailure', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="arrhythmias-yes" />
                        <Label htmlFor="arrhythmias-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="arrhythmias-no" />
                        <Label htmlFor="arrhythmias-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otherEcgFindings" className="font-bold">Other ECG findings</Label>
                    <Textarea
                      id="otherEcgFindings"
                      value={formData.ecgFindings.otherEcgFindings}
                      onChange={(e) => handleNestedInputChange('ecgFindings', 'otherEcgFindings', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="seenBy" className="font-bold">Seen by</Label>
                    <Input
                      id="seenBy"
                      name="seenBy"
                      value={formData.seenBy}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateAndTime" className="font-bold">Date and Time</Label>
                    <Input
                      id="dateAndTime"
                      name="dateAndTime"
                      type="datetime-local"
                      value={formData.dateAndTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Chief Complaint (Chest Pain)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="onsetTime">Onset time</Label>
                      <Input
                        id="onsetTime"
                        type="time"
                        value={formData.chiefComplaint.onsetTime}
                        onChange={(e) => handleNestedInputChange('chiefComplaint', 'onsetTime', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        placeholder="in hours"
                        value={formData.chiefComplaint.duration}
                        onChange={(e) => handleNestedInputChange('chiefComplaint', 'duration', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.chiefComplaint.location}
                        onChange={(e) => handleNestedInputChange('chiefComplaint', 'location', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Input
                        id="type"
                        value={formData.chiefComplaint.type}
                        onChange={(e) => handleNestedInputChange('chiefComplaint', 'type', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="radiation">Radiation</Label>
                      <Input
                        id="radiation"
                        value={formData.chiefComplaint.radiation}
                        onChange={(e) => handleNestedInputChange('chiefComplaint', 'radiation', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="factorsAffecting">Factors affecting</Label>
                      <Input
                        id="factorsAffecting"
                        value={formData.chiefComplaint.factorsAffecting}
                        onChange={(e) => handleNestedInputChange('chiefComplaint', 'factorsAffecting', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Associated Symptoms</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Nausea Vomiting', 'Shortness Of Breath', 'Coughing Blood', 'Sweating', 'Palpitations', 'Syncope'].map((symptom) => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom}
                          checked={formData.chiefComplaint.associatedSymptoms.includes(symptom)}
                          onCheckedChange={(checked) => handleArrayCheckboxChange('chiefComplaint', 'associatedSymptoms', symptom)}
                        />
                        <Label htmlFor={symptom}>{symptom}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="historyOfPresentIllness">History of Present Illness</Label>
                  <Textarea
                    id="historyOfPresentIllness"
                    value={formData.historyOfPresentIllness}
                    onChange={handleInputChange}
                    name="historyOfPresentIllness"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Examination Details</h3>
                  <div className="space-y-2">
                    <Label>General</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Pallor', 'Icterus', 'Cyanosis', 'Clubbing', 'Koilonychia', 'Lymphadenopathy', 'Edema'].map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox
                            id={item}
                            checked={formData.examinationDetails.general.includes(item)}
                            onCheckedChange={(checked) => handleArrayCheckboxChange('examinationDetails', 'general', item)}
                          />
                          <Label htmlFor={item}>{item}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Heart Sounds</Label>
                    <div className="flex space-x-4">
                      {['S1', 'S2', 'S3', 'S4', 'MURMURS'].map((sound) => (
                        <div key={sound} className="flex items-center space-x-2">
                          <Checkbox
                            id={sound}
                            checked={formData.examinationDetails.heartSounds.includes(sound)}
                            onCheckedChange={(checked) => handleArrayCheckboxChange('examinationDetails', 'heartSounds', sound)}
                          />
                          <Label htmlFor={sound}>{sound}</Label>
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
                        onChange={(e) => handleNestedInputChange('examinationDetails', 'pulseRate', { ...formData.examinationDetails.pulseRate, rhythm: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pulseRateVolume">Pulse Rate Volume</Label>
                      <Input
                        id="pulseRateVolume"
                        value={formData.examinationDetails.pulseRate.volume}
                        onChange={(e) => handleNestedInputChange('examinationDetails', 'pulseRate', { ...formData.examinationDetails.pulseRate, volume: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pulseRateCharacter">Pulse Rate Character</Label>
                      <Input
                        id="pulseRateCharacter"
                        value={formData.examinationDetails.pulseRate.character}
                        onChange={(e) => handleNestedInputChange('examinationDetails', 'pulseRate', { ...formData.examinationDetails.pulseRate, character: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-bold">Vascular System</Label>
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
                      <Label className="font-bold">Carotid Bruit</Label>
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
                    <Label className="font-bold">Lungs</Label>
                    <div className="grid grid-cols-5 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="airEntry">Air entry</Label>
                        <Input
                          id="airEntry"
                          value={formData.examinationDetails.lungs.airEntry}
                          onChange={(e) => handleNestedInputChange('examinationDetails', 'lungs', { ...formData.examinationDetails.lungs, airEntry: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ltLung">Lt lung</Label>
                        <Input
                          id="ltLung"
                          value={formData.examinationDetails.lungs.ltLung}
                          onChange={(e) => handleNestedInputChange('examinationDetails', 'lungs', { ...formData.examinationDetails.lungs, ltLung: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rtLung">Rt lung</Label>
                        <Input
                          id="rtLung"
                          value={formData.examinationDetails.lungs.rtLung}
                          onChange={(e) => handleNestedInputChange('examinationDetails', 'lungs', { ...formData.examinationDetails.lungs, rtLung: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wheeze">Wheeze</Label>
                        <Input
                          id="wheeze"
                          value={formData.examinationDetails.lungs.wheeze}
                          onChange={(e) => handleNestedInputChange('examinationDetails', 'lungs', { ...formData.examinationDetails.lungs, wheeze: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="crepts">Crepts</Label>
                        <Input
                          id="crepts"
                          value={formData.examinationDetails.lungs.crepts}
                          onChange={(e) => handleNestedInputChange('examinationDetails', 'lungs', { ...formData.examinationDetails.lungs, crepts: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="font-bold">Abdomen</Label>
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
                      <Label className="font-bold">Bowel</Label>
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
                      <Label className="font-bold">Organomegaly</Label>
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
                      <Label htmlFor="cns" className="font-bold">Central Nervous System (CNS)</Label>
                      <Textarea
                        id="cns"
                        value={formData.examinationDetails.cns}
                        onChange={(e) => handleNestedInputChange('examinationDetails', 'cns', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="neurocognitiveFunction" className="font-bold">Neurocognitive function non-decline (NFND) or any other defects</Label>
                      <Textarea
                        id="neurocognitiveFunction"
                        value={formData.examinationDetails.neurocognitiveFunction}
                        onChange={(e) => handleNestedInputChange('examinationDetails', 'neurocognitiveFunction', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Killip Class</h3>
                  <RadioGroup
                    value={formData.killipClass}
                    onValueChange={(value) => handleInputChange({ target: { name: 'killipClass', value } })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="I" id="killip-I" />
                      <Label htmlFor="killip-I">Class I - No evidence of LV dysfunction, absence of pulmonary congestion, normal systemic perfusion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="II" id="killip-II" />
                      <Label htmlFor="killip-II">Class II - BP normal, 2 of the following findings: basal rales, S3, cardiomegaly on chest X-ray</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="III" id="killip-III" />
                      <Label htmlFor="killip-III">Class III - Pulmonary edema with preserved BP</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="IV" id="killip-IV" />
                      <Label htmlFor="killip-IV">Class IV - Cardiogenic shock - hypoperfusion and Pulmonary edema</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Referral</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="registrar">Registrar</Label>
                      <Select
                        value={formData.referral.registrar}
                        onValueChange={(value) => handleNestedInputChange('referral', 'registrar', value)}
                      >
                        <SelectTrigger id="registrar">
                          <SelectValue placeholder="Select registrar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="registrar1">Registrar 1</SelectItem>
                          <SelectItem value="registrar2">Registrar 2</SelectItem>
                          <SelectItem value="registrar3">Registrar 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrarTime">Time of notification</Label>
                      <Input
                        id="registrarTime"
                        type="datetime-local"
                        value={formData.referral.registrarTime}
                        onChange={(e) => handleNestedInputChange('referral', 'registrarTime', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardiologist">Cardiologist</Label>
                      <Select
                        value={formData.referral.cardiologist}
                        onValueChange={(value) => handleNestedInputChange('referral', 'cardiologist', value)}
                      >
                        <SelectTrigger id="cardiologist">
                          <SelectValue placeholder="Select cardiologist" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiologist1">Cardiologist 1</SelectItem>
                          <SelectItem value="cardiologist2">Cardiologist 2</SelectItem>
                          <SelectItem value="cardiologist3">Cardiologist 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardiologistTime">Time of notification</Label>
                      <Input
                        id="cardiologistTime"
                        type="datetime-local"
                        value={formData.referral.cardiologistTime}
                        onChange={(e) => handleNestedInputChange('referral', 'cardiologistTime', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otherConsultants">Other Consultants</Label>
                      <Select
                        value={formData.referral.otherConsultants}
                        onValueChange={(value) => handleNestedInputChange('referral', 'otherConsultants', value)}
                      >
                        <SelectTrigger id="otherConsultants">
                          <SelectValue placeholder="Select other consultants" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultant1">Consultant 1</SelectItem>
                          <SelectItem value="consultant2">Consultant 2</SelectItem>
                          <SelectItem value="consultant3">Consultant 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otherConsultantsTime">Time of notification</Label>
                      <Input
                        id="otherConsultantsTime"
                        type="datetime-local"
                        value={formData.referral.otherConsultantsTime}
                        onChange={(e) => handleNestedInputChange('referral', 'otherConsultantsTime', e.target.value)}
                      />
                    </div>
                  </div>
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
                      <SelectItem value="stemi">STEMI</SelectItem>
                      <SelectItem value="nstemi">NSTEMI</SelectItem>
                      <SelectItem value="unstable-angina">Unstable Angina</SelectItem>
                      <SelectItem value="stable-angina">Stable Angina</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </>
      
  )
}