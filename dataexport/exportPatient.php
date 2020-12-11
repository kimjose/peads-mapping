<?php

require_once __DIR__ . "/../models/Patient.php";

try {
    $handle = fopen(__DIR__ . '/patients.json', 'r');
    $data = fread($handle, filesize(__DIR__ . '/patients.json'));
    $patients = json_decode($data, true);

    foreach ($patients as $patient) {
        Patient::create($patient);
    }


} catch (Exception $e) {

}
