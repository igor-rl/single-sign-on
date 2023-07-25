<?php
$host = getenv('DB_HOST');
$username = getenv('DB_USER_NAME');
$password = getenv('DB_PASSWORD');
$db = getenv('DB_NAME');
try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $username, 
    $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, 
    PDO::ERRMODE_EXCEPTION);
echo '<h2>Conectado com sucesso.<h2>';
} catch (PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}
