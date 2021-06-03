<?php
namespace models;
require_once __DIR__ . "/../bootstrap.php";

use Illuminate\Database\Eloquent\Model;

class UserCategory extends Model {
    public $table = 'user_categories';

    protected $fillable = ['name', 'description', 'permissions'];

}