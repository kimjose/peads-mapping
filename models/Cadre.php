<?php

namespace models;

require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class Cadre extends Model {
    public $table = 'cadre';

    protected $fillable = ['name', 'category'];

}