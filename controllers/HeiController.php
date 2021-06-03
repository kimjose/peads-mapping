<?php


namespace controllers;


use models\HeiClient;
use models\HeiTracing;

class HeiController
{
    protected $user = null;
    public function __construct()
    {
        $this->user = $_SESSION['user'];
    }

    public function saveClient(){
        $fillable = ['hei_number', 'facility_code', 'dob', 'gender', 'name', 'status', 'status_date',
            'pmtct_enrollment_date'];
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
            if (isset($_POST['id']) && $_POST['id']){
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
                HeiClient::create([
                    'hei_number' => $hei_number,
                    'facility_code' => $facility_code,
                    'dob' => $dob,
                    'gender' => $gender,
                    'name' => $name,
                    'status' => $status,
                    'status_date' => $status_date
                ]);
            }
        } catch (\Throwable $e){
            echo myJsonResponse($e->getCode(), $e->getMessage());
            logError($e->getCode(), $e->getMessage());
            http_response_code(PRECONDITION_FAILED_ERROR_CODE);
        }

    }

    public function saveTracing(){
        $fillable = ['date', 'client_id', 'mode', 'outcome', 'tested', 'test_type',
            'test_date', 'test_results', 'linked_to_care', 'ccc_no', 'recommendations'];
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
                $tracing->tested = $tested;
                $tracing->test_type = $test_type;
                $tracing->test_date = $test_date;
                $tracing->test_results = $test_results;
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
                    'tested' => $tested,
                    'test_type' => $test_type,
                    'test_date' => $test_date,
                    'test_results' => $test_results,
                    'linked_to_care' => $linked_to_care,
                    'ccc_no' => $ccc_no,
                    'recommendations' => $recommendations,
                ]);
            }

        } catch (\Throwable $e) {
            echo myJsonResponse($e->getCode(), $e->getMessage());
            logError($e->getCode(), $e->getMessage());
            http_response_code(PRECONDITION_FAILED_ERROR_CODE);
        }
    }

    public function findClients($searchString) {
        try{
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
            echo myJsonResponse(200, "Data fetched.", $clients);
        } catch (\Throwable $e){
            echo myJsonResponse($e->getCode(), $e->getMessage());
            logError($e->getCode(), $e->getMessage());
            http_response_code(PRECONDITION_FAILED_ERROR_CODE);
        }
    }
}