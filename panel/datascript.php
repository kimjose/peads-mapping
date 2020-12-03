<?php

require_once "functions.php";
require_once "../models/OTZModules.php";
require_once __DIR__ . "/../models/Observation.php";
require_once __DIR__ . "/../models/Regimen.php";
require_once __DIR__ . "/../models/Patient.php";
require_once __DIR__ . "/../models/Facility.php";

$request = $_GET['request'];
$response = [];

try {

    if ($request == "get_otz_modules") {
        require_once "../models/OTZModules.php";
        $modules = OTZModules::all();
        echo myJsonResponse(200, "Modules retrieved", $modules);
    } elseif ($request == "submit_form") {
        $userId = $_POST['userId'];
        $PAMAStatus6 = $_POST['PAMAStatus6'];
        $PAMAStatus12 = $_POST['PAMAStatus12'];
        $PAMAStatus24 = $_POST['PAMAStatus24'];
        $PAMAStatusCurrent = $_POST['PAMAStatusCurrent'];
        $PAMAStatusTransition = $_POST['PAMAStatusTransition'];
        $dateDiscontinuedFromPAMA = $_POST['dateDiscontinuedFromPAMA'];
        $comment = $_POST['comment'];



        $dateDiscontinuedFromOTZ = $_POST['dateDiscontinuedFromOTZ'];
        $enrolledInPAMA = $_POST['enrolledInPAMA'];
        $dateEnrolledInPAMA = $_POST['dateEnrolledInPAMA'];
        $caregiverInSameFacility = $_POST['caregiverInSameFacility'];
        $caregiverType = $_POST['caregiverType'];
        $caregiver1CCC = $_POST['caregiver1CCC'];
        $caregiver2CCC = $_POST['caregiver2CCC'];
        $caregiverVL = $_POST['caregiverVL'];
        $caregiverVLDate = $_POST['caregiverVLDate'];
        $caregiverVLStatus = $_POST['caregiverVLStatus'];
        $PAMAStatus3 = $_POST['PAMAStatus3'];


        $OTZArtRegimen = $_POST['OTZArtRegimen'];
        $OTZVL = $_POST['OTZVL'];
        $OTZVLDate = $_POST['OTZVLDate'];
        $missedLastAppointment = $_POST['missedLastAppointment'];
        $ArtAdherenceAssessment = $_POST['ArtAdherenceAssessment'];
        $completedOTZModules = $_POST['completedOTZModules'];
        $statusAtOTZTransition = $_POST['statusAtOTZTransition'];


        $dateEnrolledInOVC = $_POST['dateEnrolledInOVC'];
        $CPMISNumber = $_POST['CPMISNumber'];
        $dateDiscontinuedFromOVC = $_POST['dateDiscontinuedFromOVC'];
        $statusAtOVCDiscontinuation = $_POST['statusAtOVCDiscontinuation'];
        $enrolledInOTZ = $_POST['enrolledInOTZ'];
        $dateEnrolledInOTZ = $_POST['dateEnrolledInOTZ'];

        $patientCCC = $_POST['patientCCC'];
        $currentRegimen = $_POST['currentRegimen'];
        $regimenLine = $_POST['regimenLine'];
        $regimenStartDate = $_POST['regimenStartDate'];
        $kaletraFormulation = $_POST['kaletraFormulation'];
        $vlDate = $_POST['vlDate'];
        $vlCopies = $_POST['vlCopies'];
        $vlOutcome = $_POST['vlOutcome'];

        $latestZScore = $_POST['latestZScore'];
        $opportunisticInfection = $_POST['opportunisticInfection'];
        $disclosureStatus = $_POST['disclosureStatus'];
        $iptStatus = $_POST['iptStatus'];
        $schooling = $_POST['schooling'];
        $statusAtTransition = $_POST['statusAtTransition'];
        $enrolledInOVC = $_POST['enrolledInOVC'];


        Observation::create([
            'patientCCC' => $patientCCC, 'userId' => $userId,
            'currentRegimen' => $currentRegimen,
            'regimenLine' => $regimenLine,
            'regimenStartDate' => $regimenStartDate,
            'kaletraFormulation' => $kaletraFormulation,
            'vlDate' => $vlDate,
            'vlCopies' => $vlCopies,
            'vlOutcome' => $vlOutcome,
            'latestZScore' => $latestZScore, 'opportunisticInfection' => $opportunisticInfection,
            'disclosureStatus' => $disclosureStatus, 'iptStatus' => $iptStatus, 'schooling' => $schooling,
            'statusAtTransition' => $statusAtTransition, 'enrolledInOVC' => $enrolledInOVC,
            'dateEnrolledInOVC' => $dateEnrolledInOVC, 'CPMISNumber' => $CPMISNumber,
            'dateDiscontinuedFromOVC' => $dateDiscontinuedFromOVC, 'statusAtOVCDiscontinuation' => $statusAtOVCDiscontinuation,
            'enrolledInOTZ' => $enrolledInOTZ, 'dateEnrolledInOTZ' => $dateEnrolledInOTZ,
            'OTZArtRegimen' => $OTZArtRegimen, 'OTZVL' => $OTZVL, 'OTZVLDate' => $OTZVLDate, 'missedLastAppointment' => $missedLastAppointment,
            'ArtAdherenceAssessment' => $ArtAdherenceAssessment, 'completedOTZModules' => $completedOTZModules, 'statusAtOTZTransition' => $statusAtOTZTransition,
            'dateDiscontinuedFromOTZ' => $dateDiscontinuedFromOTZ, 'enrolledInPAMA' => $enrolledInPAMA,
            'dateEnrolledInPAMA' => $dateEnrolledInPAMA, 'caregiverInSameFacility' => $caregiverInSameFacility,
            'caregiverType' => $caregiverType, 'caregiver1CCC' => $caregiver1CCC,
            'caregiver2CCC' => $caregiver2CCC, 'caregiverVL' => $caregiverVL, 'caregiverVLDate' => $caregiverVLDate,
            'caregiverVLStatus' => $caregiverVLStatus, 'PAMAStatus3' => $PAMAStatus3,
            'PAMAStatus6' => $PAMAStatus6, 'PAMAStatus12' => $PAMAStatus12, 'PAMAStatus24' => $PAMAStatus24,
            'PAMAStatusCurrent' => $PAMAStatusCurrent, 'PAMAStatusTransition' => $PAMAStatusTransition,
            'dateDiscontinuedFromPAMA' => $dateDiscontinuedFromPAMA, 'comment' => $comment
        ]);
    } elseif ($request == "load_prev_obs") {
        $cccNo = $_GET['cccNo'];
        $patient = Patient::where('cccNo', $cccNo)->first();
        if ($patient == null) throw new Exception("Patient not found", 404);
        $facility = Facility::findOrFail($patient->facility);
        $patient['facilityData'] = $facility;
        $data = [];
        $data['patient'] = $patient;
        $observation = Observation::where('patientCCC', $patient->cccNo)->orderBy('id', 'desc')->first();
        if ($observation == null) {
            echo myJsonResponse(201, "No Observation", $data);
        } else {
            $data['observation'] = $observation;
            echo myJsonResponse(200, "Latest Observation", $data);
        }
    } elseif ($request == "get_regimens") {
        $regimens = Regimen::all();
        echo myJsonResponse(200, "Regimens", $regimens);
    } else throw new Exception("Invalid request.", -1);
} catch (\Throwable $th) {
    // http_response_code(400);
    echo myJsonResponse(400, $th->getMessage());
}
