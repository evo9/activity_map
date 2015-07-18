<?php
// ---- Configuration ----
$authtoken = 'ccfb0758df19cf03334dff48f25962d6';
$email = 'y@indeni.com';
$db = 'Insights';
$table = 'Global Map - Alerts';
$userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20100101 Firefox/31.0';
$basePath = __DIR__;
$dataFile = $basePath . '/data/data.json';
// ---- End Configuration ----

$url = 'https://reportsapi.zoho.com/api/' . $email . '/' . $db . '/' . $table . '?ZOHO_ACTION=EXPORT&ZOHO_OUTPUT_FORMAT=JSON&ZOHO_ERROR_FORMAT=JSON&authtoken=' . $authtoken . '&ZOHO_API_VERSION=1.0';

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 0);
$output = curl_exec($ch);
curl_close($ch);

echo json_encode($output);
/*if ($output && $output > '') {
    $f = fopen($dataFile, 'w');
    fwrite($f, $output);
    fclose($f);
}*/