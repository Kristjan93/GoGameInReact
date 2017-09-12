import { _ } from 'underscore';

// Constants representing the color of the squares.
const SQUARE_EMPTY = 0;
const SQUARE_BLACK = 1;
const SQUARE_WHITE = 2;

/*
 * This class describes every moment in the game and it's logic.
 */
export default class GameBoard {
  constructor(size, currentColor) {
    this.size               = size;
    this.currentColor       = currentColor;
    this.squares            = this.createBoardSquares(size);

    this.lastMoveWasPassed  = false;
    this.inAtari            = false;
    this.attemptedSuicide   = false;
    console.log('hello')
  }

  // Creating a double array representing the board squares.
  createBoardSquares(size) {
    var m = [];
    for (var i = 0; i < size; i++) {
      m[i] = [];
      for (var j = 0; j < size; j++) {
        m[i][j] = SQUARE_EMPTY;
      }
    }
    return m;
  }

  // Switching player turn.
  switchPlayer() {
    this.currentColor = this.currentColor === SQUARE_BLACK ? SQUARE_WHITE : SQUARE_BLACK;
  }
  
  // Players have to freedom to pass on their turn.
  // Given that the last move and this was passed: the game is over.
  pass() {
    if(this.lastMoveWasPassed) { this.endGame(); }

    this.lastMoveWasPassed = true;
    this.switchPlayer();
  }

  // Called when the game ends (both players pass).
  endGame() {
    console.log( 'Game Over Boys !' );
  }


  // Attempt to place a stone at (i,j). Returns true iff the move was legal.
  play(i, j) {
    console.log('Played at: ' + i + ', ' + j);

    this.attemptedSuicide = this.inAtari = false;

    if (this.board[i][j] !== SQUARE_EMPTY) { return false; }

    const color     = this.squares[i][j] = this.currentColor;
    const neighbors = this.getAdjacentIntersections(i, j);

    let captured    = [];
    let atari       = false;

    let self = this;
    _.each(neighbors, function(n) {
        let state = self.squares[n[0]][n[1]];

        if (state !== SQUARE_EMPTY && state !== color) {
            let group = self.getGroup(n[0], n[1]);
            console.log(group);

            if (group["liberties"] === 0)      { captured.push(group); }
            else if (group["liberties"] === 1) { atari = true; }
        }
    });

    // detect suicide
    if (_.isEmpty(captured) && this.getGroup(i, j)["liberties"] === 0) {
        this.squares[i][j] = SQUARE_EMPTY;
        this.attemptedSuicide = true;
        return false;
    }

    self = this;
    _.each(captured, function(group) {
        _.each(group["stones"], function(stone) {
            self.squares[stone[0]][stone[1]] = SQUARE_EMPTY;
        });
    });

    if (atari) { this.inAtari = true; }

    this.lastMoveWasPassed = false;
    this.switchPlayer();
    return true;
  }

  // Given a base board position, returns a list of [i,j] coordinates representing
  // orthogonally adjacent intersections.
  getAdjacentIntersections(i , j) {
    let neighbors = [];

    // Find up and down positions.
    if (i > 0)              { neighbors.push([i - 1, j]); }
    if (i < this.size - 1)  { neighbors.push([i + 1, j]); }
    // Find right and left positions.
    if (j < this.size - 1)  { neighbors.push([i, j + 1]); }
    if (j > 0)              { neighbors.push([i, j - 1]); }

    return neighbors;
  }

 /*
  * Performs a breadth-first search about an (i,j) position to find recursively
  orthogonally adjacent stones of the same color (stones with which it shares
  * liberties). Returns null for if there is no stone at the specified position,
  * otherwise returns an object with two keys: "liberties", specifying the
  * number of liberties the group has, and "stones", the list of [i,j]
  * coordinates of the group's members.
  */
  getGroup(i, j) {
      var color = this.squares[i][j];

      if (color === SQUARE_EMPTY) { return null; }
  
      var visited       = {}; // for O(1) lookups
      var visited_list  = []; // for returning
      var queue         = [[i, j]];
      var count         = 0;
  
      while (queue.length > 0) {
        var stone = queue.pop();

        if (visited[stone]) { continue; }

          var neighbors = this.getAdjacentIntersections(stone[0], stone[1]);
          var self = this;

          _.each(neighbors, function(n) {
              var state = self.squares[n[0]][n[1]];
              
              if (state === SQUARE_EMPTY) { count++; }
              
              if (state === color) { queue.push([n[0], n[1]]); }
          });
  
          visited[stone] = true;
          visited_list.push(stone);
      }
  
      return {
          "liberties": count,
          "stones": visited_list
      };
  }
}

// var gameBoard = new GameBoard( 3, SQUARE_BLACK );

// console.log('gameBoard.squares');
// console.log(gameBoard.squares);

// console.log('gameBoard.getAdjacentIntersections(0, 0)')
// console.log(gameBoard.getAdjacentIntersections(0, 0).length);

// console.log('gameBoard.lastMoveWasPassed');
// console.log(gameBoard.lastMoveWasPassed);

// console.log('gameBoard.currentColor');
// console.log(gameBoard.currentColor);

// console.log('gameBoard.pass'); gameBoard.pass();

// console.log('gameBoard.currentColor');
// console.log(gameBoard.currentColor);

// console.log('gameBoard.lastMoveWasPassed');
// console.log(gameBoard.lastMoveWasPassed);

// console.log('gameBoard.pass'); gameBoard.pass();
