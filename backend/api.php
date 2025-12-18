<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Tự động nhận diện Local và Host giống hệt file bạn gửi
$localConfig = __DIR__ . '/config.local.php';
if (file_exists($localConfig)) {
    $config = require $localConfig;
} else {
    $config = [
        'host' => 'sql308.infinityfree.com',
        'user' => 'if0_40096788',
        'pass' => 'hiepnh305',
        'db'   => 'if0_40096788_vexe'
    ];
}

$conn = new mysqli($config['host'], $config['user'], $config['pass'], $config['db']);
$result = $conn->query("SELECT * FROM trips");
$trips = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($trips);