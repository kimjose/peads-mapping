<?php


namespace controllers;


use Illuminate\Database\Capsule\Manager as DB;
use models\Facility;
use models\LastVL;
use models\Observation;
use models\OTZModules;
use models\Patient;

class PediatricMappingController {
    protected $user;

    /**
     * PediatricMappingController constructor.
     */
    public function __construct() {
        $this->user = $_SESSION['user'];
    }

    /**
     * Get OTZ Modules
     * @return OTZModules[];
     */
    public function getOTZModules() {
        try {
            $modules = OTZModules::all();
            return $modules;

        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            return $e->getMessage();
        }
    }

    public function savePedPatientData (array $patientData) {
        try {
            $cccNo = $patientData['cccNo'];
            $facility = $patientData['facility'];
            $county = $patientData['county'];
            $sex = $patientData['sex'];
            $dob = $patientData['dateOfBirth'];
            $dohd = $patientData['dohd'];
            $dec = $patientData['dec'];
            $startRegimen = $patientData['startRegimen'];
            $dsa = $patientData['dsa'];
            $startkaletra = $patientData['startkaletra'];
            $newpatient = $patientData['newpatient'];

            if ($cccNo != null && $cccNo != "") {
                $patient = Patient::where('cccNo', $cccNo)->where('transferred_out', 0)->first();
                $patient->cccNo = $cccNo;
                $patient->facility = $facility;
                $patient->county = $county;
                $patient->sex = $sex;
                $patient->dob = $dob;
                $patient->date_of_hiv_diagnosis = $dohd;
                $patient->date_enrolled = $dec;
                $patient->dateStartedART = $dsa;
                $patient->startRegimen = $startRegimen;
                $patient->startKaletraFormulation = $startkaletra;
                $patient->save();
            } else {
                throw new \Exception("Missing CCC Number", PRECONDITION_FAILED_ERROR_CODE);
            }

            $patient = Patient::where('cccNo', $cccNo)->first();
            echo myJsonResponse(SUCCESS_CODE, 'Patient Saved', $patient);
        } catch (\Throwable $t) {
            logError($t->getCode(), $t->getMessage());
            echo myJsonResponse(PRECONDITION_FAILED_ERROR_CODE, "Patient not saved", $t->getMessage());
        }
    }

    public function saveTransferIn($patientData) {
        DB::beginTransaction();
        try {
            $cccNo = $patientData['cccNo'];
            $facility = $patientData['facility'];
            $f = Facility::where('mfl_code', $facility)->firstOrFail();
            $patientData['county'] = $f->county;

            $patient = Patient::where('cccNo', $cccNo)->orderBy('id', 'desc')->first();
            if ($patient != null) {
                $observation = Observation::where('patientCCC', $patient->cccNo)->where('mflCode', $patient->facility)->orderBy('id', 'desc')->first();
                if ($observation == null || $observation->statusAtTransition != "Transfer Out") echo myJsonResponse(202, "Patient status is not transfer out.");
                else {
                    $patient->transferred_out = 1;
                    $patient->save();
                    $observation->statusAtTransition = "Active";
                    $observation->mflCode = $facility;
                    Patient::create($patientData);
                    Observation::create(json_decode($observation, true));
                    echo myJsonResponse(200, "Patient added successfully");
                }
            } else {
                $patient = Patient::create($patientData);
                echo myJsonResponse(200, "Patient added successfully", $patient);
            }
            DB::commit();
        } catch (\Throwable $t) {
            logError($t->getCode(), $t->getMessage());
            DB::rollback();
            echo myJsonResponse(PRECONDITION_FAILED_ERROR_CODE, "Patient not added", $t->getMessage());
        }
    }

    public function getTransferPatient($cccNo) {
        try {
            $patient = Patient::where('cccNo', $cccNo)->orderBy('id', 'desc')->first();
            if ($patient == null) {
                echo myJsonResponse(201, "Patient not found.");
                return;
            }
            $observation = Observation::where('patientCCC', $patient->cccNo)->where('mflCode', $patient->facility)->orderBy('id', 'desc')->first();
            if ($observation == null || $observation->statusAtTransition != "Transfer Out") echo myJsonResponse(202, "Patient status is not transfer out.");
            else echo myJsonResponse(SUCCESS_CODE, "Patient Data", $patient);
        } catch (\Throwable $t) {
            logError($t->getCode(), $t->getMessage());
            echo myJsonResponse(PRECONDITION_FAILED_ERROR_CODE, "Patient not found", $t->getMessage());
        }
    }

    public function getLastVLS($calcccno) {
        try {
            $data = [];
            $caldata = LastVL::where('cccCALHIV', $calcccno)->where('type', 'cal')->orderBy('vlDate', 'desc')->first();
            array_push($data, $caldata);
            $motherdata = LastVL::where('cccCALHIV', $calcccno)->where('type', 'mother')->orderBy('vlDate', 'desc')->first();
            array_push($data, $motherdata);
            $fatherdata = LastVL::where('cccCALHIV', $calcccno)->where('type', 'father')->orderBy('vlDate', 'desc')->first();
            array_push($data, $fatherdata);
            $guardiandata = LastVL::where('cccCALHIV', $calcccno)->where('type', 'guardian')->orderBy('vlDate', 'desc')->first();
            array_push($data, $guardiandata);
            echo myJsonResponse(200, "Data retrieved", $data);
        } catch (\Throwable $t) {
            logError($t->getCode(), $t->getMessage());
            echo myJsonResponse(PRECONDITION_FAILED_ERROR_CODE, "Data not Retrieved", $t->getMessage());
        }
    }

    public function getFacilityPatients($mflCode) {
        try {
            $patients = Patient::where('facility', $mflCode)->get();
            foreach ($patients as $patient) {
                $observation = Observation::where('patientCCC', $patient->cccNo)->orderBy('id', 'desc')->first();
                $patient['lastEntryDate'] = date("d-m-Y G:i:s", strtotime($observation->created_at));
            }
            echo myJsonResponse(200, 'Patients', $patients);
        } catch (\Throwable $t) {
            logError($t->getCode(), $t->getMessage());
            echo myJsonResponse(PRECONDITION_FAILED_ERROR_CODE, "Patients not Retrieved", $t->getMessage());
        }
    }
}
?>