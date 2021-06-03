<?php

namespace models;
require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class IndexClientLinelist extends Model {
    public $table = 'linelist_index_clients';

    protected $fillable = ['cccNo','names', 'facility',	'date_tested','date_listed','dateEnrolledToCare','currentStatus'];
}

?>