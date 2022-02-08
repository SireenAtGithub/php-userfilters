<?php
    include "config.php";
    include "functions.php";
    $gender = $_REQUEST['gender'];
    $page = $_REQUEST['page'];
    $limit = 5;

    $totalPageQuery = "SELECT COUNT(*) FROM user_detail WHERE gender ='$gender'";
    $total_pages = get_total_pages($totalPageQuery);
     
    $query_str = "SELECT * FROM user_detail WHERE gender ='$gender'";
    $return_arr = get_return_data($query_str, $page);
    
    $return_arr[] = array("total_pages" => $total_pages);
    echo json_encode($return_arr);
    $con -> close();
    
?>