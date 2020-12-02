<?php

require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;


class Observation extends Model
{

    protected $table = 'observations';

    protected $fillable = [
        'patientCCC', 'userId', 'currentRegimen', 'regimenLine', 'regimenStartDate',  'kaletraFormulation', 'vlDate', 'vlOutcome',
        'latestZScore', 'opportunisticInfection', 'disclosureStatus', 'iptStatus', 'schooling', 'statusAtTransition', 'enrolledInOVC',
        'dateEnrolledInOVC', 'CPMISNumber', 'dateDiscontinuedFromOVC', 'statusAtOVCDiscontinuation', 'enrolledInOTZ', 'dateEnrolledInOTZ',
        'OTZArtRegimen', 'OTZVL', 'OTZVLDate', 'missedLastAppointment', 'ArtAdherenceAssessment', 'completedOTZModules', 'statusAtOTZTransition',
        'dateDiscontinuedFromOTZ', 'enrolledInPAMA', 'dateEnrolledInPAMA', 'caregiverInSameFacility', 'caregiverType', 'caregiver1CCC',
        'caregiver2CCC', 'caregiverVL', 'caregiverVLDate', 'caregiverVLStatus', 'PAMAStatus3',
        'PAMAStatus6', 'PAMAStatus12', 'PAMAStatus24', 'PAMAStatusCurrent', 'PAMAStatusTransition', 'dateDiscontinuedFromPAMA', 'comment'
    ];
}

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
