<?php

require_once "functions.php";
require_once "../models/OTZModules.php";

$request = $_GET['request'];
$response = [];

try {

if ($request == "get_otz_modules") {
    require_once "../models/OTZModules.php";
    $modules = OTZModules::all();
    echo myJsonResponse(200, "Modules retrieved", $modules);
}

} catch (\Throwable $th) {
    echo myJsonResponse(400, $th->getMessage());
}

?>