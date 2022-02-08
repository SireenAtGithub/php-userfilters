<?php
    include "config.php";
    include "functions.php";
    $start_date = $_REQUEST['start_date'];
    $end_date = $_REQUEST['end_date'];
    $page = $_REQUEST['page'];

    $totalPageQuery = "SELECT COUNT(*) FROM user_detail WHERE dob BETWEEN '$start_date' AND '$end_date'";
    $total_pages = get_total_pages($totalPageQuery);
     
    $query_str = "SELECT * FROM user_detail WHERE dob BETWEEN '$start_date' AND '$end_date'";
    $return_arr = get_return_data($query_str, $page);
    
    $return_arr[] = array("total_pages" => $total_pages);
    echo json_encode($return_arr);
    $con -> close();
    
?>