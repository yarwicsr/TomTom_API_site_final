<?php 
class final_rest
{



/**
 * @api  /api/v1/setTemp/
 * @apiName setTemp
 * @apiDescription Add remote temperature measurement
 *
 * @apiParam {string} location
 * @apiParam {String} sensor
 * @apiParam {double} value
 *
 * @apiSuccess {Integer} status
 * @apiSuccess {string} message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *              "status":0,
 *              "message": ""
 *     }
 *
 * @apiError Invalid data types
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *              "status":1,
 *              "message":"Error Message"
 *     }
 *
 */
	public static function setLookup ($location, $sensor, $value)
	{
		try {
			EXEC_SQL("insert into temperature (location, sensor, value, date) values (?,?,?,CURRENT_TIMESTAMP)",$location, $sensor, $value);
			$retData["status"]=0;
			$retData["message"]="insert of '$value' for location: '$location' and sensor '$sensor' accepted";
		}
		catch  (Exception $e) {
			$retData["status"]=1;
			$retData["message"]=$e->getMessage();
		}

		return json_encode ($retData);
	}

	public static function getLookup ($date)
	{
		try {
			$retData["result"] = GET_SQL("select * from temperature where date like ? order by date",$date . "%");
			$retData["status"]=0;
			$retData["message"]="insert of '$date' accepted";
		}
		catch  (Exception $e) {
			$retData["status"]=1;
			$retData["message"]=$e->getMessage();
		}

		return json_encode ($retData);
	}

}
