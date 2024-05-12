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
  const [emptyBlockValue, setEmptyBlockValue] = useState<number>(9);

  const [pieces, setPieces] = useState<number[]>(shuffle(blocks));

  const canMove = (pieceIndex: number): boolean => {
    const pieceRow = Math.floor(pieceIndex / 3);
    const pieceCol = pieceIndex - pieceRow * 3;

    const emptyPieceIndex = pieces.indexOf(emptyBlockValue);
    const emptyPieceRow = Math.floor(emptyPieceIndex / 3);
    const emptyPieceCol = emptyPieceIndex % 3;

    if (
      pieceRow === emptyPieceRow && Math.abs(pieceCol - emptyPieceCol) === 1 ||
      pieceCol === emptyPieceCol && Math.abs(pieceRow - emptyPieceRow) === 1
    ) {
      return true;
    } else {
      console.log("Piece is in column:", pieceCol)
      console.log("Piece is in row:", pieceRow)
      console.log("Empty piece has index:", emptyPieceIndex)
      console.log("Empty block value:", emptyBlockValue)
      console.log("Empty piece is in row:", emptyPieceRow)
      console.log("Empty piece is in column:", emptyPieceCol)
      return false;
    }
      
  }

  const movePiece = (pieceIndex: number) => {
    if (canMove(pieceIndex) === true) {
      console.log("Clicked piece with index:", pieceIndex)

      const emptyIndex = pieces.indexOf(emptyBlockValue);
      console.log("Empty block index is:", emptyIndex)


      const newPieces = [...pieces];
      newPieces[emptyIndex] = pieces[pieceIndex];
      newPieces[pieceIndex] = emptyBlockValue;
      setPieces(newPieces);
    } else {
      console.log("Can't move piece:", pieceIndex)
      console.log(pieces)
    }
  };
  
  const handleShuffle = () => {
    setPieces(shuffle(pieces))
  }

  const handleMovePiece = (pieceIndex: number) => {
    movePiece(pieceIndex)
  }
  
  return (
    <div className="puzzle-container">
      <h1>Sliding Puzzle</h1>
      <div id="puzzle">
      {pieces.map((piece, index) => {
        if (piece !== 9) {
          return (
            <div key={piece} className=" piece" onClick={() => handleMovePiece(index)}>
              {piece}
            </div>
          );
        } else if (piece === 9) {
          return (
            <div key={piece} className="piece" id="empty-piece"></div>
          );
        }
      })}
    </div>
    <button id="shuffle" onClick={handleShuffle}>Shuffle pieces</button>
   </div>
  )
}

export default Game; 