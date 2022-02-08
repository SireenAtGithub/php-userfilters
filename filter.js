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

function fillTable(response){
    $("#userTable tbody").empty();
    $("#pagination").empty();
    document.getElementById("total_pages").value = response[1]['total_pages'];
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
            var li_str = "<li class='page-item active'><a href='JavaScript:Void(0);' class='page-link' data-id='" + i + "' id=li" + i + ">" + i + "</a></li>";
        }else{
            var li_str = "<li class='page-item'><a href='JavaScript:Void(0);' class='page-link' data-id='" + i + "' id=li" + i + ">" + i + "</a></li>";
        }
        $("#pagination").append(li_str);
    }
}

function loadAllData(page){
    $.ajax({
        url: 'select_all.php',
        type: 'get',
        dataType: 'JSON',
        data: jQuery.param({page: page }),
        success: function(response){
            fillTable(response);
        }
    });
}

$(document).ready(function(){
    loadAllData(1);
    $("#from_date").val('');
    $("#user_name").val('');
    $("#to_date").val('');
    $('body').on('click', '.page-link', function(){
        var id = $(this).attr("data-id");

        if($("#user_name").val() != ""){
            $value = $("#user_name").val();
            $.ajax({
                url:'name_filter.php',
                type: 'get',
                dataType: 'JSON',
                data: jQuery.param({str: $value, page: id }),
                success: function(response) {
                    fillTable(response);
                    $(".page-item").removeClass("active");
                    $("#li"+id).parent().attr("class", "page-item active");
                }
            });
        }
        if($('#female').is(':checked') || $('#male').is(':checked')) { 
            $value = $('input[name="gender"]:checked').val();
            $.ajax({
                url:'gender.php',
                type: 'get',
                dataType: 'JSON',
                data: jQuery.param({gender: $value, page: id }),
                success: function(response) {
                    fillTable(response);
                    $(".page-item").removeClass("active");
                    $("#li"+id).parent().attr("class", "page-item active");
                }
            });
        }
        if($("#to_date").val() != "" && $("#from_date").val() != "") {
            let start_date = document.getElementById('from_date').value;
            let end_date = document.getElementById('to_date').value;
            $.ajax({
                url:'date_filter.php',
                type: 'get',
                dataType: 'JSON',
                data: jQuery.param({start_date: start_date, end_date: end_date, page: id}),
                success: function(response) {
                    fillTable(response);
                    $(".page-item").removeClass("active");
                    $("#li"+id).parent().attr("class", "page-item active");
                }
            });
        }
        if($("#to_date").val() == "" && $('#female').is(":not(:checked)") && $('#male').is(":not(:checked)") && $("#user_name").val() == ""){
            $.ajax({
                url: "select_all.php",
                type: "get",
                data: jQuery.param({page: id }),
                dataType: 'JSON',
                success: function(response) {
                    fillTable(response);
                    $(".page-item").removeClass("active");
                    $("#li"+id).parent().attr("class", "page-item active");
                }
            });
        }
    });

    $("#user_name").on('input',function() {
        $str = this.value;
        $.ajax({
            url:'name_filter.php',
            type: 'GET',
            dataType: 'JSON',
            data: jQuery.param({str: $str, page: 1}),
            success: function(response){
                fillTable(response);
            }
        })
    });

    $('input[type=radio][name=gender]').change(function() {
        var gender = this.value;
        $.ajax({
            url: 'gender.php',
            type: 'get',
            dataType: 'JSON',
            data: jQuery.param({ gender: gender, page: 1 }),
            success: function(response){
                fillTable(response);
            }
        });
    });
    
    $('#from_date').change(function(){
        $("#to_date").datepicker({showOn: "off"}).datepicker("enable");
        var start_date = $(this).val();
        $('#to_date').prop({
          min: start_date
        });
    });
    
    $('#to_date').change(function(){
        let start_date = document.getElementById('from_date').value;
        let end_date = document.getElementById('to_date').value;
        $.ajax({
            url: 'date_filter.php',
            type: 'get',
            dataType: 'JSON',
            data: jQuery.param({ start_date: start_date, end_date: end_date, page: 1 }),
            success: function(response){
                fillTable(response);
            }
        });
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
