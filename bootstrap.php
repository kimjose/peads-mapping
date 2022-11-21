<?php
require "vendor/autoload.php";

if (!file_exists(__DIR__ . '/.env')){
    echo "Unable to load configurations file.";
    http_response_code(412);
    return;
}
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Validate environment variables
$envVars = [ 'DB_HOST', 'DB_DRIVER', 'DB_USER', 'DB_PASSWORD',
'DB_NAME'];
$unsetVars = [];
foreach ($envVars as $envVar){
    if(!isset($_ENV[$envVar])) $unsetVars[] = $envVar;
}
if(sizeof($unsetVars) > 0){
    die("<h4>Unable to proceed. Environment variables not set. <h4>" . json_encode($unsetVars));
}



use Illuminate\Database\Capsule\Manager as Capsule;
$capsule = new Capsule;
$capsule->addConnection([
    "driver" => $_ENV["DB_DRIVER"],
    "host" => $_ENV["DB_HOST"],
    "database" => $_ENV["DB_NAME"],
    "username" => $_ENV["DB_USER"],
    "password" => $_ENV["DB_PASSWORD"]

]);
$capsule->setAsGlobal();
$capsule->bootEloquent();
