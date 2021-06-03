<?php
namespace models;
require_once __DIR__ . "/../bootstrap.php";
use Illuminate\Database\Eloquent\Model;

class Regimen extends Model {
    protected $table = 'regimens';

    protected $fillable = ['name', 'pFirst','pSecond', 'pThird', 'aFirst', 'aSecond', 'aThird'];

    public $timestamps = false;
}