import React, { useEffect, useState } from 'react';

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
  const emptyBlockValue = 9;

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
    }
  };

  // Sorting function credit: https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-188.php#:~:text=Calculate%20the%20ordering%20direction%20for,or%201%20(ascending%20order).
  const isSorted = (arr: number[]) => {
    let direction = -(arr[0] - arr[1]);
  
    for (let [i, val] of arr.entries()) {
      direction = !direction ? -(arr[i - 1] - arr[i]) : direction;
  
      if (i === arr.length - 1) return !direction ? 0 : direction;
      else if ((val - arr[i + 1]) * direction > 0) return 0;
    }
  };

  useEffect(() => {

    if (isSorted(pieces) !== 1) {
      console.log("Pieces are not sorted")
    } else if (isSorted(pieces) === 1) {
      console.log("Pieces are sorted")
      setTimeout(() => {
        alert("FINISHED!!!")
      }, 100);
    }
  }, pieces)
  
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