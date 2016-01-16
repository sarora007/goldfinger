$(document).ready(function() {
	var myDataRef = new Firebase('https://getshitdonenow.firebaseIO.com');
	myDataRef.on('child_added', function(snapshot) {
		var task = snapshot.val();
		console.log(task);
		var new_row = $("<tr></tr>");
		var category_column = $("<td>"+task.category+"</td>");
		var owner_column = $("<td>"+task.owner+"</td>");
		var task_column = $("<td>"+task.task+"</td>");
		var button_column = $("<td></td>");
		var button = $('<button>-</button>').click(function () {
			myDataRef.child(snapshot.key()).remove();
		});
		button_column.append(button);
		new_row.append(task_column).append(category_column).append(owner_column).append(button_column);
		$("#table").append(new_row);
		myDataRef.child(snapshot.key()).on("child_removed", function(snapshot){
			new_row.remove();
		});
	});
	$("#button").click(function(){
		var task = $("#new_task").val();
		var category = $("#category option:selected").text();
		var owner = $("#owner option:selected").text();
		myDataRef.push(
		{
			task: task,
			category: category,
			owner: owner
		}
		);
	}); 
});