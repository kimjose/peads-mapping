<?php


namespace controllers;


class ObsController
{
    protected $user = null;
    public function __construct()
    {
        session_start();
        $user = $_SESSION['user'];
        $this->user = User::findOrFail($user['id']);
    }

    public function submitForm(){
        try {

                $userId = $_POST['userId'];
                $mflCode = $_POST['mflCode'];
                $weight = $_POST['weight'];
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
                $caregiver1VL = $_POST['caregiver1VL'];
                $caregiver1VLDate = $_POST['caregiver1VLDate'];
                $caregiver1VLStatus = $_POST['caregiver1VLStatus'];
                $caregiver2VL = $_POST['caregiver2VL'];
                $caregiver2VLDate = $_POST['caregiver2VLDate'];
                // $caregiver2VLStatus = $_POST['caregiver2VLStatus'];
                $PAMAStatus3 = $_POST['PAMAStatus3'];


                $OTZArtRegimen = $_POST['OTZArtRegimen'];
                $OTZVL = $_POST['OTZVL'];
                $OTZVLDate = $_POST['OTZVLDate'];
                $lastAttendDate = $_POST['lastAttendDate'];
                $nextAppointmentDate = $_POST['nextAppointmentDate'];
                $ArtAdherenceAssessment = $_POST['ArtAdherenceAssessment'];
                $completedOTZModules = $_POST['completedOTZModules'];
                $statusAtOTZTransition = $_POST['statusAtOTZTransition'];


                $dateEnrolledInOVC = $_POST['dateEnrolledInOVC'];
                $CPMISNumber = $_POST['CPMISNumber'];
                $ovcVLCopies = $_POST['ovcVLCopies'];
                $baselineOvcVlDate = $_POST['baselineOvcVlDate'];
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

                $vlScoreType = $_POST['vlScoreType'];
                $latestZScore = $_POST['latestZScore'];
                $opportunisticInfection = $_POST['opportunisticInfection'];
                $disclosureStatus = $_POST['disclosureStatus'];
                $iptStatus = $_POST['iptStatus'];
                $schooling = $_POST['schooling'];
                $statusAtTransition = $_POST['statusAtTransition'];
                $enrolledInOVC = $_POST['enrolledInOVC'];


                Observation::create([
                    'patientCCC' => $patientCCC, 'userId' => $userId, 'mflCode' => $mflCode,
                    'currentRegimen' => $currentRegimen,
                    'regimenLine' => $regimenLine,
                    'regimenStartDate' => $regimenStartDate,
                    'kaletraFormulation' => $kaletraFormulation,
                    'vlDate' => $vlDate,
                    'vlCopies' => $vlCopies,
                    'vlOutcome' => $vlOutcome,
                    'weight' => $weight,
                    'vlScoreType' => $vlScoreType,
                    'latestZScore' => $latestZScore, 'opportunisticInfection' => $opportunisticInfection,
                    'disclosureStatus' => $disclosureStatus, 'iptStatus' => $iptStatus, 'schooling' => $schooling,
                    'statusAtTransition' => $statusAtTransition, 'enrolledInOVC' => $enrolledInOVC,
                    'dateEnrolledInOVC' => $dateEnrolledInOVC, 'CPMISNumber' => $CPMISNumber, 'ovcVLCopies' => $ovcVLCopies, 'baselineOvcVlDate' => $baselineOvcVlDate,
                    'dateDiscontinuedFromOVC' => $dateDiscontinuedFromOVC, 'statusAtOVCDiscontinuation' => $statusAtOVCDiscontinuation,
                    'enrolledInOTZ' => $enrolledInOTZ, 'dateEnrolledInOTZ' => $dateEnrolledInOTZ,
                    'OTZArtRegimen' => $OTZArtRegimen, 'OTZVL' => $OTZVL, 'OTZVLDate' => $OTZVLDate,
                    'lastAttendDate' => $lastAttendDate, 'nextAppointmentDate' => $nextAppointmentDate,
                    'ArtAdherenceAssessment' => $ArtAdherenceAssessment, 'completedOTZModules' => $completedOTZModules, 'statusAtOTZTransition' => $statusAtOTZTransition,
                    'dateDiscontinuedFromOTZ' => $dateDiscontinuedFromOTZ, 'enrolledInPAMA' => $enrolledInPAMA,
                    'dateEnrolledInPAMA' => $dateEnrolledInPAMA, 'caregiverInSameFacility' => $caregiverInSameFacility,
                    'caregiverType' => $caregiverType, 'caregiver1CCC' => $caregiver1CCC,
                    'caregiver2CCC' => $caregiver2CCC, 'caregiver1VL' => $caregiver1VL, 'caregiver1VLDate' => $caregiver1VLDate,
                    'caregiver2VL' => $caregiver2VL, 'caregiver2VLDate' => $caregiver2VLDate,
                    'caregiver1VLStatus' => $caregiver1VLStatus, 'PAMAStatus3' => $PAMAStatus3,
                    'PAMAStatus6' => $PAMAStatus6, 'PAMAStatus12' => $PAMAStatus12, 'PAMAStatus24' => $PAMAStatus24,
                    'PAMAStatusCurrent' => $PAMAStatusCurrent, 'PAMAStatusTransition' => $PAMAStatusTransition,
                    'dateDiscontinuedFromPAMA' => $dateDiscontinuedFromPAMA, 'comment' => $comment
                ]);

        } catch (\Throwable $t) {

        }
    }


}