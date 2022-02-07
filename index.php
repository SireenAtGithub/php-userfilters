<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<script src="jquery-1.9.1.js"></script>
	<script src="jquery-ui.js"></script>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<script src="filter.js"></script>
</head>
<body>
	
	<div class="container pt-2">
		Search by: &nbsp;
		<select name="filter-select" onchange="changeFilter(this.value)" id="filter-select">
			<option value="name" selected>Name</option>
			<option value="gender">Gender</option>
			<option value="date">Date of birth</option>
		</select>
	</div>

	<div class="container pt-2">
		<div id="select-name">
			<input type="text" name="user_name" id="user_name" placeholder="Start typing name...">
		</div>
		<div id="select-gender" style="display: none">
			
			<input class="gender form-check-input" type="radio" name="gender" value="Female" id="female" unchecked> Female
			<input class="gender form-check-input" type="radio" name="gender" value="Male" id="male" unchecked> Male
		</div> 
		<div id="select-date" style="display: none">
				From:
				<input type="date" name="from_date" id="from_date" required="true">
				To:
				<input type="date" name="to_date" id="to_date" required="true" disabled>
		</div>
	</div>

	<div class="container pt-1">
	   <table id="userTable" border="1" class="table table-striped caption-top">
			<caption>List of users</caption>
	      	<thead>
				<tr>
					<th width="20%">#</th>
					<th width="20%">Username</th>
					<th width="20%">Gender</th>
					<th width="20%">Date of Birth</th>
				</tr>
	      	</thead>
	      	<tbody></tbody>
	   </table>
	   <nav aria-label="Page navigation example">
		<ul class="pagination justify-content-end" id="pagination">
		</ul>
	  </nav>
	</div>
	<input type="hidden" name="total_pages" id="total_pages">
</body>
	
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	
</html>