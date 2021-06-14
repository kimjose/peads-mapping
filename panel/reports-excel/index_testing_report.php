<?php

ini_set('max_execution_time', '0');//Unlimited execution time
require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/Facility.php";
require_once __DIR__ . "/../../models/IndexClientLinelist.php";
require_once __DIR__ . "/../../models/ChildrenLinelist.php";
require_once __DIR__ . "/../../models/ChildTestResults.php";
require_once __DIR__ . "/../../vendor/autoload.php";

require_once "../../auth.php";

use Box\Spout\Common\Entity\Style\CellAlignment;
use Box\Spout\Writer\Common\Creator\Style\StyleBuilder;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Illuminate\Database\Capsule\Manager as DB;
use models\ChildrenLinelist;
use models\ChildTestResults;
use models\Facility;
use models\IndexClientLinelist;

try {
    
    $data = [];

    $user = $_SESSION['user'];
    $permissionlist = $user->permissions;
    if  (in_array("3", $permissionlist)) {
        $data = DB::select("SELECT * FROM `index_testing_linelist`");
    } else {
        $data = DB::select ("SELECT A.* FROM index_testing_linelist A  left join facilities B on A.mflCode = B.mfl_code 
            left join assigned_facilities C on B.mfl_code = C.facility where C.userID =" . $user->id);
    }
    
    $filename = "temp/index_testing_";
    $filename .= time();
    $filename .= ".xlsx";
    $writer = WriterEntityFactory::createXLSXWriter();
    $writer->openToFile($filename);

    $boldRowStyle = (new StyleBuilder())
        ->setFontBold()
        ->setFontSize(12)
        ->setFontUnderline()
        ->setShouldWrapText()
        ->setCellAlignment(CellAlignment::CENTER)
        ->build();

    $normalRowStyle = (new StyleBuilder())
        ->setFontSize(10)
        ->setCellAlignment(CellAlignment::CENTER)
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
            WriterEntityFactory::createCell($datum->mflCode),
            WriterEntityFactory::createCell($datum->facilityName),
            WriterEntityFactory::createCell($datum->county),
            WriterEntityFactory::createCell($datum->indexCCC),
            WriterEntityFactory::createCell($datum->indexNames),
            WriterEntityFactory::createCell($datum->dateConfirmedPositive),
            WriterEntityFactory::createCell($datum->dateIndexListed),
            WriterEntityFactory::createCell($datum->dateEnrolledToCare),
            WriterEntityFactory::createCell($datum->currentStatus),
            WriterEntityFactory::createCell($datum->childInitials),
            WriterEntityFactory::createCell($datum->dateChildListed),
            WriterEntityFactory::createCell($datum->childAge),
            WriterEntityFactory::createCell($datum->initialTested),
            WriterEntityFactory::createCell($datum->dateInitialTested),
            WriterEntityFactory::createCell($datum->initialTestOutcome),
            WriterEntityFactory::createCell($datum->isInitiallyLinked),
            WriterEntityFactory::createCell($datum->cccNo),
            WriterEntityFactory::createCell($datum->followUpTested),
            WriterEntityFactory::createCell($datum->datefollowUpTested),
            WriterEntityFactory::createCell($datum->followUpTestOutcome),
            WriterEntityFactory::createCell($datum->followUpLinked),
            WriterEntityFactory::createCell($datum->followUpcccNo),
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
    $today = new DateTime();
    $newdob = new DateTime(date("Y-m-d", strtotime($dob)));
    $diff = $newdob->diff($today);
    return $diff->format('%y');
}

?>