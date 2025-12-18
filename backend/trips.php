<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "sql308.infinityfree.com";
$user = "if0_40096788";
$pass = "hiepnh305";
$db   = "if0_40096788_vexe";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Kết nối CSDL thất bại"
    ]);
    exit();
}

$sql = "SELECT * FROM trips";
$result = $conn->query($sql);

$data = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode([
    "status" => "success",
    "data" => $data
]);
