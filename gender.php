<?php
    include "config.php";
    $gender = $_REQUEST['gender'];
    $page = $_REQUEST['page'];
    $limit = 5;
    
    $initial_page = ($page-1) * $limit; 
    $query = "SELECT COUNT(*) FROM user_detail WHERE gender ='$gender'";
    $result = mysqli_query($con, $query);
    $row = mysqli_fetch_row($result);
    $total_rows = $row[0];
    $total_pages = ceil($total_rows / $limit);
    $query_str = "SELECT * FROM user_detail WHERE gender ='$gender' LIMIT $initial_page, $limit ";
    
    $data_array = array();
    $return_arr = array();
    
    $result = mysqli_query($con,$query_str);
    while($row = mysqli_fetch_array($result)){
        $id = $row['id'];
        $user_name = $row['user_name'];
        $gender = $row['gender'];
        $dob = $row['dob'];
        $data_array[] = array("id" => $id,
                        "user_name" => $user_name,
                        "gender" => $gender,
                        "dob" => $dob);
    }
    $return_arr[] = array("data" => $data_array);
    $return_arr[] = array("total_pages" => $total_pages);
    echo json_encode($return_arr);
    $con -> close();
?>