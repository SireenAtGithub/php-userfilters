<?php
    include "config.php";
    include "functions.php";
    $page = $_REQUEST['page'];

    $totalPageQuery = "SELECT COUNT(*) FROM user_detail";
    $total_pages = get_total_pages($totalPageQuery);
     
    $query_str = "SELECT * FROM user_detail";
    $return_arr = get_return_data($query_str, $page);
    
    $return_arr[] = array("total_pages" => $total_pages);
    echo json_encode($return_arr);
    $con -> close();
    
?>