<?php

//get patients according to user logged in
//get the patients last observation
//display the data;

use Illuminate\Database\Capsule\Manager as DB;
use models\AssignedFacility;
use models\Patient;
use models\User;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Font;


session_start();
$user = $_SESSION['user'];
$user = User::findOrFail($user['id']);


$assignedFacilities = AssignedFacility::select('facility')->where('userID', $user->id)->get();

$data = [];
$patients = [];
foreach ($assignedFacilities as $assignedFacility) {
    $fPatients = Patient::where('facility', $assignedFacility->facility)->get();
    $pds = DB::select("SELECT A.cccNo, A.county, A.facility, A.sex, A.dob, A.date_of_hiv_diagnosis, A.date_enrolled, A.dateStartedART, A.startRegimen, A.startKaletraFormulation,
       B.*, D.name AS 'facilityName', E.`names` AS 'usernames' FROM patients A LEFT JOIN observations B ON A.cccNo = B.patientCCC AND 
B.id = (SELECT MAX(id) FROM observations C WHERE C.patientCCC = A.cccNo) LEFT JOIN facilities D ON D.mfl_code = A.facility
           LEFT JOIN users E ON E.id = B.userId WHERE `facility`= " . $assignedFacility->facility);
    foreach ($pds as $pd) {
        array_push($data, $pd);
    }
}

//echo json_encode($data);
$excel = new Spreadsheet();
$sheet = $excel->getActiveSheet();
$sheet->setCellValue('A1', "Patient CCCNO");
$sheet->setCellValue('B1', "Facility");
$sheet->setCellValue('C1', "County");
$sheet->setCellValue('D1', "Sex");
$sheet->setCellValue('E1', "Date Of Birth");
$sheet->setCellValue('F1', "Date Of HIV Diagnosis");
$sheet->setCellValue('G1', "Date of Enrollment");
$sheet->setCellValue('H1', "Date Started ART");
$sheet->setCellValue('I1', "Start Regimen");
$sheet->setCellValue('J1', "Start Kaletra Formulation");
$sheet->setCellValue('K1', "Current Regimen");
$sheet->setCellValue('L1', "Regimen Line");
$sheet->setCellValue('M1', "Regimen Start Date");
$sheet->setCellValue('N1', "Current Kaletra Formulation");
$sheet->setCellValue('O1', "vlDate");
$sheet->setCellValue('P1', "vlCopies");
$sheet->setCellValue('Q1', "vlOutcome");
$sheet->setCellValue('R1', "vlScoreType");
$sheet->setCellValue('S1', "latestZScore");
$sheet->setCellValue('T1', "opportunisticInfection");
$sheet->setCellValue('U1', "disclosureStatus");
$sheet->setCellValue('V1', "iptStatus");
$sheet->setCellValue('W1', "schooling");
$sheet->setCellValue('X1', "statusAtTransition");
//=======>OVC
$sheet->setCellValue('Y1', "enrolledInOVC");
$sheet->setCellValue('Z1', "dateEnrolledInOVC");
$sheet->setCellValue('AA1', "CPMISNumber");
$sheet->setCellValue('AB1', "ovcVLCopies");
$sheet->setCellValue('AC1', "baselineOvcVlDate");
$sheet->setCellValue('AD1', "dateDiscontinuedFromOVC");
$sheet->setCellValue('AE1', "statusAtOVCDiscontinuation");
//========>OTZ
$sheet->setCellValue('AF1', "enrolledInOTZ");
$sheet->setCellValue('AG1', "dateEnrolledInOTZ");
$sheet->setCellValue('AH1', "OTZArtRegimen");
$sheet->setCellValue('AI1', "OTZVL");
$sheet->setCellValue('AJ1', "OTZVLDate");
$sheet->setCellValue('AK1', "lastAttendDate");
$sheet->setCellValue('AL1', "nextAppointmentDate");
$sheet->setCellValue('AM1', "ArtAdherenceAssessment");
$sheet->setCellValue('AN1', "completedOTZModules");
$sheet->setCellValue('AO1', "statusAtOTZTransition");
$sheet->setCellValue('AP1', "dateDiscontinuedFromOTZ");
$sheet->setCellValue('AQ1', "enrolledInPAMA");
$sheet->setCellValue('AR1', "dateEnrolledInPAMA");
$sheet->setCellValue('AS1', "caregiverInSameFacility");
$sheet->setCellValue('AT1', "caregiverType");
$sheet->setCellValue('AU1', "caregiver1CCC");
$sheet->setCellValue('AV1', "caregiver2CCC");
$sheet->setCellValue('AW1', "caregiver1VL");
$sheet->setCellValue('AX1', "caregiver2VL");
$sheet->setCellValue('AY1', "caregiver1VLDate");
$sheet->setCellValue('AZ1', "caregiver2VLDate");
$sheet->setCellValue('BA1', "caregiver1VLStatus");
$sheet->setCellValue('BB1', "PAMAStatus3");
$sheet->setCellValue('BC1', "PAMAStatus6");
$sheet->setCellValue('BD1', "PAMAStatus12");
$sheet->setCellValue('BE1', "PAMAStatus24");
$sheet->setCellValue('BF1', "PAMAStatusCurrent");
$sheet->setCellValue('BG1', "PAMAStatusTransition");
$sheet->setCellValue('BH1', "dateDiscontinuedFromPAMA");
$sheet->setCellValue('BI1', "comment");
$sheet->setCellValue('BJ1', "created_at");
$sheet->setCellValue('BJ1', "Facility Name");
$sheet->setCellValue('BJ1', "User Name");

for ($i = 1; $i <= sizeof($data); $i++) {
    $datum = $data[$i - 1];
    $sheet->setCellValue('A' . ($i + 1) . '', $datum->cccNo);
    $sheet->setCellValue('B' . ($i + 1), $datum->facility);
    $sheet->setCellValue('C' . ($i + 1), $datum->county);
    $sheet->setCellValue('D' . ($i + 1), $datum->sex);
    $sheet->setCellValue('E' . ($i + 1), $datum->dob);
    $sheet->setCellValue('F' . ($i + 1), $datum->date_of_hiv_diagnosis);
    $sheet->setCellValue('G' . ($i + 1), $datum->date_enrolled);
    $sheet->setCellValue('H' . ($i + 1), $datum->dateStartedART);
    $sheet->setCellValue('I' . ($i + 1), $datum->startRegimen);
    $sheet->setCellValue('J' . ($i + 1), $datum->startKaletraFormulation);
    $sheet->setCellValue('K' . ($i + 1), $datum->currentRegimen);
    $sheet->setCellValue('L' . ($i + 1), $datum->regimenLine);
    $sheet->setCellValue('M' . ($i + 1), $datum->regimenStartDate);
    $sheet->setCellValue('N' . ($i + 1), $datum->kaletraFormulation);
    $sheet->setCellValue('O' . ($i + 1), $datum->vlDate);
    $sheet->setCellValue('P' . ($i + 1), $datum->vlCopies);
    $sheet->setCellValue('Q' . ($i + 1), $datum->vlOutcome);
    $sheet->setCellValue('R' . ($i + 1), $datum->vlScoreType);
    $sheet->setCellValue('S' . ($i + 1), $datum->latestZScore);
    $sheet->setCellValue('T' . ($i + 1), $datum->opportunisticInfection);
    $sheet->setCellValue('U' . ($i + 1), $datum->disclosureStatus);
    $sheet->setCellValue('V' . ($i + 1), $datum->iptStatus);
    $sheet->setCellValue('W' . ($i + 1), $datum->schooling);
    $sheet->setCellValue('X' . ($i + 1), $datum->statusAtTransition);
//=======>OVC
    $sheet->setCellValue('Y' . ($i + 1), $datum->enrolledInOVC);
    $sheet->setCellValue('Z' . ($i + 1), $datum->dateEnrolledInOVC);
    $sheet->setCellValue('AA' . ($i + 1), $datum->CPMISNumber);
    $sheet->setCellValue('AB' . ($i + 1), $datum->ovcVLCopies);
    $sheet->setCellValue('AC' . ($i + 1), $datum->baselineOvcVlDate);
    $sheet->setCellValue('AD' . ($i + 1), $datum->dateDiscontinuedFromOVC);
    $sheet->setCellValue('AE' . ($i + 1), $datum->statusAtOVCDiscontinuation);
//========>OTZ
    $sheet->setCellValue('AF' . ($i + 1), $datum->enrolledInOTZ);
    $sheet->setCellValue('AG' . ($i + 1), $datum->dateEnrolledInOTZ);
    $sheet->setCellValue('AH' . ($i + 1), $datum->OTZArtRegimen);
    $sheet->setCellValue('AI' . ($i + 1), $datum->OTZVL);
    $sheet->setCellValue('AJ' . ($i + 1), $datum->OTZVLDate);
    $sheet->setCellValue('AK' . ($i + 1), $datum->lastAttendDate);
    $sheet->setCellValue('AL' . ($i + 1), $datum->nextAppointmentDate);
    $sheet->setCellValue('AM' . ($i + 1), $datum->ArtAdherenceAssessment);
    $sheet->setCellValue('AN' . ($i + 1), $datum->completedOTZModules);
    $sheet->setCellValue('AO' . ($i + 1), $datum->statusAtOTZTransition);
    $sheet->setCellValue('AP' . ($i + 1), $datum->dateDiscontinuedFromOTZ);
    $sheet->setCellValue('AQ' . ($i + 1), $datum->enrolledInPAMA);
    $sheet->setCellValue('AR' . ($i + 1), $datum->dateEnrolledInPAMA);
    $sheet->setCellValue('AS' . ($i + 1), $datum->caregiverInSameFacility);
    $sheet->setCellValue('AT' . ($i + 1), $datum->caregiverType);
    $sheet->setCellValue('AU' . ($i + 1), $datum->caregiver1CCC);
    $sheet->setCellValue('AV' . ($i + 1), $datum->caregiver2CCC);
    $sheet->setCellValue('AW' . ($i + 1), $datum->caregiver1VL);
    $sheet->setCellValue('AX' . ($i + 1), $datum->caregiver2VL);
    $sheet->setCellValue('AY' . ($i + 1), $datum->caregiver1VLDate);
    $sheet->setCellValue('AZ' . ($i + 1), $datum->caregiver2VLDate);
    $sheet->setCellValue('BA' . ($i + 1), $datum->caregiver1VLStatus);
    $sheet->setCellValue('BB' . ($i + 1), $datum->PAMAStatus3);
    $sheet->setCellValue('BC' . ($i + 1), $datum->PAMAStatus6);
    $sheet->setCellValue('BD' . ($i + 1), $datum->PAMAStatus12);
    $sheet->setCellValue('BE' . ($i + 1), $datum->PAMAStatus24);
    $sheet->setCellValue('BF' . ($i + 1), $datum->PAMAStatusCurrent);
    $sheet->setCellValue('BG' . ($i + 1), $datum->PAMAStatusTransition);
    $sheet->setCellValue('BH' . ($i + 1), $datum->dateDiscontinuedFromPAMA);
    $sheet->setCellValue('BI' . ($i + 1), $datum->comment);
    $sheet->setCellValue('BJ' . ($i + 1), $datum->created_at);
    $sheet->setCellValue('BK' . ($i + 1), $datum->facilityName);
    $sheet->setCellValue('BL' . ($i + 1), $datum->usernames);
}


//define some styles
$styleHeading = array(
    'font' => array(
        'size' => 12,
        'color' => array('rgb' => '000000'),
        'bold' => true,
        'underline' => Font::UNDERLINE_SINGLE
    ),
    'alignment' => array(
        'horizontal' => Alignment::HORIZONTAL_CENTER,
    ),
    'borders' => array(
        'bottom' => array(
            'style' => Border::BORDER_MEDIUM
        ),
        'right' => array(
            'style' => Border::BORDER_MEDIUM
        ),
        'left' => array(
            'style' => Border::BORDER_MEDIUM
        )
    )
);
$sheet->getStyle('A1:BL1')->applyFromArray($styleHeading);
foreach (range('A', $sheet->getHighestColumn()) as $col){
    $sheet->getColumnDimension($col)->setAutoSize(true);
}


//this is for MS Office Excel xlsx format header==>
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment; filename="patients_pediatric_report2.xlsx"');
header('Cache-Control: max-age=0');

$writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($excel);
$writer->save("php://output");
