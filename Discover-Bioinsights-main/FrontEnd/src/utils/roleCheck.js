// frontend/src/utils/roleCheck.js

const permissions = {
  nurse: {
    readonly: [
      "medicationmaster",
      "labmaster",
      "chestpaincarepathway",
    ],
    editable: [
      "eddashboard",
      "findpatient",
      "patientsearchresults",
      "returnpatientdetailsupdate",
      "newpatientregistration",
      "patientadmissiontriage",
      "cprform",
      "defaultcarepathway",
      "stemi",
      "thrombolysis",
      "nstemi",
      "genericmedicationorderset",
      "vitals",
      "eroutcomes",
    ],
    notAccessible: [],
  },
  erphysician: {
    readonly: [
      "medicationmaster",
      "labmaster",
      "eroutcomes",
    ],
    editable: [
      "eddashboard",
      "findpatient",
      "patientsearchresults",
      "returnpatientdetailsupdate",
      "newpatientregistration",
      "patientadmissiontriage",
      "cprform",
      "chestpaincarepathway",
      "defaultcarepathway",
      "stemi",
      "thrombolysis",
      "nstemi",
      "genericmedicationorderset",
      "vitals",
    ],
    notAccessible: [],
  },
  administrator: {
    readonly: [
      "eddashboard",
      "patientadmissiontriage",
      "cprform",
      "chestpaincarepathway",
      "defaultcarepathway",
      "stemi",
      "thrombolysis",
      "nstemi",
      "genericmedicationorderset",
      "vitals",
      "eroutcomes",
    ],
    editable: [
      "medicationmaster",
      "labmaster",
      "findpatient",
      "patientsearchresults",
      "returnpatientdetailsupdate",
      "newpatientregistration",
    ],
    notAccessible: [],
  },
  registrator: {
    readonly: [
      "eddashboard",
      "returnpatientdetailsupdate",
      "newpatientregistration",
    ],
    editable: [
      "findpatient",
      "patientsearchresults",
      "patientadmissiontriage",
      "cprform",
      "chestpaincarepathway",
      "defaultcarepathway",
      "stemi",
      "thrombolysis",
      "nstemi",
      "genericmedicationorderset",
      "vitals",
      "eroutcomes",
    ],
    notAccessible: [
      "medicationmaster",
      "labmaster",
    ],
  },
};

/**
 * Determines the access level of a user for a particular screen.
 * @param {string} screen - The name of the screen being accessed.
 * @param {string} role - The role of the user (e.g., "nurse", "doctor", "admin").
 * @returns {string} - "Editable", "ReadOnly", or "NotAccessible" based on the user's access level.
 */
export function getAccessLevel(screen, role) {
  const normalizedScreen = screen.toLowerCase();
  const normalizedRole = role.toLowerCase();

  if (
    permissions[normalizedRole]?.editable.some(
      (s) => s.toLowerCase() === normalizedScreen
    )
  ) {
    return "Editable";
  } else if (
    permissions[normalizedRole]?.readonly.some(
      (s) => s.toLowerCase() === normalizedScreen
    )
  ) {
    return "ReadOnly";
  } else {
    return "NotAccessible";
  }
}
