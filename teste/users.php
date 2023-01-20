<?php

require "connection.php";

if (isset($_GET["action"])) {
  $action = $_GET["action"];
}
else if (isset($_POST["action"])) {
  $action = $_POST["action"];
}

if ($action == "get") {
  $sql = "SELECT id, name_user AS name, email FROM userss ORDER BY id";
  $stmt = $conn->query($sql);
  $stmt = $stmt->fetchAll();
  
  $response = [
    "status" => "success",
    "users" => $stmt
  ];
  
  echo json_encode($response);
  exit;
}
else if ($action == "delete") {
  $id = $_GET["id"];
  $sql = "DELETE FROM userss WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt = $stmt->execute([ $id ]);
  
  $response = [
    "status" => "success",
  ];
  
  echo json_encode($response);
  exit;

}
else if ($action == "insert") {

  $fields = [
    "name" => $_POST["name"],
    "email" => $_POST["email"],
    "password" => $_POST["password"]
  ];

  $sql = "INSERT INTO userss (name_user, email, password_user) VALUES (:name, :email, :password)";
  $stmt = $conn->prepare($sql);
  $stmt = $stmt->execute($fields);
  
  $response = [
    "status" => "success",
  ];
  
  echo json_encode($response);
  exit;

}

echo json_encode([
  "status" => "error",
  "message" => "Não foi enviado nenhuma ação"
]);

