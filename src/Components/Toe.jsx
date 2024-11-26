import React, { useState } from "react";

function Toe() {
  // Initialize state for the board, current player, and winner
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Handle click on a square
  const handleSquareClick = (index) => {
    // If there's already a winner or the square is taken, do nothing
    if (winner || board[index]) return;

    // Copy the board and update the clicked square
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    // Check if there’s a winner
    const newWinner = calculateWinner(newBoard);
    setWinner(newWinner);

    // Toggle between X and O
    setIsXNext(!isXNext);
  };

  // Function to check for a winner
  const calculateWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // Return the winner (X or O)
      }
    }

    // Check for a tie (if all squares are filled)
    if (squares.every((square) => square !== null)) {
      return "Tie";
    }

    return null;
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className=" conatainer justify-items-center bg-black p-10 h-screen">
      <h1 className="text-2xl font-bold py-5 text-white">Tic-Tac-Toe</h1>

      {/* Game board */}
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, index) => (
          <div
            key={index}
            onClick={() => handleSquareClick(index)}
            className="bg-green-200 w-20 h-20 flex items-center justify-center text-3xl font-bold rounded-lg cursor-pointer"
          >
            {value}
          </div>
        ))}
      </div>

      {/* Display winner, tie, or next player */}
      <p className="text-2xl text-white mt-5">
        {winner === "Tie"
          ? "It's a Tie!"
          : winner
          ? `Winner: ${winner}`
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </p>

      {/* Reset button */}
      <button
        onClick={resetGame}
        className="px-10 py-2 bg-blue-700 text-white rounded-2xl font-bold text-2xl mt-5"
      >
        Reset
      </button>
    </div>
  );
}

export default Toe;
