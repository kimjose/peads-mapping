<?php

namespace models;
require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class ChildTestResults extends Model {
    public $table = 'linelist_child_test';

    protected $fillable = ['childId', 'tested', 'date_tested', 'test_outcome','islinked', 'cccNo'];
}