<?php
namespace controllers;

use Illuminate\Database\Capsule\Manager as DB;
use models\AssignedFacility;
use models\Facility;

class FacilityController {
    protected $user;
    protected $permissionlist = [];

    /**
     * FacilityController constructor.
     */
    public function __construct() {
        $this->user = $_SESSION['user'];
        $this->permissionlist = $this->user->permissions;
    }

    public function getFacilities() {
        try {
            $facilities = [];
            if (in_array("3", $this->permissionlist)) {
                $facilities = Facility::all();
            } else {
                $assignedFacilities = AssignedFacility::where('userID', $this->user->id)->get();
                foreach ($assignedFacilities as $assignedFacility) {
                    $facility = Facility::where('mfl_code', $assignedFacility->facility)->firstOrFail();
                    array_push($facilities, $facility);
                }
            }

            echo myJsonResponse(200, "Facilities retrieved", $facilities);
        } catch (\Throwable $t) {
            logError($t->getCode(), $t->getMessage());
            echo myJsonResponse(PRECONDITION_FAILED_ERROR_CODE, "Facilities not Retrieved", $t->getMessage());
        }
    }
}

?>