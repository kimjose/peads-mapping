<?php


namespace controllers;


use models\HeiClient;
use models\HeiTracing;

class HeiController
{
    public function __construct()
    {
    }

    public function saveClient(){

    }

    public function saveTrace(){

    }

    public function findClients($searchString) {
        $clients = [];
        $clientsByNo = HeiClient::where("hei_number", $searchString)->get();
        $clientsByName = HeiClient::where("name", "LIKE", $searchString)->get();
        foreach ($clientsByNo as $client ) {
            array_push($clients, $client);
        }
        foreach ($clientsByName as $client ) {
            array_push($clients, $client);
        }
        foreach ($clients as $client){
            $tracings = HeiTracing::where("client_id", $client->id)->get();
            $client['tracings'] = $tracings;
        }
    }
}