function Puzzle(n) {
	this.length = n;
	this.create = function(n) {
		var puzzle = [];
		for (var i = 0; i < n; i++) {
			var arr = [];
			for (var j = 0; j < n; j++) {
				arr.push(false);
			}
			puzzle.push(arr);
		}
		return puzzle;
	}
	this.arr = this.create(n);
	this.prev = null;
	this.prevPress = null;
	this.makeSolution = function() {
		var solution = [];
		for (var i = 0; i < this.length; i++) {
			var arr = [];
			for (var j = 0; j < this.length; j++) {
				arr.push(true);
			}
			solution.push(arr);
		}
		this.arr = solution;
	}
	
	this.copy = function(puzzle) {
		for (var i = 0; i < this.length; i++) {
			
			for (var j = 0; j < this.length; j++) {
				this.arr[i][j] = puzzle.arr[i][j];
			}
		}
	}
	
	this.equals = function(puzzle) {
		
		for (var i = 0; i < this.length; i++) {
			for (var j = 0; j < this.length; j++) {
				if (this.arr[i][j] != puzzle.arr[i][j]) {
					return false;
				}
			}
		}
		return true;
	}
	
	this.press = function(x,y) {
		var left = x - 1;
		var right = x + 1;
		var top = y - 1;
		var bottom = y + 1;
	
		this.arr[y][x] = !this.arr[y][x];
		
		if (left >=0) {
			this.arr[y][left] = !this.arr[y][left];
		}
	
		if (right < this.length) {
    		this.arr[y][right] = !this.arr[y][right];	
		}
	
		if (top >= 0) {
			this.arr[top][x] = !this.arr[top][x];
		}
	
		if (bottom < this.length) {
			this.arr[bottom][x] = !this.arr[bottom][x];
		
		}
	}
}

function sequence(puzzle, solution) {
	var queue = [];
	var set = {};
	queue.push(puzzle);
	set[puzzle.arr] = true;
	
	while (queue.length != 0) {
		console.log(queue.length);
		var currPuzzle = queue.shift();
		if (currPuzzle.equals(solution)) {
			return currPuzzle;
		}
		for (var i = 0; i < currPuzzle.length; i++) {
			for (var j = 0; j < currPuzzle.length; j++) {
				var newPuzzle = new Puzzle(currPuzzle.length);
				newPuzzle.copy(currPuzzle);
				newPuzzle.press(j,i);
				newPuzzle.prev = currPuzzle;
				newPuzzle.prevPress = {x: j, y: i};
				if (!(newPuzzle.arr in set)) {
					set[newPuzzle.arr] = true;
					queue.push(newPuzzle);
				}
			}
		}
	}
	return false;
}

function getArr(solutionChain) {
	var arr = [];
	arr.push({puzzle: solutionChain, press: 'Complete!'})
	while(solutionChain.prev != null) {
		var currPress = solutionChain.prevPress;
		solutionChain = solutionChain.prev;
		arr.push({press: 'Press: ' + currPress.x + ', ' + currPress.y, puzzle: solutionChain})
	}
	return arr;
}

function containsPuzzle(set, puzzle) {
	for (var i = 0; i < set.length; i++) {
		var currPuzzle = set[i];
		if (puzzle.equals(currPuzzle)) {
			return true;
		}
	}
	return false;
}
/*
var puzzle = new Puzzle(3);

var solution = new Puzzle(3);
solution.makeSolution();
var solutionChain = sequence(puzzle, solution);
console.log(getArr(solutionChain));
*/