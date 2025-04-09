
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

type Player = 'X' | 'O' | null;
type BoardState = Player[];

const TicTacToePage = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const calculateWinner = (squares: BoardState): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const isBoardFull = (squares: BoardState): boolean => {
    return squares.every(square => square !== null);
  };

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      toast.success(`Jogador ${winner} venceu!`);
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner as keyof typeof prev] + 1
      }));
    } else if (isBoardFull(newBoard)) {
      toast.info("Empate!");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? `Vencedor: ${winner}` 
    : isBoardFull(board) 
      ? "Empate!" 
      : `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;

  const renderSquare = (index: number) => {
    return (
      <button
        className={`h-20 w-20 flex items-center justify-center text-2xl font-bold border border-gray-300 ${
          board[index] === 'X' ? 'text-blue-600' : board[index] === 'O' ? 'text-red-600' : ''
        } ${!board[index] && !winner ? 'hover:bg-gray-100' : ''}`}
        onClick={() => handleClick(index)}
        disabled={!!winner || !!board[index]}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Jogo da Velha</CardTitle>
          <CardDescription>Jogo clássico para dois jogadores</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <div className="mb-4 text-lg font-semibold">{status}</div>
          
          <div className="grid grid-cols-3 gap-1 mb-6">
            {[...Array(9)].map((_, i) => (
              <div key={i}>{renderSquare(i)}</div>
            ))}
          </div>

          <div className="flex gap-8 text-center">
            <div>
              <div className="text-blue-600 font-bold text-xl">X</div>
              <div className="text-2xl font-bold">{scores.X}</div>
            </div>
            <div>
              <div className="text-red-600 font-bold text-xl">O</div>
              <div className="text-2xl font-bold">{scores.O}</div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetGame}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Novo Jogo
          </Button>
          <Button variant="ghost" onClick={resetScores}>Reiniciar Placar</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicTacToePage;
