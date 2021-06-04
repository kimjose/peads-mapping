<?php


namespace models;


class HeiTracing extends \Illuminate\Database\Eloquent\Model
{
    protected $table = 'hei_tracings';

    protected $fillable = ['date', 'client_id', 'mode', 'outcome', 'hiv_tested', 'hiv_test_type',
        'hiv_test_date', 'hiv_test_results', 'linked_to_care', 'ccc_no', 'recommendations'];

}