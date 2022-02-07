<?php

include "config.php";

$return_arr = array();
$data_array = array();
$limit = 5;
$page = $_REQUEST['page'];

$initial_page = ($page-1) * $limit;  

$sql = "SELECT * FROM items LIMIT $initial_page, $limit"; 

$query = "SELECT COUNT(*) FROM user_detail";
$result = mysqli_query($con, $query);
$row = mysqli_fetch_row($result);
$total_rows = $row[0];
$total_pages = ceil($total_rows / $limit);

$query = "SELECT * FROM user_detail LIMIT $initial_page, $limit";

$result = mysqli_query($con,$query);

while($row = mysqli_fetch_array($result)){
    $id = $row['id'];
    $user_name = $row['user_name'];
    $gender = $row['gender'];
    $dob = $row['dob'];

    $data_array[] = array("id" => $id,
                    "user_name" => $user_name,
                    "gender" => $gender,
                    "dob" => $dob
                );
}

$return_arr[] = array("data" => $data_array);
$return_arr[] = array("total_pages" => $total_pages);
// Encoding array in JSON format
echo json_encode($return_arr);
$con -> close();

?>