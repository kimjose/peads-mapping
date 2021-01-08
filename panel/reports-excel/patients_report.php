<?php


require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ . "/../../models/User.php";
require_once __DIR__ . "/../../models/Facility.php";
require_once __DIR__ . "/../../models/AssignedFacility.php";
require_once __DIR__ . "/../../models/Patient.php";
require_once __DIR__ . "/../../models/Observation.php";
session_start();
$user = $_SESSION['user'];
$user = User::findOrFail($user['id']);
$assignedFacilities = AssignedFacility::select('facility')->where('userID', 39)->get();
$facilities = [];
foreach ($assignedFacilities as $assignedFacility) {
    array_push($facilities, $assignedFacility->facility);
}

//echo json_encode($facilities);
$data = [];
$patients = [];
foreach ($assignedFacilities as $assignedFacility) {
    $fPatients = Patient::where('facility', $assignedFacility->facility)->get();
    if (sizeof($fPatients) > 0) {
        foreach ($fPatients as $fPatient) {
            array_push($patients, $fPatient);
        }
    }
}
foreach ($patients as $patient) {
    $pData = [];
    $observation = Observation::where('patientCCC', $patient->cccNo)->orderBy('id', 'desc')->first();
    $facility = Facility::where('mfl_code', $patient->facility)->firstOrFail();
    if ($observation != null) {
        $pData['patientCccNo'] = $patient->cccNo;
        $pData['gender'] = $patient->sex;
        $pData['dob'] = $patient->dob;
        $pData['facility'] = $facility->mfl_code;
        $pData['lastEntryDate'] = date_format($observation->created_at, 'Y-m-d H:i:s');
        array_push($data, $pData);
    }
}

$excel = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
$sheet = $excel->getActiveSheet();


$sheet->setCellValue('A'.'1', "CCC No")
    ->setCellValue('B'.'1', 'Facility')
    ->setCellValue('C'.'1', 'Gender')
    ->setCellValue('D'.'1', "Date Of Birth")
    ->setCellValue('E'.'1', "Date of Last Entry");

for ($i = 1; $i <= sizeof($data); $i++) {
    $row = $data[$i-1];
    $sheet
        ->setCellValue('A'.($i+1), $row['patientCccNo'])
        ->setCellValue('B'.($i+1), $row['facility'])
        ->setCellValue('C'.($i+1), $row['gender'])
        ->setCellValue('D'.($i+1), $row['dob'])
        ->setCellValue('E'.($i+1), $row['lastEntryDate']);
}

//define some styles
$styleHeading = array(
    'font' => array(
        'size' => 14,
        'color' => array('rgb' => '000000'),
        'bold' => true,
        'underline' => \PhpOffice\PhpSpreadsheet\Style\Font::UNDERLINE_SINGLE
    ),
    'alignment' => array(
        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
    ),
    'borders' => array(
        'bottom' => array(
            'style' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM
        ),
        'right' => array(
            'style' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM
        ),
        'left' => array(
            'style' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM
        )
    )
);
$sheet->getStyle('A1:E1')->applyFromArray($styleHeading);

//set column width
$sheet->getColumnDimension('A')->setWidth(15);
$sheet->getColumnDimension('B')->setWidth(15);
$sheet->getColumnDimension('C')->setWidth(25);
$sheet->getColumnDimension('D')->setWidth(25);
$sheet->getColumnDimension('E')->setWidth(25);


//this is for MS Office Excel 2007 xlsx format
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment; filename="patients_pediatric_report.xlsx"');
header('Cache-Control: max-age=0');

$writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($excel);
$writer->save("php://output");