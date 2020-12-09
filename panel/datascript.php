<?php

require_once "functions.php";
require_once "../models/OTZModules.php";
require_once "../models/User.php";
require_once __DIR__ . "/../models/Observation.php";
require_once __DIR__ . "/../models/Regimen.php";
require_once "../models/Cadre.php";
require_once "../models/Facility.php";
require_once __DIR__ . "/../models/Patient.php";
require_once __DIR__ . "/../models/Facility.php";

$request = $_GET['request'];
$response = [];

try {
    if ($request == "get_otz_modules") {
        require_once "../models/OTZModules.php";
        $modules = OTZModules::all();
        echo myJsonResponse(200, "Modules retrieved", $modules);
    } elseif ($request == "submit_form") {
        $userId = $_POST['userId'];
        $PAMAStatus6 = $_POST['PAMAStatus6'];
        $PAMAStatus12 = $_POST['PAMAStatus12'];
        $PAMAStatus24 = $_POST['PAMAStatus24'];
        $PAMAStatusCurrent = $_POST['PAMAStatusCurrent'];
        $PAMAStatusTransition = $_POST['PAMAStatusTransition'];
        $dateDiscontinuedFromPAMA = $_POST['dateDiscontinuedFromPAMA'];
        $comment = $_POST['comment'];



        $dateDiscontinuedFromOTZ = $_POST['dateDiscontinuedFromOTZ'];
        $enrolledInPAMA = $_POST['enrolledInPAMA'];
        $dateEnrolledInPAMA = $_POST['dateEnrolledInPAMA'];
        $caregiverInSameFacility = $_POST['caregiverInSameFacility'];
        $caregiverType = $_POST['caregiverType'];
        $caregiver1CCC = $_POST['caregiver1CCC'];
        $caregiver2CCC = $_POST['caregiver2CCC'];
        $caregiver1VL = $_POST['caregiver1VL'];
        $caregiver1VLDate = $_POST['caregiver1VLDate'];
        $caregiver1VLStatus = $_POST['caregiver1VLStatus'];
        $caregiver2VL = $_POST['caregiver2VL'];
        $caregiver2VLDate = $_POST['caregiver2VLDate'];
        $caregiver2VLStatus = $_POST['caregiver2VLStatus'];
        $PAMAStatus3 = $_POST['PAMAStatus3'];


        $OTZArtRegimen = $_POST['OTZArtRegimen'];
        $OTZVL = $_POST['OTZVL'];
        $OTZVLDate = $_POST['OTZVLDate'];
        $ArtAdherenceAssessment = $_POST['ArtAdherenceAssessment'];
        $completedOTZModules = $_POST['completedOTZModules'];
        $statusAtOTZTransition = $_POST['statusAtOTZTransition'];


        $dateEnrolledInOVC = $_POST['dateEnrolledInOVC'];
        $CPMISNumber = $_POST['CPMISNumber'];
        $ovcVLCopies = $_POST['ovcVLCopies'];
        $baselineOvcVlDate = $_POST['baselineOvcVlDate'];
        $dateDiscontinuedFromOVC = $_POST['dateDiscontinuedFromOVC'];
        $statusAtOVCDiscontinuation = $_POST['statusAtOVCDiscontinuation'];
        $enrolledInOTZ = $_POST['enrolledInOTZ'];
        $dateEnrolledInOTZ = $_POST['dateEnrolledInOTZ'];

        $patientCCC = $_POST['patientCCC'];
        $currentRegimen = $_POST['currentRegimen'];
        $regimenLine = $_POST['regimenLine'];
        $regimenStartDate = $_POST['regimenStartDate'];
        $kaletraFormulation = $_POST['kaletraFormulation'];
        $vlDate = $_POST['vlDate'];
        $vlCopies = $_POST['vlCopies'];
        $vlOutcome = $_POST['vlOutcome'];

        $vlScoreType = $_POST['vlScoreType'];
        $latestZScore = $_POST['latestZScore'];
        $opportunisticInfection = $_POST['opportunisticInfection'];
        $disclosureStatus = $_POST['disclosureStatus'];
        $iptStatus = $_POST['iptStatus'];
        $schooling = $_POST['schooling'];
        $statusAtTransition = $_POST['statusAtTransition'];
        $enrolledInOVC = $_POST['enrolledInOVC'];


        Observation::create([
            'patientCCC' => $patientCCC, 'userId' => $userId,
            'currentRegimen' => $currentRegimen,
            'regimenLine' => $regimenLine,
            'regimenStartDate' => $regimenStartDate,
            'kaletraFormulation' => $kaletraFormulation,
            'vlDate' => $vlDate,
            'vlCopies' => $vlCopies,
            'vlOutcome' => $vlOutcome,
            'vlScoreType' => $vlScoreType,
            'latestZScore' => $latestZScore, 'opportunisticInfection' => $opportunisticInfection,
            'disclosureStatus' => $disclosureStatus, 'iptStatus' => $iptStatus, 'schooling' => $schooling,
            'statusAtTransition' => $statusAtTransition, 'enrolledInOVC' => $enrolledInOVC,
            'dateEnrolledInOVC' => $dateEnrolledInOVC, 'CPMISNumber' => $CPMISNumber, 'ovcVLCopies' => $ovcVLCopies, 'baselineOvcVlDate' => $baselineOvcVlDate,
            'dateDiscontinuedFromOVC' => $dateDiscontinuedFromOVC, 'statusAtOVCDiscontinuation' => $statusAtOVCDiscontinuation,
            'enrolledInOTZ' => $enrolledInOTZ, 'dateEnrolledInOTZ' => $dateEnrolledInOTZ,
            'OTZArtRegimen' => $OTZArtRegimen, 'OTZVL' => $OTZVL, 'OTZVLDate' => $OTZVLDate, 
            'lastAttendDate' => $lastAttendDate, 'nextAppointmentDate' => $nextAppointmentDate,
            'ArtAdherenceAssessment' => $ArtAdherenceAssessment, 'completedOTZModules' => $completedOTZModules, 'statusAtOTZTransition' => $statusAtOTZTransition,
            'dateDiscontinuedFromOTZ' => $dateDiscontinuedFromOTZ, 'enrolledInPAMA' => $enrolledInPAMA,
            'dateEnrolledInPAMA' => $dateEnrolledInPAMA, 'caregiverInSameFacility' => $caregiverInSameFacility,
            'caregiverType' => $caregiverType, 'caregiver1CCC' => $caregiver1CCC,
            'caregiver2CCC' => $caregiver2CCC, 'caregiver1VL' => $caregiver1VL, 'caregiver1VLDate' => $caregiver1VLDate,
            'caregiver2VL' => $caregiver2VL, 'caregiver2VLDate' => $caregiver2VLDate,
            'caregiver1VLStatus' => $caregiverVL1Status, 'PAMAStatus3' => $PAMAStatus3,
            'PAMAStatus6' => $PAMAStatus6, 'PAMAStatus12' => $PAMAStatus12, 'PAMAStatus24' => $PAMAStatus24,
            'PAMAStatusCurrent' => $PAMAStatusCurrent, 'PAMAStatusTransition' => $PAMAStatusTransition,
            'dateDiscontinuedFromPAMA' => $dateDiscontinuedFromPAMA, 'comment' => $comment
        ]);
    } else if ($request == "get_users") {
        $users = User::all();
        foreach ($users as $user) {
            $cadre = Cadre::findOrFail($user->cadre);
            $facility = Facility::findOrFail($user->facility);
            $user['cadreName'] = $cadre->name;
            $user['facilityName'] = $facility->name;
        }
        echo myJsonResponse(200, "Users retrieved", $users);
    } 
    /*******Users Management**** */
    elseif ($request == "save_user") {
        $username = $_POST['username'];
        $firstname = $_POST['firstname'];
        $surname = $_POST['surname'];
        // $gender = $_POST['gender'];
        $cadre = $_POST['cadre'];
        $facility = $_POST['facility'];
        $county = $_POST['county'];
        // $mobile = $_POST['mobile'];
        // $email = $_POST['email'];
        $password = $_POST['password'];
        $active = $_POST['active'];
        $hashedpassword = password_hash($password, PASSWORD_DEFAULT);

        $id = $_POST['id'];
        if ($id != NULL && $id != '') {
            $user = User::findOrFail($id);
            $hashedpassword = $password == '' || $password == null ? $user->password : password_hash($password, PASSWORD_DEFAULT);
            $user->username = $username;
            $user->firstName = $firstname;
            // $user->middlename = $middlename;
            $user->surname = $surname;
            // $user->gender = $gender;
            $user->cadre = $cadre;
            $user->facility = $facility;
            $user->county = $county;
            // $user->mobile = $mobile;
            // $user->email = $email;
            $user->password = $hashedpassword;
            $user->active = $active;
            $user->save();
        } else {
            User::create([
                "username" => $username,
                "firstname" => $firstname,
                // "middlename" => $middlename,
                "surname" => $surname,
                // "gender" => $gender,
                "cadre" => $cadre,
                "facility" => $facility,
                "county" => $county,
                // "mobile" => $mobile,
                // "email" => $email,
                "password" => $hashedpassword,
                "active" => 1,
            ]);
        }
        $users = User::all();
        foreach ($users as $user) {
            $cadre = Cadre::findOrFail($user->cadre);
            $facility = Facility::findOrFail($user->facility);
            $user['cadreName'] = $cadre->name;
            $user['facilityName'] = $facility->name;
        }
        echo myJsonResponse(200, "Here are the users.", $users);
    } elseif ($request == "save_patient_data") {
        $cccNo = $_POST['cccNo'];
        $facility = $_POST['facility'];
        $county = $_POST['county'];
        $sex = $_POST['sex'];
        $dob = $_POST['dob'];
        $dohd = $_POST['dohd'];
        $dec = $_POST['dec'];
        $startRegimen = $_POST['startRegimen'];
        $dsa = $_POST['dsa'];
        $startkaletra = $_POST['startkaletra'];
        $newpatient = $_POST['newpatient'];

        if ($cccNo != null && $cccNo != "") {

            if ($newpatient == false) {

                $patient = Patient::where('cccNo', $cccNo)->first();
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
                Patient::create([
                    "cccNo" => $cccNo,
                    "facility" => $facility,
                    "county" => $county,
                    "sex" => $sex,
                    "dob" => $dob,
                    "date_of_hiv_diagnosis" => $dohd,
                    "date_enrolled" => $dec,
                    "dateStartedART" => $dsa,
                    "startRegimen" => $startRegimen,
                    "startKaletraFormulation" => $startkaletra
    
                ]);
            }
        } else {
            echo "Enter Patient CCC Number";
        }

        $patients = Patient::all();

        echo myJsonResponse(200, 'Patients Retrieved', $patients);

    } elseif ($request == "get_cadres") {
        $cadres = Cadre::all();
        echo myJsonResponse(200, "Cadres retrieved", $cadres);
    } elseif ($request == "get_facilities") {
        require_once "../models/Facility.php";
        $facilities = Facility::all();
        echo myJsonResponse(200, "Facilities retrieved", $facilities);
    } 
    /*************Authentication */
    elseif ($request == 'login') {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $user = User::where('username', $username)->where('active', 1)->firstOrFail();
        if (password_verify($password, $user->password)) {
            $user->last_login = date("d-m-Y h:i A", time());
            $user->save();
            echo myJsonResponse(200, 'Logged in', $user);
        } else throw new Exception("Error Processing Request", 1);
    } elseif ($request == "load_prev_obs") {
        $cccNo = $_GET['cccNo'];
        $patient = Patient::where('cccNo', $cccNo)->first();
        if ($patient == null) throw new Exception("Patient not found", 404);
        $facility = Facility::findOrFail($patient->facility);
        $patient['facilityData'] = $facility;
        $data = [];
        $data['patient'] = $patient;
        $observation = Observation::where('patientCCC', $patient->cccNo)->orderBy('id', 'desc')->first();
        if ($observation == null) {
            echo myJsonResponse(201, "No Observation", $data);
        } else {
            $data['observation'] = $observation;
            echo myJsonResponse(200, "Latest Observation", $data);
        }
    } elseif ($request == "get_regimens") {
        $regimens = Regimen::all();
        echo myJsonResponse(200, "Regimens", $regimens);
    }else throw new Exception("Invalid request.", -1);
} catch (\Throwable $th) {
    // http_response_code(400);
    echo myJsonResponse(400, $th->getMessage());
}
