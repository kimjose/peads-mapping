<?php

require_once "functions.php";
require_once "../models/OTZModules.php";
require_once "../models/User.php";
require_once __DIR__ . "/../models/Observation.php";
require_once __DIR__ . "/../models/Regimen.php";
require_once "../models/Cadre.php";
require_once "../models/Facility.php";

$request = $_GET['request'];
$response = [];

try {
    if ($request == "get_otz_modules") {
        require_once "../models/OTZModules.php";
        $modules = OTZModules::all();
        echo myJsonResponse(200, "Modules retrieved", $modules);
    } else if ($request == "submit_form") {
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
        $caregiverVL = $_POST['caregiverVL'];
        $caregiverVLDate = $_POST['caregiverVLDate'];
        $caregiverVLStatus = $_POST['caregiverVLStatus'];
        $PAMAStatus3 = $_POST['PAMAStatus3'];
        
        
        $OTZArtRegimen = $_POST['OTZArtRegimen'];
        $OTZVL = $_POST['OTZVL'];
        $OTZVLDate = $_POST['OTZVLDate'];
        $missedLastAppointment = $_POST['missedLastAppointment'];
        $ArtAdherenceAssessment = $_POST['ArtAdherenceAssessment'];
        $completedOTZModules = $_POST['completedOTZModules'];
        $statusAtOTZTransition = $_POST['statusAtOTZTransition'];
        
        
        $dateEnrolledInOVC = $_POST['dateEnrolledInOVC'];
        $CPMISNumber = $_POST['CPMISNumber'];
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
        $vlOutcome = $_POST['vlOutcome'];
        
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
            'vlOutcome' => $vlOutcome,
            'latestZScore' => $latestZScore, 'opportunisticInfection' => $opportunisticInfection,
            'disclosureStatus' => $disclosureStatus, 'iptStatus' => $iptStatus, 'schooling' => $schooling,
            'statusAtTransition' => $statusAtTransition, 'enrolledInOVC' => $enrolledInOVC,
            'dateEnrolledInOVC' => $dateEnrolledInOVC, 'CPMISNumber' => $CPMISNumber,
            'dateDiscontinuedFromOVC' => $dateDiscontinuedFromOVC, 'statusAtOVCDiscontinuation' => $statusAtOVCDiscontinuation,
            'enrolledInOTZ' => $enrolledInOTZ, 'dateEnrolledInOTZ' => $dateEnrolledInOTZ,
            'OTZArtRegimen' => $OTZArtRegimen, 'OTZVL' => $OTZVL, 'OTZVLDate' => $OTZVLDate, 'missedLastAppointment' => $missedLastAppointment,
            'ArtAdherenceAssessment' => $ArtAdherenceAssessment, 'completedOTZModules' => $completedOTZModules, 'statusAtOTZTransition' => $statusAtOTZTransition,
            'dateDiscontinuedFromOTZ' => $dateDiscontinuedFromOTZ, 'enrolledInPAMA' => $enrolledInPAMA,
            'dateEnrolledInPAMA' => $dateEnrolledInPAMA, 'caregiverInSameFacility' => $caregiverInSameFacility,
            'caregiverType' => $caregiverType, 'caregiver1CCC' => $caregiver1CCC,
            'caregiver2CCC' => $caregiver2CCC, 'caregiverVL' => $caregiverVL, 'caregiverVLDate' => $caregiverVLDate,
            'caregiverVLStatus' => $caregiverVLStatus, 'PAMAStatus3' => $PAMAStatus3,
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
    }else throw new Exception("Invalid request.", -1);
} catch (\Throwable $th) {
    echo myJsonResponse(400, $th->getMessage());
}

?>