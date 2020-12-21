<?php
require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class LastVL extends Model {
    public $table = 'viral_load';

    protected $fillable = ['cccCALHIV', 'mfl_code', 'type', 'cccNo', 'vlCopies', 'vlDate'];

}