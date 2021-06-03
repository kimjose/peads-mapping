<?php

namespace controllers;

use Illuminate\Database\Capsule\Manager as DB;
use models\AssignedFacility;
use models\Cadre;
use models\Permissions;
use models\User;
use models\UserCategory;

class UserController
{
    public function register($userData)
    {
        try {
            $names = $userData['names'];
            $password = $userData['password'];
            $user = User::where('names', $names)->firstOrFail();
            $user->password = password_hash($password, PASSWORD_DEFAULT);
            $user->active = 1;
            $user->save();
            echo myJsonResponse(SUCCESS_CODE, "User registered successfully", $user);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse($e->getCode(), "Error encountered. Try again later.", $e->getMessage());
        }
    }

    public function login($userData)
    {
        try {
            $names = $userData['names'];
            $password = $userData['password'];
            $user = User::where('names', $names)->where('active', 1)->firstOrFail();
            if (password_verify($password, $user->password)) {
                $user->last_login = date("Y:m:d h:i:s", time());
                $user->save();
                $usercategory = UserCategory::findOrFail($user->usercategory);
                $user['userCategoryName'] = $usercategory->name;
                $cadre = Cadre::findOrFail($user->cadre);
                $user['cadreName'] = $cadre->name;
                $permlist = $usercategory->permissions;
                $list = json_decode($permlist);
                $user['permissions'] = $list;
                session_start();
                $_SESSION['user'] = $user;
                echo myJsonResponse(200, 'Logged in', $user);
            } else throw new Exception("Error Processing Request", 1);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse($e->getCode(), "Error encountered. Try again later.", $e->getMessage());
        }
    }

    public function getUsers()
    {
        try {
            $users = User::all();
            foreach ($users as $user) {
                $facilities = AssignedFacility::where('userID', $user->id)->get();
                $user['noOfFacilities'] = sizeof($facilities);
                $usercategory = UserCategory::findOrFail($user->usercategory);
                $permlist = $usercategory->permissions;
                $list = json_decode($permlist);
                $user['permissions'] = $list;
                $cadre = Cadre::findOrFail($user->cadre);
                $user['cadreName'] = $cadre->name;
            }
            echo myJsonResponse(SUCCESS_CODE, "Registered users retrieved", $users);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse($e->getCode(), "Users not retrieved", $e->getMessage());
        }
    }

    /****
     * Saves user data
     * @param array $userData
     *
     * @return bool true if saved successfully.
     **
     */
    public function saveUser(array $userData)
    {
        try {
            $username = $userData['username'];
            $firstname = $userData['firstname'];
            $surname = $userData['surname'];
            $cadre = $userData['cadre'];
            $facility = $userData['facility'];
            $county = $userData['county'];
            $password = $userData['password'];
            $active = $userData['active'];
            $hashedpassword = password_hash($password, PASSWORD_DEFAULT);

            $id = $userData['id'];
            if ($id != NULL && $id != '') {
                $user = User::findOrFail($id);
                $hashedpassword = $password == '' || $password == null ? $user->password : password_hash($password, PASSWORD_DEFAULT);
                $user->username = $username;
                $user->firstName = $firstname;
                $user->surname = $surname;
                $user->cadre = $cadre;
                $user->facility = $facility;
                $user->county = $county;
                $user->password = $hashedpassword;
                $user->active = $active;
                $user->save();
            } else {
                User::create([
                    "username" => $username,
                    "firstName" => $firstname,
                    "surname" => $surname,
                    "cadre" => $cadre,
                    "facility" => $facility,
                    "county" => $county,
                    "password" => $hashedpassword,
                    "active" => 1,
                ]);
            }

            return true;
        } catch (\Exception $e) {
            logError($e->getCode(), $e->getMessage());
            return false;
        }

    }

    public function getUserCategories()
    {
        $categories = UserCategory::all();
        foreach ($categories as $category) {
            $permlist = $category->permissions;
            $list = json_decode($permlist);
            $pnames = [];

            foreach ($list as $item) {
                $pid = Permissions::findOrFail($item);
                $pname = $pid->permission;
                array_push($pnames, $pname);
            }

            $category['permissionname'] = $pnames;

            $cadres = Cadre::where('category', $category->id)->get();
            $category['cadres'] = $cadres;
        }
        return $categories;
    }

    public function saveUserCategory($cadreData) {
        try {
            $id = $cadreData['roleid'];
            $name = $cadreData['name'];
            $description = $cadreData['description'];
            $permissions = $cadreData['permissions'];
            $user = $_SESSION['user'];
            if (isset($id) && $id != 0){
                $usercategory = UserCategory::findOrFail($id);
                $usercategory->name = $name;
                $usercategory->description = $description;
                $usercategory->permissions = $permissions;
                $usercategory->save();
            } else {
                UserCategory::create([
                    "name" => $name,
                    "description" => $description,
                    "permissions" => json_encode($permissions),
                    "created_by" => $user->id
                ]);
            }
            $usercategories = $this->getUserCategories();
            echo myJsonResponse(SUCCESS_CODE, "Here are the user categories", $usercategories);
        } catch (\Throwable $e) {
            logError($e->getCode(), $e->getMessage());
            echo myJsonResponse(PRECONDITION_FAILED_ERROR_CODE, "Unable to save user category.", $e->getMessage());
        }
    }
}

?>