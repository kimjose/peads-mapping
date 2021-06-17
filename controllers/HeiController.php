<?php


namespace controllers;


use models\AssignedFacility;
use models\HeiClient;
use models\HeiTracing;
use models\Facility;

use Illuminate\Database\Capsule\Manager as DB;

class HeiController
{
    protected $user = null;
    public function __construct()
    {
        $this->user = $_SESSION['user'];
        
        $facilityCodes = [];
        if  (in_array("3", $this->user->permissions)) {
            $facilities = Facility::all();
            foreach ($facilities as $facility) {
                array_push($facilityCodes, $facility->mfl_code);
            }

        } else {
            $facilities = AssignedFacility::where('userID', $this->user->id)->get();
            foreach ($facilities as $facility) {
                array_push($facilityCodes, $facility->facility);
            }
        }
        $this->user->facilities = $facilityCodes;
    }

    public function saveClient() {
        try {
            $id = null;
            $hei_number = $_POST['hei_number'];
            $facility_code = $_POST['facility_code'];
            $dob = $_POST['dob'];
            $gender = $_POST['gender'];
            $name = $_POST['name'];
            $status = $_POST['status'];
            $status_date = $_POST['status_date'];
            $pmtct_enrollment_date = $_POST['pmtct_enrollment_date'];
            if (isset($_POST['id']) && $_POST['id'] != ''){
                $id = $_POST['id'];
                $client = HeiClient::findOrFail($id);
                $client->hei_number = $hei_number;
                $client->facility_code = $facility_code;
                $client->dob = $dob;
                $client->gender = $gender;
                $client->name = $name;
                $client->status = $status;
                $client->status_date = $status_date;
                $client->pmtct_enrollment_date = $pmtct_enrollment_date;
                $client->save();
            } else {
                $client = HeiClient::create([
                    'hei_number' => $hei_number,
                    'facility_code' => $facility_code,
                    'dob' => $dob,
                    'gender' => $gender,
                    'name' => $name,
                    'pmtct_enrollment_date' => $pmtct_enrollment_date,
                    'status' => $status,
                    'status_date' => $status_date
                ]);
            }
            $client['tracings'] = $this->getClientTracings($client->id);
            echo myJsonResponse(200, "Hei Client has been saved successfully", $client);
        } catch (\Throwable $e){
            echo myJsonResponse($e->getCode(), $e->getMessage());
            logError($e->getCode(), $e->getMessage());
            http_response_code(PRECONDITION_FAILED_ERROR_CODE);
        }
    }

    public function saveTracing(){
        try {
            $date = $_POST['date'];
            $client_id = $_POST['client_id'];
            $mode = $_POST['mode'];
            $outcome = $_POST['outcome'];
            $tested = $_POST['tested'];
            $test_type = $_POST['test_type'];
            $test_date = $_POST['test_date'];
            $test_results = $_POST['test_results'];
            $linked_to_care = $_POST['linked_to_care'];
            $ccc_no = $_POST['ccc_no'];
            $recommendations = $_POST['recommendations'];
            if (isset($_POST['id']) && $_POST['id']) {
                $id = $_POST['id'];
                $tracing = HeiTracing::findOrFail($id);
                $tracing->date = $date;
                $tracing->client_id = $client_id;
                $tracing->mode = $mode;
                $tracing->outcome = $outcome;
                $tracing->hiv_tested = $tested;
                $tracing->hiv_test_type = $test_type;
                $tracing->hiv_test_date = $test_date == '' ? null : $test_date;
                $tracing->hiv_test_results = $test_results;
                $tracing->linked_to_care = $linked_to_care;
                $tracing->ccc_no = $ccc_no;
                $tracing->recommendations = $recommendations;
                $tracing->save();
            } else {
                HeiTracing::create([
                    'date' => $date,
                    'client_id' => $client_id,
                    'mode' => $mode,
                    'outcome' => $outcome,
                    'hiv_tested' => $tested,
                    'hiv_test_type' => $test_type,
                    'hiv_test_date' => $test_date == '' ? null : $test_date,
                    'hiv_test_results' => $test_results,
                    'linked_to_care' => $linked_to_care,
                    'ccc_no' => $ccc_no,
                    'recommendations' => $recommendations,
                ]);
            }
            echo myJsonResponse(SUCCESS_CODE, "Trace saved successfully", $this->getClientTracings($client_id));
        } catch (\Throwable $e) {
            echo myJsonResponse($e->getCode(), $e->getMessage());
            logError($e->getCode(), $e->getMessage());
            http_response_code(PRECONDITION_FAILED_ERROR_CODE);
        }
    }

    /***
     * @param $client_id string id of the client
     * @return HeiTracing[]
    */
    public function getClientTracings($client_id)
    {
        return HeiTracing::where('client_id', $client_id)->get();
    }

    public function findClients($searchString) {
        try {
            $query = "SELECT A.*, B.name AS 'facility_name' FROM hei_clients A LEFT JOIN facilities B ON A.facility_code = B.mfl_code
WHERE A.hei_number LIKE '$searchString%' OR A.name LIKE '$searchString%'";
            $clients = DB::select($query);
            $userClients = [];
            foreach ($clients as $client){
                $client->tracings = $this->getClientTracings($client->id);
                if (in_array($client->facility_code, $this->user->facilities)) array_push($userClients, $client);
            }
            echo myJsonResponse(SUCCESS_CODE, "Data fetched.", $userClients);
        } catch (\Throwable $e){
            echo myJsonResponse($e->getCode(), $e->getMessage());
            logError($e->getCode(), $e->getMessage());
            http_response_code(PRECONDITION_FAILED_ERROR_CODE);
        }
    }

    public function getClient($id){

    }
}