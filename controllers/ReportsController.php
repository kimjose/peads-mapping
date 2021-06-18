<?php


namespace controllers;


use controllers\utils\Utility;
use Illuminate\Database\Capsule\Manager as DB;
use models\AssignedFacility;
use models\Facility;

class ReportsController
{
    protected $user;
    public function __construct()
    {
        $this->user = $_SESSION['user'];
        if ($this->user->id == 43){
            $facilities = Facility::all();
            $facilityCodes = [];
            foreach ($facilities as $facility) {
                array_push($facilityCodes, $facility->mfl_code);
            }
            $this->user->facilities = $facilityCodes;
        } else{
            $facilities = AssignedFacility::where('userID', $this->user->id)->get();
            $facilityCodes = [];
            foreach ($facilities as $facility) {
                array_push($facilityCodes, $facility->facility);
            }
            $this->user->facilities = $facilityCodes;
        }

    }

    public function heiTracingReport(){
        try {
            $tracings = [];
            $allTracings = DB::select("SELECT A.`*`, B.name AS 'facilityName', B.county AS 'countyName' FROM hei_client_tracings A LEFT JOIN facilities B ON A.facility_code = B.mfl_code;");
//            echo json_encode($allTracings);
            foreach ($allTracings as $m){
                if (in_array($m->facility_code, $this->user->facilities)) {
                    $tr['date'] = $m->date;
                    $tr['mode'] = $m->mode;
                    $tr['outcome'] = $m->outcome;
                    $tr['hiv_tested'] = $m->hiv_tested;
                    $tr['hiv_test_type'] = $m->hiv_test_type;
                    $tr['hiv_test_date'] = $m->hiv_test_date;
                    $tr['hiv_test_results'] = $m->hiv_test_results;
                    $tr['linked_to_care'] = $m->linked_to_care;
                    $tr['ccc_no'] = $m->ccc_no;
                    $tr['recommendations'] = $m->recommendations;
                    $tr['hei_number'] = $m->hei_number;
                    $tr['name'] = $m->name;
                    $tr['dob'] = $m->dob;
                    $tr['gender'] = $m->gender;
                    $tr['facility_code'] = $m->facility_code;
                    $tr['pmtct_enrollment_date'] = $m->pmtct_enrollment_date;
                    $tr['status'] = $m->status;
                    $tr['status_date'] = $m->status_date;
                    $tr['facilityName'] = $m->facilityName;
                    $tr['countyName'] = $m->countyName;
                    array_push($tracings, $tr);
                }
            }
            $headers = [
                "hei_number", "names/initials", "dob", "gender", "HEI_enrollment_date", "status", "status_date", "facility_code", "facility_name", "county_name",
                "trace date", "mode", "outcome", "hiv_tested", "hiv_test_type", "hiv_test_date", "hiv_test_results", "linked", "ccc_no", "recommendation"
            ];
            $attrs = [
                "hei_number", "name", "dob", "gender", "pmtct_enrollment_date", "status", "status_date", "facility_code", "facilityName", "countyName",
                "date", "mode", "outcome", "hiv_tested", "hiv_test_type", "hiv_test_date", "hiv_test_results", "linked_to_care", "ccc_no", "recommendations"
            ];
            /* for static
            foreach ($allTracings as $m) {
                $tr['date'] = $m->date;
                $tr['mode'] = $m->mode;
                $tr['outcome'] = $m->outcome;
                $tr['hiv_tested'] = $m->hiv_tested;
                $tr['hiv_test_type'] = $m->hiv_test_type;
                $tr['hiv_test_date'] = $m->hiv_test_date;
                $tr['hiv_test_results'] = $m->hiv_test_results;
                $tr['linked_to_care'] = $m->linked_to_care;
                $tr['ccc_no'] = $m->ccc_no;
                $tr['recommendations'] = $m->recommendations;
                $tr['hei_number'] = $m->hei_number;
                $tr['name'] = $m->name;
                $tr['dob'] = $m->dob;
                $tr['gender'] = $m->gender;
                $tr['facility_code'] = $m->facility_code;
                $tr['pmtct_enrollment_date'] = $m->pmtct_enrollment_date;
                $tr['status'] = $m->status;
                $tr['status_date'] = $m->status_date;
                array_push($tracings, $tr);
            }*/
            $filename = "hei_tracings_report_" . time() ."_.xlsx";
            Utility::buildExcel($filename, $headers, $attrs, $tracings);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse(PRECONDITION_FAILED_ERROR_CODE, $e->getMessage());
        }

    }
}