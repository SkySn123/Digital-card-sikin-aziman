<?php

header('Content-Type: application/json; charset=utf-8');

$servername = "127.0.0.1:3306";
$username = "root";
$password = "";
$database = "kad_kahwin";

$connection = mysqli_connect(
    $servername,
    $username,
    $password,
    $database
);

if (!$connection) {
    echo json_encode([
        'attend' => false,
        'error' => 'Database connection failed: ' . mysqli_connect_error()
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        'attend' => false,
        'error' => 'Invalid request method'
    ]);
    exit;
}

if (!isset($_POST['action']) || $_POST['action'] !== 'increment') {
    echo json_encode([
        'attend' => false,
        'error' => 'Invalid action'
    ]);
    exit;
}

$sql = "
    UPDATE kehadiran
    SET jumlah_kehadiran = jumlah_kehadiran + 1
    WHERE id = 1
";

if (mysqli_query($connection, $sql)) {

    echo json_encode([
        'attend' => true,
        'message' => 'Kehadiran berjaya direkodkan'
    ]);

} else {

    echo json_encode([
        'attend' => false,
        'error' => mysqli_error($connection)
    ]);

}

mysqli_close($connection);
exit;
