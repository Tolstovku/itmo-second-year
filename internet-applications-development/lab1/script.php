<?php
session_start();
$timeStart = microtime(true);

$x = round($_REQUEST["x-input"], 2);
$y = $_REQUEST["y-input"];
$r = $_REQUEST["r-buttons"];

$responseArray = array();
$responseArray["x"] = $x;
$responseArray["y"] = $y;
$responseArray["r"] = $r;
$responseArray["result"] = validate($x, $y, $r, $responseArray);
if ($responseArray["result"] !== "Validation fail")
    $responseArray["result"] = isInArea($x, $y, $r);

header("Content-Type:application/json");
$responseArray["currentTime"] = date("H:i:s");
$responseArray["executionTime"] = round(((microtime(true) - $timeStart) * 1000), 10) . "ms";
array_push($_SESSION["rows"], $responseArray);

echo json_encode($responseArray);

function validate($x, $y, $r, $responseArray)
{
    $yValues = array("-2", "-1.5", "-1", "-0.5", "0", "0.5", "1", "1.5", "2");
    $rValues = array("1", "1.5", "2", "2.5", "3");
    if (is_numeric($x) && is_numeric($y) && is_numeric($r) && $x >= -5
        && $x <= 3 && in_array($y, $yValues) && in_array($r, $rValues)) {
        return "Validation success";
    }
    return "Validation fail";
}

function isInArea($x, $y, $r)
{
    if ($x <= 0 && $y >= 0) {
        if ($x >= (-$r / 2) && $y <= $r) {
            return "Success";
        } else {
            return "Fail";
        }
    } elseif ($x >= 0 && $y >= 0) {
        if ((pow($x, 2) + pow($y, 2)) <= (pow(($r / 2), 2))) {
            return "Success";
        } else {
            return "Fail";
        }
    } else if ($x <= 0 && $y <= 0) {
        if ($x >= -$r && $y >= (-$x / 2 - 2)) {
            return "Success";
        } else {
            return "Fail";
        }
    } else
        return "Fail";

}

