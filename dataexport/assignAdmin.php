<?php
require "../models/Facility.php";
require "../models/AssignedFacility.php";

$facilities = Facility::all();

foreach($facilities as $facility) {
    AssignedFacility::create([
        'userID' => 43,
        'facility' => $facility->mfl_code,
        'cadre' => 1,
        'deleted'=>0
    ]);
}