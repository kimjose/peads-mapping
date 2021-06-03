<?php

namespace models;

require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class OTZModules extends Model {
    public $table = 'otz_modules';

    protected $fillable = ['name'];

    public $timestamps = false;
}