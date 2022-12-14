<?php

namespace models;

require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;


class Observation extends Model
{

    protected $table = 'observations';

    protected $fillable = [
        'patientCCC','mflCode', 'userId', 'weight', 'currentRegimen', 'regimenLine', 'regimenStartDate',  'kaletraFormulation', 'vlDate', 'vlCopies', 'vlOutcome',
        'vlScoreType','latestZScore', 'opportunisticInfection', 'disclosureStatus', 'iptStatus', 'schooling', 'statusAtTransition', 'enrolledInOVC',
        'dateEnrolledInOVC', 'CPMISNumber', 'ovcVLCopies','baselineOvcVlDate', 'dateDiscontinuedFromOVC', 'statusAtOVCDiscontinuation', 'enrolledInOTZ', 'dateEnrolledInOTZ',
        'OTZArtRegimen', 'OTZVL', 'OTZVLDate', 'missedLastAppointment','lastAttendDate', 'nextAppointmentDate', 'ArtAdherenceAssessment', 'completedOTZModules', 'statusAtOTZTransition',
        'dateDiscontinuedFromOTZ', 'enrolledInPAMA', 'dateEnrolledInPAMA', 'pamaVLCopies','baselinePamaVlDate', 'caregiverInSameFacility', 'caregiverType', 'caregiver1CCC',
        'caregiver2CCC', 'caregiver1VL', 'caregiver1VLDate','caregiver2VL', 'caregiver2VLDate', 'caregiver1VLStatus', 'PAMAStatus3',
        'PAMAStatus6', 'PAMAStatus12', 'PAMAStatus24', 'PAMAStatusCurrent', 'dateDiscontinuedFromPAMA',
        'enrolledInVDOT','dateEnrolledInVDOT','vdotUserMode','dateDiscontinuedFromVDOT',
        'enrolledInADOT','dateEnrolledInADOT','followUpPersonnel','dateDiscontinuedFromADOT','comment'
    ];
}


