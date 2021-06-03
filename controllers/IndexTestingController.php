<?php

namespace controllers;

use models\ChildrenLinelist;
use models\ChildTestResults;
use models\Facility;
use models\IndexClientLinelist;

class IndexTestingController {
    protected $user;

    /**
     * IndexTestingController constructor.
     */
    public function __construct() {
        $this->user = $_SESSION['user'];
    }

    public function getIndexClient($indexCCC, $indexName) {
        try {
            $indexccc = $indexCCC;
            $indexname = $indexName;
            $patients = [];
            if ($indexccc != 0) {
                $patientbyccc = IndexClientLinelist::where('cccNo', $indexccc)->first();
                if ($patientbyccc == null) {
                    echo myJsonResponse(201, "Index client not found.");
                    return;
                } else {
                    array_push($patients, $patientbyccc);
                }
            } else {
                $patients = IndexClientLinelist::where('names', 'LIKE' ,$indexname.'%')->get();
                if (sizeof($patients) == 0) {
                    echo myJsonResponse(201, "Index client not found.");
                    return;
                }
            }
            foreach ($patients as $patient) {
                $patient['facility'] = Facility::where('mfl_code', $patient->facility)->first();
                $children = ChildrenLinelist::where('indexCCC', $patient->cccNo)->where('deleted', 0)->get();

                foreach ($children as $child) {
                    $followuptest = ChildTestResults::where("childId", $child->id)->first();
                    $child['followuptest'] = $followuptest;
                }
                $patient['children'] = $children;

            }
            echo myJsonResponse(200, 'Index client found', $patients);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse(400, "Index client not found.");
        }
    }

    public function saveIndexClient($clientData) {
        try {
            $cccNo = trim($clientData['clientccc']);
            $names = $clientData['clientname'];
            $datetested = $clientData['dateclienttested'];
            $facility = $clientData['facility'];
            $date_listed = $clientData['date_listed'];
            $dateEnrolledToCare = $clientData['dateEnrolledToCare'];
            $currentStatus = $clientData['currentStatus'];

            $indexclient = IndexClientLinelist::create([
                'cccNo' => $cccNo,
                'names' => $names,
                'facility' => $facility,
                'date_tested' => $datetested,
                'date_listed' => $date_listed,
                'dateEnrolledToCare' => $dateEnrolledToCare,
                'currentStatus' => $currentStatus
            ]);

            echo myJsonResponse(200, "Patient created", $indexclient);

        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse(400, "Unable to save patient.");
        }
    }

    public function linkChild($childData) {
        try {
            $id = $childData['childid'];
            $names = $childData['childnames'];
            $patientid = $childData['patientid'];
            $date_listed = $childData['datelisted'];
            $dob = $childData['dob'];
            $tested = $childData['childtested'];
            $date_tested = $childData['datetested'];
            $test_outcome = $childData['testoutcome'];
            $islinked = $childData['islinked'];
            $cccNo = $childData['childcccno'];

            $indexclient = IndexClientLinelist::findOrFail($patientid);
            $indexCCC = $indexclient->cccNo;

            if ($id == null || $id == '') {
                ChildrenLinelist::create([
                    'names' => $names,
                    'indexCCC' => $indexCCC,
                    'date_listed' => $date_listed,
                    'dob' => $dob,
                    'tested' => $tested,
                    'date_tested' => $date_tested,
                    'test_outcome' => $test_outcome,
                    'islinked' => $islinked,
                    'cccNo' => $cccNo
                ]);
            } else {
                $child = ChildrenLinelist::findOrFail($id);
                $child->names = $names;
                $child->indexCCC = $indexCCC;
                $child->date_listed = $date_listed;
                $child->dob = $dob;
                $child->tested = $tested;
                $child->date_tested = $date_tested;
                $child->test_outcome = $test_outcome;
                $child->islinked = $islinked;
                $child->cccNo = $cccNo;
                $child->save();
            }

            $patient = IndexClientLinelist::where('cccNo', $indexCCC)->first();
            $patient['facility'] = Facility::where('mfl_code', $patient->facility)->first();
            $children = ChildrenLinelist::where('indexCCC', $patient->cccNo)->where('deleted', 0)->get();

            foreach ($children as $child) {
                $followuptest = ChildTestResults::where("childId", $child->id)->first();
                $child['followuptest'] = $followuptest;
            }
            $patient['children'] = $children;

            echo myJsonResponse(SUCCESS_CODE, 'Child Listed', $patient);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse(SUCCESS_CODE, "Child not listed.");
        }
    }

    public function addChildTestResults($childTestData) {
        try {
            $patientid = $childTestData['patientid'];
            $id = $childTestData['childid'];
            $tested = $childTestData['childtested'];
            $date_tested = $childTestData['datetested'];
            $test_outcome = $childTestData['testoutcome'];
            $islinked = $childTestData['islinked'];
            $cccNo = $childTestData['childcccno'];

            ChildTestResults::create([
                'childId' => $id,
                'tested' => $tested,
                'date_tested' => $date_tested,
                'test_outcome' => $test_outcome,
                'islinked' => $islinked,
                'cccNo' => $cccNo
            ]);

            $indexclient = IndexClientLinelist::findOrFail($patientid);
            $indexCCC = $indexclient->cccNo;

            $patient = IndexClientLinelist::where('cccNo', $indexCCC)->first();
            $patient['facility'] = Facility::where('mfl_code', $patient->facility)->first();
            $children = ChildrenLinelist::where('indexCCC', $patient->cccNo)->where('deleted', 0)->get();

            foreach ($children as $child) {
                $followuptest = ChildTestResults::where("childId", $child->id)->first();
                $child['followuptest'] = $followuptest;
            }
            $patient['children'] = $children;

            echo myJsonResponse(200, 'Child test results added', $patient);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse(400, "Child test results not added.");
        }
    }

    public function unlinkChild($childData) {
        try {
            $id = $childData['id'];

            $child = ChildrenLinelist::findOrFail($id);
            $child->deleted = 1;
            $child->save();

            $patient = IndexClientLinelist::where('cccNo', $child->indexCCC)->first();
            $patient['facility'] = Facility::where('mfl_code', $patient->facility)->first();
            $children = ChildrenLinelist::where('indexCCC', $patient->cccNo)->where('deleted', 0)->get();

            foreach ($children as $child) {
                $followuptest = ChildTestResults::where("childId", $child->id)->first();
                $child['followuptest'] = $followuptest;
            }
            $patient['children'] = $children;

            echo myJsonResponse(200, 'Child Unlinked', $patient);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse(400, "Child not unlinked.");
        }
    }
}

?>