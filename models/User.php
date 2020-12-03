<?php
require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class User extends Model {
    public $table = 'users';

    protected $fillable = ['username','firstName','surname','cadre', 'facility','county','password','last_login','active'];
}