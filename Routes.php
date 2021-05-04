<?php

require_once __DIR__ . "/vendor/autoload.php";
require_once __DIR__ . "/functions.php";

$router = new \Bramus\Router\Router();

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

$router->get('/dashboard_data', function (){
    ini_set('max_execution_time', '0');//Unlimited execution time
    \controllers\DashboardController::loadDataToFile();
});
// Thunderbirds are go!
$router->run();