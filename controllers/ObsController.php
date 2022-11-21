<?php

namespace controllers;

use models\Facility;
use models\Observation;
use models\Patient;

class ObsController
{
    protected $user;
    public function __construct()
    {
        $this->user = $_SESSION['user'];
    }

    public function submitForm($obsData){
        try {
            $userId = $this->user->id;
            $mflCode = $obsData['mflCode'];
            $weight = $obsData['weight'];
            $PAMAStatus6 = $obsData['PAMAStatus6'];
            $PAMAStatus12 = $obsData['PAMAStatus12'];
            $PAMAStatus24 = $obsData['PAMAStatus24'];
            $PAMAStatusCurrent = $obsData['PAMAStatusCurrent'];
            $dateDiscontinuedFromPAMA = $obsData['dateDiscontinuedFromPAMA'];
            $comment = $obsData['comment'];

            $dateDiscontinuedFromOTZ = $obsData['dateDiscontinuedFromOTZ'];
            $enrolledInPAMA = $obsData['enrolledInPAMA'];
            $dateEnrolledInPAMA = $obsData['dateEnrolledInPAMA'];
            $pamaVLCopies = $obsData['pamaVLCopies'];
            $baselinePamaVlDate = $obsData['baselinePamaVlDate'];
            $caregiverInSameFacility = $obsData['caregiverInSameFacility'];
            $caregiverType = $obsData['caregiverType'];
            $caregiver1CCC = $obsData['caregiver1CCC'];
            $caregiver2CCC = $obsData['caregiver2CCC'];
            $caregiver1VL = $obsData['caregiver1VL'];
            $caregiver1VLDate = $obsData['caregiver1VLDate'];
            $caregiver1VLStatus = $obsData['caregiver1VLStatus'];
            $caregiver2VL = $obsData['caregiver2VL'];
            $caregiver2VLDate = $obsData['caregiver2VLDate'];
            $PAMAStatus3 = $obsData['PAMAStatus3'];

            $OTZArtRegimen = $obsData['OTZArtRegimen'];
            $OTZVL = $obsData['OTZVL'];
            $OTZVLDate = $obsData['OTZVLDate'];
            $lastAttendDate = $obsData['lastAttendDate'];
            $nextAppointmentDate = $obsData['nextAppointmentDate'];
            $ArtAdherenceAssessment = $obsData['ArtAdherenceAssessment'];
            $completedOTZModules = $obsData['completedOTZModules'];
            $statusAtOTZTransition = $obsData['statusAtOTZTransition'];

            $dateEnrolledInOVC = $obsData['dateEnrolledInOVC'];
            $CPMISNumber = $obsData['CPMISNumber'];
            $ovcVLCopies = $obsData['ovcVLCopies'];
            $baselineOvcVlDate = $obsData['baselineOvcVlDate'];
            $dateDiscontinuedFromOVC = $obsData['dateDiscontinuedFromOVC'];
            $statusAtOVCDiscontinuation = $obsData['statusAtOVCDiscontinuation'];
            $enrolledInOTZ = $obsData['enrolledInOTZ'];
            $dateEnrolledInOTZ = $obsData['dateEnrolledInOTZ'];

            $patientCCC = $obsData['patientCCC'];
            $currentRegimen = $obsData['currentRegimen'];
            $regimenLine = $obsData['regimenLine'];
            $regimenStartDate = $obsData['regimenStartDate'];
            $kaletraFormulation = $obsData['kaletraFormulation'];
            $vlDate = $obsData['vlDate'];
            $vlCopies = $obsData['vlCopies'];
            $vlOutcome = $obsData['vlOutcome'];

            $vlScoreType = $obsData['vlScoreType'];
            $latestZScore = $obsData['latestZScore'];
            $opportunisticInfection = $obsData['opportunisticInfection'];
            $disclosureStatus = $obsData['disclosureStatus'];
            $iptStatus = $obsData['iptStatus'];
            $schooling = $obsData['schooling'];
            $statusAtTransition = $obsData['statusAtTransition'];
            $enrolledInOVC = $obsData['enrolledInOVC'];
            $enrolledInVDOT = $obsData['enrolledInVDOT'];
            $vdotUserMode = $obsData['vdotUserMode'];
            $dateEnrolledInVDOT = $obsData['dateEnrolledInVDOT'];
            $dateDiscontinuedFromVDOT = $obsData['dateDiscontinuedFromVDOT'];
            $enrolledInADOT = $obsData['enrolledInADOT'];
            $followUpPersonnel = $obsData['followUpPersonnel'];
            $dateEnrolledInADOT = $obsData['dateEnrolledInADOT'];
            $dateDiscontinuedFromADOT = $obsData['dateDiscontinuedFromADOT'];

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
                'dateEnrolledInPAMA' => $dateEnrolledInPAMA,'pamaVLCopies' =>$pamaVLCopies, 'baselinePamaVlDate'=>$baselinePamaVlDate,
                'caregiverInSameFacility' => $caregiverInSameFacility,'caregiverType' => $caregiverType, 'caregiver1CCC' => $caregiver1CCC,
                'caregiver2CCC' => $caregiver2CCC, 'caregiver1VL' => $caregiver1VL, 'caregiver1VLDate' => $caregiver1VLDate,
                'caregiver2VL' => $caregiver2VL, 'caregiver2VLDate' => $caregiver2VLDate,
                'caregiver1VLStatus' => $caregiver1VLStatus, 'PAMAStatus3' => $PAMAStatus3,
                'PAMAStatus6' => $PAMAStatus6, 'PAMAStatus12' => $PAMAStatus12, 'PAMAStatus24' => $PAMAStatus24,
                'PAMAStatusCurrent' => $PAMAStatusCurrent,
                'dateDiscontinuedFromPAMA' => $dateDiscontinuedFromPAMA,
                'enrolledInVDOT'=>$enrolledInVDOT, 'dateEnrolledInVDOT'=>$dateEnrolledInVDOT, 'vdotUserMode'=>$vdotUserMode,
                'dateDiscontinuedFromVDOT'=>$dateDiscontinuedFromVDOT,'enrolledInADOT'=>$enrolledInADOT, 'dateEnrolledInADOT'=>$dateEnrolledInADOT,
                'followUpPersonnel'=>$followUpPersonnel, 'dateDiscontinuedFromADOT'=>$dateDiscontinuedFromADOT, 'comment' => $comment
            ]);

            echo myJsonResponse(SUCCESS_CODE, "Observation saved successfully");

        } catch (\Throwable $t) {
            logError($t->getCode(), $t->getMessage());
            echo myJsonResponse(PRECONDITION_FAILED_ERROR_CODE, "Observation not saved", $t->getMessage());
        }
    }

    public function loadPreviousObservation($cccNo) {
        try {
            $patient = Patient::where('cccNo', $cccNo)->orderBy('id', 'desc')->first();
            if ($patient == null) throw new \Exception("Patient not found", 404);
            $facility = Facility::where('mfl_code', $patient->facility)->first();
            $patient['facilityData'] = $facility;
            $data = [];
            $data['patient'] = $patient;
            $observation = Observation::where('patientCCC', $patient->cccNo)->where('mflCode', $patient->facility)->orderBy('id', 'desc')->first();
            if ($observation == null) {
                echo myJsonResponse(201, "No Observation", $data);
            } else {
                $data['observation'] = $observation;
                echo myJsonResponse(SUCCESS_CODE, "Latest Observation", $data);
            }
        } catch (\Throwable $t) {
            logError($t->getCode(), $t->getMessage());
            echo myJsonResponse(PRECONDITION_FAILED_ERROR_CODE, "No Observation", $t->getMessage());
        }
    }


}