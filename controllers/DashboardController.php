<?php


namespace controllers;

use Illuminate\Database\Capsule\Manager as DB;
use models\User;
use models\Facility;
use models\AssignedFacility;

class DashboardController
{

    public static $dataFile = __DIR__ . '/../assets/dashboard_data.json';

    public function __construct()
    {
    }

    public static function loadDataToFile()
    {
        //Get all patients
        //match respective counties and TOs
        //get their observations
        //load data
        //get all tos
        //get respective facilities
        try {
            $dashboardData = [];

            $tos = User::where('cadre', 8)->get();
            foreach ($tos as $to) {
                $toFacilities = AssignedFacility::where('userID', $to->id)->get();
                $to['facilities'] = $toFacilities;
            }
            $allFacilities = Facility::all();
            foreach ($allFacilities as $facility) {
                $assignedto = AssignedFacility::where('facility', $facility->mfl_code)->where('cadre', 8)->first();
                $facility['assignedto'] = '';
                if($assignedto != null) {
                    $facility['assignedto'] = $assignedto->userID;
                }    
            }

            // kituitos = 
            $counties = array(
                array(
                    "code" => 15,
                    "name" => "Kitui",
                    "tos" => User::where('cadre', 8)->where('county', 15)->get()
                ),
                array(
                    "code" => 16,
                    "name" => "Machakos",
                    "tos" => User::where('cadre', 8)->where('county', 16)->get()
                ),
                array(
                    "code" => 17,
                    "name" => "Makueni",
                    "tos" => User::where('cadre', 8)->where('county', 17)->get()
                )
            );
            // $counties = json_encode($arr);

            $patients = DB::select("SELECT A.cccNo, A.county, A.facility, A.sex, A.dob, A.date_of_hiv_diagnosis, A.date_enrolled, A.dateStartedART, A.startRegimen, 
A.startKaletraFormulation, D.userID AS 'to_id', B.* FROM patients A
LEFT JOIN assigned_facilities D ON (A.facility = D.facility AND D.cadre = 8)
LEFT JOIN observations B ON A.cccNo = B.patientCCC AND 
B.id = (SELECT MAX(id) FROM observations C WHERE C.patientCCC = A.cccNo) 
WHERE A.transferred_out = 0");

            $dashboardData['timestamp'] = date('Y-m-d G:i:s');
            $dashboardData['allCounties'] = $counties;
            $dashboardData['technicalOfficers'] = $tos;
            $dashboardData['allFacilities'] = $allFacilities;
            $dashboardData['patientsData'] = $patients;

            if (!is_dir(__DIR__ . '/../assets/')) {
mkdir(__DIR__ . '/../assets/');
            }
            $handler = fopen(self::$dataFile, 'w');
            fwrite($handler, json_encode($dashboardData));
            fclose($handler);
            echo myJsonResponse(200, "Dashboard data loaded successfully");
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            http_response_code(412);
        }
    }

}