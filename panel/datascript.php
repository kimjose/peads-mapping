<?php

require_once "../functions.php";
require_once "../models/OTZModules.php";
require_once "../models/User.php";
require_once __DIR__ . "/../models/Observation.php";
require_once __DIR__ . "/../models/Regimen.php";
require_once "../models/Cadre.php";
require_once "../models/Facility.php";
require_once __DIR__ . "/../models/Patient.php";
require_once __DIR__ . "/../models/Facility.php";
require_once __DIR__ . "/../models/AssignedFacility.php";
require_once __DIR__ . "/../models/Permissions.php";
require_once __DIR__ . "/../models/UserCategory.php";
require_once __DIR__ . "/../models/ChildrenLinelist.php";
require_once __DIR__ . "/../models/IndexClientLinelist.php";
require_once __DIR__ . "/../models/ChildTestResults.php";

use Illuminate\Database\Capsule\Manager as DB;

$request = $_GET['request'];
$response = [];

try {
    if ($request == "get_otz_modules") {
        require_once __DIR__ . "/../auth.php";
        require_once "../models/OTZModules.php";
        $modules = OTZModules::all();
        echo myJsonResponse(200, "Modules retrieved", $modules);
    } elseif ($request == "submit_form") {
        require_once __DIR__ . "/../auth.php";
        $userId = $loggedUser->id;
        $mflCode = $_POST['mflCode'];
        $weight = $_POST['weight'];
        $PAMAStatus6 = $_POST['PAMAStatus6'];
        $PAMAStatus12 = $_POST['PAMAStatus12'];
        $PAMAStatus24 = $_POST['PAMAStatus24'];
        $PAMAStatusCurrent = $_POST['PAMAStatusCurrent'];
        $dateDiscontinuedFromPAMA = $_POST['dateDiscontinuedFromPAMA'];
        $comment = $_POST['comment'];

        $dateDiscontinuedFromOTZ = $_POST['dateDiscontinuedFromOTZ'];
        $enrolledInPAMA = $_POST['enrolledInPAMA'];
        $dateEnrolledInPAMA = $_POST['dateEnrolledInPAMA'];
        $pamaVLCopies = $_POST['pamaVLCopies'];
        $baselinePamaVlDate = $_POST['baselinePamaVlDate'];
        $caregiverInSameFacility = $_POST['caregiverInSameFacility'];
        $caregiverType = $_POST['caregiverType'];
        $caregiver1CCC = $_POST['caregiver1CCC'];
        $caregiver2CCC = $_POST['caregiver2CCC'];
        $caregiver1VL = $_POST['caregiver1VL'];
        $caregiver1VLDate = $_POST['caregiver1VLDate'];
        $caregiver1VLStatus = $_POST['caregiver1VLStatus'];
        $caregiver2VL = $_POST['caregiver2VL'];
        $caregiver2VLDate = $_POST['caregiver2VLDate'];
        $PAMAStatus3 = $_POST['PAMAStatus3'];

        $OTZArtRegimen = $_POST['OTZArtRegimen'];
        $OTZVL = $_POST['OTZVL'];
        $OTZVLDate = $_POST['OTZVLDate'];
        $lastAttendDate = $_POST['lastAttendDate'];
        $nextAppointmentDate = $_POST['nextAppointmentDate'];
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
        $enrolledInVDOT = $_POST['enrolledInVDOT'];
        $vdotUserMode = $_POST['vdotUserMode'];
        $dateEnrolledInVDOT = $_POST['dateEnrolledInVDOT'];
        $dateDiscontinuedFromVDOT = $_POST['dateDiscontinuedFromVDOT'];
        $enrolledInADOT = $_POST['enrolledInADOT'];
        $followUpPersonnel = $_POST['followUpPersonnel'];
        $dateEnrolledInADOT = $_POST['dateEnrolledInADOT'];
        $dateDiscontinuedFromADOT = $_POST['dateDiscontinuedFromADOT'];


        Observation::create([
            'patientCCC' => $patientCCC, 'userId' => $userId, 'mflCode' => $mflCode,
            'currentRegimen' => $currentRegimen,
            'regimenLine' => $regimenLine,
            'regimenStartDate' => $regimenStartDate,
            'kaletraFormulation' => $kaletraFormulation,
            'vlDate' => $vlDate,
            'vlCopies' => $vlCopies,
            'vlOutcome' => $vlOutcome,
            'weight' => $weight,
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
            'dateEnrolledInPAMA' => $dateEnrolledInPAMA,'pamaVLCopies' =>$pamaVLCopies, 'baselinePamaVlDate'=>$baselinePamaVlDate,
            'caregiverInSameFacility' => $caregiverInSameFacility,'caregiverType' => $caregiverType, 'caregiver1CCC' => $caregiver1CCC,
            'caregiver2CCC' => $caregiver2CCC, 'caregiver1VL' => $caregiver1VL, 'caregiver1VLDate' => $caregiver1VLDate,
            'caregiver2VL' => $caregiver2VL, 'caregiver2VLDate' => $caregiver2VLDate,
            'caregiver1VLStatus' => $caregiver1VLStatus, 'PAMAStatus3' => $PAMAStatus3,
            'PAMAStatus6' => $PAMAStatus6, 'PAMAStatus12' => $PAMAStatus12, 'PAMAStatus24' => $PAMAStatus24,
            'PAMAStatusCurrent' => $PAMAStatusCurrent,
            'dateDiscontinuedFromPAMA' => $dateDiscontinuedFromPAMA, 
            'enrolledInVDOT'=>$enrolledInVDOT, 'dateEnrolledInVDOT'=>$dateEnrolledInVDOT, 'vdotUserMode'=>$vdotUserMode,
            'dateDiscontinuedFromVDOT'=>$dateDiscontinuedFromVDOT,'enrolledInADOT'=>$enrolledInADOT, 'dateEnrolledInADOT'=>$dateEnrolledInADOT, 
            'followUpPersonnel'=>$followUpPersonnel, 'dateDiscontinuedFromADOT'=>$dateDiscontinuedFromADOT, 'comment' => $comment
        ]);
    } else if ($request == "get_users") {
        $users = User::all();
        foreach ($users as $user) {
            $facilities = AssignedFacility::where('userID', $user->id)->get();
            $user['noOfFacilities'] = sizeof($facilities);
            $usercategory = UserCategory::findOrFail($user->usercategory);
            $permlist = $usercategory->permissions;
            $list = json_decode($permlist);
            $user['permissions'] = $list;
            $cadre = Cadre::findOrFail($user->cadre);
            $user['cadreName'] = $cadre->name;
        }
        echo myJsonResponse(200, "Users retrieved", $users);
    } elseif ($request == "save_user") {
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
                "firstName" => $firstname,
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
        $dob = $_POST['dateOfBirth'];
        $dohd = $_POST['dohd'];
        $dec = $_POST['dec'];
        $startRegimen = $_POST['startRegimen'];
        $dsa = $_POST['dsa'];
        $startkaletra = $_POST['startkaletra'];
        $newpatient = $_POST['newpatient'];

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
            echo "Enter Patient CCC Number";
        }

        $patient = Patient::where('cccNo', $cccNo)->first();

        echo myJsonResponse(200, 'Patient Saved', $patient);
    } elseif ($request == "get_cadres") {
        $cadres = Cadre::all();
        echo myJsonResponse(200, "Cadres retrieved", $cadres);
    } elseif ($request == "get_facilities") {
        require_once "../auth.php";
        $permissionlist = $user->permissions;
        if (in_array("3", $permissionlist)) {
            $facilities = Facility::all();
        } else {
            $assignedFacilities = AssignedFacility::where('userID', $loggedUser->id)->get();
            $facilities = [];
            foreach ($assignedFacilities as $assignedFacility) {
                $facility = Facility::where('mfl_code', $assignedFacility->facility)->firstOrFail();
                array_push($facilities, $facility);
            }
        }
        echo myJsonResponse(200, "Facilities retrieved", $facilities);
    } elseif ($request == "get_transfer_patient") {
        $cccNo = $_GET['cccNo'];
        session_start();
        $user = $_SESSION['user'];
        $patient = Patient::where('cccNo', $cccNo)->orderBy('id', 'desc')->first();
        if ($patient == null) {
            echo myJsonResponse(201, "Patient not found.");
            return;
        }
        $observation = Observation::where('patientCCC', $patient->cccNo)->where('mflCode', $patient->facility)->orderBy('id', 'desc')->first();
        if ($observation == null || $observation->statusAtTransition != "Transfer Out") echo myJsonResponse(202, "Patient status is not transfer out.");
        else echo myJsonResponse(200, "Patient Data", $patient);
    } elseif ($request == "transfer_in") {
        $cccNo = $_POST['cccNo'];
        $facility = $_POST['facility'];
        $f = Facility::where('mfl_code', $facility)->firstOrFail();
        $patientData = $_POST;
        $patientData['county'] = $f->county;
        DB::beginTransaction();

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
            // print_r($patientData);
            $patient = Patient::create($patientData);
            echo myJsonResponse(200, "Patient added successfully +" . $patient);
        }
        DB::commit();
    } /*************Authentication */
    elseif ($request == 'register') {
        $names = $_POST['names'];
        $password = $_POST['password'];
        $user = User::where('names', $names)->firstOrFail();
        $user->password = password_hash($password, PASSWORD_DEFAULT);
        $user->active = 1;
        $user->save();
    } elseif ($request == 'login') {
        $names = $_POST['names'];
        $password = $_POST['password'];
        $user = models\User::where('names', $names)->where('active', 1)->firstOrFail();
        if (password_verify($password, $user->password)) {
            $user->last_login = date("Y:m:d h:i:s", time());
            $user->save();
            $usercategory = models\UserCategory::findOrFail($user->usercategory);
            $user['userCategoryName'] = $usercategory->name;
            $cadre = models\Cadre::findOrFail($user->cadre);
            $user['cadreName'] = $cadre->name;
            $permlist = $usercategory->permissions;
            $list = json_decode($permlist);
            $user['permissions'] = $list;
            session_start();
            $_SESSION['user'] = $user;
            echo myJsonResponse(200, 'Logged in', $user);
        } else throw new Exception("Error Processing Request", 1);
    } elseif ($request == "get_facility_patients") {
        $mflCode = $_GET['mfl_code'];
        $patients = Patient::where('facility', $mflCode)->get();
        foreach ($patients as $patient){
            $observation = Observation::where('patientCCC', $patient->cccNo)->orderBy('id', 'desc')->first();
            $patient['lastEntryDate'] =  date("d-m-Y G:i:s", strtotime($observation->created_at));
        }
        echo myJsonResponse(200, 'Patients', $patients);
    } elseif ($request == "load_prev_obs") {
        // session_start();
        // $user = $_SESSION['user'];
        require_once "../auth.php";
        $cccNo = $_GET['cccNo'];
        $patient = Patient::where('cccNo', $cccNo)->orderBy('id', 'desc')->first();
        if ($patient == null) throw new Exception("Patient not found", 404);
        $user = $_SESSION['user'];
        // $assignedFacility = AssignedFacility::where('facility', $patient->facility)->where('userID', $loggedUser->id)->where('deleted', 0)->firstOrFail();
        $facility = Facility::where('mfl_code', $patient->facility)->first();
        $patient['facilityData'] = $facility;
        $data = [];
        $data['patient'] = $patient;
        $observation = Observation::where('patientCCC', $patient->cccNo)->where('mflCode', $patient->facility)->orderBy('id', 'desc')->first();
        if ($observation == null) {
            echo myJsonResponse(201, "No Observation", $data);
        } else {
            $data['observation'] = $observation;
            echo myJsonResponse(200, "Latest Observation", $data);
        }
    } elseif ($request == "get_regimens") {
        $regimens = Regimen::all();
        echo myJsonResponse(200, "Regimens", $regimens);
    } else if ($request == "get_last_vls") {
        require_once "../models/LastVL.php";
        $calcccno = $_GET["cccNo"];
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
    } else if ($request == 'get_user_categories') { 
        
        $categories = getUserCategories();
        echo myJsonResponse(200, "Here are the user categories", $categories);
        
    } else if ($request == 'get_permissions') {
        $permissions = Permissions::all();
        echo myJsonResponse(200, "Permissions retrieved", $permissions);
    } else if ($request == 'save_user_category') {
        try {
            $id = $cadreData['roleid'];
            $name = $cadreData['name'];
            $description = $cadreData['description'];
            $permissions = $cadreData['permissions'];
            if (isset($id) && $id != 0){
                $usercategory = UserCategory::findOrFail($id);
                $usercategory->name = $name;
                $usercategory->description = $description;
                $usercategory->permissions = $permissions;
                $usercategory->save();
            } else {
                $usercategory = UserCategory::create([
                    "name" => $name,
                    "description" => $description,
                    "permissions" => json_encode($permissions),
                    "created_by" => $this->loggedUser->id
                ]);
            }
            $usercategories =getUserCategories();
            echo myJsonResponse(200, "Here are the user categories", $usercategories);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse(400, "Unable to save user data.");
        }
    } else if ($request == 'save_index_client') {
        try {
            $cccNo = trim($_POST['clientccc']);
            $names = $_POST['clientname'];
            $datetested = $_POST['dateclienttested'];
            $facility = $_POST['facility'];
            $date_listed = $_POST['date_listed'];
            $dateEnrolledToCare = $_POST['dateEnrolledToCare'];
            $currentStatus = $_POST['currentStatus'];

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
    } else if ($request == 'get_index_client') {
        try {
            $indexccc = $_GET["indexccc"];
            $indexname = $_GET['indexname'];
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

    } else if ($request == 'link_child') {
        try {
            $id = $_POST['childid'];
            $names = $_POST['childnames'];
            $patientid = $_POST['patientid'];
            $date_listed = $_POST['datelisted'];
            $dob = $_POST['dob'];
            $tested = $_POST['childtested'];
            $date_tested = $_POST['datetested'];
            $test_outcome = $_POST['testoutcome'];
            $islinked = $_POST['islinked'];
            $cccNo = $_POST['childcccno'];

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

            echo myJsonResponse(200, 'Child Listed', $patient);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse(400, "Child not listed.");
        }

    } else if ($request == 'add_child_test_results') {
        try {
            $patientid = $_POST['patientid'];
            $id = $_POST['childid'];
            $tested = $_POST['childtested'];
            $date_tested = $_POST['datetested'];
            $test_outcome = $_POST['testoutcome'];
            $islinked = $_POST['islinked'];
            $cccNo = $_POST['childcccno'];

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
    } else if ($request == 'unlink_child') {
        try {
            $id = $_POST['id'];

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

    } else throw new Exception("Invalid request.", -1);
} catch (\Throwable $th) {
    http_response_code(400);
    logError($th->getCode(), $th->getMessage());
    if ($th->getCode()) DB::rollback();
    echo myJsonResponse(400, $th->getMessage());
}

function getUserCategories() {
    $categories = UserCategory::all();
    foreach ($categories as $category) {
        $permlist = $category->permissions;
        $list = json_decode($permlist);
        $pnames = [];

        foreach ($list as $item) {
            $pid = Permissions::findOrFail($item);
            $pname = $pid->permission;
            array_push($pnames, $pname);
        }

        $category['permissionname'] = $pnames;

        $cadres = Cadre::where('category', $category->id)->get();
        $category['cadres'] = $cadres;
    }
    return $categories;
}
