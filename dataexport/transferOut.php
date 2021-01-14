<?php
//get patients
//loop each patient and check for latter entries
//if latter entries exist mark as transferred out

require_once __DIR__ . "/../models/Patient.php";

$patients = Patient::all();

foreach ($patients as $patient){
    $similarPs = Patient::where('cccNo', $patient->cccNo)->where('id', '>', $patient->id)->get();
    if ($similarPs != null && sizeof($similarPs) > 0) {
        $patient->transferred_out=1;
        $patient->save();
    }
}