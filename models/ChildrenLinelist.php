<?php
require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class ChildrenLinelist extends Model {
    public $table = 'linelist_child';

    protected $fillable = ['names',	'indexCCC',	'date_listed',	'dob',	'tested', 'date_tested', 'test_outcome','islinked', 'cccNo', 'deleted'];
}