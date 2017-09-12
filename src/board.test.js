import GameBoard from './board.js';

let gameBoard;

describe('gameBoard.getAdjacentIntersections method', () => { 
  beforeAll(() => {
    gameBoard = new GameBoard(9, 1);
  })

  test('intersections in the top left corner', () => {
    /* Act */
    let dataArray   = gameBoard.getAdjacentIntersections(0 , 0);
    /* Assert */
    expect(dataArray).toHaveLength(2);
    expect(dataArray).toEqual([ [1, 0], [0, 1] ]);
  });

  test('intersections in the bottom right corner', () => {
    /* Act */
    let dataArray   = gameBoard.getAdjacentIntersections(8, 8);
    /* Assert */
    expect(dataArray).toHaveLength(2);
    expect(dataArray).toEqual([ [7, 8], [8, 7] ]);
  });

  test('intersections in the top right corner', () => {
    /* Act */
    let dataArray   = gameBoard.getAdjacentIntersections(0, 8);
    /* Assert */
    expect(dataArray).toHaveLength(2);
    expect(dataArray).toEqual([ [1, 8], [0, 7] ]);
  });

  test('intersections in the bottom left corner', () => {
    /* Act */
    let dataArray   = gameBoard.getAdjacentIntersections(8, 0);
    /* Assert */
    expect(dataArray).toHaveLength(2);
    expect(dataArray).toEqual([ [7, 0], [8, 1] ]);
  });

  test('intersections in the middle left edge', () => {
    /* Act */
    let dataArray   = gameBoard.getAdjacentIntersections(4, 8);
    /* Assert */
    expect(dataArray).toHaveLength(3);
    expect(dataArray).toEqual([ [3, 8], [5, 8], [4, 7] ]);
  });

  test('intersections in the middle', () => {
    /* Act */
    let dataArray   = gameBoard.getAdjacentIntersections(4, 4);
    /* Assert */
    expect(dataArray).toHaveLength(4);
    expect(dataArray).toEqual([ [3, 4], [5, 4], [4, 5], [4, 3]]);
  });
});