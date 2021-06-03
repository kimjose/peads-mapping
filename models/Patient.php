<?php

namespace models;

require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class Patient extends Model {
    public $table = 'patients';

    protected $fillable = ['cccNo','county','facility','sex', 'dob', 'date_of_hiv_diagnosis',
    'date_enrolled','dateStartedART','startRegimen','startKaletraFormulation', 'transferred_out'];
}