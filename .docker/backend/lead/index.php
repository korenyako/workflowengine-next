<?php
require "../includes/secret/settings.php";

$json = file_get_contents('php://input');
$data = json_decode($json);

if (empty($data->first_name)
    || empty($data->last_name)
    || empty($data->company)
    || empty($data->email)
    || empty($data->job_function)) {
    $response = [
        "message" => "Not all fields in the form have been filled in correctly.",
    ];
    http_response_code(400);
    header("Content-Type: application/json");
    echo json_encode($response);
    return;
}

//Creating a lead to CRM
$bitrixurl = \OptimaJet\SiteSettings::BITRIX_URL;
$queryUrl = $bitrixurl . "crm.lead.add.json";
$queryData = http_build_query([
    "fields" => [
        "SOURCE_ID" => "WEB",
        "TITLE" => $data->company . " | Contact Us | Formengine.io",
        "NAME" => $data->first_name,
        "LAST_NAME" => $data->last_name,
        "ASSIGNED_BY_ID" => \OptimaJet\SiteSettings::BITRIX_ASSIGNED_BY_ID,
        "EMAIL" => [
            [
                "VALUE" => $data->email,
                "VALUE_TYPE" => "WORK",
            ],
        ],
        "PHONE" => [
            [
                "VALUE" => $data->business_phone,
                "VALUE_TYPE" => "WORK",
            ]
        ],
        "WEB" => [
            [
                "VALUE" => 'formengine.io',
            ]
        ],
        "COMPANY_TITLE" => $data->company,
        "POST" => $data->job_function,
        "COMMENTS" => $data->details,
    ],
    "params" => ["REGISTER_SONET_EVENT" => "N"],
]);

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_POST => 1,
    CURLOPT_HEADER => 0,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $queryUrl,
    CURLOPT_POSTFIELDS => $queryData,
]);

$createleadRes = curl_exec($curl);
$leadId = json_decode($createleadRes, true)["result"];
curl_close($curl);

$response = [
    "status" => 200,
    "message" => "Your message has been sent",
];

header("Content-Type: application/json");
echo json_encode($response);
?>
