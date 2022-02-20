function hideAll(){
    document.getElementById('select-name').style.display = "none";
    document.getElementById('select-gender').style.display = "none";
    document.getElementById('select-date').style.display = "none";
}		
		
function changeFilter(filter){
    hideAll();
    if(filter == "name"){
        document.getElementById('select-name').style.display = "block";
    }if(filter == "gender"){
        document.getElementById('select-gender').style.display = "block";
    }if(filter == "date"){
        document.getElementById('select-date').style.display = "block";
    }
}

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
            enableDisableArrow(response);
        }
    });
}

function enableDisableArrow(response){
    var a_id = $("#pagination li.active").index();
    var total_pages = response[1]["total_pages"];
    
    if (a_id == 0) {
        $("#left-click").css("pointer-events", "none");
    }else{
        $("#left-click").css("pointer-events", "auto");
    }

    if((a_id + 1) == total_pages){
        $("#right-click").css("pointer-events", "none");
    }else{
        $("#right-click").css("pointer-events", "auto");
    }
}

function fillTable(response){
    $("#userTable tbody").empty();
    $("#pagination").empty();
    var total_pages = response[1]['total_pages'];
    var response = response[0]['data'];
    var len = response.length;
    for(var i=0; i<len; i++){
        var id = response[i].id;
        var user_name = response[i].user_name;
        var gender = response[i].gender;
        var dob = response[i].dob;
        var tr_str = "<tr  class=text-left>" +
            "<td>" + id + "</td>" +
            "<td>" + user_name + "</td>" +
            "<td>" + gender + "</td>" +
            "<td>" + dob + "</td>" +
            "</tr>";

        $("#userTable tbody").append(tr_str);
    }
    for (var i = 1; i <= total_pages; i++) {
        if (i == 1) {
            var li_str = "<li class='page-item active'><a href='JavaScript:Void(0);' class='page-link page-num' data-id='" + i + "' id=li" + i + ">" + i + "</a></li>";
        }else{
            var li_str = "<li class='page-item'><a href='JavaScript:Void(0);' class='page-link page-num' data-id='" + i + "' id=li" + i + ">" + i + "</a></li>";
        }
        $("#pagination").append(li_str);
    }
}

function loadAllData(page){
    sendJSONRequest("select_all.php",{page: page, entries: 5 });
}

$(document).ready(function(){
    loadAllData(1);
    $("#from_date").val('');
    $("#user_name").val('');
    $("#to_date").val('');
    $("#filter").val('no-filter');

    $("#user_name").on('input',function() {
        $str = this.value;
        if($str == ""){
            $("#filter").val('no-filter');
        }else{
            $("#filter").val('name-filter');
        }
        sendJSONRequest("name_filter.php",{ str: $str, page: 1 });
    });

    $('input[type=radio][name=gender]').change(function() {
        var gender = this.value;
        $("#filter").val('gender-filter');
        sendJSONRequest("gender.php",{ gender: gender, page: 1 });
    });
    
    $('#from_date').change(function(){
        $("#to_date").datepicker({showOn: "off"}).datepicker("enable");
        var start_date = $(this).val();
        $('#to_date').prop({ min: start_date });
    });
    
    $('#to_date').change(function(){
        let start_date = document.getElementById('from_date').value;
        let end_date = document.getElementById('to_date').value;
        $("#filter").val('date-filter');  
        sendJSONRequest("date_filter.php",{ start_date: start_date, end_date: end_date, page: 1 });
    });

    from_date.max = new Date().toISOString().split("T")[0];
    to_date.max = new Date().toISOString().split("T")[0];

    $('#filter-select').change(function(){
        loadAllData(1);
        $( "#female" ).prop( "checked", false );
        $( "#male" ).prop( "checked", false );
        $("#from_date").val('');
        $("#to_date").val('');
        $("#user_name").val('');
    });
});

