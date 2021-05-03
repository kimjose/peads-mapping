<?php

ini_set('max_execution_time', '0');//Unlimited execution time
require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/Facility.php";
require_once __DIR__ . "/../../models/IndexClientLinelist.php";
require_once __DIR__ . "/../../models/ChildrenLinelist.php";
require_once __DIR__ . "/../../models/ChildTestResults.php";
require_once __DIR__ . "/../functions.php";

require_once "../../auth.php";

use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Illuminate\Database\Capsule\Manager as DB;

try {
    
    $data = [];
    $patients = [];

    $permissionlist = $user->permissions;
    // if (!in_array("3", $permissionlist)) {
    //     $assignedFacilities = Facility::all();
    //     foreach ($assignedFacilities as $assignedFacility) {
    //         $indexPatients = IndexClientLinelist::where('facility', $assignedFacility->mfl_code)->get();
    //         $pds = DB::select("SELECT A.cccNo, A.county, A.facility, A.sex, A.dob, A.date_of_hiv_diagnosis, A.date_enrolled, A.dateStartedART, A.startRegimen, A.startKaletraFormulation,
    //     B.*, D.name AS 'facilityName', E.`names` AS 'usernames', F.name AS 'lastOtzModuleCompleted' FROM linelist_index_clients A LEFT JOIN observations B ON A.cccNo = B.patientCCC AND 
    // B.id = (SELECT MAX(id) FROM observations C WHERE C.patientCCC = A.cccNo) LEFT JOIN facilities D ON D.mfl_code = A.facility
    //         LEFT JOIN users E ON E.id = B.userId LEFT JOIN otz_modules F ON F.id = B.completedOTZModules WHERE A.transferred_out = 0 AND `facility`= " . $assignedFacility->mfl_code);
    //         foreach ($pds as $pd) {
    //             array_push($data, $pd);
    //         }
    //     }
    // } else {
        $children = ChildrenLinelist::all();
        foreach ($children as $child) {
            $pData = [];
            $indexclient = IndexClientLinelist::where("cccNo", $child->indexCCC)->first();
            if($indexclient == null) throw new Exception("No query result " . $child->indexCCC, 1);
            
            $pData['mflcode'] = $indexclient->facility;
            $facility = Facility::where('mfl_code', $indexclient->facility)->firstOrFail();
            $pData['facilityname'] = $facility->name;
            $pData['county'] = $facility->county;
            $pData['indexCCC'] = $child->indexCCC;
            $pData['indexInitials'] = $indexclient->names;
            $pData['dateindextested'] = $indexclient->date_tested;
            $pData['dateindexlinelisted'] = $indexclient->date_listed;
            $pData['dateindexenrolledtocare'] = $indexclient->dateEnrolledToCare;
            $pData['indexcurrentstatus'] = $indexclient->currentStatus;
            $pData['childinitials'] = $child->names;
            $pData['datechildlisted'] = $child->date_listed;
            $age = getPatientAge($child->dob);
            $pData['childage'] = $age;
            $pData['initialtested'] = $child->tested;
            $pData['initialdatetested'] = $child->date_tested;
            $pData['initialtestoutcome'] = $child->test_outcome;
            $pData['initialislinked'] = $child->islinked;
            $pData['initialchildccc'] = $child->cccNo;

            $followuptest = ChildTestResults::where('childId', $child->id)->first();
            if ($followuptest != null) {
                $pData['followuptested'] = $followuptest->tested;
                $pData['followupdatetested'] = $followuptest->date_tested;
                $pData['followuptestoutcome'] = $followuptest->test_outcome;
                $pData['followupislinked'] = $followuptest->islinked;
                $pData['followupchildccc'] = $followuptest->cccNo;
            } else {
                $pData['followuptested'] = '';
                $pData['followupdatetested'] = '';
                $pData['followuptestoutcome'] = '';
                $pData['followupislinked'] = '';
                $pData['followupchildccc'] = '';
            }
            
            array_push($data, $pData);
            
        }
    // }
    $filename = "temp/index_testing_";
    $filename .= time();
    $filename .= ".xlsx";
    $writer = WriterEntityFactory::createXLSXWriter();
    $writer->openToFile($filename);

    $boldRowStyle = (new \Box\Spout\Writer\Common\Creator\Style\StyleBuilder())
        ->setFontBold()
        ->setFontSize(12)
        ->setFontUnderline()
        ->setShouldWrapText()
        ->setCellAlignment(\Box\Spout\Common\Entity\Style\CellAlignment::CENTER)
        ->build();

    $normalRowStyle = (new \Box\Spout\Writer\Common\Creator\Style\StyleBuilder())
        ->setFontSize(10)
        ->setCellAlignment(\Box\Spout\Common\Entity\Style\CellAlignment::CENTER)
        ->setShouldWrapText()
        ->build();

    $headerCells = [

        WriterEntityFactory::createCell("MFL Code"),
        WriterEntityFactory::createCell("Facility Name"),
        WriterEntityFactory::createCell("County"),
        WriterEntityFactory::createCell("Index Client CCCNO"),
        WriterEntityFactory::createCell("Index Client Initials"),
        WriterEntityFactory::createCell("Date index confirmed HIV Positive"),
        WriterEntityFactory::createCell("Date index Linelisted"),
        WriterEntityFactory::createCell("Date index Enrolled into HIV care"),
        WriterEntityFactory::createCell("Index Client Current Status"),
        WriterEntityFactory::createCell("Listed Child Initials"),
        WriterEntityFactory::createCell("Date child listed"),
        WriterEntityFactory::createCell("Age of Child"),
        WriterEntityFactory::createCell("Child tested before enrollment"),
        WriterEntityFactory::createCell("Date child tested before enrollment"),
        WriterEntityFactory::createCell("Testing Outcome before enrollment"),
        WriterEntityFactory::createCell("Was Linked before enrollment"),
        WriterEntityFactory::createCell("CCC Number"),
        WriterEntityFactory::createCell("Child had a follow-up test"),
        WriterEntityFactory::createCell("Date child had a follow-up test"),
        WriterEntityFactory::createCell("Testing Outcome before enrollment"),
        WriterEntityFactory::createCell("Follow-up was linked"),
        WriterEntityFactory::createCell("CCC Number")
    ];
    $headerRow = WriterEntityFactory::createRow($headerCells, $boldRowStyle);

    $writer->addRow($headerRow);

    foreach ($data as $datum) {
        $rowCells = [
            WriterEntityFactory::createCell($datum['mflcode']),
            WriterEntityFactory::createCell($datum['facilityname']),
            WriterEntityFactory::createCell($datum['county']),
            WriterEntityFactory::createCell($datum['indexCCC']),
            WriterEntityFactory::createCell($datum['indexInitials']),
            WriterEntityFactory::createCell($datum['dateindextested']),
            WriterEntityFactory::createCell($datum['dateindexlinelisted']),
            WriterEntityFactory::createCell($datum['dateindexenrolledtocare']),
            WriterEntityFactory::createCell($datum['indexcurrentstatus']),
            WriterEntityFactory::createCell($datum['childinitials']),
            WriterEntityFactory::createCell($datum['datechildlisted']),
            WriterEntityFactory::createCell($datum['childage']),
            WriterEntityFactory::createCell($datum['initialtested']),
            WriterEntityFactory::createCell($datum['initialdatetested']),
            WriterEntityFactory::createCell($datum['initialtestoutcome']),
            WriterEntityFactory::createCell($datum['initialislinked']),
            WriterEntityFactory::createCell($datum['initialchildccc']),
            WriterEntityFactory::createCell($datum['followuptested']),
            WriterEntityFactory::createCell($datum['followupdatetested']),
            WriterEntityFactory::createCell($datum['followuptestoutcome']),
            WriterEntityFactory::createCell($datum['followupislinked']),
            WriterEntityFactory::createCell($datum['followupchildccc']),
        ];
        try {
            $writer->addRow(WriterEntityFactory::createRow($rowCells, $normalRowStyle));
        } catch (\Box\Spout\Common\Exception\IOException $e) {
            logError($e->getCode(), $e->getMessage());
        } catch (\Box\Spout\Writer\Exception\WriterNotOpenedException $e) {
            logError($e->getCode(), $e->getMessage());
        }
    }
    $writer->openToBrowser($filename);
    $writer->close();
    unlink($filename);
} catch (\Throwable $th) {
    http_response_code(400);
    logError($th->getCode(), $th->getMessage());
    echo myJsonResponse(400, $th->getMessage());
}

function getPatientAge($dob) {
    $today = date("Y-m-d");
    $diff = date_diff(date_create($dob), date_create($today));
    return $diff->format('%y');
}

?>