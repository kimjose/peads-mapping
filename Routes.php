<?php

use Bramus\Router\Router;
use controllers\DashboardController;
use models\Cadre;
use models\Permissions;
use models\Regimen;

require_once __DIR__ . "/vendor/autoload.php";

$router = new Router();

// Custom 404 Handler
$router->set404(function () {
    header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found');
    $notFound = "
        <div style='min-width: 80%; margin-top: 10%; padding-left: 35%; background: #eaecf4'>
        <h1>#404</h1>
        <br>
        <p>
        The Requested URL not found.
</p>
</div>
    ";
    echo $notFound;
});
$router->get('/accessRoute', function () {
    echo 'Welcome';
});

$router->get('/dashboard_data', function (){
    ini_set('max_execution_time', '0');//Unlimited execution time
    DashboardController::loadDataToFile();
});

$router->post('/panel/register', function () {
    $userData = $_POST;
    $controller = new controllers\UserController();
    $controller->register($userData);
});

$router->post('/panel/login', function () {
    $userData = $_POST;
    $controller = new controllers\UserController();
    $controller->login($userData);
});

$router->get('/panel/get_users', function () {
    require 'auth.php';
    $controller = new controllers\UserController();
    $controller->getUsers();
});

$router->get('/panel/get_cadres', function () {
    require 'auth.php';
    $cadres = Cadre::all();
    echo myJsonResponse(200, "Cadres retrieved", $cadres);
});

$router->post('/panel/save_user', function () {
    require "auth.php";
    $userData = $_POST;
    $controller = new controllers\UserController();
    $saved = $controller->saveUser($userData);
    if ($saved) $controller->getUsers();
    else echo myJsonResponse(400, "User not saved.");
});
$router->post("/panel/save_ped_patient_data", function () {
    require "auth.php";
    $patientData = $_POST;
    $controller = new controllers\PediatricMappingController();
    $controller->savePedPatientData($patientData);
});

$router->post('/panel/transfer_in', function () {
    require 'auth.php';
    $patientData = $_POST;
    $controller = new controllers\PediatricMappingController();
    $controller->saveTransferIn($patientData);
});

$router->get('/panel/get_transfer_patient/{cccNo}', function ($cccNo) {
    require 'auth.php';
    $controller = new controllers\PediatricMappingController();
    $controller->getTransferPatient($cccNo);
});

$router->get('/panel/load_prev_obs/{cccNo}', function ($cccNo) {
    require 'auth.php';
    $controller = new controllers\ObsController();
    $controller->loadPreviousObservation($cccNo);
});

$router->get('/panel/get_last_vls/{cccNo}', function ($calcccno) {
    require 'auth.php';
    $controller = new controllers\PediatricMappingController();
    $controller->getLastVLS($calcccno);
});

$router->get('/panel/get_last_vls/{cccNo}', function ($calcccno) {
    require 'auth.php';
    $controller = new controllers\PediatricMappingController();
    $controller->getLastVLS($calcccno);
});

$router->get('/panel/get_facility_patient/{mflCode}', function ($mflCode) {
    require 'auth.php';
    $controller = new controllers\PediatricMappingController();
    $controller->getFacilityPatients($mflCode);
});

$router->get('/panel/otz_modules', function () {
    require "auth.php";
    $controller = new controllers\PediatricMappingController();
    echo myJsonResponse(SUCCESS_CODE, 'OTZ Modules', $controller->getOTZModules());
});

$router->get("/panel/get_regimens", function () {
    $regimens = Regimen::all();
    echo myJsonResponse(SUCCESS_CODE, "Regimens", $regimens);
});

$router->get("/panel/get_user_categories", function () {
    $controller = new controllers\UserController();
    $categories = $controller->getUserCategories();
    echo myJsonResponse(200, "Here are the user categories", $categories);
});

$router->get("/panel/get_permissions", function () {
    $permissions = Permissions::all();
    echo myJsonResponse(200, "Permissions retrieved", $permissions);
});

$router->post("/panel/save_user_category", function () {
    require 'auth.php';
    $cadreData = $_POST;
    $controller = new controllers\UserController();
    $controller->saveUserCategory($cadreData);
});

$router->get('panel/get_facilities', function () {
    require 'auth.php';
    $controller = new controllers\FacilityController();
    $controller->getFacilities();
});

$router->post("/panel/submit_form", function () {
    require "auth.php";
    $obsData = $_POST;
    $controller = new controllers\ObsController();
    $controller->submitForm($obsData);
});

$router->get("/panel/get_index_client/{indexCCC}/{indexName}", function ($indexCCC, $indexName) {
    require 'auth.php';
    $controller = new controllers\IndexTestingController();
    $controller->getIndexClient($indexCCC, $indexName);
});

$router->post("/panel/save_index_client", function () {
    require "auth.php";
    $clientData = $_POST;
    $controller = new controllers\IndexTestingController();
    $controller->saveIndexClient($clientData);

});

$router->post("/panel/link_child", function () {
    require "auth.php";
    $childData = $_POST;
    $controller = new controllers\IndexTestingController();
    $controller->linkChild($childData);

});

$router->post("/panel/unlink_child", function () {
    require "auth.php";
    $childData = $_POST;
    $controller = new controllers\IndexTestingController();
    $controller->unlinkChild($childData);

});

$router->post("/panel/add_child_test_results", function () {
    require "auth.php";
    $childTestData = $_POST;
    $controller = new controllers\IndexTestingController();
    $controller->addChildTestResults($childTestData);

});

$router->get("/panel/search_hei_clients/{searchString}", function ($searchString){
    require_once "auth.php";
    $controller = new \controllers\HeiController();
    $controller->findClients($searchString);
});

$router->post("/panel/save_hei_client", function (){
    require_once "auth.php";
    $controller = new \controllers\HeiController();
    $controller->saveClient();
});

$router->post("/panel/save_hei_tracing", function (){
    require_once "auth.php";
    $controller = new \controllers\HeiController();
    $controller->saveTracing();
});
$router->get("/reports/hei_tracings", function (){
    require_once "auth.php";
    $controller = new \controllers\ReportsController();
    $controller->heiTracingReport();
});



// Thunderbirds are go!
$router->run();