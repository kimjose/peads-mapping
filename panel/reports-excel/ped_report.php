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

try {

    $assignedFacilities = AssignedFacility::select('facility')->where('userID', $user->id)->get();

    $data = [];
    $patients = [];
    foreach ($assignedFacilities as $assignedFacility) {
        $fPatients = Patient::where('facility', $assignedFacility->facility)->where('transferred_out', 0)->get();
        $pds = DB::select("SELECT A.cccNo, A.county, A.facility, A.sex, A.dob, A.date_of_hiv_diagnosis, A.date_enrolled, A.dateStartedART, A.startRegimen, A.startKaletraFormulation,
       B.*, D.name AS 'facilityName', E.`names` AS 'usernames' FROM patients A LEFT JOIN observations B ON A.cccNo = B.patientCCC AND 
B.id = (SELECT MAX(id) FROM observations C WHERE C.patientCCC = A.cccNo) LEFT JOIN facilities D ON D.mfl_code = A.facility
           LEFT JOIN users E ON E.id = B.userId WHERE A.transferred_out = 0 AND `facility`= " . $assignedFacility->facility);
        foreach ($pds as $pd) {
            array_push($data, $pd);
        }
    }
    $filename = "temp/pediatric_report_";
    $filename .= time();
    $filename .= ".xlsx";
    $writer = WriterEntityFactory::createXLSXWriter();
    $writer->openToFile($filename);

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
        WriterEntityFactory::createCell("Enrolled In OTZ"),
        WriterEntityFactory::createCell("Dte Enrolled In OTZ"),
        WriterEntityFactory::createCell("OTZ Art Regimen"),
        WriterEntityFactory::createCell("OTZ VL"),
        WriterEntityFactory::createCell("OTZ VL Date"),
        WriterEntityFactory::createCell("Last AttendDate"),
        WriterEntityFactory::createCell("Next AppointmentDate"),
        WriterEntityFactory::createCell("Art Adherence Assessment"),
        WriterEntityFactory::createCell("Completed OTZ Modules"),
        WriterEntityFactory::createCell("Status At OTZ Transition"),
        WriterEntityFactory::createCell("Date Discontinued From OTZ"),
        WriterEntityFactory::createCell("Enrolled In PAMA"),
        WriterEntityFactory::createCell("Date Enrolled In PAMA"),
        WriterEntityFactory::createCell("caregiverInSameFacility"),
        WriterEntityFactory::createCell("Caregiver Type"),
        WriterEntityFactory::createCell("Caregiver1 CCC"),
        WriterEntityFactory::createCell("Caregiver2 CCC"),
        WriterEntityFactory::createCell("Caregiver1 VL"),
        WriterEntityFactory::createCell("Caregiver2 VL"),
        WriterEntityFactory::createCell("Caregiver1 VL Date"),
        WriterEntityFactory::createCell("Caregiver2 VL Date"),
        WriterEntityFactory::createCell("Caregiver1 VL Status"),
        WriterEntityFactory::createCell("PAMA Status 3 Months"),
        WriterEntityFactory::createCell("PAMA Status 6 Months"),
        WriterEntityFactory::createCell("PAMA Status 12 Months"),
        WriterEntityFactory::createCell("PAMA Status 24 Months"),
        WriterEntityFactory::createCell("PAMA Status Current"),
        WriterEntityFactory::createCell("PAMA Status At Transition"),
        WriterEntityFactory::createCell("Date Discontinued From PAMA"),
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
    $writer->openToBrowser($filename);
    $writer->close();
    unlink($filename);
} catch (\Throwable $th) {
    http_response_code(400);
    logError($th->getCode(), $th->getMessage());
    echo myJsonResponse(400, $th->getMessage());
}