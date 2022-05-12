<?php 
/*
   scott campbell
   Kurt Johnson
   display temps
 */
$DBSTRING = "sqlite:/home/ubuntu/cse383/database/cse383.db";  // This must be updated to your real database location 
include "sql.inc";
include "final.class.php";

header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Allow-Methods: GET,POST,PUSH,OPTIONS");
header ("content-type: application/json");
header ("Access-Control-Allow-Headers: Content-Type");
require_once "RestServer.php";
// phpinfo();

// Kurt Johnson
// with linux function code by Scott Campbell


$method=$_REQUEST["method"];
// example request: http://path/to/resource/rest/api/vi/sayHello?&name=World
public static function insertData ($location, $sensor, $value){
try {
	EXEC_SQL("insert into tempature (location, senseor, value, date) values (?, ?, ?, CURRENT_TIMESTAMP)", $location, $sensor, $value);
	$retData["status"]=0;
	$retData["message"]="insert of '$value' for location: '$location' and senser '$sensor' accepted";
}
catch (Exception $e) {
	$retData["status"]=1;
	$retData["message"]=$e->getMessage();
}
return json_encode ($retData);
}


$rest = new RestServer (new final_rest(),$method);
$rest->handle ();
