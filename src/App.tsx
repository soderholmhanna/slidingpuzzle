import { useState } from "react";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];


function App() {
  const [pieces, setPieces] = useState(numbers);

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


  const handleClick = () => {
    setPieces(shuffle(pieces))
  }

  return (
   <>
    <h1>Sliding puzzle</h1>
    <div id="puzzle">
      {
        pieces.map((piece, index) => {
          return <div key={piece} className="piece">{piece}</div>
        })
      }
    </div>
    <button id="shuffle" onClick={handleClick}>Shuffle pieces</button>
   </>
  )
}

export default App;
