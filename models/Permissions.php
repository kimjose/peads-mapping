<?php
namespace models;

require_once __DIR__ . "/../bootstrap.php";
use Illuminate\Database\Eloquent\Model;

class Permissions extends Model {

    protected $table = 'cadrepermissions';

    protected $fillable = ['permission'];

    protected $hidden = ['created_at'];
    
}