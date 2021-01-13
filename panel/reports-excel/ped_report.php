<?php
//Pesiatric report with box/spout
//ini_set('max_execution_time', '300'); //300 seconds = 5 minutes
ini_set('max_execution_time', '0');//Unlimited execution time
require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/Facility.php";
require_once __DIR__ . "/../../models/AssignedFacility.php";
require_once __DIR__ . "/../../models/Patient.php";
require_once __DIR__ . "/../../models/Observation.php";
require_once __DIR__ . "/../functions.php";



session_start();
$user = $_SESSION['user'];

use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Illuminate\Database\Capsule\Manager as DB;

$assignedFacilities = AssignedFacility::select('facility')->where('userID', $user->id)->get();

$data = [];
$patients = [];
foreach ($assignedFacilities as $assignedFacility) {
    $fPatients = Patient::where('facility', $assignedFacility->facility)->get();
    $pds = DB::select("SELECT A.cccNo, A.county, A.facility, A.sex, A.dob, A.date_of_hiv_diagnosis, A.date_enrolled, A.dateStartedART, A.startRegimen, A.startKaletraFormulation,
       B.*, D.name AS 'facilityName', E.`names` AS 'usernames' FROM patients A LEFT JOIN observations B ON A.cccNo = B.patientCCC AND 
B.id = (SELECT MAX(id) FROM observations C WHERE C.patientCCC = A.cccNo) LEFT JOIN facilities D ON D.mfl_code = A.facility
           LEFT JOIN users E ON E.id = B.userId WHERE A.transferred_out = 0 `facility`= " . $assignedFacility->facility);
    foreach ($pds as $pd) {
        array_push($data, $pd);
    }
}
$writer = WriterEntityFactory::createXLSXWriter();
$writer->openToFile("test.xlsx");

$boldRowStyle = (new \Box\Spout\Writer\Common\Creator\Style\StyleBuilder())
    ->setFontBold()
    ->setFontSize(12)
    ->setFontUnderline()
    ->setCellAlignment(\Box\Spout\Common\Entity\Style\CellAlignment::CENTER)
    ->build();

$normalRowStyle = (new \Box\Spout\Writer\Common\Creator\Style\StyleBuilder())
    ->setFontSize(10)
    ->setCellAlignment(\Box\Spout\Common\Entity\Style\CellAlignment::CENTER)
    ->build();

$headerCells = [

    WriterEntityFactory::createCell("Patient CCCNO"),
    WriterEntityFactory::createCell("Facility"),
    WriterEntityFactory::createCell("County"),
    WriterEntityFactory::createCell("Sex"),
    WriterEntityFactory::createCell("Date Of Birth"),
    WriterEntityFactory::createCell("Date Of HIV Diagnosis"),
    WriterEntityFactory::createCell("Date of Enrollment"),
    WriterEntityFactory::createCell("Date Started ART"),
    WriterEntityFactory::createCell("Start Regimen"),
    WriterEntityFactory::createCell("Start Kaletra Formulation"),
    WriterEntityFactory::createCell("Current Regimen"),
    WriterEntityFactory::createCell("Regimen Line"),
    WriterEntityFactory::createCell("Regimen Start Date"),
    WriterEntityFactory::createCell("Current Kaletra Formulation"),
    WriterEntityFactory::createCell("VL Date"),
    WriterEntityFactory::createCell("VL Copies"),
    WriterEntityFactory::createCell("VL Outcome"),
    WriterEntityFactory::createCell("VL Score Type"),
    WriterEntityFactory::createCell("Latest ZScore"),
    WriterEntityFactory::createCell("Opportunistic Infection"),
    WriterEntityFactory::createCell("disclosureStatus"),
    WriterEntityFactory::createCell("iptStatus"),
    WriterEntityFactory::createCell("schooling"),
    WriterEntityFactory::createCell("statusAtTransition"),
//====>OVC Data
    WriterEntityFactory::createCell("enrolledInOVC"),
    WriterEntityFactory::createCell("dateEnrolledInOVC"),
    WriterEntityFactory::createCell("CPMISNumber"),
    WriterEntityFactory::createCell("ovcVLCopies"),
    WriterEntityFactory::createCell("baselineOvcVlDate"),
    WriterEntityFactory::createCell("dateDiscontinuedFromOVC"),
    WriterEntityFactory::createCell("statusAtOVCDiscontinuation"),
//=====>OTZ
    WriterEntityFactory::createCell("enrolledInOTZ"),
    WriterEntityFactory::createCell("dateEnrolledInOTZ"),
    WriterEntityFactory::createCell("OTZArtRegimen"),
    WriterEntityFactory::createCell("OTZVL"),
    WriterEntityFactory::createCell("OTZVLDate"),
    WriterEntityFactory::createCell("lastAttendDate"),
    WriterEntityFactory::createCell("nextAppointmentDate"),
    WriterEntityFactory::createCell("ArtAdherenceAssessment"),
    WriterEntityFactory::createCell("completedOTZModules"),
    WriterEntityFactory::createCell("statusAtOTZTransition"),
    WriterEntityFactory::createCell("dateDiscontinuedFromOTZ"),
    WriterEntityFactory::createCell("enrolledInPAMA"),
    WriterEntityFactory::createCell("dateEnrolledInPAMA"),
    WriterEntityFactory::createCell("caregiverInSameFacility"),
    WriterEntityFactory::createCell("caregiverType"),
    WriterEntityFactory::createCell("caregiver1CCC"),
    WriterEntityFactory::createCell("caregiver2CCC"),
    WriterEntityFactory::createCell("caregiver1VL"),
    WriterEntityFactory::createCell("caregiver2VL"),
    WriterEntityFactory::createCell("caregiver1VLDate"),
    WriterEntityFactory::createCell("caregiver2VLDate"),
    WriterEntityFactory::createCell("caregiver1VLStatus"),
    WriterEntityFactory::createCell("PAMAStatus3"),
    WriterEntityFactory::createCell("PAMAStatus6"),
    WriterEntityFactory::createCell("PAMAStatus12"),
    WriterEntityFactory::createCell("PAMAStatus24"),
    WriterEntityFactory::createCell("PAMAStatusCurrent"),
    WriterEntityFactory::createCell("PAMAStatusTransition"),
    WriterEntityFactory::createCell("dateDiscontinuedFromPAMA"),
    WriterEntityFactory::createCell("comment"),
    WriterEntityFactory::createCell("created_at"),
    WriterEntityFactory::createCell("Facility Name"),
    WriterEntityFactory::createCell("User Name"),

];
$headerRow = WriterEntityFactory::createRow($headerCells, $boldRowStyle);

$writer->addRow($headerRow);

foreach ($data as $datum) {
    $rowCells = [
        WriterEntityFactory::createCell($datum->cccNo),
        WriterEntityFactory::createCell($datum->facility),
        WriterEntityFactory::createCell($datum->county),
        WriterEntityFactory::createCell($datum->sex),
        WriterEntityFactory::createCell($datum->dob),
        WriterEntityFactory::createCell($datum->date_of_hiv_diagnosis),
        WriterEntityFactory::createCell($datum->date_enrolled),
        WriterEntityFactory::createCell($datum->dateStartedART),
        WriterEntityFactory::createCell($datum->startRegimen),
        WriterEntityFactory::createCell($datum->startKaletraFormulation),
        WriterEntityFactory::createCell($datum->currentRegimen),
        WriterEntityFactory::createCell($datum->regimenLine),
        WriterEntityFactory::createCell($datum->regimenStartDate),
        WriterEntityFactory::createCell($datum->kaletraFormulation),
        WriterEntityFactory::createCell($datum->vlDate),
        WriterEntityFactory::createCell($datum->vlCopies),
        WriterEntityFactory::createCell($datum->vlOutcome),
        WriterEntityFactory::createCell($datum->vlScoreType),
        WriterEntityFactory::createCell($datum->latestZScore),
        WriterEntityFactory::createCell($datum->opportunisticInfection),
        WriterEntityFactory::createCell($datum->disclosureStatus),
        WriterEntityFactory::createCell($datum->iptStatus),
        WriterEntityFactory::createCell($datum->schooling),
        WriterEntityFactory::createCell($datum->statusAtTransition),
//==WriterEntityFactory::self::createCell(
        WriterEntityFactory::createCell($datum->enrolledInOVC),
        WriterEntityFactory::createCell($datum->dateEnrolledInOVC),
        WriterEntityFactory::createCell($datum->CPMISNumber),
        WriterEntityFactory::createCell($datum->ovcVLCopies),
        WriterEntityFactory::createCell($datum->baselineOvcVlDate),
        WriterEntityFactory::createCell($datum->dateDiscontinuedFromOVC),
        WriterEntityFactory::createCell($datum->statusAtOVCDiscontinuation),
//========>OTZ
        WriterEntityFactory::createCell($datum->enrolledInOTZ),
        WriterEntityFactory::createCell($datum->dateEnrolledInOTZ),
        WriterEntityFactory::createCell($datum->OTZArtRegimen),
        WriterEntityFactory::createCell($datum->OTZVL),
        WriterEntityFactory::createCell($datum->OTZVLDate),
        WriterEntityFactory::createCell($datum->lastAttendDate),
        WriterEntityFactory::createCell($datum->nextAppointmentDate),
        WriterEntityFactory::createCell($datum->ArtAdherenceAssessment),
        WriterEntityFactory::createCell($datum->completedOTZModules),
        WriterEntityFactory::createCell($datum->statusAtOTZTransition),
        WriterEntityFactory::createCell($datum->dateDiscontinuedFromOTZ),
        WriterEntityFactory::createCell($datum->enrolledInPAMA),
        WriterEntityFactory::createCell($datum->dateEnrolledInPAMA),
        WriterEntityFactory::createCell($datum->caregiverInSameFacility),
        WriterEntityFactory::createCell($datum->caregiverType),
        WriterEntityFactory::createCell($datum->caregiver1CCC),
        WriterEntityFactory::createCell($datum->caregiver2CCC),
        WriterEntityFactory::createCell($datum->caregiver1VL),
        WriterEntityFactory::createCell($datum->caregiver2VL),
        WriterEntityFactory::createCell($datum->caregiver1VLDate),
        WriterEntityFactory::createCell($datum->caregiver2VLDate),
        WriterEntityFactory::createCell($datum->caregiver1VLStatus),
        WriterEntityFactory::createCell($datum->PAMAStatus3),
        WriterEntityFactory::createCell($datum->PAMAStatus6),
        WriterEntityFactory::createCell($datum->PAMAStatus12),
        WriterEntityFactory::createCell($datum->PAMAStatus24),
        WriterEntityFactory::createCell($datum->PAMAStatusCurrent),
        WriterEntityFactory::createCell($datum->PAMAStatusTransition),
        WriterEntityFactory::createCell($datum->dateDiscontinuedFromPAMA),
        WriterEntityFactory::createCell($datum->comment),
        WriterEntityFactory::createCell($datum->created_at),
        WriterEntityFactory::createCell($datum->facilityName),
        WriterEntityFactory::createCell($datum->usernames),
    ];
    try {
        $writer->addRow(WriterEntityFactory::createRow($rowCells, $normalRowStyle));
    } catch (\Box\Spout\Common\Exception\IOException $e) {
        logError($e->getCode(), $e->getMessage());
    } catch (\Box\Spout\Writer\Exception\WriterNotOpenedException $e) {
        logError($e->getCode(), $e->getMessage());
    }
}
$writer->close();