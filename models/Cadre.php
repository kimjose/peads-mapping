<?php
require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class Cadre extends Model {
    public $table = 'cadres';

    protected $fillable = ['name', 'description', 'permissions'];

}