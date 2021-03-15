<?php


namespace controllers;


class ObsController
{
    protected $user = null;
    public function __construct()
    {
        session_start();
        $user = $_SESSION['user'];
        $this->user = User::findOrFail($user['id']);
    }

    public function submitForm(){
        try {

        } catch (\Throwable $t) {

        }
    }


}