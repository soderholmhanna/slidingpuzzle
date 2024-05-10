import { useState } from "react";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

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


function App() {

  const [pieces, setPieces] = useState(shuffle(numbers));  

  const handleClick = () => {
    setPieces(shuffle(pieces))
  }

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
    <button id="shuffle" onClick={handleClick}>Shuffle pieces</button>
   </div>
  )
}

export default App;
