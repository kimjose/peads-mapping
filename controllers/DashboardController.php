<?php


namespace controllers;

use Illuminate\Database\Capsule\Manager as DB;
use User;

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
            $allFacilities = \Facility::all();
            foreach ($tos as $to) {
                $toFacilities = \AssignedFacility::where('userID', $to->id)->get();
                $to['facilities'] = $toFacilities;
            }
            $counties = ['Makueni', 'Machakos', 'Kitui'];

            $patients = DB::select("SELECT A.cccNo, A.county, A.facility, A.sex, A.dob, A.date_of_hiv_diagnosis, A.date_enrolled, A.dateStartedART, A.startRegimen, 
A.startKaletraFormulation, D.userID AS 'to_id', B.* FROM patients A
LEFT JOIN assigned_facilities D ON (A.facility = D.facility AND D.cadre = 8)
LEFT JOIN observations B ON A.cccNo = B.patientCCC AND 
B.id = (SELECT MAX(id) FROM observations C WHERE C.patientCCC = A.cccNo) 
WHERE A.transferred_out = 0");

            $dashboardData['allCounties'] = $counties;
            $dashboardData['technicalOfficers'] = $tos;
            $dashboardData['allFacilities'] = $allFacilities;
            $dashboardData['patientsData'] = $patients;

            if (!is_file(self::$dataFile)) {

            }
            $handler = fopen(self::$dataFile, 'w');
            fwrite($handler, json_encode($dashboardData));
            fclose($handler);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            http_response_code(412);
        }
    }

}