$(document).ready(function() {

	var myDataRef = new Firebase('https://getshitdonenow.firebaseIO.com');

	$("#button").click(function(){
		addTask();
	});

	$(document).keypress(function(e) {
    	if(e.which == 13) {
	    	addTask();
    	}
	});
	$( "#datepicker" ).datepicker({
			changeMonth: true,
			changeYear: true
		});
	myDataRef.on('child_added', function(snapshot) {
		var task = snapshot.val();

		var new_row = $("<div class='row well'>");

		var category_column = $("<div class='col-md-3'><span class='visible-xs-inline h3'>Category: </span>"+task.category+"</div>");
		var owner_column = $("<div class='col-md-3'><span class='visible-xs-inline h3'>Owner: </span>"+task.owner+"</div>");
		var task_column = $("<div class='col-md-3'><span class='visible-xs-inline h3'>Task: </span>"+task.task+"</div>");
		var due_column =$("<div class='col-md-2'><span class='visible-xs-inline h3'>Due Date: </span>"+task.due+"<div>");
		var button_column = $("<div class='col-md-1'></div>");
		var button = $('<button class="btn btn-danger"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>').click(function () {
			myDataRef.child(snapshot.key()).remove();
		});

		button_column.append(button);
		new_row.append(task_column).append(category_column).append(owner_column).append(due_column).append(button_column);
		$("#table").append(new_row);

		myDataRef.child(snapshot.key()).on("child_removed", function(snapshot){
			new_row.remove();
		});
	});

	var addTask = function(){
		var task = $("#new_task").val();
		var category = $("#category option:selected").text();
		var owner = $("#owner option:selected").text();
		var due = $("#datepicker").val();
		var datas = {
				task: task,
				category: category,
				owner: owner,
				due: due
			}
		console.log(due);
		if(category==""||owner =="" || task==""||due==""){
			alert("Fill in the task details and keep our data clean");
		}
		else {
			myDataRef.push(datas);
			$("#new_task").val("");
			$("#category").val("");
			$("#owner").val("");
			$('#datepicker').datepicker('setDate', null);
			$.post('https://vocal-tracker-119904.appspot.com/',datas, function(response) {
			console.log ("yo email got sent niggy");// Do something with the request
		}, 'jsonp');
		};
	};
});