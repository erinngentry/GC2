var createdpattern = [];
var userpattern = [];
var level = 0;

$("index.html").ready(function() {
  grid(3,3);
});


//button that determines grid size AxA
function boxclick() {
	console.log("grid size button clicked");
	var size = prompt("Please select your grid size");
  grid(size, size);
}


//makes the grid
function grid(rows, cols) {
  var table = "<table>";
  var size = (1 / rows * 525) + "px";
	var blockOrder = []; 
		

  for (i=0; i<rows; i++) {
    table += "<tr>";
    for (j=0; j<cols; j++) {
      table += "<td>"+"</td>";
			blockOrder.push([i,j]);
			console.log(blockOrder.join('\n'));    //puts into an array
    }
    table += "</tr>";
  }
  table += "</table>";
  
  $("#container").empty().append(table);
  $("tr").css("height", size);
  $("td").css("color", "red").css("width", size);
	return blockOrder;
}


function makepattern(){
	console.log("make pattern button clicked");


	$('body').on('click', 'td',function(e){
	var userClicked= $(this).attr("id");
	console.log("button clicked");
	})
}
