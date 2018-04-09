var puzzle;
var puzzleArr;
var isStarted = false;
$(document).ready(function() {
	addButtons(3);
	puzzle =  new Puzzle(3);
	puzzleArr = puzzle.arr;
	$( "#number").change(function() {
		var n = $('#number').val();
		console.log(n);
		puzzle =  new Puzzle(n);
		puzzleArr = puzzle.arr;
		if (n < 10) {
			addButtons(n);
		}
	});
})

function addButtons(n) {
	$('#buttons').html("");
	for (var i = 0; i < n; i++) {
		var appendLine = "<div>";
		for (var j = 0; j < n; j++) {
			var index = '' + i + j;
		
			var buttonContext = '<button id="' + index + '"onclick="press(\'' + index + '\')"><span class="off"><span class="innerOff"></span></span></button>';
			appendLine += buttonContext;	
		}
		appendLine += '</div>';
		
		$('#buttons').append(appendLine);
	}
}

function press(index) {
	var y = Math.floor(index/ 10);
	var x = index % 10;
	console.log(y,x);
	
	$('#' + index).empty();
	
	puzzleArr[y][x] = !puzzleArr[y][x];
	
	if (puzzleArr[y][x]) {
		var buttonContext = '<span class="on"><span class="innerOn"></span></span>';
		
	} else {
		var buttonContext = '<span class="off"><span class="innerOff"></span></span>';
	}
	
	$('#' + index).append(buttonContext);
}

function changeButtons(arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j =0; j < arr.length; j++) {
			
			var index = '' + i + j;
			
			if (arr[i][j]) {
				var buttonContext = '<span class="on"><span class="innerOn"></span></span>';
			} else {
				var buttonContext = '<span class="off"><span class="innerOff"></span></span>';
			}
			$('#' + index).empty();
			$('#' + index).append(buttonContext);
		}
	}
}

function start() {
	if (!isStarted) {
		isStarted = true;
		$('#start').html('Next');
		var solution = new Puzzle(puzzle.length);
		solution.makeSolution();
		var solutionChain = sequence(puzzle, solution);
		solutionArr = getArr(solutionChain);
		console.log(solutionArr);
	} else {
		console.log(solutionArr);
		if (solutionArr.length != 0) {
			var step = solutionArr.pop();
			changeButtons(step.puzzle.arr);
			$('#press').html(step.press);
		}
	}
}
