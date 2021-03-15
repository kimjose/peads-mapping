<?php

require_once __DIR__ . "/vendor/autoload.php";
require_once __DIR__ . "";

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


// Thunderbirds are go!
$router->run();