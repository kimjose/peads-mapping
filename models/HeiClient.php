<?php


namespace models;


class HeiClient extends \Illuminate\Database\Eloquent\Model
{
    protected $table = 'hei_clients';

    protected $fillable = ['hei_number', 'facility_code', 'dob', 'gender', 'name', 'status', 'status_date',
        'pmtct_enrollment_date'];

}