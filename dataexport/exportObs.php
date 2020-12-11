<?php

require_once __DIR__ . "/../models/Observation.php";

try {
    $handle = fopen(__DIR__ . '/obs.json', 'r');
    $data = fread($handle, filesize(__DIR__ . '/obs.json'));
    $obs = json_decode($data, true);

    foreach ($obs as $ob) {
        Observation::create($ob);
    }


} catch (Exception $e) {

}