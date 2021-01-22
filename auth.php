<?php
require_once "functions.php";
require_once __DIR__ . "/models/User.php";;
session_start();
if (!isset($_SESSION['user'])) {
    http_response_code(401);
    logError(401, "Unauthenticated access.");
    die(401);
}

$loggedUser = User::find($_SESSION['user']["id"]);
