<?php

header('Content-type: application/json');

//Assuming that if we have address1, we'd have other params as well, we can also opt to check all of them
if (!$_GET || !isset($_GET['address1'])) {
    $response = ['error' => 'Invalid method or params'];
    echo json_encode($response);
    die(0);
}

$host = 'host.docker.internal';
$db = 'testdb';
$username = 'anas';
$password = 'super_secret';
$port = 3306;

try {
    // Create a connection
    $conn = mysqli_connect($host, $username, $password, $db, $port);

    // Check the connection
    if (!$conn) {
        $response = ['error' => "Error:" . mysqli_connect_error()];
        echo json_encode($response);
        die(0);
    }

    $address1 = $_GET['address1'];
    $address2 = $_GET['address2'];
    $city = $_GET['city'];
    $state = $_GET['state'];
    $zip = $_GET['zip'];

    //Build SQL query
    $sql = "INSERT INTO Addresses (address1, address2, city, state, zip) VALUES ( '$address1', '$address2', '$city', '$state', '$zip' )";

    //Check if record inserted
    if (!mysqli_query($conn, $sql)) {
        $response = ['error' => "Error: " . $sql . mysqli_error($conn)];
        echo json_encode($response);
        die(0);
    }

    $response = ['success' => "Success: " . 'Address added successfully'];
    echo json_encode($response);

    //close connection
    mysqli_close($conn);
} catch (PDOException $e) { // if exception
    $response = ['error' => "Error: " . $e->getMessage()];
    echo json_encode($response);
    die(0);
}
?>