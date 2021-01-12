<?php
require "vendor/autoload.php";
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Support\Facades\Config;

$capsule = new Capsule;
$capsule->addConnection([
   "driver" => "mysql",
   "host" =>"127.0.0.1",
   "database" => "pediatric_mapping",
   "username" => "admin",
   "password" => "admin"
]);
//$capsule->addConnection(config::get('database'));
$capsule->setAsGlobal();
$capsule->bootEloquent();
