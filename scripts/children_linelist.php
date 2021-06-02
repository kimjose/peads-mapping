<?php
require_once __DIR__ . "/../models/ChildrenLinelist.php";
require_once __DIR__ . "/../models/ChildTestResults.php";

$children = ChildrenLinelist::where('id', '<', 8420)->get();

foreach ($children as $child) {
    $dob = $child->date_tested;
    if ($dob != null || $dob != '') {
        $newdob = '20'.substr($dob,6,2).'-'.substr($dob,3,2).'-'.substr($dob,0,2);
        $child->date_tested = $newdob;
        $child->save();
    }
}

?>