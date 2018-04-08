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
				this.arr[i][j] = puzzle[i][j];
			}
		}
	}
	
	this.equals = function(puzzle) {
		for (var i = 0; i < this.length; i++) {
			for (var j = 0; j < this.length; j++) {
				if (this.arr[i][j] == puzzle[i][j]) {
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
		this.arr[x][y] = !this.arr[x][y];
		if (left >=0) {
			this.arr[y][left] = !this.arr[y][left];
		}
	
		if (right < this.length - 1) {
    		this.arr[y][right] = !this.arr[y][right];	
		}
	
		if (top >= 0) {
			this.arr[top][x] = !this.arr[top][x];
		}
	
		if (bottom < this.length - 1) {
			this.arr[bottom][x] = !this.arr[bottom][x];
		
		}	
	}
	
}
var puzzle = new Puzzle(3);

var solution = new Puzzle(3);
solution.makeSolution();

function sequence(puzzle, solution) {
	var queue = [];
	queue.push(puzzle);
	while (true) {
		
	}
}



console.log(solution);