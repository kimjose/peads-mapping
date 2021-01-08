<?php


require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/Facility.php";
require_once __DIR__ . "/../../models/AssignedFacility.php";
require_once __DIR__ . "/../../models/Patient.php";
require_once __DIR__ . "/../../models/Observation.php";
session_start();
$user = $_SESSION['user'];
$user = User::findOrFail($user['id']);
$assignedFacilities = AssignedFacility::select('facility')->where('userID', 39)->get();
$facilities = [];
foreach ($assignedFacilities as $assignedFacility) {
    array_push($facilities, $assignedFacility->facility);
}

//echo json_encode($facilities);
$data = [];
$patients = [];
foreach ($assignedFacilities as $assignedFacility) {
    $fPatients = Patient::where('facility', $assignedFacility->facility)->get();
    if (sizeof($fPatients) > 0) {
        foreach ($fPatients as $fPatient) {
            array_push($patients, $fPatient);
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
        $pData['facility'] = $facility->mfl_code;
        $pData['lastEntryDate'] = date_format($observation->created_at, 'Y-m-d H:i:s');
        array_push($data, $pData);
    }
}

//echo json_encode($data);
//get patients in every facility
//get patient data


$fpdf = new FPDF('P', 'mm', 'A4');

$fpdf->SetFont('Arial', 'B', 11);

$fpdf->AddPage();

//Adding the title
$fpdf->cell(189, 20, "Patient Report", 0, 1, 'C');

//Table Headers
$fpdf->cell(27, 8, 'CCC No', 1, 0, 'C');
$fpdf->cell(67, 8, 'Facility', 1, 0, 'C');
$fpdf->cell(20, 8, 'Gender', 1, 0, 'C');
$fpdf->cell(30, 8, 'Date Of Birth', 1, 0, 'C');
$fpdf->cell(40, 8, 'Date of Last Entry', 1, 1, 'C');

foreach ($data as $entry) {

    $fpdf->cell(27, 8, $entry['patientCccNo'], 1, 0, 'C');
    $fpdf->cell(67, 8, $entry['facility'], 1, 0, 'C');
    $fpdf->cell(20, 8, $entry['gender'], 1, 0, 'C');
    $fpdf->cell(30, 8, $entry['dob'], 1, 0, 'C');
    $fpdf->cell(40, 8, $entry['lastEntryDate'], 1, 1, 'C');
}
$fpdf->output();