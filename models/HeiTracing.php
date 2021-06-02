<?php


namespace models;


class HeiTracing extends \Illuminate\Database\Eloquent\Model
{
    protected $table = 'hei_tracings';

    protected $fillable = ['date', 'client_id', 'client_number', 'mode', 'outcome', 'tested', 'test_type',
        'test_date', 'test_results', 'linked_to_care', 'ccc_no', 'recommendations'];

}