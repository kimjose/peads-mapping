<?php

namespace models;
require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class AssignedFacility extends Model {
    public $table = 'assigned_facilities';

    protected $fillable = ['userID', 'facility', 'cadre','deleted'];

    public $timestamps = false;

}