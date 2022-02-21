<?php
    include "config.php";
    $limit = $_REQUEST['entries'];
    function    get_total_pages($str_query){
        global  $con;
        global  $limit;
        $query = $str_query;
        $result = mysqli_query($con, $query);
        $row = mysqli_fetch_row($result);
        $total_rows = $row[0];
        $total_pages = ceil($total_rows / $limit);
        return  $total_pages;
    }

    function get_return_data($str_query, $page){
        global  $limit;
        $initial_page = ($page-1) * $limit;
        $data_array = array();
        $return_arr = array();
        global  $con;
        $final_query = $str_query . " LIMIT $initial_page, $limit";
        $result = mysqli_query($con,$final_query);
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
        return  $return_arr;
    }
?>