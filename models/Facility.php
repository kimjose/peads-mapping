<?php
require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class Facility extends Model {
    public $table = 'facilities';

    protected $fillable = ['mfl_code','name'];

    public $timestamps = false;
}