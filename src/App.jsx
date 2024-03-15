import { useState } from 'react';
import Board from './components/Board';
import './index.css';

const App = () => {
	const [xIsNext, setxIsNext] = useState(true);
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const currentSquares = history[history.length - 1];

	const handlePlay = (nextSquares) => {
		setHistory([...history, nextSquares]);
		setxIsNext(!xIsNext);
	}

	const jumpTo = (step) => {
		setHistory(history.slice(0, step + 1));
		setxIsNext(step % 2 === 0);
	};

	const moves = history.map((step, move) => {
		const desc = move ? `Go to move #${move}` : 'Go to game start';
		return (
			<div key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</div>
		);
	});

	return (
		<div className='game'>
			<div className='game-board'>
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className='game-info'>
				<div>{moves}</div>
			</div>
		</div>
	)
}

export default App;