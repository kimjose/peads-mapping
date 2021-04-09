<?php
ini_set('max_execution_time', '0');


require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/Facility.php";
require_once __DIR__ . "/../../models/AssignedFacility.php";
require_once __DIR__ . "/../../models/Patient.php";
require_once __DIR__ . "/../../models/Observation.php";

require_once "../../auth.php";

$data = [];
$patients = [];

$permissionlist = $user->permissions;
if (in_array("3", $permissionlist)) {
    $assignedFacilities = Facility::all();
    foreach ($assignedFacilities as $assignedFacility) {
        $fPatients = Patient::where('facility', $assignedFacility->mfl_code)->get();
        if (sizeof($fPatients) > 0) {
            foreach ($fPatients as $fPatient) {
                array_push($patients, $fPatient);
            }
        }
    }
} else {

    $assignedFacilities = AssignedFacility::select('facility')->where('userID', $loggedUser->id)->get();
    foreach ($assignedFacilities as $assignedFacility) {
        $fPatients = Patient::where('facility', $assignedFacility->facility)->get();
        if (sizeof($fPatients) > 0) {
            foreach ($fPatients as $fPatient) {
                array_push($patients, $fPatient);
            }
        }
    }
}
foreach ($patients as $patient) {
    $pData = [];
    $observation = Observation::where('patientCCC', $patient->cccNo)->orderBy('id', 'desc')->first();
    $facility = Facility::where('mfl_code', $patient->facility)->firstOrFail();
    if ($observation != null) {
        $pData['patientCccNo'] = $patient->cccNo;
        $pData['gender'] = $patient->sex;
        $pData['dob'] = $patient->dob;
        $pData['facilityCode'] = $facility->mfl_code;
        $pData['facilityName'] = $facility->name;
        $pData['lastEntryDate'] = date_format($observation->created_at, 'Y-m-d H:i:s');
        array_push($data, $pData);
    }
}


$fpdf = new FPDF('P', 'mm', 'A3');

$fpdf->SetFont('Arial', 'B', 11);

$fpdf->AddPage();

//Adding the title
$fpdf->cell(189, 20, "Patient Report", 0, 1, 'C');

//Table Headers
$fpdf->cell(27, 8, 'CCC No', 1, 0, 'C');
$fpdf->cell(45, 8, 'Facility Code', 1, 0, 'C');
$fpdf->cell(115, 8, 'Facility Name', 1, 0, 'C');
$fpdf->cell(20, 8, 'Gender', 1, 0, 'C');
$fpdf->cell(30, 8, 'Date Of Birth', 1, 0, 'C');
$fpdf->cell(40, 8, 'Date of Last Entry', 1, 1, 'C');

foreach ($data as $entry) {

    $fpdf->cell(27, 8, $entry['patientCccNo'], 1, 0, 'C');
    $fpdf->cell(45, 8, $entry['facilityCode'], 1, 0, 'C');
    $fpdf->cell(115, 8, $entry['facilityName'], 1, 0, 'C');
    $fpdf->cell(20, 8, $entry['gender'], 1, 0, 'C');
    $fpdf->cell(30, 8, $entry['dob'], 1, 0, 'C');
    $fpdf->cell(40, 8, $entry['lastEntryDate'], 1, 1, 'C');
}
$fpdf->output();