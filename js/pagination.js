$(document).ready(function(){
    $('body').on('click', '.page-num', function(){
        var id = $(this).attr("data-id");
        var filter = $("#filter").val();
        filterFunction(filter, id);
    });

    $("#left-click").click(function() {
        var id = $("#pagination li.active").index();
        var filter = $("#filter").val();
        filterFunction(filter, id); 
    });

    $("#right-click").click(function() {
        var id = $("#pagination li.active").index();
        var filter = $("#filter").val();
        filterFunction(filter, id+2);
    });
});

function filterFunction(filter, id){
    if(filter == "name-filter"){
        var value = $("#user_name").val();
        sendJSONRequest("name_filter.php", {str: value, page: id});
    }
    
    if(filter == "gender-filter") { 
        var value = $('input[name="gender"]:checked').val();
        sendJSONRequest("gender.php",{gender: value, page: id });
    }

    if(filter == "date-filter") {
        let start_date = document.getElementById('from_date').value;
        let end_date = document.getElementById('to_date').value;
        sendJSONRequest("date_filter.php",{start_date: start_date, end_date: end_date, page: id});
    }
    
    if(filter == "no-filter"){
        sendJSONRequest("select_all.php",{page: id});
    }
}
