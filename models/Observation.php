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


