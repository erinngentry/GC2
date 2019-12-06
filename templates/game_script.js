var createdpattern = [];
var userpattern = [];
var clickedCells = [];
var level_name = ""
var level = 0;

$("gameimport.html").ready(function() {
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
    var gridID = "";
		

  for (i=0; i<rows; i++) {
    table += "<tr>";
    for (j=0; j<cols; j++) {
      table += "<td class='grid' id='cells'>"+"</td>";
        blockOrder.push([i, j]);
        blockOrder.join('\n');
            
        
			/*console.log(blockOrder.join('\n')); */   //puts into an array
    }
    table += "</tr>";
  }
  table += "</table>";
    
    console.log(blockOrder.join('\n'));
    $("#container").empty().append(table);
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            gridID = document.getElementById('cells');
            gridID.setAttribute("id", gridID.id + (i + 1) + (j + 1));


            console.log("assigning ID: " + gridID.id);
        }
    }

    $(document.getElementsByName("MakePattern")).removeAttr("disabled")
  $("tr").css("height", size);
    //$("td").css("color", "red").css("width", size);


	return gridID;
}


function makepattern(gridID){
	console.log("make pattern button clicked");
    $('body').on('click', 'td', function (e) {
        $(this).css('background-color', 'yellow');

        //var userClicked = gridID.id;
        console.log("button clicked: " + $(this).attr('id'));
        clickedCells.push($(this).attr('id'));
    })
    $(document.getElementsByName("HidePattern")).removeAttr("disabled"); 
    console.log(clickedCells)
    return clickedCells.id
}

function hidepattern(clickedCells) {
    //if ($('td').css("background-color") == "yellow") {
    //    $(document.getElementsByTagName('table')).hide();
    //}
    console.log("finished");
    $('BoxClick', 'MakePattern','GridSize').prop("disabled", true);
    $('table').css("display", "none");

    level_name = prompt("Name this level: ");
    console.log(name, clickedCells.id)
}

function play(clickedCells) {
    console.log(clickedCells)
    if ($('td').id == clickedCells.id) {
        $('td').css("background-color", "blue")
    }
}