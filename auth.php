<?php

require_once __DIR__ . "/vendor/autoload.php";

session_start();
if (!isset($_SESSION['user'])) {
    http_response_code(401);
    logError(401, "Unauthenticated access.");
    die(401);
}
$user = $_SESSION['user'];
$loggedUser = models\User::find($_SESSION['user']["id"]);