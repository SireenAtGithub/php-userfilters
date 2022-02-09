$(document).ready(function(){
    $('body').on('click', '.page-link', function(){
        var id = $(this).attr("data-id");
        var filter = $("#filter").val();
        if(filter == "name-filter"){
            var value = $("#user_name").val();
            sendJSONRequest("name_filter.php", {str: value, page: id});
        }
        
        if(filter == "gender-filter") { 
            var value = $('input[name="gender"]:checked').val();
            console.log(value);
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
    });
});

function sendJSONRequest(file_name, dictionary){
    var id = dictionary['page'];
    $.ajax({
        url: file_name,
        type: "get",
        data: jQuery.param(dictionary),
        dataType: 'JSON',
        success: function(response) {
            fillTable(response);
            $(".page-item").removeClass("active");
            $("#li"+id).parent().attr("class", "page-item active");
        }
    });
}