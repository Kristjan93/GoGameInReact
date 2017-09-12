import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import GameBoard from './board.js';

let gameBoard = new GameBoard(9, 1);
console.log('ignore');
console.log(gameBoard.currentColor);
console.log('stop ignore');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
