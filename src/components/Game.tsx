import React, { useState } from 'react';

const shuffle = (array: number[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j]
      newArray[j] = temp;
  }
  return newArray;
};

interface Props {
  blocks: number[];
}

const Game: React.FC<Props> = ({ blocks }) => {
  const emptyBlockValue = 16;

  const [pieces, setPieces] = useState<number[]>(shuffle(blocks));

  const canMove = (pieceIndex: number): boolean => {
    const pieceRow = Math.floor(pieceIndex / 4);
    const pieceCol = pieceIndex - pieceRow * 4;

    const emptyPieceIndex = pieces.indexOf(emptyBlockValue);
    const emptyPieceRow = Math.floor(emptyPieceIndex / 4);
    const emptyPieceCol = emptyPieceIndex % 4;

    return (
      pieceRow === emptyPieceRow && Math.abs(pieceCol - emptyPieceCol) === 1 ||
      pieceCol === emptyPieceCol && Math.abs(pieceRow - emptyPieceRow) === 1
    )
  }

  const movePiece = (pieceIndex: number) => {
    if (canMove(pieceIndex) === true) {
      console.log("Clicked piece with index:", pieceIndex)
      const emptyIndex = pieces.indexOf(emptyBlockValue);
      const newPieces = [...pieces];
      newPieces[emptyIndex] = pieces[pieceIndex];
      newPieces[pieceIndex] = emptyBlockValue;
      setPieces(newPieces);
    } else {
      console.log("Can't move piece:", pieceIndex)
    }
  };
  
  
  return (
    <div className="puzzle-container">
    <h1>Sliding Puzzle</h1>
    <div id="puzzle">
      {
        pieces.map((piece, index) => {
          return <div key={piece} className="piece" onClick={() => movePiece(index)}>{piece}</div>
        })
      }
    </div>
    <button id="shuffle">Shuffle pieces</button>
   </div>
  )
}

export default Game; 