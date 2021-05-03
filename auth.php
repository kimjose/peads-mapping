<?php
require_once "panel/functions.php";
require_once __DIR__ . "/models/User.php";;
session_start();
if (!isset($_SESSION['user'])) {
    http_response_code(401);
    logError(401, "Unauthenticated access.");
    die(401);
}
$user = unserialize($_SESSION['user']);
$loggedUser = User::findOrFail($user->id);