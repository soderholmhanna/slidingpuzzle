import React from 'react';

interface Props {
    onShuffle: () => void;
    pieces: number[];
}

const Game: React.FC<Props> = ({ onShuffle, pieces }) => {
  return (
    <div className="puzzle-container">
    <h1>Sliding puzzle</h1>
    <div id="puzzle">
      {
        pieces.map((piece) => {
          return <div key={piece} className="piece">{piece}</div>
        })
      }
    </div>
    <button id="shuffle" onClick={onShuffle}>Shuffle pieces</button>
   </div>
  )
}

export default Game;