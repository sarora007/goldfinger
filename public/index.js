$(document).ready(function() {
	var myDataRef = new Firebase('https://getshitdonenow.firebaseIO.com');
    myDataRef.on('child_added', function(snapshot) {
    	var task = snapshot.val();
    	console.log(task);

    	var category_column = "<td>"+task.category+"</td>";
    	var owner_column = "<td>"+task.owner+"</td>";
    	var task_column = "<td>"+task.task+"</td>";

    	var new_row = "<tr>"+category_column+owner_column+task_column+"</tr>";
    	$("#table").append(new_row);
    	console.log(new_row);

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