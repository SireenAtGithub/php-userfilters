<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<script src="js/jquery-1.9.1.js" ty></script>
	<script src="js/jquery-ui.js"></script>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<script src="js/filter.js"></script>
	
	<script src="js/pagination.js"></script>
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
	   <table id="userTable" class="table table-striped caption-top">
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
		<ul class="pagination justify-content-end" id="parent-pagination">
			<li class="page-item left-item-class">
				<a class="page-link" href="#" aria-label="Previous" id="left-click"> 
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<ol class="user-pages pagination justify-content-end" id="pagination">
			</ol>
			<li class="page-item">
				<a class="page-link" href="#" aria-label="Next" id="right-click">
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	  </nav>
	</div>
	<input type="hidden" name="filter" id="filter">
</body>
	
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	
</html>