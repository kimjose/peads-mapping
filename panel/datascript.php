<?php

require_once "functions.php";
require_once "../models/OTZModules.php";
require_once "../models/User.php";

$request = $_GET['request'];
$response = [];

try {

    if ($request == "get_otz_modules") {
        $modules = OTZModules::all();
        echo myJsonResponse(200, "Modules retrieved", $modules);
    } else if ($request == "get_users") {
        $users = User::all();
        echo myJsonResponse(200, "Users retrieved", $users);
    }

} catch (\Throwable $th) {
    echo myJsonResponse(400, $th->getMessage());
}

?>