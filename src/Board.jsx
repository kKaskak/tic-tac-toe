import PropTypes from 'prop-types';
import Square from './Square';
import './App.css';

const Board = ({ xIsNext, squares, onPlay }) => {

    const handleClick = (i) => {
        if (squares[i]  || calculateWinner(squares)) return;
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(nextSquares);
    }

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        if (squares.every(Boolean)) return 'Draw';
        return null;
    };

    const status = calculateWinner(squares) ? `Winner: ${calculateWinner(squares)}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
        <>
			<div>{status}</div>
			<div className='board-row'>
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
    )
}

export default Board;

Board.propTypes = {
    xIsNext: PropTypes.bool,
    squares: PropTypes.array,
    onPlay: PropTypes.func
};