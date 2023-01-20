<?php
    // Connecting to the Database
    $host = 'host.docker.internal';
    $db = 'testdb';
    $username = 'anas';
    $password = 'super_secret';
    $port = 3306;

    // Create a connection
    $conn = mysqli_connect($host, $username, $password, $db, $port);

    // Die if connection was not successful
    if (!$conn){
        die("Sorry we failed to connect: ". mysqli_connect_error());
    }
    else{
        echo 'Connection was successful';
    }

?>