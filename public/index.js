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

		var new_row = $("<tr></tr>");

		var category_column = $("<td>"+task.category+"</td>");
		var owner_column = $("<td>"+task.owner+"</td>");
		var task_column = $("<td>"+task.task+"</td>");
		var due_column =$("<td>"+task.due+"<td>");
		var button_column = $("<td></td>");
		var button = $('<button>-</button>').click(function () {
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
		console.log(due);
		if(category==""||owner =="" || task==""||due==""){
			alert("Fill in the task details and keep our data clean, NIGGA");
		}
		else {
			myDataRef.push({
				task: task,
				category: category,
				owner: owner,
				due: due
			});
			$("#new_task").val("");
			$("#category").val("");
			$("#owner").val("");
			$('#datepicker').datepicker('setDate', null);
		};
	};
});