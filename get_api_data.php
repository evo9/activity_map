<?php
header('Access-Control-Allow-Origin: *');
// ---- Configuration ----
$authtoken = 'ccfb0758df19cf03334dff48f25962d6';
$email = 'y@indeni.com';
$db = 'Insights';
$table = 'Global Map - Alerts';
// ---- End Configuration ----

$url = 'https://reportsapi.zoho.com/api/' . $email . '/' . $db . '/' . $table . '?ZOHO_ACTION=EXPORT&ZOHO_OUTPUT_FORMAT=JSON&ZOHO_ERROR_FORMAT=JSON&authtoken=' . $authtoken . '&ZOHO_API_VERSION=1.0';

echo file_get_contents($url);